import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { ChartSwitch, Intervals } from '@store/consts/static'
import { PayloadType, PoolChartSwitch } from '@store/consts/types'

export interface TimeData {
  timestamp: number
  value: number
}
export interface PoolSnap {
  timestamp: number
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
  feesPlot: TimeData[]
  volume: number
  tvl: number
  fees: number
  apy: number
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

export interface CumulativeValue {
  value: number
  change: number | null
}

export interface IStatsStore {
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
  feesPlot: TimeData[]
  volume24: Value24H
  tvl24: Value24H
  fees24: Value24H
  volume: Value24H
  tvl: Value24H
  fees: Value24H
  tokensData: TokenStatsData[]
  poolsData: PoolStatsData[]
  isLoading: boolean
  lastTimestamp: number
  lastSnapTimestamp: number
  lastInterval: Intervals | null
  currentInterval: Intervals | null
  cumulativeVolume: CumulativeValue
  cumulativeFees: CumulativeValue
  columnChartType: ChartSwitch
  currentPoolData: PoolSnap
  poolDetailsChartType: PoolChartSwitch
}

export const defaultState: IStatsStore = {
  volumePlot: [],
  liquidityPlot: [],
  feesPlot: [],
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
  volume: {
    value: 0,
    change: 0
  },
  tvl: {
    value: 0,
    change: 0
  },
  fees: {
    value: 0,
    change: 0
  },
  tokensData: [],
  poolsData: [],
  isLoading: false,
  lastTimestamp: 0,
  lastSnapTimestamp: 0,
  lastInterval: null,
  currentInterval: null,
  columnChartType: ChartSwitch.volume,
  cumulativeVolume: {
    value: 0,
    change: null
  },
  cumulativeFees: {
    value: 0,
    change: null
  },
  currentPoolData: {
    feesPlot: [],
    liquidityPlot: [],
    volumePlot: [],
    timestamp: 0,
    volume: 0,
    tvl: 0,
    fees: 0,
    apy: 0
  },
  poolDetailsChartType: PoolChartSwitch.volume
}

export const statsSliceName = 'stats'
const statsSlice = createSlice({
  name: statsSliceName,
  initialState: defaultState,
  reducers: {
    setCurrentStats(
      state,
      action: PayloadAction<Omit<IStatsStore, 'isLoading'> & { lastInterval: Intervals }>
    ) {
      state = {
        ...action.payload,
        isLoading: false,
        lastTimestamp: +Date.now(),
        currentInterval: state.currentInterval,
        columnChartType: state.columnChartType,
        poolDetailsChartType: state.poolDetailsChartType,
        currentPoolData: state.currentPoolData
      }
      return state
    },
    setPoolStats(state, action: PayloadAction<PoolSnap>) {
      state.currentPoolData = {
        ...action.payload
      }

      state.isLoading = false
      state.lastTimestamp = +Date.now()
      return state
    },
    getCurrentIntervalPoolStats(
      state,
      _action: PayloadAction<{ interval: Intervals; poolAddress: string }>
    ) {
      state.isLoading = true
      return state
    },
    setPoolDetailsChartType(state, action: PayloadAction<PoolChartSwitch>) {
      state.poolDetailsChartType = action.payload
      return state
    },
    setCurrentInterval(state, action: PayloadAction<{ interval: Intervals }>) {
      state.currentInterval = action.payload.interval
      return state
    },
    getCurrentStats(state) {
      state.isLoading = true

      return state
    },
    getCurrentIntervalStats(state, _action: PayloadAction<{ interval: Intervals }>) {
      state.isLoading = true
      return state
    },
    setChartType(state, action: PayloadAction<ChartSwitch>) {
      state.columnChartType = action.payload

      return state
    },
    setLoadingStats(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload

      return state
    }
  }
})

export const actions = statsSlice.actions
export const reducer = statsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
