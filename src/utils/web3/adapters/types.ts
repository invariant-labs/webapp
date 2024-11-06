import { PublicKey, Transaction } from '@solana/web3.js'

export interface WalletAdapter {
  publicKey: PublicKey
  connected: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
  connect: () => any
  disconnect: () => any
}
