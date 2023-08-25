import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'

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
  coingeckoId?: string
  isUnknown?: boolean
}
export const PRICE_DECIMAL = 24
export const USDC_DEV: Token = {
  symbol: 'USDC',
  address: new PublicKey(MOCK_TOKENS.USDC),
  decimals: 6,
  name: 'USD Coin',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  coingeckoId: 'usd-coin'
}
export const USDT_DEV: Token = {
  symbol: 'USDT',
  address: new PublicKey(MOCK_TOKENS.USDT),
  decimals: 6,
  name: 'Tether USD',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
  coingeckoId: 'tether'
}
export const SOL_DEV: Token = {
  symbol: 'SOL',
  address: new PublicKey(MOCK_TOKENS.SOL),
  decimals: 9,
  name: 'Wrapped Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  coingeckoId: 'solana'
}
export const MSOL_DEV = {
  symbol: 'mSOL',
  address: new PublicKey(MOCK_TOKENS.MSOL),
  decimals: 9,
  name: 'Marinade Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png',
  coingeckoId: 'msol'
}
export const BTC_DEV: Token = {
  symbol: 'BTC',
  address: new PublicKey(MOCK_TOKENS.BTC),
  decimals: 6,
  name: 'Wrapped Bitcoin (Sollet)',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
  coingeckoId: 'bitcoin'
}
export const WSOL_DEV: Token = {
  symbol: 'WSOL',
  address: new PublicKey(MOCK_TOKENS.WSOL),
  decimals: 9,
  name: 'Wrapped Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  coingeckoId: 'solana'
}
export const RENDOGE_DEV: Token = {
  symbol: 'renDOGE',
  address: new PublicKey(MOCK_TOKENS.REN_DOGE),
  decimals: 8,
  name: 'renDOGE',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
  coingeckoId: 'rendoge'
}

export const MCK_DEV: Token = {
  symbol: 'MCK',
  address: new PublicKey('7AUnkVAWnkkh5Za3xLnSdgEuhs8SDuHuaqTAGErh44zc'),
  decimals: 6,
  name: 'Mock Quote Token',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
}
export const MC2_DEV: Token = {
  symbol: 'MC2',
  address: new PublicKey('AHHQ4K1vHH5Bw6t1XQoEN2PqitS9tKALR38Vg8zMor24'),
  decimals: 6,
  name: 'Mock Quote Token 2',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
}
export const MC3_DEV: Token = {
  symbol: 'MC3',
  address: new PublicKey('HNyfcBMk7bW5VRw6yyE1tJyrvicy5f1PMWWyU4awYqrZ'),
  decimals: 6,
  name: 'Mock Quote Token 3',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
}
export const VEMCK_DEV: Token = {
  symbol: 'veMCK',
  address: new PublicKey('7419i15RMBxn6c4aETP8V2wrPd9C5kdCdk4inYDtph1i'),
  decimals: 6,
  name: 'Mock Bond Token',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png'
}
export const VEMC2_DEV: Token = {
  symbol: 'veMC2',
  address: new PublicKey('CXNnEXnzenBoBg2gArf4AQyoPX7AT4tSz5xmE4rm6U9X'),
  decimals: 6,
  name: 'Mock Bond Token 2',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png'
}

export const USDH_DEV: Token = {
  symbol: 'USDH',
  address: new PublicKey('41dDByBv1Z6mCHCp4FJeZNP8MPiviUpFz2AdzJYRszzv'),
  decimals: 6,
  name: 'USDH',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg',
  coingeckoId: 'usdh'
}

export const HBB_DEV: Token = {
  symbol: 'HBB',
  address: new PublicKey('EBuKgNDiUonDYML2CZXCRQKnE982hnt6AhaxXVZZoCyo'),
  decimals: 6,
  name: 'Hubble',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg',
  coingeckoId: 'hubble'
}

enum SolanaNetworks {
  DEV = 'https://api.devnet.solana.com',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  MAIN_QUICKNODE = 'https://icy-billowing-gadget.solana-mainnet.discover.quiknode.pro/b970ec100ab2d8c249bee494b7d682c8ef75ee6f/',
  MAIN_SERUM = 'https://solana-api.projectserum.com',
  MAIN_FIGMENT = 'https://solana--mainnet.datahub.figment.io/apikey/182e93d87a1f1d335c9d74d6c7371388',
  MAIN_GENESYSGO = 'https://ssc-dao.genesysgo.net',
  MAIN_NIGHTLY = 'https://rpc.nightly.app:8899/',
  MAIN_ALCHEMY = 'https://solana-mainnet.g.alchemy.com/v2/YfX5E62sdlEoytQ9ZEOA_5KIE3QbwUUD',
  LOCAL = 'http://127.0.0.1:8899'
}

enum NetworkType {
  DEVNET = 'Devnet',
  TESTNET = 'Testnet',
  LOCALNET = 'Localnet',
  MAINNET = 'Mainnet'
}

const DEFAULT_PUBLICKEY = new PublicKey(0)
const MAX_U64 = new BN('18446744073709551615')

