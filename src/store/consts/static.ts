import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { MOCK_TOKENS, Pair } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/network'

declare global {
  interface Window {
    solana: any
  }

  interface ImportMeta {
    globEager: (x: string) => { [propertyName: string]: { default: string } }
  }
}
export interface Token {
  symbol: string
  address: PublicKey
  decimal: number
}
export const PRICE_DECIMAL = 12
export const USDC = {
  symbol: 'USDC',
  address: new PublicKey(MOCK_TOKENS.USDC),
  decimal: 6
}
export const USDT = {
  symbol: 'USDT',
  address: new PublicKey(MOCK_TOKENS.USDT),
  decimal: 6
}
export const SOL = {
  symbol: 'SOL',
  address: new PublicKey(MOCK_TOKENS.SOL),
  decimal: 9
}
export const tokens = [USDC, USDT, SOL]
export const PAIRS: [Pair] = [
  new Pair(USDC.address, USDT.address, FEE_TIERS[0])
]

enum SolanaNetworks {
  DEV = 'https://solana--devnet.datahub.figment.io/apikey/d2f60ac272929a3f43bd3bc05149d279',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  MAIN_SERUM = 'https://solana-api.projectserum.com',
  LOCAL = 'http://127.0.0.1:8899'
}

enum NetworkType {
  DEVNET = 'Devnet',
  TESTNET = 'Testnet',
  LOCALNET = 'Localnet',
  MAINNET = 'Mainnet'
}

const MAINNET_RPCS = [
  {
    rpc: SolanaNetworks.MAIN_SERUM,
    probability: 1
  }
]
const DEFAULT_PUBLICKEY = new PublicKey(0)
const MAX_U64 = new BN('18446744073709551615')

export { SolanaNetworks, DEFAULT_PUBLICKEY, MAX_U64, MAINNET_RPCS, NetworkType }
