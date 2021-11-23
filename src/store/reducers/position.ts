import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'

const positionSlice = createSlice({
  name: 'position',
  initialState: {},
  reducers: {
    position(state, action: PayloadAction<any>) {
      return state
    }
  }
})

export const actions = positionSlice.actions
export const reducer = positionSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>