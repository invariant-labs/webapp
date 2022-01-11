import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools, tokens } = keySelectors(store, ['pools', 'tokens'])

export const poolsSelectors = { pools, tokens }

export default poolsSelectors
