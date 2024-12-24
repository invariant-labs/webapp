import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_SOL_PUBLICKEY } from '@store/consts/static'

type PhantomEvent = 'disconnect' | 'connect'
type PhantomRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface PhantomProvider {
  _publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, handler: (args: any) => void) => void
  request: (method: PhantomRequestMethod, params: any) => Promise<any>
}

export class PhantomWalletAdapter implements WalletAdapter {
  _phantomProvider: PhantomProvider | undefined
  constructor() {
    this.connect = this.connect.bind(this)
  }
  get connected() {
    return this._phantomProvider?.isConnected || false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._phantomProvider) {
      return transactions
    }
    return await this._phantomProvider.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._phantomProvider?._publicKey
      ? new PublicKey(this._phantomProvider?._publicKey?.toString())
      : DEFAULT_SOL_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    if (!this._phantomProvider) {
      return transaction
    }
    return await this._phantomProvider.signTransaction(transaction)
  }

  connect = async () => {
    if (this._phantomProvider) {
      return
    }
    let provider: PhantomProvider
    if ((window as any)?.solana?.isPhantom) {
      provider = (window as any).solana
    } else {
      return
    }

    if (!provider.isConnected) {
      await provider.connect()
    }
    this._phantomProvider = provider
  }
  disconnect = async () => {
    if (this._phantomProvider) {
      try {
        await this._phantomProvider.disconnect()
        this._phantomProvider = undefined
      } catch (error) {
        console.log(error)
      }
    }
  }
}
