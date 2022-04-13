import { BondSaleStruct, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'

export interface BondSaleWithAddress extends BondSaleStruct {
  address: PublicKey
}

export interface BondWithAddress extends BondStruct {
  address: PublicKey
}

export interface IBondsStore {
  bondsList: Record<string, BondSaleWithAddress>
  isLoadingBondsList: boolean
  userVested: Record<string, BondWithAddress>
  isLoadingUserVested: boolean
}

export const defaultState: IBondsStore = {
  bondsList: {},
  isLoadingBondsList: false,
  userVested: {},
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
    setBondsList(state, action: PayloadAction<Record<string, BondSaleWithAddress>>) {
      state.bondsList = action.payload
      state.isLoadingBondsList = false
      return state
    },
    getBondsList(state) {
      state.isLoadingBondsList = true
      return state
    },
    updateBond(state, action: PayloadAction<BondSaleWithAddress>) {
      state.bondsList[action.payload.address.toString()] = action.payload
      return state
    },
    setUserVested(state, action: PayloadAction<Record<string, BondWithAddress>>) {
      state.userVested = action.payload
      state.isLoadingUserVested = false
      return state
    },
    getUserVested(state) {
      state.isLoadingUserVested = true
      return state
    },
    updateVested(state, action: PayloadAction<BondWithAddress>) {
      state.userVested[action.payload.address.toString()] = action.payload
      return state
    },
    buyBond(_state, _action: PayloadAction<BuyBond>) {},
    redeemBond(_state, _action: PayloadAction<RedeemBond>) {}
  }
})

export const actions = bondsSlice.actions
export const reducer = bondsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
