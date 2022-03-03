import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens, initPool, poolTicks, tickMaps } = keySelectors(store, [
  'pools',
  'tokens',
  'initPool',
  'poolTicks',
  'tickMaps'
])

export const poolsSelectors = { pools, tokens, initPool, poolTicks, tickMaps }

export default poolsSelectors
