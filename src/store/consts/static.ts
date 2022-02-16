import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { MOCK_TOKENS, Pair } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'

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
  symbol: 'SOL',
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
export const BTC_DEV: Token = {
  symbol: 'BTC',
  address: new PublicKey(MOCK_TOKENS.BTC),
  decimals: 6,
  name: 'Wrapped Bitcoin (Sollet)',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
}
export const WSOL_DEV: Token = {
  symbol: 'WSOL',
  address: new PublicKey(MOCK_TOKENS.WSOL),
  decimals: 9,
  name: 'Wrapped Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
}
export const RENDOGE_DEV: Token = {
  symbol: 'renDOGE',
  address: new PublicKey(MOCK_TOKENS.REN_DOGE),
  decimals: 8,
  name: 'renDOGE',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png'
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
  Devnet: [USDC_DEV, USDT_DEV, BTC_DEV, MSOL_DEV],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

const MAINNET_ADRESSES = {
  USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  USDT: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
  UST: new PublicKey('9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i'),
  SOL: new PublicKey('So11111111111111111111111111111111111111112')
}

export const PAIRS: Record<NetworkType, Pair[]> = {
  Devnet: [
    new Pair(USDC_DEV.address, USDT_DEV.address, FEE_TIERS[0]),
    new Pair(USDC_DEV.address, WSOL_DEV.address, FEE_TIERS[0]),
    new Pair(USDC_DEV.address, WSOL_DEV.address, FEE_TIERS[1]),
    new Pair(USDC_DEV.address, WSOL_DEV.address, FEE_TIERS[2]),
    new Pair(USDC_DEV.address, RENDOGE_DEV.address, FEE_TIERS[1]),
    new Pair(USDC_DEV.address, RENDOGE_DEV.address, FEE_TIERS[2]),
    new Pair(USDC_DEV.address, BTC_DEV.address, FEE_TIERS[1]),
    new Pair(USDC_DEV.address, BTC_DEV.address, FEE_TIERS[2]),
    new Pair(USDC_DEV.address, BTC_DEV.address, FEE_TIERS[3]),
    new Pair(BTC_DEV.address, RENDOGE_DEV.address, FEE_TIERS[1]),
    new Pair(BTC_DEV.address, RENDOGE_DEV.address, FEE_TIERS[2]),
    new Pair(BTC_DEV.address, RENDOGE_DEV.address, FEE_TIERS[3])
  ],
  Testnet: [],
  Mainnet: [
    new Pair(MAINNET_ADRESSES.USDC, MAINNET_ADRESSES.USDT, FEE_TIERS[0]),
    new Pair(MAINNET_ADRESSES.USDC, MAINNET_ADRESSES.UST, FEE_TIERS[0]),
    new Pair(MAINNET_ADRESSES.USDC, MAINNET_ADRESSES.SOL, FEE_TIERS[1])
  ],
  Localnet: []
}

export const airdropTokens: Record<NetworkType, PublicKey[]> = {
  Devnet: [
    USDC_DEV.address,
    USDT_DEV.address,
    SOL_DEV.address,
    MSOL_DEV.address,
    BTC_DEV.address,
    RENDOGE_DEV.address
  ],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const airdropQuantities: Record<NetworkType, number[]> = {
  Devnet: [
    100 * 10 ** USDC_DEV.decimals,
    100 * 10 ** USDT_DEV.decimals,
    10 ** SOL_DEV.decimals,
    10 ** MSOL_DEV.decimals,
    0.0001 * 10 ** BTC_DEV.decimals,
    700 * 10 ** RENDOGE_DEV.decimals
  ],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const WRAPPED_SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

export const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT = new BN(9200961)

export { SolanaNetworks, DEFAULT_PUBLICKEY, MAX_U64, MAINNET_RPCS, NetworkType }
