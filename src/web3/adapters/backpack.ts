import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'

interface BackpackProvider {
  publicKey?: PublicKey
  isConnected: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export class BackpackWalletAdapter extends EventEmitter implements WalletAdapter {
  _provider: BackpackProvider | undefined

  constructor() {
    super()
    this.connect = this.connect.bind(this)
  }

  get connected() {
    return this._provider?.isConnected || false
  }

  get autoApprove() {
    return false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._provider) {
      return transactions
    }

    return await this._provider.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._provider?.publicKey || DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._provider) {
      return transaction
    }
    return await this._provider.signTransaction(transaction)
  }

  connect = async () => {
    if (this._provider) {
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

    this._provider = provider
    this.emit('connect')
  }

  disconnect() {
    if (this._provider) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._provider.disconnect()
      this._provider = undefined
      this.emit('disconnect')
    }
  }
}
