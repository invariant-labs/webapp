import { InitPosition, Position, Tick } from '@invariant-labs/sdk/lib/market'
import { BN } from '@project-serum/anchor'
import { PayloadType } from '@reducers/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'

export interface PositionWithAddress extends Position {
  address: PublicKey
}
export interface PositionsListStore {
  list: PositionWithAddress[]
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
  hasError?: boolean
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
  lastPage: number
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
  tickSpacing: number
  initPool?: boolean
  initTick?: number
  xAmount: number
  yAmount: number
}

export interface GetCurrentTicksData {
  poolIndex: number
  isXtoY: boolean
  disableLoading?: boolean
}

export interface ClosePositionData {
  positionIndex: number
  claimFarmRewards?: boolean
  onSuccess: () => void
}

export interface SetPositionData {
  index: number
  position: Position
}

export const defaultState: IPositionsStore = {
  lastPage: 1,
  plotTicks: {
    data: [],
    loading: false
  },
  positionsList: {
    list: [],
    loading: true
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
    setLastPage(state, action: PayloadAction<number>) {
      state.lastPage = action.payload
      return state
    },
    initPosition(state, _action: PayloadAction<InitPositionData>) {
      state.initPosition.inProgress = true
      return state
    },
    setInitPositionSuccess(state, action: PayloadAction<boolean>) {
      state.initPosition.inProgress = false
      state.initPosition.success = action.payload
      return state
    },
    setPlotTicks(state, action: PayloadAction<PlotTickData[]>) {
      state.plotTicks.data = action.payload
      state.plotTicks.loading = false
      state.plotTicks.hasError = false
      return state
    },
    setErrorPlotTicks(state, action: PayloadAction<PlotTickData[]>) {
      state.plotTicks.data = action.payload
      state.plotTicks.loading = false
      state.plotTicks.hasError = true
      return state
    },
    getCurrentPlotTicks(state, action: PayloadAction<GetCurrentTicksData>) {
      state.plotTicks.loading = !action.payload.disableLoading
      return state
    },
    setPositionsList(state, action: PayloadAction<PositionWithAddress[]>) {
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
      state.positionsList.list[action.payload.index] = {
        address: state.positionsList.list[action.payload.index].address,
        ...action.payload.position
      }
      return state
    },
    getCurrentPositionRangeTicks(state, _action: PayloadAction<string>) {
      state.currentPositionRangeTicks.loading = true
      return state
    },
    setCurrentPositionRangeTicks(
      state,
      action: PayloadAction<{ lowerTick?: Tick; upperTick?: Tick }>
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
