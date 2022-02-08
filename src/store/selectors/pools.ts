import { createSelector } from '@reduxjs/toolkit'
import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens, poolTicks, isLoadingLatestPoolsForTransaction } = keySelectors(
  store,
  ['pools', 'tokens', 'poolTicks', 'isLoadingLatestPoolsForTransaction']
)

export const poolsArraySortedByFees = createSelector(pools, allPools =>
  Object.values(allPools).sort((a, b) => a.fee.v.sub(b.fee.v).toNumber())
)

export const poolsSelectors = { pools, tokens, poolTicks, isLoadingLatestPoolsForTransaction }

export default poolsSelectors
