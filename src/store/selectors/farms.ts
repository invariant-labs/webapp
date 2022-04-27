import { printBN } from '@consts/utils'
import { calculatePriceSqrt, getX, getY } from '@invariant-labs/sdk/lib/math'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { IFarmsStore, farmsSliceName, ExtendedIncentive, ExtendedStake } from '../reducers/farms'
import { keySelectors, AnyProps } from './helpers'
import { pools } from './pools'
import { positionsWithPoolsData } from './positions'

const store = (s: AnyProps) => s[farmsSliceName] as IFarmsStore

export const { farms, isLoadingFarms, userStakes, isLoadingUserStakes, stakeStatuses } =
  keySelectors(store, [
    'farms',
    'isLoadingFarms',
    'userStakes',
    'isLoadingUserStakes',
    'stakeStatuses'
  ])

export interface IncentiveWithUserStaked extends ExtendedIncentive {
  userStakedX?: number
  userStakedY?: number
}

export const farmsWithUserStakedValues = createSelector(
  farms,
  userStakes,
  positionsWithPoolsData,
  (allFarms, allUserStakes, positions) => {
    const incentivesForPositions: Record<string, PublicKey[]> = {}
    Object.values(allUserStakes).forEach(stake => {
      if (typeof incentivesForPositions[stake.position.toString()] === 'undefined') {
        incentivesForPositions[stake.position.toString()] = []
      }
      incentivesForPositions[stake.position.toString()].push(stake.incentive)
    })

    const farmsObject: Record<string, IncentiveWithUserStaked> = {}

    Object.entries(allFarms).forEach(([address, farm]) => {
      let userStakedX = 0
      let userStakedY = 0

      const farmStakedPositions = positions.filter(
        position =>
          position.pool.equals(farm.pool) &&
          typeof incentivesForPositions[position.address.toString()] !== 'undefined' &&
          incentivesForPositions[position.address.toString()].findIndex(address =>
            address.equals(farm.address)
          ) !== -1
      )

      farmStakedPositions.forEach(position => {
        try {
          userStakedX += +printBN(
            getX(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenX.decimals
          )
        } catch (error) {
          userStakedX += 0
        }

        try {
          userStakedY += +printBN(
            getY(
              position.liquidity.v,
              calculatePriceSqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculatePriceSqrt(position.lowerTickIndex).v
            ),
            position.tokenY.decimals
          )
        } catch (error) {
          userStakedY += 0
        }
      })

      farmsObject[address] = {
        ...farm,
        userStakedX,
        userStakedY
      }
    })

    return farmsObject
  }
)

export const positionsForFarm = (farmAddress: string) =>
  createSelector(
    farms,
    positionsWithPoolsData,
    userStakes,
    (allFarms, positions, allUserStakes) => {
      const farm = allFarms[farmAddress]

      const stakesByPositionAddress: Record<string, ExtendedStake> = {}
      Object.values(allUserStakes).forEach(stake => {
        if (farmAddress === stake.incentive.toString()) {
          stakesByPositionAddress[stake.position.toString()] = stake
        }
      })

      return positions
        .filter(position => position.pool.equals(farm.pool))
        .map(position => {
          const positionStake = stakesByPositionAddress[position.address.toString()]
          return {
            ...position,
            stakeAddress: typeof positionStake !== 'undefined' ? positionStake.address : undefined
          }
        })
    }
  )

export const singleFarmData = (farmAddress: string) =>
  createSelector(farms, pools, (allFarms, allPools) => {
    const farm = allFarms[farmAddress]

    if (typeof farm === 'undefined') {
      return undefined
    }

    return {
      ...farm,
      poolData: allPools[farm.pool.toString()]
    }
  })

export const farmsSelectors = {
  farms,
  isLoadingFarms,
  userStakes,
  isLoadingUserStakes,
  stakeStatuses
}

export default farmsSelectors
