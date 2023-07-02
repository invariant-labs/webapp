/* eslint-disable no-case-declarations */
import { StandardWalletAdapter } from '@solana/wallet-standard'
import { WalletAdapter } from './adapters/types'
import { PhantomWalletAdapter } from './adapters/phantom'
import { StandardAdapter } from './adapters/standard'

export enum WalletType {
  PHANTOM,
  SOLLET,
  MATH,
  SOLFLARE,
  COIN98,
  SLOPE,
  CLOVER,
  NIGHTLY,
  EXODUS,
  BACKPACK
}

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new PhantomWalletAdapter()
  return _wallet
}

const connectWallet = async (innerAdapter: StandardWalletAdapter): Promise<WalletAdapter> => {
  return await new Promise(resolve => {
    _wallet = new StandardAdapter(innerAdapter)
    _wallet.on('connect', () => {
      resolve(_wallet)
    })
    _wallet.connect()
  })
}

const disconnectWallet = () => {
  if (_wallet) {
    _wallet.disconnect()
  }
}

export { getSolanaWallet, connectWallet, disconnectWallet }
