import React from 'react'
import NewPosition from '@components/NewDesign/NewPosition/NewPosition'
import { actions } from '@reducers/position'
import { useDispatch, useSelector } from 'react-redux'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  return (
    <NewPosition />
  )
}

export default NewPositionWrapper
