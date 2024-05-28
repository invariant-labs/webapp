import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface IJupiter {
  jupiter: string[]
  isLoaded: boolean
}

const defaultStatus: IJupiter = {
  jupiter: [],
  isLoaded: false
}
export const jupiterSliceName = 'jupiter'
const jupiterSlice = createSlice({
  name: jupiterSliceName,
  initialState: defaultStatus,
  reducers: {
    addJupiterList(state, action: PayloadAction<string[]>) {
      state.jupiter = action.payload
      state.isLoaded = true
    }
  }
})

export const actions = jupiterSlice.actions
export const reducer = jupiterSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
