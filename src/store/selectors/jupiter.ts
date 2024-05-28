import { jupiterSliceName } from '../reducers/jupiter'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[jupiterSliceName]

export const { jupiter, isLoaded } = keySelectors(store, ['jupiter', 'isLoaded'])

export const jupiterSelectors = { jupiter, isLoaded }

export default jupiterSelectors
