import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { InitPosition } from '@invariant-labs/sdk/lib/market'

export interface PlotTickData {
  x: number,
  y: number,
  index: number
}
export interface IPositionsStore {
  plotTicks: PlotTickData[]
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
    setPlotTicks(state, action: PayloadAction<PlotTickData[]>) {
      state.plotTicks = action.payload
      return state
    },
    getCurrentPlotTicks(_state, _action: PayloadAction<{ poolIndex: number }>) {}
  }
})

export const actions = positionsSlice.actions
export const reducer = positionsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
