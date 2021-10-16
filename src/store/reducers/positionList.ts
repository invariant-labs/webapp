import { createSlice } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'

export interface PositionList {
  head: number
}

export const defaultPositionList: PositionList = {
  head: 0
}
export const positionListSliceName = 'positionList'
const positionList = createSlice({
  name: positionListSliceName,
  initialState: defaultPositionList,
  reducers: {}
})

export const actions = positionList.actions
export const reducer = positionList.reducer
export type PayloadTypes = PayloadType<typeof actions>
