import { Pair } from '@invariant-labs/sdk'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface IPoolsStore {
  pools: PoolStructure[]
  ticks: Array<{x: number, y: number}>
}

export const defaultState: IPoolsStore = {
  pools: [],
  ticks: []
}

export const poolsSliceName = 'pools'
const poolsSlice = createSlice({
  name: poolsSliceName,
  initialState: defaultState,
  reducers: {
    setPools(state, action: PayloadAction<PoolStructure[]>) {
      state.pools = action.payload
      return state
    },
    getPoolsData(_state, _action: PayloadAction<Pair[]>) {},
    setTicks(state, action: PayloadAction<Array<{x: number, y: number}>>) {
      state.ticks = action.payload
      return state
    },
    getCurrentTicks(_state, _action: PayloadAction<{ index: number }>) {}
  }
})

export const actions = poolsSlice.actions
export const reducer = poolsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
