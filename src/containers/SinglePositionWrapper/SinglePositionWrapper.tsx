import React, { useMemo, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import { isLoadingPositionsList, plotTicks, singlePositionData } from '@selectors/positions'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import { Typography } from '@material-ui/core'
import { printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt } from '@invariant-labs/sdk'
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
  }, [position])

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
          tokenXLiqValue={0}
          tokenYLiqValue={0}
          tokenXClaimValue={+printBN(position.tokensOwedX.v, position.tokenX.decimal)}
          tokenYClaimValue={+printBN(position.tokensOwedY.v, position.tokenY.decimal)}
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
