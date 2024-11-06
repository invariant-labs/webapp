import { BondSaleStruct, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from '@store/consts/types'

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
  buyTransactionStatus: {
    inProgress: boolean
    success?: boolean
  }
}

export const defaultState: IBondsStore = {
  bondsList: {},
  isLoadingBondsList: true,
  userVested: {},
  isLoadingUserVested: false,
  buyTransactionStatus: {
    inProgress: false
  }
}

export interface BuyBond {
  bondSale: PublicKey
  amount: BN
  priceLimit: BN
}

export interface RedeemBond {
  bondSale: PublicKey
  bondId: BN
  vestedAddress: PublicKey
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
    removeVested(state, action: PayloadAction<PublicKey>) {
      const { [action.payload.toString()]: _removed, ...restVested } = state.userVested
      state.userVested = restVested

      return state
    },
    buyBond(state, _action: PayloadAction<BuyBond>) {
      state.buyTransactionStatus = {
        inProgress: true
      }

      return state
    },
    setBuyBondSuccess(state, action: PayloadAction<boolean>) {
      state.buyTransactionStatus = {
        inProgress: false,
        success: action.payload
      }

      return state
    },
    redeemBond(_state, _action: PayloadAction<RedeemBond>) {}
  }
})

export const actions = bondsSlice.actions
export const reducer = bondsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
