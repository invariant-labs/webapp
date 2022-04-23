import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
import { IncentiveStructure, Stake } from '@invariant-labs/staker-sdk/lib/staker'
import { BN } from '@project-serum/anchor'

export interface CurrentFarmData {
  farm: PublicKey
  pool: PublicKey
  totalRewardPerDay: number
  stakedPositionsIds: BN[]
}

export interface ExtendedIncentive extends IncentiveStructure {
  address: PublicKey
  rewardToken: PublicKey
  totalStakedX?: number
  totalStakedY?: number
}

export interface StakeWithAddress extends Stake {
  address: PublicKey
}

export interface FarmTotalsUpdate {
  totalStakedX: number
  totalStakedY: number
}

export interface IFarmsStore {
  farms: Record<string, ExtendedIncentive>
  isLoadingFarms: boolean
  userStakes: Record<string, StakeWithAddress>
  isLoadingUserStakes: boolean
}

export interface SetSingleFarmPayload {
  farm: PublicKey
  data: IncentiveStructure
}

export interface FarmPositionData {
  pool: PublicKey
  id: BN
  farm: PublicKey
}

export const defaultState: IFarmsStore = {
  farms: {},
  isLoadingFarms: false,
  userStakes: {},
  isLoadingUserStakes: false
}

export const farmsSliceName = 'farms'
const farmsSlice = createSlice({
  name: farmsSliceName,
  initialState: defaultState,
  reducers: {
    getFarms(state) {
      state.isLoadingFarms = true
      return state
    },
    setFarms(state, action: PayloadAction<Record<string, ExtendedIncentive>>) {
      state.farms = action.payload
      state.isLoadingFarms = false
      return state
    },
    setSingleFarm(state, action: PayloadAction<SetSingleFarmPayload>) {
      state.farms[action.payload.farm.toString()] = {
        ...state.farms[action.payload.farm.toString()],
        ...action.payload.data
      }
      return state
    },
    getUserStakes(state, _action: PayloadAction<PublicKey>) {
      state.isLoadingUserStakes = true
      return state
    },
    addUserStakes(state, action: PayloadAction<Record<string, StakeWithAddress>>) {
      state.userStakes = {
        ...state.userStakes,
        ...action.payload
      }
      state.isLoadingUserStakes = false
      return state
    },
    resetUserStakes(state) {
      state.userStakes = {}
      return state
    },
    setSingleStake(state, action: PayloadAction<StakeWithAddress>) {
      state.userStakes[action.payload.address.toString()] = {
        ...state.userStakes[action.payload.address.toString()],
        ...action.payload
      }
      return state
    },
    updateFarmsTotals(state, action: PayloadAction<Record<string, FarmTotalsUpdate>>) {
      Object.entries(action.payload).forEach(([address, update]) => {
        state.farms[address.toString()] = {
          ...state.farms[address.toString()],
          ...update
        }
      })
      return state
    },
    stakePosition(_state, _action: PayloadAction<FarmPositionData>) {},
    withdrawRewardsForPosition(_state, _action: PayloadAction<FarmPositionData>) {}
  }
})

export const actions = farmsSlice.actions
export const reducer = farmsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
