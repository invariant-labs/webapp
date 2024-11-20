import { WalletAdapter } from './adapters/types'
import { NightlyWalletAdapter } from './adapters/nightly'
import { PhantomWalletAdapter } from './adapters/phantom'
import { BackpackWalletAdapter } from './adapters/backpack'
import { SolflareWalletAdapter } from './adapters/solflare'
import { WalletType } from '@store/consts/types'
import { sleep } from '@invariant-labs/sdk'

let _wallet: WalletAdapter

const getSolanaWallet = (): WalletAdapter => {
  return _wallet
}

const disconnectWallet = async () => {
  await _wallet.disconnect()
}

const connectStaticWallet = async (wallet: WalletType) => {
  console.log('connectStaticWallet', wallet)
  switch (wallet) {
    case WalletType.PHANTOM:
      _wallet = new PhantomWalletAdapter()
      break
    case WalletType.BACKPACK:
      _wallet = new BackpackWalletAdapter()
      break
    case WalletType.SOLFLARE:
      _wallet = new SolflareWalletAdapter()
      break
    default:
      _wallet = new PhantomWalletAdapter()
      break
  }

  await sleep(500)
  console.log('wallet adapter', _wallet.connected)
  await _wallet.connect()
}

const changeToNightlyAdapter = () => {
  _wallet = new NightlyWalletAdapter()
}

export { getSolanaWallet, disconnectWallet, connectStaticWallet, changeToNightlyAdapter }
