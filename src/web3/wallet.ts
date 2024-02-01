/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { StandardAdapter } from './adapters/standard'

const _wallet: WalletAdapter = new StandardAdapter()
const getSolanaWallet = (): WalletAdapter => {
  return _wallet
}

const disconnectWallet = () => {
  _wallet.disconnect()
}
export { getSolanaWallet, disconnectWallet }
