import { ISwapStore, swapSliceName } from '../reducers/swap'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[swapSliceName] as ISwapStore

export const { swap } = keySelectors(store, ['swap'])

export const swapSelectors = { swap }

export default swapSelectors
