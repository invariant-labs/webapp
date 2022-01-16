import { IPoolsStore, poolsSliceName } from '../reducers/pools'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[poolsSliceName] as IPoolsStore

export const { pools } = keySelectors(store, ['pools'])

export const poolsSelectors = { pools }

export default poolsSelectors
