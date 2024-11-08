import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'

export interface WalletAdapter {
  publicKey: PublicKey
  connected: boolean
  signTransaction: (
    transaction: Transaction | VersionedTransaction
  ) => Promise<Transaction | VersionedTransaction>
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}
