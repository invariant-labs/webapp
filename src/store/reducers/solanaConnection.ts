import { NetworkType, RECOMMENDED_RPC_ADDRESS, RPC } from '@store/consts/static'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PayloadType } from '@store/consts/types'

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
  timeoutError: boolean
}

const network =
  NetworkType[localStorage.getItem('INVARIANT_NETWORK_SOLANA') as keyof typeof NetworkType] ??
  NetworkType.Mainnet

export const defaultState: ISolanaConnectionStore = {
  status: Status.Uninitialized,
  message: '',
  network: network,
  slot: 0,
  rpcAddress:
    localStorage.getItem(`INVARIANT_RPC_SOLANA_${network}`) ?? RECOMMENDED_RPC_ADDRESS[network],
  rpcStatus: RPC_STATUS,
  timeoutError: false
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
    setNetwork(state, action: PayloadAction<NetworkType>) {
      state.network = action.payload
      return state
    },
    updateSlot(state) {
      return state
    },
    setSlot(state, action: PayloadAction<number>) {
      state.slot = action.payload
      return state
    },
    setRPCAddress(state, action: PayloadAction<string>) {
      state.rpcAddress = action.payload
      return state
    },
    setRpcStatus(state, action: PayloadAction<RpcStatus>) {
      state.rpcStatus = action.payload
      return state
    },
    handleRpcError(state, _action: PayloadAction<PromiseRejectionEvent>) {
      return state
    },
    setTimeoutError(state, action: PayloadAction<boolean>) {
      state.timeoutError = action.payload
      return state
    }
  }
})

export const actions = solanaConnectionSlice.actions
export const reducer = solanaConnectionSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
