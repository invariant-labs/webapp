import React from 'react'
import { useSelector } from 'react-redux'
import { LiquidityList } from '@components/NewDesign/LiquidityList/LiquidityList'
import { positionsList } from '@selectors/positions'
import { useHistory } from 'react-router-dom'

export const WrappedPositionsList: React.FC = () => {
  const { list } = useSelector(positionsList)
  const history = useHistory()

  return (
    <LiquidityList
      onAddPositionClick={() => { history.push('/pool') }}
      data={[]}
    />
  )
}

export default WrappedPositionsList
