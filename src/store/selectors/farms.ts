import { Position } from '@invariant-labs/sdk/lib/market'
import { createSelector } from '@reduxjs/toolkit'
import { IFarmsStore, farmsSliceName } from '../reducers/farms'
import { keySelectors, AnyProps } from './helpers'
import { positionsList } from './positions'

const store = (s: AnyProps) => s[farmsSliceName] as IFarmsStore

export const { farms, isLoadingFarms, currentFarmData, isLoadingCurrentFarmData } = keySelectors(
  store,
  ['farms', 'isLoadingFarms', 'currentFarmData', 'isLoadingCurrentFarmData']
)

export const positionsForFarmFullData = createSelector(currentFarmData, positionsList, ({ stakedPositionsIds, pool }, { list }) => {
  const staked: Position[] = []
  const notStaked: Position[] = []

  list.filter(({ pool: positionPool }) => pool.equals(positionPool)).forEach((position) => {
    if (stakedPositionsIds.findIndex((stakedId) => stakedId.eq(position.id)) !== -1) {
      staked.push(position)
    } else {
      notStaked.push(position)
    }
  })

  return {
    staked,
    notStaked
  }
})

export const farmsSelectors = {
  farms,
  isLoadingFarms,
  currentFarmData,
  isLoadingCurrentFarmData
}

export default farmsSelectors
