import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { MOCK_TOKENS, Pair } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'
import icons from '@static/icons'

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
  decimals: number
  name: string
  logoURI: string
}
export const PRICE_DECIMAL = 12
export const USDC_DEV: Token = {
  symbol: 'USDC',
  address: new PublicKey(MOCK_TOKENS.USDC),
  decimals: 6,
  name: 'USD Coin',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
}
export const USDT_DEV: Token = {
  symbol: 'USDT',
  address: new PublicKey(MOCK_TOKENS.USDT),
  decimals: 6,
  name: 'Tether USD',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
}
export const SOL_DEV: Token = {
  symbol: 'wSOL',
  address: new PublicKey(MOCK_TOKENS.SOL),
  decimals: 9,
  name: 'Wrapped Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
}
export const MSOL_DEV = {
  symbol: 'mSOL',
  address: new PublicKey(MOCK_TOKENS.MSOL),
  decimals: 9,
  name: 'Marinade Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png'
}
export const ANA_DEV: Token = {
  symbol: 'ANA',
  address: new PublicKey(MOCK_TOKENS.ANA),
  decimals: 6,
  name: 'Nirvana',
  logoURI: icons.ANA
}

enum SolanaNetworks {
  DEV = 'https://api.devnet.solana.com',
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

export const tokens: Record<NetworkType, Token[]> = {
  Devnet: [USDC_DEV, USDT_DEV, SOL_DEV, ANA_DEV, MSOL_DEV],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const PAIRS: Record<NetworkType, Pair[]> = {
  Devnet: [
    new Pair(USDC_DEV.address, USDT_DEV.address, FEE_TIERS[0]),
    new Pair(USDC_DEV.address, SOL_DEV.address, FEE_TIERS[0]),
    // new Pair(USDC_DEV.address, ANA_DEV.address, FEE_TIERS[0]),
    new Pair(SOL_DEV.address, MSOL_DEV.address, FEE_TIERS[0])
    // new Pair(USDC_DEV.address, SOL_DEV.address, FEE_TIERS[1])
  ],
  Testnet: [],
  Mainnet: [],
  Localnet: []
}

export const airdropTokens: Record<NetworkType, PublicKey[]> = {
  Devnet: [USDC_DEV.address, USDT_DEV.address, SOL_DEV.address, MSOL_DEV.address],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const airdropQuantities: Record<NetworkType, number[]> = {
  Devnet: [
    100 * 10 ** USDC_DEV.decimals,
    100 * 10 ** USDT_DEV.decimals,
    10 ** SOL_DEV.decimals,
    10 ** MSOL_DEV.decimals
  ],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const MAINNET_SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

export { SolanaNetworks, DEFAULT_PUBLICKEY, MAX_U64, MAINNET_RPCS, NetworkType }
