import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_SOL_PUBLICKEY } from '@store/consts/static'

interface BackpackProvider {
  publicKey: PublicKey
  isConnected: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
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
    return this._backpackProvider?.publicKey || DEFAULT_SOL_PUBLICKEY
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
      provider = (window as any).backpack
    } else {
      return
    }
    if (!provider.isConnected) {
      await provider.connect()
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
