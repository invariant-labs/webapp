import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_SOL_PUBLICKEY, SOLANA_MAINNET_GENESIS_HASH } from '@store/consts/static'

interface BackpackProvider {
  publicKey: PublicKey
  isConnected: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: (options?: {
    chainGenesisHash?: string
    reconnect?: boolean
    onlyIfTrusted?: boolean
  }) => Promise<void>
  disconnect: () => Promise<void>
  connection: any
}
export class BackpackWalletAdapter implements WalletAdapter {
  _backpackProvider: BackpackProvider | undefined
  constructor() {
    this.connect = this.connect.bind(this)
  }
  get connected() {
    return this._backpackProvider?.isConnected || false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._backpackProvider) {
      return transactions
    }
    return await this._backpackProvider.signAllTransactions(transactions)
  }
  get publicKey() {
    return this._backpackProvider?.publicKey
      ? new PublicKey(this._backpackProvider?.publicKey?.toString())
      : DEFAULT_SOL_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._backpackProvider) {
      return transaction
    }
    return await this._backpackProvider.signTransaction(transaction)
  }
  connect = async () => {
    if (this._backpackProvider) {
      return
    }
    let provider: BackpackProvider
    if ((window as any)?.backpack) {
      provider = (window as any).backpack.solana
    } else {
      return
    }
    if (!provider.isConnected) {
      await provider.connect({
        chainGenesisHash: SOLANA_MAINNET_GENESIS_HASH,
        reconnect: true
      })
    }
    this._backpackProvider = provider
  }
  disconnect = async () => {
    if (this._backpackProvider) {
      try {
        await this._backpackProvider.disconnect()
        this._backpackProvider = undefined
      } catch (error) {
        console.log(error)
      }
    }
  }
}
