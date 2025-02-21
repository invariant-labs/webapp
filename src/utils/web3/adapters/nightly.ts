import { Transaction } from '@solana/web3.js'
import { WalletAdapter } from './types'
import { nightlyConnectAdapter } from '../selector'
import { DEFAULT_SOL_PUBLICKEY } from '@store/consts/static'

export class NightlyWalletAdapter implements WalletAdapter {
  constructor() {
    this.connect = this.connect.bind(this)
  }

  get connected() {
    return nightlyConnectAdapter.connected
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    return await nightlyConnectAdapter.signAllTransactions(transactions)
  }

  get publicKey() {
    return nightlyConnectAdapter.publicKey ?? DEFAULT_SOL_PUBLICKEY
  }

  async signTransaction(transaction: Transaction) {
    return await nightlyConnectAdapter.signTransaction(transaction)
  }

  connect = async () => {
    if (!nightlyConnectAdapter.connected) {
      try {
        await nightlyConnectAdapter.connect()
        if (nightlyConnectAdapter.selectedWallet?.name === 'Phantom') {
          nightlyConnectAdapter.on('change', async a => {
            if (!a || !a.accounts || !a.accounts[0].publicKey) {
              await nightlyConnectAdapter.connectToWallet('Phantom')
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  disconnect = async () => {
    if (nightlyConnectAdapter) {
      try {
        await nightlyConnectAdapter.disconnect()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
