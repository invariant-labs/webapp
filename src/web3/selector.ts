import { NCSolanaSelector } from '@nightlylabs/wallet-selector-solana'
import { StandardWalletAdapter } from '@solana/wallet-standard'
let _selector: NCSolanaSelector | null = null
export let standardAdapter: StandardWalletAdapter | null = null

export const getNCSelector = async (onConnected: () => void) => {
  if (!_selector) {
    _selector = await NCSolanaSelector.build({
      appMetadata: {
        name: 'NCTestSolana',
        description: 'Nightly Connect Test',
        icon: 'https://docs.nightly.app/img/logo.png',
        additionalInfo: 'Courtesy of Nightly Connect team'
      },
      url: 'https://nc2.nightly.app'
    })
    _selector.onConnected = adapter => {
      standardAdapter = adapter
      onConnected()
    }
  }

  return _selector
}
