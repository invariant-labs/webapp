import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens, initPool, poolTicks } = keySelectors(store, [
  'pools',
  'tokens',
  'initPool',
  'poolTicks'
])

export const poolsSelectors = { pools, tokens, initPool, poolTicks }

export default poolsSelectors
