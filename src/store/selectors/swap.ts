import { DEFAULT_PUBLIC_KEY } from '@invariant-labs/sdk/src/market'
import { createSelector } from '@reduxjs/toolkit'
import { ISwapStore, swapSliceName } from '../reducers/swap'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[swapSliceName] as ISwapStore

export const { swap } = keySelectors(store, ['swap'])

export const getTokensAddresses = createSelector(swap, swapState => {
  if (
    swapState.simulate.fromToken.equals(DEFAULT_PUBLIC_KEY) ||
    swapState.simulate.toToken.equals(DEFAULT_PUBLIC_KEY)
  ) {
    return { fromToken: DEFAULT_PUBLIC_KEY, toToken: DEFAULT_PUBLIC_KEY }
  }

  return { fromToken: swapState.simulate.fromToken, toToken: swapState.simulate.toToken }
})

export const swapSelectors = { swap }

export default swapSelectors
