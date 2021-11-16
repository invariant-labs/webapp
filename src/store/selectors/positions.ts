import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { plotTicks } = keySelectors(store, ['plotTicks'])

export const positionsSelectors = { plotTicks }

export default positionsSelectors
