import { InitPosition, Position, Tick } from '@invariant-labs/sdk/lib/market'
import { BN } from '@project-serum/anchor'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from '@store/consts/types'

export type FetchTick = 'lower' | 'upper'
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

export interface CurrentPositionTicksStore {
  lowerTick?: Tick
  upperTick?: Tick
  loading: boolean
}
export interface IPositionsStore {
  lastPage: number
  currentPoolIndex: number | null
  plotTicks: PlotTicks
  positionsList: PositionsListStore
  currentPositionId: string
  currentPositionTicks: CurrentPositionTicksStore
  initPosition: InitPositionStore
  shouldNotUpdateRange: boolean
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
  onlyUserPositionsEnabled?: boolean
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
  currentPoolIndex: null,
  plotTicks: {
    data: [],
    loading: false
  },
  positionsList: {
    list: [],
    loading: true
  },
  currentPositionId: '',
  currentPositionTicks: {
    lowerTick: undefined,
    upperTick: undefined,
    loading: false
  },
  initPosition: {
    inProgress: false,
    success: false
  },
  shouldNotUpdateRange: false
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
      state.currentPoolIndex = action.payload.poolIndex
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
    getCurrentPositionRangeTicks(
      state,
      _action: PayloadAction<{ id: string; fetchTick?: FetchTick }>
    ) {
      state.currentPositionTicks.loading = true
      return state
    },
    setCurrentPositionRangeTicks(
      state,
      action: PayloadAction<{ lowerTick?: Tick; upperTick?: Tick }>
    ) {
      state.currentPositionTicks = {
        lowerTick: action.payload.lowerTick
          ? action.payload.lowerTick
          : state.currentPositionTicks.lowerTick,
        upperTick: action.payload.upperTick
          ? action.payload.upperTick
          : state.currentPositionTicks.upperTick,
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
    },
    setShouldNotUpdateRange(state, action: PayloadAction<boolean>) {
      state.shouldNotUpdateRange = action.payload
      return state
    },
    setCurrentPositionId(state, action: PayloadAction<string>) {
      state.currentPositionId = action.payload
      return state
    }
  }
})

export const actions = positionsSlice.actions
export const reducer = positionsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
