import { DEFAULT_PUBLIC_KEY } from '@invariant-labs/sdk/src/market'
import { createSelector } from '@reduxjs/toolkit'
import { ISwapStore, swapSliceName } from '../reducers/swap'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[swapSliceName] as ISwapStore

export const { swap } = keySelectors(store, ['swap'])

export const swapSelectors = { swap }

export default swapSelectors
