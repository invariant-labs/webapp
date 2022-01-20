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
import {
  calcPrice,
  calcYPerXPrice,
  createPlaceholderLiquidityPlot,
  getX,
  getY,
  printBN
} from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { calculatePriceSqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { calculateClaimAmount } from '@invariant-labs/sdk/src/utils'
import useStyles from './style'

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
    loading: ticksLoading
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
        +printBN(bnX.div(DENOMINATOR).div(DENOMINATOR), position.tokenX.decimals),
        +printBN(bnY.div(DENOMINATOR).div(DENOMINATOR), position.tokenY.decimals)
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
      tokenY={position.tokenY.symbol}
      tokenX={position.tokenX.symbol}
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
        tokenXDecimal: position.tokenX.decimals,
        tokenYDecimal: position.tokenY.decimals,
        fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
        min,
        max
      }}
      ticksLoading={ticksLoading}
      tickSpacing={position?.poolData.tickSpacing ?? 1}
      xDecimal={position?.tokenX.decimals ?? 0}
      yDecimal={position?.tokenY.decimals ?? 0}
    />
  ) : isLoadingList ? (
    <Typography className={classes.placeholderText}>Loading...</Typography>
  ) : !position ? (
    <Typography className={classes.placeholderText}>
      Position does not exist in your list.
    </Typography>
  ) : null
}
