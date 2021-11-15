import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, ticks } = keySelectors(store, ['pools', 'ticks'])

export const poolsSelectors = { pools, ticks }

export default poolsSelectors
