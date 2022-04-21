import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
import { IncentiveStructure } from '@invariant-labs/staker-sdk/lib/staker'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'

export interface CurrentFarmData {
  farm: PublicKey
  pool: PublicKey
  totalRewardPerDay: number
  stakedPositionsIds: BN[]
}

export interface IncentiveWithAddress extends IncentiveStructure {
  address: PublicKey
  rewardToken: PublicKey
}

export interface IFarmsStore {
  farms: Record<string, IncentiveWithAddress>
  isLoadingFarms: boolean
  currentFarmData: CurrentFarmData
  isLoadingCurrentFarmData: boolean
}

export interface GetStakesForFarmPayload {
  farm: PublicKey
  pool: PublicKey
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
  currentFarmData: {
    farm: DEFAULT_PUBLICKEY,
    pool: DEFAULT_PUBLICKEY,
    totalRewardPerDay: 0,
    stakedPositionsIds: []
  },
  isLoadingCurrentFarmData: false
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
    setFarms(state, action: PayloadAction<Record<string, IncentiveWithAddress>>) {
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
    getCurrentFarmData(state, action: PayloadAction<GetStakesForFarmPayload>) {
      state.currentFarmData = {
        ...action.payload,
        totalRewardPerDay: 0,
        stakedPositionsIds: []
      }
      state.isLoadingCurrentFarmData = true
      return state
    },
    setStakedPositionsForCurrentFarm(state, action: PayloadAction<BN[]>) {
      state.currentFarmData.stakedPositionsIds = action.payload
      state.isLoadingCurrentFarmData = false
      return state
    },
    stakePosition(_state, _action: PayloadAction<FarmPositionData>) {},
    withdrawRewardsForPosition(_state, _action: PayloadAction<FarmPositionData>) {}
  }
})

export const actions = farmsSlice.actions
export const reducer = farmsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
