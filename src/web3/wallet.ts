/* eslint-disable no-case-declarations */
import { WalletAdapter } from './adapters/types'
import { PhantomWalletAdapter } from './adapters/phantom'
import { MathWalletAdapter } from './adapters/mathwallet'
import Wallet from '@project-serum/sol-wallet-adapter'
import { SolflareWalletAdapter } from './adapters/solflare'
import { Coin98WalletAdapter } from './adapters/coin98'
import { SlopeWalletAdapter } from './adapters/slope'
import { CloverWalletAdapter } from './adapters/clover'
export enum WalletType {
  PHANTOM,
  SOLLET,
  MATH,
  SOLFLARE,
  COIN98,
  SLOPE,
  CLOVER
}

let _wallet: WalletAdapter
const getSolanaWallet = (): WalletAdapter => {
  if (_wallet) {
    return _wallet
  }
  _wallet = new PhantomWalletAdapter()
  return _wallet
}
// Here we will pass wallet type right
const connectWallet = async (wallet: WalletType): Promise<WalletAdapter> => {
  let providerUrl
  return await new Promise(resolve => {
    switch (wallet) {
      case WalletType.PHANTOM:
        _wallet = new PhantomWalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.SOLLET:
        if ((window as any)?.sollet) {
          _wallet = new Wallet((window as any)?.sollet) as WalletAdapter
        } else {
          providerUrl = 'https://www.sollet.io'
          _wallet = new Wallet(providerUrl) as WalletAdapter
        }
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.MATH:
        _wallet = new MathWalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.SOLFLARE:
        if ((window as any)?.solflare?.isSolflare) {
          _wallet = new SolflareWalletAdapter()
        } else {
          providerUrl = 'https://solflare.com/provider'
          _wallet = new Wallet(providerUrl) as WalletAdapter
        }
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.COIN98:
        _wallet = new Coin98WalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.SLOPE:
        _wallet = new SlopeWalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      case WalletType.CLOVER:
        _wallet = new CloverWalletAdapter()
        _wallet.on('connect', () => {
          resolve(_wallet)
        })
        _wallet.connect()
        break
      default:
        _wallet = new PhantomWalletAdapter()
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
