import { DEFAULT_PUBLICKEY } from '@consts/static'
import { PublicKey, PublicKeyInitData, Transaction } from '@solana/web3.js'
import bs58 from 'bs58'
import EventEmitter from 'events'
import { WalletAdapter } from './types'

interface SlopeWallet {
  connect: () => Promise<{
    msg: string
    data: {
      publicKey: PublicKeyInitData
    }
  }>
  disconnect: () => Promise<{ msg: string }>
  signTransaction: (message: string) => Promise<{
    msg: string
    data: {
      publicKey: PublicKeyInitData
      signature: string
    }
  }>
  signAllTransactions: (messages: string[]) => Promise<{
    msg: string
    data: {
      publicKey: PublicKeyInitData
      signatures: string[]
    }
  }>
}

interface SlopeWindow extends Window { Slope?: new () => SlopeWallet }

declare const window: SlopeWindow

export class SlopeWalletAdapter extends EventEmitter implements WalletAdapter {
  private _connecting: boolean
  private _wallet: SlopeWallet | null
  private _publicKey: PublicKey

  constructor() {
    super()
    this._connecting = false
    this._wallet = null
    this._publicKey = DEFAULT_PUBLICKEY
  }

  get publicKey(): PublicKey {
    return this._publicKey
  }

  get ready(): boolean {
    return typeof window !== 'undefined' && !!window.Slope
  }

  get connecting(): boolean {
    return this._connecting
  }

  get connected(): boolean {
    return this._publicKey !== DEFAULT_PUBLICKEY
  }

  get autoApprove() {
    return true
  }

  async connect(): Promise<void> {
    if (typeof (window.Slope) !== 'undefined') {
      if (this.connected || this.connecting) return
      this._connecting = true

      const wallet = new window.Slope()
      const { data } = await wallet.connect()
      this._wallet = wallet
      this._publicKey = new PublicKey(data.publicKey)

      this.emit('connect')
    } else {
      window.open('https://slope.finance/', '_blank')
      this._connecting = false
    }
  }

  async disconnect(): Promise<void> {
    const wallet = this._wallet
    if (wallet) {
      this._wallet = null
      this._publicKey = DEFAULT_PUBLICKEY
      await wallet.disconnect()
      this.emit('disconnect')
    }
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    const wallet = this._wallet
    const message = bs58.encode(transaction.serializeMessage())
    if (wallet) {
      const { data } = await wallet.signTransaction(message)
      const publicKey = new PublicKey(data.publicKey)
      const signature = bs58.decode(data.signature)
      transaction.addSignature(publicKey, signature)
    }
    return transaction
  }

  async signAllTransactions(
    transactions: Transaction[]
  ): Promise<Transaction[]> {
    const wallet = this._wallet
    const messages = transactions.map((transaction) =>
      bs58.encode(transaction.serializeMessage())
    )
    if (wallet) {
      const { data } = await wallet.signAllTransactions(messages)
      const length = transactions.length
      const publicKey = new PublicKey(data.publicKey)

      for (let i = 0; i < length; i++) {
        transactions[i].addSignature(publicKey, bs58.decode(data.signatures[i]))
      }
    }
    return transactions
  }
}
