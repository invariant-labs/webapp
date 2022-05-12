/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
import { IncentiveStructure, Stake } from '@invariant-labs/staker-sdk/lib/staker'
import { BN } from '@project-serum/anchor'
import { Tick } from '@invariant-labs/sdk/lib/market'

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

export interface ExtendedStake extends Stake {
  address: PublicKey
  position: PublicKey
}

export interface FarmTotalsUpdate {
  totalStakedX: number
  totalStakedY: number
}

export interface StakeStatus {
  inProgress: boolean
  success: boolean
}

export interface StakeRangeTicks {
  lowerTick?: Tick
  upperTick?: Tick
}

export interface IFarmsStore {
  farms: Record<string, ExtendedIncentive>
  isLoadingFarms: boolean
  isLoadingFarmsTotals: boolean
  userStakes: Record<string, ExtendedStake>
  isLoadingUserStakes: boolean
  stakeStatuses: Record<string, StakeStatus>
  isLoadingNewRangeTicks: boolean
  stakeRangeTicks: Record<string, StakeRangeTicks>
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

export interface StakeSuccessData {
  pool: PublicKey
  id: BN
  success: boolean
}

export interface StateUpdateAfterStake {
  newStake: ExtendedStake
  totalStakedXAddition: number
  totalStakedYAddition: number
}

export const defaultState: IFarmsStore = {
  farms: {},
  isLoadingFarms: true,
  isLoadingFarmsTotals: true,
  userStakes: {},
  isLoadingUserStakes: true,
  stakeStatuses: {},
  isLoadingNewRangeTicks: false,
  stakeRangeTicks: {}
}

export const farmsSliceName = 'farms'
const farmsSlice = createSlice({
  name: farmsSliceName,
  initialState: defaultState,
  reducers: {
    getFarms(state) {
      state.isLoadingFarms = true
      state.isLoadingFarmsTotals = true
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
    getUserStakes(state) {
      state.isLoadingUserStakes = true
      return state
    },
    setUserStakes(state, action: PayloadAction<Record<string, ExtendedStake>>) {
      state.userStakes = action.payload
      state.isLoadingUserStakes = false
      return state
    },
    setSingleStake(state, action: PayloadAction<ExtendedStake>) {
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

      state.isLoadingFarmsTotals = false

      return state
    },
    stakePosition(state, action: PayloadAction<FarmPositionData>) {
      state.stakeStatuses[action.payload.id.toString() + '_' + action.payload.pool.toString()] = {
        inProgress: true,
        success: false
      }
      return state
    },
    setStakePositionSuccess(state, action: PayloadAction<StakeSuccessData>) {
      state.stakeStatuses[action.payload.id.toString() + '_' + action.payload.pool.toString()] = {
        inProgress: false,
        success: action.payload.success
      }
      return state
    },
    updateStateAfterStake(state, action: PayloadAction<StateUpdateAfterStake>) {
      const farm = state.farms[action.payload.newStake.incentive.toString()]

      state.farms[action.payload.newStake.incentive.toString()] = {
        ...farm,
        totalStakedX: (farm.totalStakedX ?? 0) + action.payload.totalStakedXAddition,
        totalStakedY: (farm.totalStakedY ?? 0) + action.payload.totalStakedYAddition
      }
      state.userStakes[action.payload.newStake.address.toString()] = action.payload.newStake

      return state
    },
    withdrawRewardsForPosition(_state, _action: PayloadAction<FarmPositionData>) {},
    getNewStakeRangeTicks(state, _action: PayloadAction<string[]>) {
      state.isLoadingNewRangeTicks = true
      return state
    },
    addNewStakeRangeTicks(state, action: PayloadAction<Record<string, StakeRangeTicks>>) {
      state.isLoadingNewRangeTicks = false
      state.stakeRangeTicks = {
        ...state.stakeRangeTicks,
        ...action.payload
      }

      return state
    }
  }
})

export const actions = farmsSlice.actions
export const reducer = farmsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
