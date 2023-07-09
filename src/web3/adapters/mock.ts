import EventEmitter from 'eventemitter3'
import { Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export class MockWalletAdapter extends EventEmitter implements WalletAdapter {
  get connected() {
    return false
  }

  get autoApprove() {
    return false
  }

  async signAllTransactions(_transactions: Transaction[]): Promise<Transaction[]> {
    throw new Error('Connect wallet!')
  }

  get publicKey() {
    return DEFAULT_PUBLICKEY
  }

  async signTransaction(_transaction: Transaction): Promise<Transaction> {
    throw new Error('Connect wallet!')
  }

  connect = async () => {}

  disconnect() {}
}
