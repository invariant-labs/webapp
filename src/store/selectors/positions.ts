import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { plotTicks, positionList } = keySelectors(store, ['plotTicks', 'positionList'])

export const positionsSelectors = { plotTicks, positionList }

export default positionsSelectors
