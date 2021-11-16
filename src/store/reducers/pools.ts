import { Pair } from '@invariant-labs/sdk'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export interface IPoolsStore {
  pools: PoolStructure[]
}

export const defaultState: IPoolsStore = {
  pools: []
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
    getPoolsData(_state, _action: PayloadAction<Pair[]>) {}
  }
})

export const actions = poolsSlice.actions
export const reducer = poolsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
