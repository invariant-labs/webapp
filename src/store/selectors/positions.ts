import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { plotTicks, positionsList } = keySelectors(store, ['plotTicks', 'positionsList'])

export const positionsSelectors = { plotTicks, positionsList }

export default positionsSelectors
