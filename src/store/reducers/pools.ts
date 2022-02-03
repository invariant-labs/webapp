import { Token } from '@consts/static'
import { Pair } from '@invariant-labs/sdk'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { Tick } from '@invariant-labs/sdk/src/market'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
import * as R from 'remeda'

export interface PoolWithAddress extends PoolStructure {
  address: PublicKey
}

export interface IPoolsStore {
  tokens: Record<string, Token>
  pools: { [key in string]: PoolWithAddress }
  poolTicks: { [key in string]: Tick[] }
  isLoadingLatestPoolsForTransaction: boolean
}

export interface UpdatePool {
  address: PublicKey
  poolStructure: PoolStructure
}

export interface UpdateTick {
  index: string
  tickStructure: Tick[]
}

export interface UpdateTicks {
  poolIndex: string
  index: number
  tick: Tick
}

export const defaultState: IPoolsStore = {
  tokens: {},
  pools: {},
  poolTicks: {},
  isLoadingLatestPoolsForTransaction: false
}

export interface PairTokens {
  first: PublicKey,
  second: PublicKey
}

export const poolsSliceName = 'pools'
const poolsSlice = createSlice({
  name: poolsSliceName,
  initialState: defaultState,
  reducers: {
    setTokens(state, action: PayloadAction<Record<string, Token>>) {
      state.tokens = action.payload
      return state
    },
    setPools(state, action: PayloadAction<{ [key in string]: PoolWithAddress }>) {
      state.pools = action.payload
      return state
    },
    setTicks(state, action: PayloadAction<UpdateTick>) {
      state.poolTicks[action.payload.index] = action.payload.tickStructure
      return state
    },
    updatePool(state, action: PayloadAction<UpdatePool>) {
      state.pools[action.payload.address.toString()] = {
        address: state.pools[action.payload.address.toString()].address,
        ...action.payload.poolStructure
      }
      return state
    },
    addPools(state, action: PayloadAction<PoolWithAddress[]>) {
      const newData = action.payload.reduce((acc, pool) => ({
        ...acc,
        [pool.address.toString()]: pool
      }), {})
      state.pools = R.merge(state.pools, newData)
      state.isLoadingLatestPoolsForTransaction = false
      return state
    },
    poolsAddingFailed(state) {
      state.isLoadingLatestPoolsForTransaction = false
      return state
    },
    addPoolsForPositions(state, action: PayloadAction<PoolWithAddress[]>) {
      const newData = action.payload.reduce((acc, pool) => ({
        ...acc,
        [pool.address.toString()]: pool
      }), {})
      state.pools = R.merge(state.pools, newData)
      return state
    },
    updateTicks(state, action: PayloadAction<UpdateTicks>) {
      state.poolTicks[action.payload.poolIndex][
        state.poolTicks[action.payload.poolIndex].findIndex(e => e.index === action.payload.index)
      ] = action.payload.tick
    },
    getPoolData(state, _action: PayloadAction<Pair>) {
      state.isLoadingLatestPoolsForTransaction = true

      return state
    },
    getAllPoolsForPairData(state, _action: PayloadAction<PairTokens>) {
      state.isLoadingLatestPoolsForTransaction = true

      return state
    },
    getPoolsDataForPositions(_state, _action: PayloadAction<PublicKey[]>) {}
  }
})

export const actions = poolsSlice.actions
export const reducer = poolsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
