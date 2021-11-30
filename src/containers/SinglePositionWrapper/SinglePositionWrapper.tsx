import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import { isLoadingPositionsList, plotTicks, singlePositionData } from '@selectors/positions'
import PositionDetailsWrapper from '@components/PositionDetalisWrapper/positionDetailsWrapper'

export interface IProps {
  id: string
}

export const SinglePositionWrapper: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()

  const position = useSelector(singlePositionData(id))
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)

  return (
    <PositionDetailsWrapper
      detailsData={ticksData}
    />
  )
}
