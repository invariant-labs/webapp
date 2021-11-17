import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { InitPosition } from '@invariant-labs/sdk/lib/market'

export interface PlotTickData {
  x: number,
  y: number,
  index: number
}

export interface PlotTicks {
  data: PlotTickData[],
  loading: boolean
}
export interface IPositionsStore {
  plotTicks: PlotTicks
}

export interface InitPositionData extends Omit<InitPosition, 'owner' | 'userTokenX' | 'userTokenY' | 'pair'> {
  poolIndex: number
}

export interface GetCurrentTicksData {
  poolIndex: number,
  isXtoY: boolean
}

export const defaultState: IPositionsStore = {
  plotTicks: {
    data: [],
    loading: false
  }
}

export const positionsSliceName = 'positions'
const positionsSlice = createSlice({
  name: 'positions',
  initialState: defaultState,
  reducers: {
    initPosition(state, _action: PayloadAction<InitPositionData>) {
      return state
    },
    setPlotTicks(state, action: PayloadAction<PlotTickData[]>) {
      state.plotTicks.data = action.payload
      state.plotTicks.loading = false
      return state
    },
    plotTicksFail(state) {
      state.plotTicks.data = []
      state.plotTicks.loading = false
      return state
    },
    getCurrentPlotTicks(state, _action: PayloadAction<GetCurrentTicksData>) {
      state.plotTicks.loading = true
      return state
    }
  }
})

export const actions = positionsSlice.actions
export const reducer = positionsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
