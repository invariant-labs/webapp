import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

let _ncAdapterPromise: Promise<NightlyConnectAdapter> | null = null
let _ncAdapter: NightlyConnectAdapter | null = null

export const getNCAdapter = async () => {
  if (!_ncAdapterPromise) {
    _ncAdapterPromise = NightlyConnectAdapter.build(
      {
        appMetadata: {
          name: 'Invariant',
          description: 'Invariant - AMM DEX provided concentrated liquidity',
          icon: 'https://invariant.app/favicon-192x192.png'
        },
        url: 'https://nc2.nightly.app'
      },
      true
    ).then(async adapter => {
      const canEagerConnect = await adapter.canEagerConnect()

      if (canEagerConnect) {
        await adapter.connect()
      }

      return adapter
    })
  }
  if (!_ncAdapter) {
    _ncAdapter = await _ncAdapterPromise
  }

  return _ncAdapter
}

export const openWalletSelectorModal = async () => {
  try {
    const ncAdapter = await getNCAdapter()

    if (!ncAdapter || ncAdapter.connected) {
      return
    }

    await ncAdapter.connect()
  } catch (error) {
    console.log(error)
  }
}
