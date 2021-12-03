import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { Position, InitPosition } from '@invariant-labs/sdk/lib/market'

export interface PositionsListStore {
  list: Position[]
  loading: boolean
}

export interface PlotTickData {
  x: number
  y: number
  index: number
}

export interface PlotTicks {
  data: PlotTickData[]
  loading: boolean
}
export interface IPositionsStore {
  plotTicks: PlotTicks
  positionsList: PositionsListStore
}

export interface InitPositionData extends Omit<InitPosition, 'owner' | 'userTokenX' | 'userTokenY' | 'pair'> {
  poolIndex: number
}

export interface GetCurrentTicksData {
  poolIndex: number
  isXtoY: boolean
  min?: number
  max?: number
}

export interface ClosePositionData {
  positionIndex: number,
  onSuccess: () => void
}

export interface SetPositionData {
  index: number,
  position: Position
}

export const defaultState: IPositionsStore = {
  plotTicks: {
    data: [],
    loading: false
  },
  positionsList: {
    list: [],
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
    getCurrentPlotTicks(state, action: PayloadAction<GetCurrentTicksData>) {
      if (typeof action.payload.min === 'undefined' && typeof action.payload.max === 'undefined') {
        state.plotTicks.loading = true
      }
      return state
    },
    setPositionsList(state, action: PayloadAction<Position[]>) {
      state.positionsList.list = action.payload
      state.positionsList.loading = false
      return state
    },
    getPositionsList(state) {
      state.positionsList.loading = true
      return state
    },
    getSinglePosition(state, _action: PayloadAction<number>) {
      return state
    },
    setSinglePosition(state, action: PayloadAction<SetPositionData>) {
      state.positionsList.list[action.payload.index] = action.payload.position
      return state
    },
    claimFee(state, _action: PayloadAction<number>) {
      return state
    },
    closePosition(state, _action: PayloadAction<ClosePositionData>) {
      return state
    },
    resetState(state) {
      state = defaultState
      return state
    }
  }
})

export const actions = positionsSlice.actions
export const reducer = positionsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
