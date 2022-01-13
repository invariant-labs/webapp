import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from '@reducers/types'
import { Position, InitPosition, Tick } from '@invariant-labs/sdk/lib/market'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

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
  maxReached: boolean
  currentMinPriceFetched?: number
  currentMaxPriceFetched?: number
}

export interface InitPositionStore {
  inProgress: boolean
  success: boolean
}

export interface CurrentPositionRangeTicksStore {
  lowerTick?: Tick
  upperTick?: Tick
  loading: boolean
}
export interface IPositionsStore {
  plotTicks: PlotTicks
  positionsList: PositionsListStore
  currentPositionRangeTicks: CurrentPositionRangeTicksStore
  initPosition: InitPositionStore
}

export interface InitPositionData
  extends Omit<InitPosition, 'owner' | 'userTokenX' | 'userTokenY' | 'pair'> {
  tokenX: PublicKey
  tokenY: PublicKey
  fee: BN
  initPool?: boolean
}

export interface GetCurrentTicksData {
  poolIndex: number
  isXtoY: boolean
  min?: number
  max?: number
}

export interface ClosePositionData {
  positionIndex: number
  onSuccess: () => void
}

export interface SetPositionData {
  index: number
  position: Position
}

export interface SetCurrentTicksData {
  data: PlotTickData[]
  maxReached: boolean
  currentMinPriceFetched?: number
  currentMaxPriceFetched?: number
}

export const defaultState: IPositionsStore = {
  plotTicks: {
    data: [],
    loading: false,
    maxReached: false,
    currentMinPriceFetched: 0,
    currentMaxPriceFetched: 0
  },
  positionsList: {
    list: [],
    loading: false
  },
  currentPositionRangeTicks: {
    lowerTick: undefined,
    upperTick: undefined,
    loading: false
  },
  initPosition: {
    inProgress: false,
    success: false
  }
}

export const positionsSliceName = 'positions'
const positionsSlice = createSlice({
  name: 'positions',
  initialState: defaultState,
  reducers: {
    initPosition(state, _action: PayloadAction<InitPositionData>) {
      state.initPosition.inProgress = true
      return state
    },
    setInitPositionSuccess(state, action: PayloadAction<boolean>) {
      state.initPosition.inProgress = false
      state.initPosition.success = action.payload
      return state
    },
    setPlotTicks(state, action: PayloadAction<SetCurrentTicksData>) {
      state.plotTicks.data = action.payload.data
      state.plotTicks.maxReached = action.payload.maxReached
      state.plotTicks.loading = false
      if (
        typeof action.payload.currentMinPriceFetched !== 'undefined' &&
        typeof action.payload.currentMaxPriceFetched !== 'undefined'
      ) {
        state.plotTicks.currentMinPriceFetched = action.payload.currentMinPriceFetched
        state.plotTicks.currentMaxPriceFetched = action.payload.currentMaxPriceFetched
      }
      return state
    },
    getCurrentPlotTicks(state, _action: PayloadAction<GetCurrentTicksData>) {
      state.plotTicks.loading = true
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
    getCurrentPositionRangeTicks(state, _action: PayloadAction<string>) {
      state.currentPositionRangeTicks.loading = true
      return state
    },
    setCurrentPositionRangeTicks(
      state,
      action: PayloadAction<{ lowerTick: Tick; upperTick: Tick }>
    ) {
      state.currentPositionRangeTicks = {
        ...action.payload,
        loading: false
      }
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
