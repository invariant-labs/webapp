/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { MockWalletAdapter } from './adapters/mock'
import { StandardAdapter } from './adapters/standard'
import { standardAdapter } from './selector'

export enum WalletType {
  STANDARD
}

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new MockWalletAdapter()
  return _wallet
}

// Here we will pass wallet type right
const connectWallet = async (wallet: WalletType): Promise<WalletAdapter> => {
  return await new Promise(resolve => {
    switch (wallet) {
      case WalletType.STANDARD:
        if (!standardAdapter) {
          return
        }
        _wallet = new StandardAdapter(standardAdapter)
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      default:
        _wallet = new MockWalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
    }
  })
}

const disconnectWallet = () => {
  if (_wallet) {
    _wallet.disconnect()
  }
}

export { getSolanaWallet, connectWallet, disconnectWallet }
