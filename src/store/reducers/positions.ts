import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { InitPosition } from '@invariant-labs/sdk/lib/market'

export interface IPositionsStore {
  plotTicks: Array<{x: number, y: number}>
}

export const defaultState: IPositionsStore = {
  plotTicks: []
}

export const positionsSliceName = 'positions'
const positionsSlice = createSlice({
  name: 'positions',
  initialState: defaultState,
  reducers: {
    initPosition(state, _action: PayloadAction<Omit<InitPosition, 'owner'>>) {
      return state
    },
    setPlotTicks(state, action: PayloadAction<Array<{x: number, y: number}>>) {
      state.plotTicks = action.payload
      return state
    },
    getCurrentPlotTicks(_state, _action: PayloadAction<{ poolIndex: number }>) {}
  }
})

export const actions = positionsSlice.actions
export const reducer = positionsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
