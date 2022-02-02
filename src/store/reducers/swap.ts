import { Decimal, DEFAULT_PUBLIC_KEY } from '@invariant-labs/sdk/lib/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface Swap {
  slippage: Decimal
  knownPrice: Decimal
  poolIndex: number
  tokenFrom: PublicKey
  tokenTo: PublicKey
  amount: BN
  byAmountIn: boolean
  txid?: string
  inProgress?: boolean
  success?: boolean
}

export interface Simulate {
  simulatePrice: BN
  fromToken: PublicKey
  toToken: PublicKey
  amount: BN
  success: boolean
  txid?: string
  inProgress?: boolean
}

export interface ISwapStore {
  swap: Swap
}

export const defaultState: ISwapStore = {
  swap: {
    slippage: { v: fromFee(new BN(1000)) },
    knownPrice: { v: new BN(0) },
    poolIndex: 0,
    tokenFrom: DEFAULT_PUBLIC_KEY,
    tokenTo: DEFAULT_PUBLIC_KEY,
    amount: new BN(0),
    byAmountIn: false
  }
}

export const swapSliceName = 'swap'
const swapSlice = createSlice({
  name: swapSliceName,
  initialState: defaultState,
  reducers: {
    swap(state, action: PayloadAction<Omit<Swap, 'txid'>>) {
      state.swap = {
        ...action.payload,
        inProgress: true
      }
      return state
    },
    setSwapSuccess(state, action: PayloadAction<boolean>) {
      state.swap.inProgress = false
      state.swap.success = action.payload
      return state
    },
    setPoolIndex(state, action: PayloadAction<number>) {
      state.swap.poolIndex = action.payload
      return state
    },
    setPair(state, action: PayloadAction<{ tokenFrom: PublicKey; tokenTo: PublicKey }>) {
      state.swap.tokenFrom = action.payload.tokenFrom
      state.swap.tokenTo = action.payload.tokenTo
      return state
    }
  }
})

export const actions = swapSlice.actions
export const reducer = swapSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
