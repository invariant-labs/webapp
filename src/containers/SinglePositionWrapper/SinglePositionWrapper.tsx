import React, { useMemo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import {
  currentPositionRangeTicks,
  isLoadingPositionsList,
  plotTicks,
  singlePositionData
} from '@selectors/positions'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import { Grid, Typography } from '@material-ui/core'
import {
  calcPrice,
  calcYPerXPrice,
  CoingeckoPriceData,
  createPlaceholderLiquidityPlot,
  getCoingeckoTokenPrice,
  printBN
} from '@consts/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { calculateClaimAmount, DECIMAL } from '@invariant-labs/sdk/src/utils'
import { getX, getY, MAX_TICK } from '@invariant-labs/sdk/lib/math'
import loader from '@static/gif/loader.gif'
import useStyles from './style'
import { volumeRanges } from '@selectors/pools'

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

  const [waitingForTicksData, setWaitingForTicksData] = useState<boolean | null>(null)

  const [showFeesLoader, setShowFeesLoader] = useState(true)

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
    if (waitingForTicksData === true && !rangeTicksLoading) {
      setWaitingForTicksData(false)
    }
  }, [rangeTicksLoading])

  const midPrice = useMemo(() => {
    if (position) {
      return {
        index: position.poolData.currentTickIndex,
        x: calcPrice(
          position.poolData.currentTickIndex,
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

  const initialIsDiscreteValue = localStorage.getItem('IS_PLOT_DISCRETE') === 'true'

  const setIsDiscreteValue = (val: boolean) => {
    localStorage.setItem('IS_PLOT_DISCRETE', val ? 'true' : 'false')
  }

  const [tokenXPriceData, setTokenXPriceData] = useState<CoingeckoPriceData | undefined>(undefined)
  const [tokenYPriceData, setTokenYPriceData] = useState<CoingeckoPriceData | undefined>(undefined)

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

    const xId = position.tokenX.coingeckoId ?? ''
    if (xId.length) {
      getCoingeckoTokenPrice(xId)
        .then(data => setTokenXPriceData(data))
        .catch(() => setTokenXPriceData(undefined))
    } else {
      setTokenXPriceData(undefined)
    }

    const yId = position.tokenY.coingeckoId ?? ''
    if (yId.length) {
      getCoingeckoTokenPrice(yId)
        .then(data => setTokenYPriceData(data))
        .catch(() => setTokenYPriceData(undefined))
    } else {
      setTokenYPriceData(undefined)
    }
  }, [position?.id])

  return !isLoadingList && position ? (
    <PositionDetails
      detailsData={data}
      midPrice={midPrice}
      leftRange={leftRange}
      rightRange={rightRange}
      currentPrice={current}
      onClickClaimFee={() => {
        dispatch(actions.claimFee(position.positionIndex))
      }}
      closePosition={() => {
        dispatch(
          actions.closePosition({
            positionIndex: position.positionIndex,
            onSuccess: () => {
              history.push('/pool')
            }
          })
        )
      }}
      ticksLoading={ticksLoading}
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
      fee={+printBN(position.poolData.fee.v, DECIMAL - 2)}
      min={min}
      max={max}
      initialIsDiscreteValue={initialIsDiscreteValue}
      onDiscreteChange={setIsDiscreteValue}
      showFeesLoader={showFeesLoader}
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
    />
  ) : isLoadingList ? (
    <Grid container>
      <img src={loader} className={classes.loading} />
    </Grid>
  ) : !position ? (
    <Typography className={classes.placeholderText}>
      Position does not exist in your list.
    </Typography>
  ) : null
}
