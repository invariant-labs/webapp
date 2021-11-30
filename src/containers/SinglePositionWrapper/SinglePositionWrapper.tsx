import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import { isLoadingPositionsList, plotTicks, singlePositionData } from '@selectors/positions'
import PositionDetails from '@components/PositionDetails/PositionDetails'
import { Typography } from '@material-ui/core'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)

  const [midPriceIndex, setMidPriceIndex] = useState<number>(0)
  const [leftRangeIndex, setLeftRangeIndex] = useState<number>(0)
  const [rightRangeIndex, setRightRangeIndex] = useState<number>(0)

  useEffect(() => {
    if (position) {
      const midIndex = ticksData.findIndex((tick) => tick.index === position.poolData.currentTickIndex)
      const leftIndex = ticksData.findIndex((tick) => tick.index === position.lowerTickIndex)
      const rightIndex = ticksData.findIndex((tick) => tick.index === position.upperTickIndex)

      setMidPriceIndex(midIndex === -1 ? 0 : midIndex)
      setLeftRangeIndex(leftIndex === -1 ? 0 : leftIndex)
      setRightRangeIndex(rightIndex === -1 ? 0 : rightIndex)
    }
  }, [ticksData])

  return (
    !isLoadingList && !ticksLoading && position
      ? (
        <PositionDetails
          detailsData={ticksData}
          midPriceIndex={midPriceIndex}
          leftRangeIndex={leftRangeIndex}
          rightRangeIndex={rightRangeIndex}
          currentPrice={0}
          fromToken={position.tokenX.symbol}
          toToken={position.tokenY.symbol}
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
        />
      )
      : (
        isLoadingList || ticksLoading
          ? <Typography>Loading...</Typography>
          : <Typography>Position does not exist in your list.</Typography>
      )
  )
}
