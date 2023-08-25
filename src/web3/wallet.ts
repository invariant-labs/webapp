/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { MockWalletAdapter } from './adapters/mock'
import { StandardAdapter } from './adapters/standard'
import { getNCAdapter } from './selector'

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new MockWalletAdapter()
  return _wallet
}

const connectWallet = async (): Promise<WalletAdapter> => {
  const adapter = await getNCAdapter()
  _wallet = new StandardAdapter(adapter)

  return _wallet // no need for any listening for events here, function is already called bacause of dispatch in other event listener
}

const disconnectWallet = () => {
  if (_wallet) {
    _wallet.disconnect()
  }
}
export { getSolanaWallet, connectWallet, disconnectWallet }
