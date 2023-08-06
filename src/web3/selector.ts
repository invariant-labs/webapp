import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

let _selectorPromise: Promise<NightlyConnectAdapter> | null = null
let _selector: NightlyConnectAdapter | null = null

export const getNCSelector = async () => {
  if (!_selector) {
    _selector = await _selectorPromise
  }

  return _selector
}

export const initNCSelector = async (onConnected: () => void) => {
  if (_selectorPromise === null) {
    _selectorPromise = NightlyConnectAdapter.build(
      {
        appMetadata: {
          name: 'Invariant',
          description: 'Invariant - AMM DEX provided concentrated liquidity',
          icon: 'https://invariant.app/favicon-192x192.png'
        },
        url: 'https://nc2.nightly.app'
      },
      true
    ).then(async (adapter) => {
      adapter.on('connect', onConnected)

      const canEagerConnect = await adapter.canEagerConnect()

      if (canEagerConnect) {
        await adapter.connect()
      }

      return adapter
    })
  }
}
