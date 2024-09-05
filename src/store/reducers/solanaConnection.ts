import { NetworkType, SolanaNetworks } from '@consts/static'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PayloadType } from './types'

export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initialized = 'initalized'
}

export enum RpcStatus {
  Uninitialized,
  Error,
  Ignored,
  IgnoredWithError
}

const RPC_STATUS =
  localStorage.getItem('IS_RPC_WARNING_IGNORED') === 'true'
    ? RpcStatus.Ignored
    : RpcStatus.Uninitialized

export interface ISolanaConnectionStore {
  status: Status
  message: string
  network: NetworkType
  slot: number
  rpcAddress: string
  rpcStatus: RpcStatus
}

export const defaultState: ISolanaConnectionStore = {
  status: Status.Uninitialized,
  message: '',
  network: NetworkType.MAINNET,
  slot: 0,
  rpcAddress: SolanaNetworks.MAIN_HELIUS,
  rpcStatus: RPC_STATUS
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
    },
    setRpcStatus(state, action: PayloadAction<RpcStatus>) {
      state.rpcStatus = action.payload
      return state
    },
    handleRpcError(state, _action: PayloadAction<PromiseRejectionEvent>) {
      return state
    }
  }
})

export const actions = solanaConnectionSlice.actions
export const reducer = solanaConnectionSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
