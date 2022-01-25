import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens, initPool, poolTicks, isLoadingLatestSinglePool } = keySelectors(store, [
  'pools',
  'tokens',
  'initPool',
  'poolTicks',
  'isLoadingLatestSinglePool'
])

export const poolsSelectors = { pools, tokens, initPool, poolTicks, isLoadingLatestSinglePool }

export default poolsSelectors
