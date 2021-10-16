import { PublicKey } from '@solana/web3.js'

export interface Pool {
  address: PublicKey
}

export interface Market {
  pools: [Pool]
}

// export const defaultMarket: Market = {
//   pools: []
// }
