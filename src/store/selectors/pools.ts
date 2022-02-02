import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens, poolTicks, isLoadingLatestSinglePool } = keySelectors(store, [
  'pools',
  'tokens',
  'poolTicks',
  'isLoadingLatestSinglePool'
])

export const poolsSelectors = { pools, tokens, poolTicks, isLoadingLatestSinglePool }

export default poolsSelectors
