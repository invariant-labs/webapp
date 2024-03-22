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
  volume24: number
  tvl: number
}

export interface PoolStatsData {
  poolAddress: PublicKey
  tokenX: PublicKey
  tokenY: PublicKey
  fee: number
  volume24: number
  tvl: number
  apy: number
}

export interface IStatsStore {
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
  volume24: Value24H
  tvl24: Value24H
  fees24: Value24H
  tokensData: TokenStatsData[]
  poolsData: PoolStatsData[]
  isLoading: boolean
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
  poolsData: [],
  isLoading: true
}

export const statsSliceName = 'stats'
const statsSlice = createSlice({
  name: statsSliceName,
  initialState: defaultState,
  reducers: {
    setCurrentStats(state, action: PayloadAction<Omit<IStatsStore, 'isLoading'>>) {
      state = {
        ...action.payload,
        isLoading: false
      }
      return state
    },
    getCurrentStats(state) {
      state.isLoading = true

      return state
    }
  }
})

export const actions = statsSlice.actions
export const reducer = statsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
