import React, { useMemo, useEffect } from 'react'
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
import { calculate_price_sqrt, DENOMINATOR } from '@invariant-labs/sdk'
import useStyles from './style'
import { getDeltaX, getDeltaY } from '@invariant-labs/sdk/src/math'
import { calculateClaimAmount } from '@invariant-labs/sdk/src/utils'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()

  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const {
    data: ticksData,
    loading: ticksLoading,
    maxReached,
    currentMaxPriceFetched,
    currentMinPriceFetched
  } = useSelector(plotTicks)
  const { lowerTick, upperTick } = useSelector(currentPositionRangeTicks)

  useEffect(() => {
    if (position?.id) {
      dispatch(actions.getCurrentPositionRangeTicks(id))
      dispatch(
        actions.getCurrentPlotTicks({
          poolIndex: position.poolData.poolIndex,
          isXtoY: true
        })
      )
    }
  }, [position?.id])

  const midPrice = useMemo(() => {
    if (position) {
      return {
        index: position.poolData.currentTickIndex,
        x: calcPrice(
          position.poolData.currentTickIndex,
          true,
          position.tokenX.decimal,
          position.tokenY.decimal
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
          position.tokenX.decimal,
          position.tokenY.decimal
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
          position.tokenX.decimal,
          position.tokenY.decimal
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
            calculate_price_sqrt(position.lowerTickIndex).v,
            position.tokenX.decimal,
            position.tokenY.decimal
          )
        : 0,
    [position?.lowerTickIndex]
  )
  const max = useMemo(
    () =>
      position
        ? calcYPerXPrice(
            calculate_price_sqrt(position.upperTickIndex).v,
            position.tokenX.decimal,
            position.tokenY.decimal
          )
        : 0,
    [position?.upperTickIndex]
  )
  const current = useMemo(
    () =>
      position
        ? calcYPerXPrice(
            position.poolData.sqrtPrice.v,
            position.tokenX.decimal,
            position.tokenY.decimal
          )
        : 0,
    [position]
  )

  const tokenXLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getDeltaX(
            calculate_price_sqrt(position.upperTickIndex),
            position.poolData.sqrtPrice,
            position.liquidity,
            true
          ).v.div(DENOMINATOR),
          position.tokenX.decimal
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
          getDeltaY(
            position.poolData.sqrtPrice,
            calculate_price_sqrt(position.lowerTickIndex),
            position.liquidity,
            true
          ).v.div(DENOMINATOR),
          position.tokenY.decimal
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position])

  const [tokenXClaim, tokenYClaim] = useMemo(() => {
    if (position && typeof lowerTick !== 'undefined' && typeof upperTick !== 'undefined') {
      const [bnX, bnY] = calculateClaimAmount({
        position,
        tickLower: lowerTick,
        tickUpper: upperTick,
        tickCurrent: position.poolData.currentTickIndex,
        feeGrowthGlobalX: position.poolData.feeGrowthGlobalX,
        feeGrowthGlobalY: position.poolData.feeGrowthGlobalY
      })

      return [
        +printBN(bnX.div(DENOMINATOR), position.tokenX.decimal),
        +printBN(bnY.div(DENOMINATOR), position.tokenY.decimal)
      ]
    }

    return [0, 0]
  }, [position, lowerTick, upperTick])

  const data = useMemo(() => {
    if (ticksLoading && position) {
      return createPlaceholderLiquidityPlot(
        true,
        10,
        position.poolData.tickSpacing,
        position.tokenX.decimal,
        position.tokenY.decimal
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
      tokenY={position.tokenY.symbol}
      tokenX={position.tokenX.symbol}
      onZoomOut={(min, max) => {
        if (
          position &&
          !ticksLoading &&
          !maxReached &&
          ((typeof currentMinPriceFetched !== 'undefined' &&
            Math.max(min, 0) < currentMinPriceFetched) ||
            (typeof currentMaxPriceFetched !== 'undefined' && max > currentMaxPriceFetched))
        ) {
          dispatch(
            actions.getCurrentPlotTicks({
              poolIndex: position.poolData.poolIndex,
              isXtoY: true,
              min,
              max
            })
          )
        }
      }}
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
      tokenXLiqValue={tokenXLiquidity}
      tokenYLiqValue={tokenYLiquidity}
      tokenXClaimValue={tokenXClaim}
      tokenYClaimValue={tokenYClaim}
      positionData={{
        tokenXName: position.tokenX.symbol,
        tokenYName: position.tokenY.symbol,
        tokenXIcon: position.tokenX.logoURI,
        tokenYIcon: position.tokenY.logoURI,
        tokenXDecimal: position.tokenX.decimal,
        tokenYDecimal: position.tokenY.decimal,
        fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
        min,
        max
      }}
      ticksLoading={ticksLoading}
      tickSpacing={position?.poolData.tickSpacing ?? 1}
      xDecimal={position?.tokenX.decimal ?? 0}
      yDecimal={position?.tokenY.decimal ?? 0}
    />
  ) : isLoadingList ? (
    <Typography className={classes.placeholderText}>Loading...</Typography>
  ) : !position ? (
    <Typography className={classes.placeholderText}>
      Position does not exist in your list.
    </Typography>
  ) : null
}
