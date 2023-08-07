import EventEmitter from 'eventemitter3'
import { Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

export class StandardAdapter extends EventEmitter implements WalletAdapter { // FYI this is used only for purpose of compatibility with wallet interface in sdk
  _innerAdapter: NightlyConnectAdapter

  constructor(innerAdapter: NightlyConnectAdapter) {
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
    return await this._innerAdapter.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._innerAdapter.publicKey ?? DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    return await this._innerAdapter.signTransaction(transaction)
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
