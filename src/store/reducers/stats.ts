import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface TimeData {
  timestamp: number
  value: number
}

export interface Value24H {
  value: number
  change: number
}

export interface TokenStatsData {
  address: PublicKey
  price: number
  priceChange: number
  volume24: number
  tvl: number
}

export interface PoolStatsData {
  tokenX: PublicKey
  tokenY: PublicKey
  fee: number
  volume24: number
  tvl: number
}

export interface IStatsStore {
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
  volume24: Value24H
  tvl24: Value24H
  fees24: Value24H
  tokensData: TokenStatsData[]
  poolsData: PoolStatsData[]
}

export const defaultState: IStatsStore = {
  volumePlot: [],
  liquidityPlot: [],
  volume24: {
    value: 0,
    change: 0
  },
  tvl24: {
    value: 0,
    change: 0
  },
  fees24: {
    value: 0,
    change: 0
  },
  tokensData: [],
  poolsData: []

}

export const statsSliceName = 'stats'
const statsSlice = createSlice({
  name: statsSliceName,
  initialState: defaultState,
  reducers: {
    setCurrentStats(state, action: PayloadAction<IStatsStore>) {
      state = action.payload
      return state
    },
    getCurrentStats(_state, _action) {}
  }
})

export const actions = statsSlice.actions
export const reducer = statsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
