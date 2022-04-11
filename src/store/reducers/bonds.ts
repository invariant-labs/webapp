import { BondSaleStruct, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface IBondsStore {
  bondsList: BondSaleStruct[]
  isLoadingBondsList: boolean
  userVested: BondStruct[]
  isLoadingUserVested: boolean
}

export const defaultState: IBondsStore = {
  bondsList: [],
  isLoadingBondsList: false,
  userVested: [],
  isLoadingUserVested: false
}

export interface BuyBond {
  bondSale: PublicKey
  amount: BN
  priceLimit: BN
}

export interface RedeemBond {
  bondSale: PublicKey
  bondId: BN
}

export const bondsSliceName = 'bonds'
const bondsSlice = createSlice({
  name: bondsSliceName,
  initialState: defaultState,
  reducers: {
    setBondsList(state, action: PayloadAction<BondSaleStruct[]>) {
      state.bondsList = action.payload
      state.isLoadingBondsList = false
      return state
    },
    getBondsList(state) {
      state.isLoadingBondsList = true
      return state
    },
    setUserVested(state, action: PayloadAction<BondStruct[]>) {
      state.userVested = action.payload
      state.isLoadingUserVested = false
      return state
    },
    getUserVested(state) {
      state.isLoadingUserVested = true
      return state
    },
    buyBond(_state, _action: PayloadAction<BuyBond>) {},
    redeemBond(_state, _action: PayloadAction<RedeemBond>) {}
  }
})

export const actions = bondsSlice.actions
export const reducer = bondsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
