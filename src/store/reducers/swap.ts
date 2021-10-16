import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface Swap {
  fromToken: PublicKey
  toToken: PublicKey
  amount: BN
}

export interface ISwapStore {
  swap: Swap
}

export const defaultState: ISwapStore = {
  swap: {
    fromToken: DEFAULT_PUBLICKEY,
    toToken: DEFAULT_PUBLICKEY,
    amount: new BN(0)
  }
}

export const swapSliceName = 'swap'
const swapSlice = createSlice({
  name: swapSliceName,
  initialState: defaultState,
  reducers: {
    swap(state, action: PayloadAction<Swap>) {
      state.swap = action.payload
      return state
    }
  }
})

export const actions = swapSlice.actions
export const reducer = swapSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
