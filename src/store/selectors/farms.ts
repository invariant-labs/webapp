import { createSelector } from '@reduxjs/toolkit'
import { IFarmsStore, farmsSliceName } from '../reducers/farms'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[farmsSliceName] as IFarmsStore

export const { farms, isLoadingFarms, userStakes, isLoadingUserStakes } = keySelectors(
  store,
  ['farms', 'isLoadingFarms', 'userStakes', 'isLoadingUserStakes']
)

export const farmsSelectors = {
  farms,
  isLoadingFarms,
  userStakes,
  isLoadingUserStakes
}

export default farmsSelectors
