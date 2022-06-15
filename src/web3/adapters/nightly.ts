import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export declare class SolanaNightly {
  publicKey: PublicKey
  _onDisconnect: () => void
  private readonly _nightlyEventsMap
  constructor(eventMap: Map<string, (data: any) => any>)
  connect(onDisconnect?: () => void): Promise<PublicKey>
  disconnect(): Promise<void>
  signTransaction(tx: Transaction): Promise<Transaction>
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>
}

export class NightlyWalletAdapter extends EventEmitter implements WalletAdapter {
  _publicKey: PublicKey
  _connected: boolean
  constructor() {
    super()
    this._connected = false
    this._publicKey = DEFAULT_PUBLICKEY
  }

  get autoApprove() {
    return false
  }

  get connected() {
    return this._connected
  }

  public async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._provider) {
      return transactions
    }

    return await this._provider.signAllTransactions(transactions)
  }

  private get _provider(): SolanaNightly {
    if ((window as any)?.nightly.solana) {
      return (window as any).nightly.solana
    } else {
      throw new Error('SolanaNightly: solana is not defined')
    }
  }

  get publicKey() {
    return this._publicKey || DEFAULT_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._provider) {
      return transaction
    }

    return await this._provider.signTransaction(transaction)
  }

  async connect(onDisconnect?: () => void) {
    try {
      const pk = await this._provider.connect(onDisconnect)
      this._publicKey = pk
      this._connected = true
      this.emit('connect')
      return pk
    } catch (error) {
      console.log(error)
      window.open('https://nightly.app/', '_blank')
    }
  }

  async disconnect() {
    if (this._publicKey) {
      await this._provider.disconnect()
      this._publicKey = DEFAULT_PUBLICKEY
      this._connected = false
      this.emit('disconnect')
    }
  }
}
