import { printBN } from '@consts/utils'
import { calculatePriceSqrt, getX, getY } from '@invariant-labs/sdk/lib/math'
import { createSelector } from '@reduxjs/toolkit'
import { IFarmsStore, farmsSliceName, ExtendedIncentive, StakeWithAddress } from '../reducers/farms'
import { keySelectors, AnyProps } from './helpers'
import { positionsWithPoolsData } from './positions'

const store = (s: AnyProps) => s[farmsSliceName] as IFarmsStore

export const { farms, isLoadingFarms, userStakes, isLoadingUserStakes } = keySelectors(store, [
  'farms',
  'isLoadingFarms',
  'userStakes',
  'isLoadingUserStakes'
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
    const stakesByPositionAddress: Record<string, StakeWithAddress> = {}
    Object.values(allUserStakes).forEach(stake => {
      stakesByPositionAddress[stake.position.toString()] = stake
    })

    const farmsObject: Record<string, IncentiveWithUserStaked> = {}

    Object.entries(allFarms).forEach(([address, farm]) => {
      let userStakedX = 0
      let userStakedY = 0

      const farmStakedPositions = positions.filter(
        position =>
          position.pool.equals(farm.pool) &&
          typeof stakesByPositionAddress[position.address.toString()] !== 'undefined'
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

export const farmsSelectors = {
  farms,
  isLoadingFarms,
  userStakes,
  isLoadingUserStakes
}

export default farmsSelectors
