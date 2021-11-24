import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { Position } from '@invariant-labs/sdk/lib/market'

export interface PositionsListStore {
  list: Position[],
  loading: boolean
}
export interface IPositionsStore {
  positionsList: PositionsListStore
}

export const defaultState: IPositionsStore = {
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
    setPositionsList(state, action: PayloadAction<Position[]>) {
      state.positionsList.list = action.payload
      state.positionsList.loading = false
      return state
    },
    getPositionsList(state) {
      state.positionsList.loading = true
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
