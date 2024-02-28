import { createSelector } from '@reduxjs/toolkit'
import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const {
  pools,
  tokens,
  poolTicks,
  isLoadingLatestPoolsForTransaction,
  tickMaps,
  volumeRanges,
  jupiterIndexedAddresses
} = keySelectors(store, [
  'pools',
  'tokens',
  'poolTicks',
  'isLoadingLatestPoolsForTransaction',
  'tickMaps',
  'volumeRanges',
  'jupiterIndexedAddresses'
])

export const poolsArraySortedByFees = createSelector(pools, allPools =>
  Object.values(allPools).sort((a, b) => a.fee.v.sub(b.fee.v).toNumber())
)

export const hasTokens = createSelector(tokens, allTokens => !!Object.values(allTokens).length)

export const indexedJupiterAddresses = createSelector(
  jupiterIndexedAddresses,
  jupiterIndexedAddresses => jupiterIndexedAddresses
)

export const poolsSelectors = {
  pools,
  tokens,
  poolTicks,
  isLoadingLatestPoolsForTransaction,
  tickMaps,
  volumeRanges,
  jupiterIndexedAddresses
}

export default poolsSelectors
