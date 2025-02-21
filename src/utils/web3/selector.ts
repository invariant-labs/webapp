import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

export const nightlyConnectAdapter: NightlyConnectAdapter = await NightlyConnectAdapter.build(
  {
    appMetadata: {
      name: 'Invariant',
      description: 'Invariant - AMM DEX provided concentrated liquidity',
      icon: 'https://invariant.app/favicon-192x192.png'
    },
    url: 'https://nc2.nightly.app',
    persistent: true
  },
  { initOnConnect: true }
)

export const openWalletSelectorModal = async () => {
  try {
    if (nightlyConnectAdapter.connected) {
      return
    }

    await nightlyConnectAdapter.connect()
    if (nightlyConnectAdapter.selectedWallet?.name === 'Phantom') {
      nightlyConnectAdapter.on('change', async a => {
        if (!a || !a.accounts || !a.accounts[0].publicKey) {
          nightlyConnectAdapter.selectedWallet?.name &&
            nightlyConnectAdapter.connectToWallet('Phantom')
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}