export const tokens: Record<NetworkType, Token[]> = {
  Devnet: [USDC_DEV, USDT_DEV, BTC_DEV, MSOL_DEV],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export interface BestTier {
  tokenX: PublicKey
  tokenY: PublicKey
  bestTierIndex: number
}

const mainnetBestTiersCreator = () => {
  const stableTokens = {
    USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    USDT: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
    USDH: new PublicKey('USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX'),
    UXD: new PublicKey('7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT')
  }

  const unstableTokens = {
    SOL: new PublicKey('So11111111111111111111111111111111111111112'),
    stSOL: new PublicKey('7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj'),
    BTC: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    ETH: new PublicKey('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs'),
    mSOL: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So')
  }

  const bestTiers: BestTier[] = []

  for (let i = 0; i < 4; i++) {
    const tokenX = Object.values(stableTokens)[i]
    for (let j = i + 1; j < 4; j++) {
      const tokenY = Object.values(stableTokens)[j]

      bestTiers.push({
        tokenX,
        tokenY,
        bestTierIndex: 0
      })
    }
  }

  for (let i = 0; i < 5; i++) {
    const [symbolX, tokenX] = Object.entries(unstableTokens)[i]
    for (let j = i + 1; j < 5; j++) {
      const [symbolY, tokenY] = Object.entries(unstableTokens)[j]

      if (symbolX.slice(-3) === 'SOL' && symbolY.slice(-3) === 'SOL') {
        bestTiers.push({
          tokenX,
          tokenY,
          bestTierIndex: 0
        })
      } else {
        bestTiers.push({
          tokenX,
          tokenY,
          bestTierIndex: 2
        })
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    const tokenX = Object.values(stableTokens)[i]
    for (let j = 0; j < 5; j++) {
      const tokenY = Object.values(unstableTokens)[j]

      bestTiers.push({
        tokenX,
        tokenY,
        bestTierIndex: 1
      })
    }
  }

  return bestTiers
}

export const bestTiers: Record<NetworkType, BestTier[]> = {
  Devnet: [
    {
      tokenX: USDC_DEV.address,
      tokenY: USDT_DEV.address,
      bestTierIndex: 0
    },
    {
      tokenX: USDC_DEV.address,
      tokenY: WSOL_DEV.address,
      bestTierIndex: 1
    },
    {
      tokenX: USDC_DEV.address,
      tokenY: BTC_DEV.address,
      bestTierIndex: 1
    },
    {
      tokenX: RENDOGE_DEV.address,
      tokenY: BTC_DEV.address,
      bestTierIndex: 3
    },
    {
      tokenX: USDC_DEV.address,
      tokenY: RENDOGE_DEV.address,
      bestTierIndex: 3
    }
  ],
  Testnet: [],
  Mainnet: mainnetBestTiersCreator(),
  Localnet: []
}

export const commonTokensForNetworks: Record<NetworkType, PublicKey[]> = {
  Devnet: [
    USDC_DEV.address,
    USDT_DEV.address,
    BTC_DEV.address,
    WSOL_DEV.address,
    MSOL_DEV.address,
    USDH_DEV.address
  ],
  Mainnet: [
    new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
    new PublicKey('USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX'),
    new PublicKey('4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'),
    new PublicKey('So11111111111111111111111111111111111111112'),
    new PublicKey('3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh'),
    new PublicKey('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs'),
    new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So')
  ],
  Testnet: [],
  Localnet: []
}

export const airdropTokens: Record<NetworkType, PublicKey[]> = {
  Devnet: [
    USDC_DEV.address,
    USDT_DEV.address,
    SOL_DEV.address,
    MSOL_DEV.address,
    BTC_DEV.address,
    RENDOGE_DEV.address,
    MCK_DEV.address,
    MC2_DEV.address,
    MC3_DEV.address,
    USDH_DEV.address
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
    0.0025 * 10 ** BTC_DEV.decimals,
    700 * 10 ** RENDOGE_DEV.decimals,
    100 * 10 ** MCK_DEV.decimals,
    100 * 10 ** MC2_DEV.decimals,
    100 * 10 ** MC3_DEV.decimals,
    100 * 10 ** USDH_DEV.decimals
  ],
  Mainnet: [],
  Testnet: [],
  Localnet: []
}

export const WRAPPED_SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

export const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT = new BN(9200961)

export const WSOL_POSITION_INIT_LAMPORTS = new BN(6164600)

export const WSOL_POOL_INIT_LAMPORTS = new BN(106000961)

export const minimumRangesForTiers = [20, 74, 80, 64, 28, 28, 28, 28, 28]

export const maxSafeConcentrationsForTiers = [400.52, 41.49, 21.47, 8.13, 5.45, 5.45, 5.45, 5.45]

export const getNewPositionFeeTiers = (
  tokenAAddress: PublicKey | null,
  tokenBAddress: PublicKey | null
) => {
  const USDC = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  const USDT = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB')

  return [
    FEE_TIERS[
      tokenAAddress !== null &&
      tokenBAddress !== null &&
      ((tokenAAddress.equals(USDC) && tokenBAddress.equals(USDT)) ||
        (tokenAAddress.equals(USDT) && tokenBAddress.equals(USDC)))
        ? 0
        : 1
    ],
    ...FEE_TIERS.slice(2)
  ]
}

export { SolanaNetworks, DEFAULT_PUBLICKEY, MAX_U64, NetworkType }
