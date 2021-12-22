import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface Swap {
  slippage: Decimal
  price: Decimal
  txid?: string
  simulate: Simulate
  inProgress?: boolean
  success?: boolean
}

export interface Simulate {
  simulatePrice: BN
  fromToken: PublicKey
  toToken: PublicKey
  amount: BN

  txid?: string
  inProgress?: boolean
  success?: boolean
}

export interface ISwapStore {
  swap: Swap
}

export const defaultSimulate: Simulate = {
  simulatePrice: new BN(0),
  fromToken: DEFAULT_PUBLICKEY,
  toToken: DEFAULT_PUBLICKEY,
  amount: new BN(0)
}

export const defaultState: ISwapStore = {
  swap: {
    slippage: { v: fromFee(new BN(1000)) },
    price: { v: new BN(0) },
    simulate: defaultSimulate
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
    simulate(state, action: PayloadAction<Simulate>) {
      state.swap.simulate = action.payload
      return state
    },
    changePrice(state, action: PayloadAction<Decimal>) {
      state.swap.price = action.payload
      return state
    }
  }
})

export const actions = swapSlice.actions
export const reducer = swapSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
