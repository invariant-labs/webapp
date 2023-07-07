import { NCSolanaSelector } from '@nightlylabs/wallet-selector-solana'
import { StandardWalletAdapter } from '@solana/wallet-standard'

let _selectorPromise: Promise<NCSolanaSelector> | null = null
let _selector: NCSolanaSelector | null = null
export let standardAdapter: StandardWalletAdapter | null = null

export const getNCSelector = async () => {
  if (!_selector) {
    _selector = await _selectorPromise
  }

  return _selector
}

export const initNCSelector = async (onConnected: () => void) => {
  if (_selectorPromise === null) {
    _selectorPromise = NCSolanaSelector.build(
      {
        appMetadata: {
          name: 'Invariant',
          description: 'Invariant - AMM DEX provided concentrated liquidity',
          icon: 'https://invariant.app/favicon-192x192.png'
        },
        url: 'https://nc2.nightly.app'
      },
      adapter => {
        standardAdapter = adapter
        onConnected()
      },
      true
    )
  }
}
