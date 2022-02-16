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
import { Typography } from '@material-ui/core'
import { calcPrice, calcYPerXPrice, createPlaceholderLiquidityPlot, printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { calculatePriceSqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { calculateClaimAmount } from '@invariant-labs/sdk/src/utils'
import useStyles from './style'
import { getX, getY } from '@invariant-labs/sdk/lib/math'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)
  const {
    lowerTick,
    upperTick,
    loading: rangeTicksLoading
  } = useSelector(currentPositionRangeTicks)

  const [waitingForTicksData, setWaitingForTicksData] = useState<boolean | null>(null)

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
          ).div(DENOMINATOR),
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
          ).div(DENOMINATOR),
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
        claimValue: tokenXClaim
      }}
      tokenY={{
        name: position.tokenY.symbol,
        icon: position.tokenY.logoURI,
        decimal: position.tokenY.decimals,
        balance: +printBN(position.tokenY.balance, position.tokenY.decimals),
        liqValue: tokenYLiquidity,
        claimValue: tokenYClaim
      }}
      fee={+printBN(position.poolData.fee.v, PRICE_DECIMAL - 2)}
      min={min}
      max={max}
    />
  ) : isLoadingList ? (
    <Typography className={classes.placeholderText}>Loading...</Typography>
  ) : !position ? (
    <Typography className={classes.placeholderText}>
      Position does not exist in your list.
    </Typography>
  ) : null
}
