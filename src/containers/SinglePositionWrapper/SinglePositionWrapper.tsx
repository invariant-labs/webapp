import React, { useMemo, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import { isLoadingPositionsList, plotTicks, singlePositionData } from '@selectors/positions'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import { Typography } from '@material-ui/core'
import { printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt, DENOMINATOR } from '@invariant-labs/sdk'
import useStyles from './style'
import { getX, getY } from '@invariant-labs/sdk/src/math'
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
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)

  useEffect(() => {
    if (position && !(ticksData?.length)) {
      dispatch(actions.getCurrentPlotTicks({
        poolIndex: position.poolData.poolIndex,
        isXtoY: true
      }))
    }
  }, [position?.id])

  const midPriceIndex = useMemo(() => ticksData.findIndex((tick) => tick.index === position?.poolData.currentTickIndex), [ticksData.length, position?.id])
  const leftRangeIndex = useMemo(() => ticksData.findIndex((tick) => tick.index === position?.lowerTickIndex), [ticksData.length, position?.id])
  const rightRangeIndex = useMemo(() => ticksData.findIndex((tick) => tick.index === position?.upperTickIndex), [ticksData.length, position?.id])

  const min = useMemo(() => {
    if (position) {
      const sqrtDec = calculate_price_sqrt(position.lowerTickIndex)
      const sqrt = +printBN(sqrtDec.v, PRICE_DECIMAL)

      return sqrt ** 2
    }

    return 0
  }, [position?.lowerTickIndex])
  const max = useMemo(() => {
    if (position) {
      const sqrtDec = calculate_price_sqrt(position.upperTickIndex)
      const sqrt = +printBN(sqrtDec.v, PRICE_DECIMAL)

      return sqrt ** 2
    }

    return 0
  }, [position?.upperTickIndex])
  const current = useMemo(() => {
    if (position) {
      const sqrt = +printBN(position.poolData.sqrtPrice.v, PRICE_DECIMAL)

      return sqrt ** 2
    }

    return 0
  }, [position?.id])

  const tokenXLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getX(position.liquidity.v, calculate_price_sqrt(position.upperTickIndex).v, position.poolData.sqrtPrice.v).div(DENOMINATOR),
          position.tokenX.decimal
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position?.id])
  const tokenYLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getY(position.liquidity.v, position.poolData.sqrtPrice.v, calculate_price_sqrt(position.lowerTickIndex).v).div(DENOMINATOR),
          position.tokenY.decimal
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position?.id])

  const maxDecimals = (value: number): number => {
    if (value >= 10000) {
      return 0
    }

    if (value >= 1000) {
      return 1
    }

    if (value >= 100) {
      return 2
    }

    return 4
  }

  const [tokenXClaim, tokenYClaim] = useMemo(() => {
    if (position) {
      const [bnX, bnY] = calculateClaimAmount({
        position,
        feeGrowthInsideX: position.feeGrowthInsideX,
        feeGrowthInsideY: position.feeGrowthInsideY
      })

      return [
        +printBN(bnX.div(DENOMINATOR), position.tokenX.decimal),
        +printBN(bnY.div(DENOMINATOR), position.tokenY.decimal)
      ]
    }

    return [0, 0]
  }, [position?.id])

  return (
    !isLoadingList && !ticksLoading && position
      ? (
        <PositionDetails
          detailsData={ticksData}
          midPriceIndex={midPriceIndex}
          leftRangeIndex={leftRangeIndex}
          rightRangeIndex={rightRangeIndex}
          currentPrice={current}
          tokenY={position.tokenX.symbol}
          tokenX={position.tokenY.symbol}
          onZoomOutOfData={(min, max) => {
            if (position) {
              dispatch(actions.getCurrentPlotTicks({
                poolIndex: position.poolData.poolIndex,
                isXtoY: true,
                min,
                max
              }))
            }
          }}
          onClickClaimFee={() => {
            dispatch(actions.claimFee(position.positionIndex))
          }}
          closePosition={() => {
            dispatch(actions.closePosition({
              positionIndex: position.positionIndex,
              onSuccess: () => {
                history.push('/pool')
              }
            }))
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
            fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
            min: +(min.toFixed(maxDecimals(min))),
            max: +(max.toFixed(maxDecimals(max)))
          }}
          loadingTicks={ticksLoading}
        />
      )
      : (
        isLoadingList || ticksLoading
          ? <Typography className={classes.placeholderText}>Loading...</Typography>
          : <Typography className={classes.placeholderText}>Position does not exist in your list.</Typography>
      )
  )
}
