import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface TokensPair {
  tokenX: PublicKey
  tokenY: PublicKey
}

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
    getPoolsData(_state, _action: PayloadAction<TokensPair[]>) {}
  }
})

export const actions = poolsSlice.actions
export const reducer = poolsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
