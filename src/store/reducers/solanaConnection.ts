import { NetworkType, SolanaNetworks } from '@consts/static'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initialized = 'initalized'
}
export interface ISolanaConnectionStore {
  status: Status
  message: string
  network: NetworkType
  slot: number
  rpcAddress: string
}

export const defaultState: ISolanaConnectionStore = {
  status: Status.Uninitialized,
  message: '',
  network: NetworkType.MAINNET,
  slot: 0,
  rpcAddress: SolanaNetworks.MAIN_ALCHEMY
}
export const solanaConnectionSliceName = 'solanaConnection'
const solanaConnectionSlice = createSlice({
  name: solanaConnectionSliceName,
  initialState: defaultState,
  reducers: {
    initSolanaConnection(state) {
      state.status = Status.Init
      return state
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
      return state
    },
    setNetwork(
      state,
      action: PayloadAction<{
        network: NetworkType
        rpcAddress: string
        rpcName?: string
      }>
    ) {
      state.network = action.payload.network
      state.rpcAddress = action.payload.rpcAddress
      return state
    },
    updateSlot(state) {
      return state
    },
    setSlot(state, action: PayloadAction<number>) {
      state.slot = action.payload
      return state
    }
  }
})

export const actions = solanaConnectionSlice.actions
export const reducer = solanaConnectionSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
