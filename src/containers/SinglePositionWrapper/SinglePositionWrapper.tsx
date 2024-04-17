import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import {
  TokenPriceData,
  calcPrice,
  calcYPerXPrice,
  createPlaceholderLiquidityPlot,
  getJupTokenPrice,
  getJupTokensRatioPrice,
  printBN
} from '@consts/utils'
import { Pair, calculatePriceSqrt } from '@invariant-labs/sdk'
import { MAX_TICK, getX, getY } from '@invariant-labs/sdk/lib/math'
import { calculateClaimAmount } from '@invariant-labs/sdk/src/utils'
import { Grid } from '@material-ui/core'
import { Color } from '@material-ui/lab'
import { actions as poolsActions } from '@reducers/pools'
import { actions as farmsActions } from '@reducers/farms'
import { actions } from '@reducers/positions'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status, actions as solanaWallet } from '@reducers/solanaWallet'
import { actions as connectionActions } from '@reducers/solanaConnection'
import { timeoutError } from '@selectors/solanaConnection'
import { hasFarms, hasUserStakes, stakesForPosition } from '@selectors/farms'
import { hasTokens, volumeRanges } from '@selectors/pools'
import {
  currentPositionRangeTicks,
  isLoadingPositionsList,
  plotTicks,
  singlePositionData
} from '@selectors/positions'
import { status, balanceLoading } from '@selectors/solanaWallet'
import loader from '@static/gif/loader.gif'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import useStyles from './style'
import { initialXtoY } from '@consts/uiUtils'
import { Redirect } from 'react-router-dom'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { data: ticksData, loading: ticksLoading, hasError: hasTicksError } = useSelector(plotTicks)
  const {
    lowerTick,
    upperTick,
    loading: rangeTicksLoading
  } = useSelector(currentPositionRangeTicks)
  const poolsVolumeRanges = useSelector(volumeRanges)
  const hasAnyTokens = useSelector(hasTokens)
  const hasAnyFarms = useSelector(hasFarms)
  const hasAnyStakes = useSelector(hasUserStakes)

  const walletStatus = useSelector(status)
  const isBalanceLoading = useSelector(balanceLoading)

  const positionStakes = useSelector(stakesForPosition(position?.address))

  const isTimeoutError = useSelector(timeoutError)

  const [xToY, setXToY] = useState<boolean>(
    initialXtoY(position?.tokenX.assetAddress.toString(), position?.tokenY.assetAddress.toString())
  )

  const [globalPrice, setGlobalPrice] = useState<number | undefined>(undefined)

  const [waitingForTicksData, setWaitingForTicksData] = useState<boolean | null>(null)

  const [showFeesLoader, setShowFeesLoader] = useState(true)

  const [isFinishedDelayRender, setIsFinishedDelayRender] = useState(false)

  useEffect(() => {
    if (position?.id && waitingForTicksData === null) {
      setWaitingForTicksData(true)
      dispatch(actions.getCurrentPositionRangeTicks(id))
      dispatch(
        actions.getCurrentPlotTicks({
          poolIndex: position.poolData.poolIndex,
          isXtoY: true
        })
      )
    }
  }, [position?.id])

  useEffect(() => {
    if (hasAnyTokens && !hasAnyFarms) {
      dispatch(farmsActions.getFarms())
    }
  }, [hasAnyTokens])

  useEffect(() => {
    if (walletStatus === Status.Initialized && hasAnyFarms && !hasAnyStakes && position?.id) {
      dispatch(farmsActions.getUserStakes())
    }
  }, [walletStatus, hasAnyFarms, position?.id])

  useEffect(() => {
    if (waitingForTicksData === true && !rangeTicksLoading) {
      setWaitingForTicksData(false)
    }
  }, [rangeTicksLoading])

  const midPrice = useMemo(() => {
    if (position) {
      return {
        index: position.poolData.currentTickIndex,
        x: calcYPerXPrice(
          position.poolData.sqrtPrice.v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
      }
    }

    return {
      index: 0,
      x: 0
    }
  }, [position?.id])
  const leftRange = useMemo(() => {
    if (position) {
      return {
        index: position.lowerTickIndex,
        x: calcPrice(
          position.lowerTickIndex,
          true,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
      }
    }

    return {
      index: 0,
      x: 0
    }
  }, [position?.id])
  const rightRange = useMemo(() => {
    if (position) {
      return {
        index: position.upperTickIndex,
        x: calcPrice(
          position.upperTickIndex,
          true,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
      }
    }

    return {
      index: 0,
      x: 0
    }
  }, [position?.id])

  const min = useMemo(
    () =>
      position
        ? calcYPerXPrice(
            calculatePriceSqrt(position.lowerTickIndex).v,
            position.tokenX.decimals,
            position.tokenY.decimals
          )
        : 0,
    [position?.lowerTickIndex]
  )
  const max = useMemo(
    () =>
      position
        ? calcYPerXPrice(
            calculatePriceSqrt(position.upperTickIndex).v,
            position.tokenX.decimals,
            position.tokenY.decimals
          )
        : 0,
    [position?.upperTickIndex]
  )
  const current = useMemo(
    () =>
      position
        ? calcYPerXPrice(
            position.poolData.sqrtPrice.v,
            position.tokenX.decimals,
            position.tokenY.decimals
          )
        : 0,
    [position]
  )

  const tokenXLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getX(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            position.poolData.sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          ),
          position.tokenX.decimals
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position])
  const tokenYLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getY(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            position.poolData.sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          ),
          position.tokenY.decimals
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position])

  const [tokenXClaim, tokenYClaim] = useMemo(() => {
    setShowFeesLoader(true)

    if (
      waitingForTicksData === false &&
      position &&
      typeof lowerTick !== 'undefined' &&
      typeof upperTick !== 'undefined'
    ) {
      const [bnX, bnY] = calculateClaimAmount({
        position,
        tickLower: lowerTick,
        tickUpper: upperTick,
        tickCurrent: position.poolData.currentTickIndex,
        feeGrowthGlobalX: position.poolData.feeGrowthGlobalX,
        feeGrowthGlobalY: position.poolData.feeGrowthGlobalY
      })

      setShowFeesLoader(false)

      return [+printBN(bnX, position.tokenX.decimals), +printBN(bnY, position.tokenY.decimals)]
    }

    return [0, 0]
  }, [position, lowerTick, upperTick, waitingForTicksData])

  const data = useMemo(() => {
    if (ticksLoading && position) {
      return createPlaceholderLiquidityPlot(
        true,
        10,
        position.poolData.tickSpacing,
        position.tokenX.decimals,
        position.tokenY.decimals
      )
    }

    return ticksData
  }, [ticksData, ticksLoading, position?.id])

  const initialIsDiscreteValue = localStorage.getItem('IS_PLOT_DISCRETE')
    ? localStorage.getItem('IS_PLOT_DISCRETE') === 'true'
    : true

  const setIsDiscreteValue = (val: boolean) => {
    localStorage.setItem('IS_PLOT_DISCRETE', val ? 'true' : 'false')
  }

  const [tokenXPriceData, setTokenXPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [tokenYPriceData, setTokenYPriceData] = useState<TokenPriceData | undefined>(undefined)

  const currentVolumeRange = useMemo(() => {
    if (!position?.poolData.address) {
      return undefined
    }

    const poolAddress = position.poolData.address.toString()

    if (!poolsVolumeRanges[poolAddress]) {
      return undefined
    }

    const lowerTicks: number[] = poolsVolumeRanges[poolAddress]
      .map(range => (range.tickLower === null ? undefined : range.tickLower))
      .filter(tick => typeof tick !== 'undefined') as number[]
    const upperTicks: number[] = poolsVolumeRanges[poolAddress]
      .map(range => (range.tickUpper === null ? undefined : range.tickUpper))
      .filter(tick => typeof tick !== 'undefined') as number[]

    const lowerPrice = calcPrice(
      !lowerTicks.length || !upperTicks.length
        ? position.poolData.currentTickIndex
        : Math.min(...lowerTicks),
      true,
      position.tokenX.decimals,
      position.tokenY.decimals
    )

    const upperPrice = calcPrice(
      !lowerTicks.length || !upperTicks.length
        ? Math.min(position.poolData.currentTickIndex + position.poolData.tickSpacing, MAX_TICK)
        : Math.max(...upperTicks),
      true,
      position.tokenX.decimals,
      position.tokenY.decimals
    )

    return {
      min: Math.min(lowerPrice, upperPrice),
      max: Math.max(lowerPrice, upperPrice)
    }
  }, [poolsVolumeRanges, position])

  useEffect(() => {
    if (!position) {
      return
    }

    const xId = position.tokenX.assetAddress.toString() ?? ''
    if (xId.length) {
      getJupTokenPrice(xId)
        .then(data => setTokenXPriceData(data))
        .catch(() => setTokenXPriceData(undefined))
    } else {
      setTokenXPriceData(undefined)
    }

    const yId = position.tokenY.assetAddress.toString() ?? ''
    if (yId.length) {
      getJupTokenPrice(yId)
        .then(data => setTokenYPriceData(data))
        .catch(() => setTokenYPriceData(undefined))
    } else {
      setTokenYPriceData(undefined)
    }
  }, [position?.id])

  const getGlobalPrice = () => {
    if (!position) {
      return
    }

    const tokenXId = position.tokenX.assetAddress.toString() ?? ''
    const tokenYId = position.tokenY.assetAddress.toString() ?? ''

    if (tokenXId.length && tokenYId.length) {
      if (xToY) {
        getJupTokensRatioPrice(tokenXId, tokenYId)
          .then(data => setGlobalPrice(data.price))
          .catch(() => setGlobalPrice(undefined))
      } else {
        getJupTokensRatioPrice(tokenYId, tokenXId)
          .then(data => setGlobalPrice(data.price))
          .catch(() => setGlobalPrice(undefined))
      }
    } else {
      setGlobalPrice(undefined)
    }
  }

  useEffect(() => {
    getGlobalPrice()
  }, [xToY, position?.tokenX, position?.tokenY])

  const copyPoolAddressHandler = (message: string, variant: Color) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinishedDelayRender(true)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [walletStatus])

  useEffect(() => {
    if (isFinishedDelayRender) {
      setIsFinishedDelayRender(false)
    }
  }, [walletStatus])

  const handleRefresh = () => {
    if (position) {
      dispatch(solanaWallet.getBalance())

      dispatch(actions.getPositionsList())

      setWaitingForTicksData(true)
      dispatch(actions.getCurrentPositionRangeTicks(id))
      dispatch(
        actions.getCurrentPlotTicks({
          poolIndex: position.poolData.poolIndex,
          isXtoY: true
        })
      )
      dispatch(
        poolsActions.getPoolData(
          new Pair(position.tokenX.assetAddress, position.tokenY.assetAddress, {
            fee: position.poolData.fee,
            tickSpacing: position.poolData.tickSpacing
          })
        )
      )

      getGlobalPrice()
    }
  }

  useEffect(() => {
    if (isTimeoutError) {
      handleRefresh()
      dispatch(connectionActions.setTimeoutError(false))
    }
  }, [isTimeoutError])

  if (position) {
    return (
      <PositionDetails
        tokenXAddress={position.tokenX.assetAddress}
        tokenYAddress={position.tokenY.assetAddress}
        poolAddress={position.poolData.address}
        copyPoolAddressHandler={copyPoolAddressHandler}
        detailsData={data}
        midPrice={midPrice}
        leftRange={leftRange}
        rightRange={rightRange}
        currentPrice={current}
        onClickClaimFee={() => {
          dispatch(actions.claimFee(position.positionIndex))
        }}
        closePosition={claimFarmRewards => {
          dispatch(
            actions.closePosition({
              positionIndex: position.positionIndex,
              onSuccess: () => {
                history.push('/pool')
              },
              claimFarmRewards
            })
          )
        }}
        ticksLoading={ticksLoading || isLoadingList}
        tickSpacing={position?.poolData.tickSpacing ?? 1}
        tokenX={{
          name: position.tokenX.symbol,
          icon: position.tokenX.logoURI,
          decimal: position.tokenX.decimals,
          balance: +printBN(position.tokenX.balance, position.tokenX.decimals),
          liqValue: tokenXLiquidity,
          claimValue: tokenXClaim,
          usdValue:
            typeof tokenXPriceData?.price === 'undefined'
              ? undefined
              : tokenXPriceData.price * +printBN(position.tokenX.balance, position.tokenX.decimals)
        }}
        tokenXPriceData={tokenXPriceData}
        tokenY={{
          name: position.tokenY.symbol,
          icon: position.tokenY.logoURI,
          decimal: position.tokenY.decimals,
          balance: +printBN(position.tokenY.balance, position.tokenY.decimals),
          liqValue: tokenYLiquidity,
          claimValue: tokenYClaim,
          usdValue:
            typeof tokenYPriceData?.price === 'undefined'
              ? undefined
              : tokenYPriceData.price * +printBN(position.tokenY.balance, position.tokenY.decimals)
        }}
        tokenYPriceData={tokenYPriceData}
        fee={position.poolData.fee}
        min={min}
        max={max}
        initialIsDiscreteValue={initialIsDiscreteValue}
        onDiscreteChange={setIsDiscreteValue}
        showFeesLoader={showFeesLoader || isLoadingList}
        showLiquidityLoader={isLoadingList || isBalanceLoading}
        hasTicksError={hasTicksError}
        reloadHandler={() => {
          dispatch(
            actions.getCurrentPlotTicks({
              poolIndex: position.poolData.poolIndex,
              isXtoY: true
            })
          )
        }}
        plotVolumeRange={currentVolumeRange}
        userHasStakes={!!positionStakes.length}
        globalPrice={globalPrice}
        xToY={xToY}
        setXToY={setXToY}
        handleRefresh={handleRefresh}
      />
    )
  }

  if (
    (isLoadingList && walletStatus === Status.Initialized) ||
    (!position && walletStatus === Status.Uninitialized && !isFinishedDelayRender)
  ) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className={classes.fullHeightContainer}>
        <img src={loader} className={classes.loading} />
      </Grid>
    )
  }

  if (!position && walletStatus === Status.Initialized && isFinishedDelayRender) {
    return <Redirect to='/pool' />
  }

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      className={classes.fullHeightContainer}>
      <EmptyPlaceholder desc='Position does not exist in your list!' />
    </Grid>
  )
}
