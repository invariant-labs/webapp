/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { MockWalletAdapter } from './adapters/mock'
import { StandardAdapter } from './adapters/standard'
import { getNCSelector } from './selector'

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new MockWalletAdapter()
  return _wallet
}

// Here we will pass wallet type right
const connectWallet = async (): Promise<WalletAdapter> => {
  return await new Promise(resolve => {
    getNCSelector().then(
      adapter => {
        if (!adapter) {
          return
        }
        _wallet = new StandardAdapter(adapter)
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
      },
      () => {}
    )
  })
}

const disconnectWallet = () => {
  if (_wallet) {
    _wallet.disconnect()
  }
}
export { getSolanaWallet, connectWallet, disconnectWallet }
