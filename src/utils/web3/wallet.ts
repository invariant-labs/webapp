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

  await sleep(200)
  await _wallet.connect()
}

const changeToNightlyAdapter = () => {
  _wallet = new NightlyWalletAdapter()
}

export { getSolanaWallet, disconnectWallet, connectStaticWallet, changeToNightlyAdapter }
