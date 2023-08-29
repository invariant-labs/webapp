/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { MockWalletAdapter } from './adapters/mock'
import { StandardAdapter } from './adapters/standard'
import { nightlyConnectAdapter } from './selector'

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new MockWalletAdapter()
  return _wallet
}

const connectWallet = async (): Promise<WalletAdapter> => {
  _wallet = new StandardAdapter(nightlyConnectAdapter)

  return _wallet // no need for any listening for events here, function is already called bacause of dispatch in other event listener
}

const disconnectWallet = () => {
  if (_wallet) {
    _wallet.disconnect()
  }
}
export { getSolanaWallet, connectWallet, disconnectWallet }
