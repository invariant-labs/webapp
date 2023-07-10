import EventEmitter from 'eventemitter3'
import { Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { StandardWalletAdapter } from '@solana/wallet-standard'

export class StandardAdapter extends EventEmitter implements WalletAdapter {
  _innerAdapter: StandardWalletAdapter

  constructor(innerAdapter: StandardWalletAdapter) {
    super()
    this.connect = this.connect.bind(this)
    this._innerAdapter = innerAdapter
  }

  get connected() {
    return this._innerAdapter?.connected || false
  }

  get autoApprove() {
    return false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await this._innerAdapter.signAllTransactions!(transactions)
  }

  get publicKey() {
    return this._innerAdapter.publicKey ?? DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await this._innerAdapter.signTransaction!(transaction)
  }

  connect = async () => {
    if (!this._innerAdapter.connected) {
      await this._innerAdapter.connect()
    }

    this.emit('connect')
  }

  disconnect = async () => {
    if (this._innerAdapter) {
      await this._innerAdapter.disconnect()
      this.emit('disconnect')
    }
  }
}
