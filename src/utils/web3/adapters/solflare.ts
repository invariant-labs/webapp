import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_SOL_PUBLICKEY } from '@store/consts/static'

type SolflareEvent = 'disconnect' | 'connect'
type SolflareRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface SolflareProvider {
  publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (
    transaction: Transaction | VersionedTransaction
  ) => Promise<Transaction | VersionedTransaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: SolflareEvent, handler: (args: any) => void) => void
  request: (method: SolflareRequestMethod, params: any) => Promise<any>
}

export class SolflareWalletAdapter implements WalletAdapter {
  _solflareProvider: SolflareProvider | undefined
  constructor() {
    this.connect = this.connect.bind(this)
  }

  get connected() {
    return this._solflareProvider?.isConnected || false
  }

  get autoApprove() {
    return this._solflareProvider?.autoApprove || false
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this._solflareProvider) {
      return transactions
    }

    return await this._solflareProvider.signAllTransactions(transactions)
  }

  get publicKey() {
    return this._solflareProvider?.publicKey || DEFAULT_SOL_PUBLICKEY
  }

  async signTransaction(transaction: Transaction | VersionedTransaction) {
    if (!this._solflareProvider) {
      return transaction
    }

    return await this._solflareProvider.signTransaction(transaction)
  }

  connect = async () => {
    if (this._solflareProvider) {
      return
    }
    let provider: SolflareProvider
    if ((window as any)?.solflare?.isSolflare) {
      provider = (window as any).solflare
    } else {
      return
    }

    if (!provider.isConnected) {
      await provider.connect()
    }
    this._solflareProvider = provider
  }

  disconnect = async () => {
    if (this._solflareProvider) {
      await this._solflareProvider.disconnect()
      this._solflareProvider = undefined
    }
  }
}
