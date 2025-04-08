import { PositionsList } from '@components/PositionsList/PositionsList'
import {
  NetworkType,
  POSITIONS_PER_PAGE,
  WSOL_CLOSE_POSITION_LAMPORTS_DEV,
  WSOL_CLOSE_POSITION_LAMPORTS_MAIN
} from '@store/consts/static'
import { actions } from '@store/reducers/positions'
import { actions as walletActions, Status } from '@store/reducers/solanaWallet'
import {
  isLoadingPositionsList,
  lastPageSelector,
  PositionData,
  positionsWithPoolsData,
  prices
} from '@store/selectors/positions'
import { address, balance, status } from '@store/selectors/solanaWallet'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { calcYPerXPriceBySqrtPrice, printBN, ROUTES } from '@utils/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import {
  calculateClaimAmount,
  DECIMAL,
  getMaxTick,
  getMinTick
} from '@invariant-labs/sdk/lib/utils'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { network } from '@store/selectors/solanaConnection'
import { IPositionItem } from '@components/PositionsList/types'
import { actions as actionsStats } from '@store/reducers/stats'
import { actions as snackbarActions } from '@store/reducers/snackbars'

export const WrappedPositionsList: React.FC = () => {
  const walletAddress = useSelector(address)
  const list = useSelector(positionsWithPoolsData)
  const isLoading = useSelector(isLoadingPositionsList)
  const lastPage = useSelector(lastPageSelector)
  const walletStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pricesData = useSelector(prices)
  const solBalance = useSelector(balance)

  const canClosePosition = useMemo(() => {
    if (currentNetwork === NetworkType.Mainnet) {
      return solBalance.gte(WSOL_CLOSE_POSITION_LAMPORTS_MAIN)
    } else {
      return solBalance.gte(WSOL_CLOSE_POSITION_LAMPORTS_DEV)
    }
  }, [currentNetwork, solBalance])

  const handleClosePosition = (index: number) => {
    canClosePosition
      ? dispatch(
          actions.closePosition({
            positionIndex: index,
            onSuccess: () => {
              navigate(ROUTES.PORTFOLIO)
            }
          })
        )
      : dispatch(
          snackbarActions.add({
            message: 'Not enough SOL balance to close position',
            variant: 'error',
            persist: false
          })
        )
  }

  const handleClaimFee = (index: number) => {
    dispatch(actions.claimFee(index))
  }

  const setLastPage = (page: number) => {
    dispatch(actions.setLastPage(page))
  }

  useEffect(() => {
    if (list.length === 0) {
      setLastPage(1)
    }

    if (lastPage > Math.ceil(list.length / POSITIONS_PER_PAGE)) {
      setLastPage(lastPage === 1 ? 1 : lastPage - 1)
    }
  }, [list])

  const handleRefresh = () => {
    dispatch(actions.getPositionsList())
  }

  useEffect(() => {
    dispatch(actionsStats.getCurrentStats())
  }, [])

  useEffect(() => {
    dispatch(actionsStats.getCurrentStats())
  }, [])

  const calculateUnclaimedFees = (position: PositionData) => {
    const [bnX, bnY] = calculateClaimAmount({
      position: position,
      tickLower: position.lowerTick,
      tickUpper: position.upperTick,
      tickCurrent: position.poolData.currentTickIndex,
      feeGrowthGlobalX: position.poolData.feeGrowthGlobalX,
      feeGrowthGlobalY: position.poolData.feeGrowthGlobalY
    })

    const xValue =
      +printBN(bnX, position.tokenX.decimals) *
      (pricesData.data[position.tokenX.assetAddress.toString()]?.price ?? 0)
    const yValue =
      +printBN(bnY, position.tokenY.decimals) *
      (pricesData.data[position.tokenY.assetAddress.toString()]?.price ?? 0)

    const unclaimedFeesInUSD = xValue + yValue
    return unclaimedFeesInUSD
  }

  const data: IPositionItem[] = useMemo(
    () =>
      list.map(position => {
        const lowerPrice = calcYPerXPriceBySqrtPrice(
          calculatePriceSqrt(position.lowerTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
        const upperPrice = calcYPerXPriceBySqrtPrice(
          calculatePriceSqrt(position.upperTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const minTick = getMinTick(position.poolData.tickSpacing)
        const maxTick = getMaxTick(position.poolData.tickSpacing)

        const min = Math.min(lowerPrice, upperPrice)
        const max = Math.max(lowerPrice, upperPrice)

        let tokenXLiq, tokenYLiq

        try {
          tokenXLiq = +printBN(
            getX(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenX.decimals
          )
        } catch (error) {
          tokenXLiq = 0
        }

        try {
          tokenYLiq = +printBN(
            getY(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenY.decimals
          )
        } catch (error) {
          tokenYLiq = 0
        }

        const currentPrice = calcYPerXPriceBySqrtPrice(
          position.poolData.sqrtPrice.v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const valueX = tokenXLiq + tokenYLiq / currentPrice
        const valueY = tokenYLiq + tokenXLiq * currentPrice

        const unclaimedFeesInUSD = calculateUnclaimedFees(position)

        return {
          tokenXName: position.tokenX.symbol,
          tokenYName: position.tokenY.symbol,
          tokenXIcon: position.tokenX.logoURI,
          tokenYIcon: position.tokenY.logoURI,
          fee: +printBN(position.poolData.fee.v, DECIMAL - 2),
          min,
          max,
          position,
          valueX,
          valueY,
          address: walletAddress.toString(),
          id: position.id.toString() + '_' + position.pool.toString(),
          isActive: currentPrice >= min && currentPrice <= max,
          currentPrice,
          tokenXLiq,
          tokenYLiq,
          network: currentNetwork,
          isFullRange: position.lowerTickIndex === minTick && position.upperTickIndex === maxTick,
          unclaimedFeesInUSD: { value: unclaimedFeesInUSD, loading: position.ticksLoading }
        }
      }),
    [list, pricesData]
  )

  return (
    <PositionsList
      initialPage={lastPage}
      currentNetwork={currentNetwork}
      setLastPage={setLastPage}
      handleRefresh={handleRefresh}
      onAddPositionClick={() => {
        navigate(ROUTES.NEW_POSITION)
      }}
      data={data}
      loading={isLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      itemsPerPage={POSITIONS_PER_PAGE}
      noConnectedBlockerProps={{
        onConnect: () => {
          dispatch(walletActions.connect(false))
        },
        title: 'Start exploring liquidity pools right now!',
        descCustomText: 'Or, connect your wallet to see existing positions, and create a new one!'
      }}
      handleClosePosition={handleClosePosition}
      handleClaimFee={handleClaimFee}
      noInitialPositions={list.length === 0}
    />
  )
}

export default WrappedPositionsList
