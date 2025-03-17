import { EmptyPlaceholder } from '@components/EmptyPlaceholder/EmptyPlaceholder'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import { Grid, useMediaQuery } from '@mui/material'
import loader from '@static/gif/loader.gif'
import {
  calcPriceBySqrtPrice,
  calcPriceByTickIndex,
  calcYPerXPriceBySqrtPrice,
  createPlaceholderLiquidityPlot,
  getTokenPrice,
  getJupTokensRatioPrice,
  initialXtoY,
  printBN,
  ROUTES
} from '@utils/utils'
import { actions as connectionActions } from '@store/reducers/solanaConnection'
import { actions as poolsActions } from '@store/reducers/pools'
import { actions } from '@store/reducers/positions'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { Status, actions as walletActions } from '@store/reducers/solanaWallet'
import { network, timeoutError } from '@store/selectors/solanaConnection'
import { actions as farmsActions } from '@store/reducers/farms'
import {
  currentPositionTicks,
  isLoadingPositionsList,
  plotTicks,
  singlePositionData
} from '@store/selectors/positions'
import { balanceLoading, status } from '@store/selectors/solanaWallet'
import { VariantType } from 'notistack'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './style'
import { TokenPriceData } from '@store/consts/types'
import { hasTokens, volumeRanges } from '@store/selectors/pools'
import { hasFarms, hasUserStakes, stakesForPosition } from '@store/selectors/farms'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { calculateClaimAmount } from '@invariant-labs/sdk/lib/utils'
import { MAX_TICK, Pair } from '@invariant-labs/sdk/src'
import { theme } from '@static/theme'
import icons from '@static/icons'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const { classes } = useStyles()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentNetwork = useSelector(network)
  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { data: ticksData, loading: ticksLoading, hasError: hasTicksError } = useSelector(plotTicks)
  const {
    lowerTick,
    upperTick,
    loading: currentPositionTicksLoading
  } = useSelector(currentPositionTicks)
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [globalPrice, setGlobalPrice] = useState<number | undefined>(undefined)
  const [waitingForTicksData, setWaitingForTicksData] = useState<boolean | null>(null)

  const [showFeesLoader, setShowFeesLoader] = useState(true)

  const [isFinishedDelayRender, setIsFinishedDelayRender] = useState(false)
  const [isLoadingListDelay, setIsLoadListDelay] = useState(isLoadingList)

  const [isClosingPosition, setIsClosingPosition] = useState(false)

  useEffect(() => {
    if (position?.id) {
      dispatch(actions.setCurrentPositionId(id))

      setWaitingForTicksData(true)
      dispatch(actions.getCurrentPositionRangeTicks({ id }))

      if (waitingForTicksData === null) {
        dispatch(
          actions.getCurrentPlotTicks({
            poolIndex: position.poolData.poolIndex,
            isXtoY: true
          })
        )
      }
    }
  }, [position?.id.toString()])

  useEffect(() => {
    if (hasAnyTokens && !hasAnyFarms) {
      dispatch(farmsActions.getFarms())
    }
  }, [hasAnyTokens])

  useEffect(() => {
    if (walletStatus === Status.Initialized && hasAnyFarms && !hasAnyStakes && position?.id) {
      dispatch(farmsActions.getUserStakes())
    }
  }, [walletStatus, hasAnyFarms, position?.id.toString()])

  useEffect(() => {
    if (waitingForTicksData === true && !currentPositionTicksLoading) {
      setWaitingForTicksData(false)
    }
  }, [currentPositionTicksLoading])

  const midPrice = useMemo(() => {
    if (position?.poolData) {
      return {
        index: position.poolData.currentTickIndex,
        x: calcPriceBySqrtPrice(
          position.poolData.sqrtPrice.v,
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
  }, [position?.id, position?.poolData?.sqrtPrice])

  const leftRange = useMemo(() => {
    if (position) {
      return {
        index: position.lowerTickIndex,
        x: calcPriceByTickIndex(
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
        x: calcPriceByTickIndex(
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
        ? calcYPerXPriceBySqrtPrice(
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
        ? calcYPerXPriceBySqrtPrice(
            calculatePriceSqrt(position.upperTickIndex).v,
            position.tokenX.decimals,
            position.tokenY.decimals
          )
        : 0,
    [position?.upperTickIndex]
  )
  const current = useMemo(
    () =>
      position?.poolData
        ? calcPriceBySqrtPrice(
            position.poolData.sqrtPrice.v,
            true,
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
    if (
      waitingForTicksData === false &&
      position?.poolData &&
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
  }, [position?.poolData, lowerTick, upperTick, waitingForTicksData])

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
  }, [ticksData, ticksLoading, position?.id.toString()])

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

    const lowerPrice = calcPriceByTickIndex(
      !lowerTicks.length || !upperTicks.length
        ? position.poolData.currentTickIndex
        : Math.min(...lowerTicks),
      true,
      position.tokenX.decimals,
      position.tokenY.decimals
    )

    const upperPrice = calcPriceByTickIndex(
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
      getTokenPrice(xId, position.tokenX.coingeckoId)
        .then(data => setTokenXPriceData(data))
        .catch(() => setTokenXPriceData(undefined))
    } else {
      setTokenXPriceData(undefined)
    }

    const yId = position.tokenY.assetAddress.toString() ?? ''
    if (yId.length) {
      getTokenPrice(yId, position.tokenY.coingeckoId)
        .then(data => setTokenYPriceData(data))
        .catch(() => setTokenYPriceData(undefined))
    } else {
      setTokenYPriceData(undefined)
    }
  }, [position?.id.toString(), current])

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
  }, [xToY, position?.tokenX, position?.tokenY, current])

  const copyPoolAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  useEffect(() => {
    if (isFinishedDelayRender) {
      return
    }
    if (walletStatus === Status.Initialized) {
      setIsFinishedDelayRender(true)
    }
    const timer = setTimeout(() => {
      setIsFinishedDelayRender(true)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [walletStatus])

  useEffect(() => {
    if (!isLoadingList) {
      setTimeout(() => {
        setIsLoadListDelay(false)
      }, 300)

      return () => {
        setIsLoadListDelay(true)
      }
    }
  }, [isLoadingList])

  const onRefresh = () => {
    if (position) {
      dispatch(walletActions.getBalance())

      setShowFeesLoader(true)
      setWaitingForTicksData(true)
      dispatch(actions.getSinglePosition(position.positionIndex))

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
      dispatch(actions.getPositionsList())
    }
  }, [isTimeoutError])

  useEffect(() => {
    if (!isLoadingList && isTimeoutError) {
      if (position?.positionIndex === undefined && isClosingPosition) {
        setIsClosingPosition(false)
        dispatch(connectionActions.setTimeoutError(false))
        navigate(ROUTES.PORTFOLIO)
      } else {
        dispatch(connectionActions.setTimeoutError(false))
        onRefresh()
      }
    }
  }, [isLoadingList])

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
          setShowFeesLoader(true)
          dispatch(actions.claimFee(position.positionIndex))
        }}
        closePosition={claimFarmRewards => {
          setIsClosingPosition(true)
          dispatch(
            actions.closePosition({
              positionIndex: position.positionIndex,
              onSuccess: () => {
                navigate(ROUTES.PORTFOLIO)
              },
              claimFarmRewards
            })
          )
        }}
        ticksLoading={ticksLoading || waitingForTicksData || !position}
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
        showFeesLoader={showFeesLoader || isLoadingList}
        isBalanceLoading={isBalanceLoading}
        hasTicksError={hasTicksError}
        reloadHandler={() => {
          dispatch(
            actions.getCurrentPlotTicks({
              poolIndex: position.poolData.poolIndex,
              isXtoY: true
            })
          )
        }}
        onRefresh={onRefresh}
        network={currentNetwork}
        plotVolumeRange={currentVolumeRange}
        userHasStakes={!!positionStakes.length}
        globalPrice={globalPrice}
        xToY={xToY}
        setXToY={setXToY}
      />
    )
  }

  if ((isLoadingListDelay && walletStatus === Status.Initialized) || !isFinishedDelayRender) {
    return (
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        className={classes.fullHeightContainer}>
        <img src={loader} className={classes.loading} alt='Loading' />
      </Grid>
    )
  } else if (walletStatus !== Status.Initialized) {
    return (
      <Grid className={classes.emptyContainer}>
        <EmptyPlaceholder
          newVersion
          themeDark
          style={isMobile ? { paddingTop: 8 } : {}}
          onAction={() => {
            navigate('/newPosition/0_01')
          }}
          roundedCorners={true}
          desc='or start exploring liquidity pools now!'
          buttonName='Explore pools'
          connectButton={true}
          onAction2={() => dispatch(walletActions.connect(false))}
          img={icons.NoConnected}
        />
      </Grid>
    )
  } else {
    return (
      <Grid
        display='flex'
        position='relative'
        justifyContent='center'
        className={classes.emptyContainer}>
        <EmptyPlaceholder
          newVersion
          style={isMobile ? { paddingTop: 5 } : {}}
          themeDark
          roundedCorners
          desc='The position does not exist in your list! '
          onAction={() => navigate(ROUTES.PORTFOLIO)}
          buttonName='Back to positions'
        />
      </Grid>
    )
  }
}
