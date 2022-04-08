import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface IBondsStore {
}

export const defaultState: IBondsStore = {
}

export const bondsSliceName = 'bonds'
const bondsSlice = createSlice({
  name: bondsSliceName,
  initialState: defaultState,
  reducers: {
  }
})

export const actions = bondsSlice.actions
export const reducer = bondsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
