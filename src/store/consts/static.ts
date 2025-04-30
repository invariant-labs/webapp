import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { BN } from '@project-serum/anchor'
import { ISnackbar } from '@store/reducers/snackbars'
import { Keypair, PublicKey } from '@solana/web3.js'
import { Chain, PrefixConfig, Token, WalletType } from './types'
import { TICK_CROSSES_PER_IX } from '@invariant-labs/sdk/lib/market'
import { cat1Icon, cat2Icon, dog1Icon, dog2Icon } from '@static/icons'

export enum NetworkType {
  Local = 'Local',
  Testnet = 'Testnet',
  Devnet = 'Devnet',
  Mainnet = 'Mainnet'
}

export const PRICE_DECIMAL = 24
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
export const MSOL_DEV: Token = {
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
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg'
}

export const HBB_DEV: Token = {
  symbol: 'HBB',
  address: new PublicKey('EBuKgNDiUonDYML2CZXCRQKnE982hnt6AhaxXVZZoCyo'),
  decimals: 6,
  name: 'Hubble',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HBB111SCo9jkCejsZfz8Ec8nH7T6THF8KEKSnvwT6XK6/logo.svg'
}

export const DOGIN_MAIN: Token = {
  symbol: 'DOGIN',
  address: new PublicKey('DoGinuF39MGaxJDeJ3QDk4qd2vXwkYf5TDYpkdpYjip'),
  decimals: 5,
  name: 'DoginHood',
  logoURI: 'https://ipfs.io/ipfs/QmPfaJVTTSLSzoVaauMKAn6Xa2bs76YeVMDERiay4UmX5b'
}

export const SNY_MAIN: Token = {
  symbol: 'SNY',
  address: new PublicKey('4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y'),
  decimals: 6,
  name: 'Synthetify',
  logoURI:
    'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f34646d4b6b584e48646759735871424843754d696b4e515777566f6d5a55526859766b6b58356334705137792f6c6f676f2e706e67',
  coingeckoId: 'synthetify-token'
}

export const WEN_MAIN: Token = {
  symbol: 'WEN',
  address: new PublicKey('WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk'),
  decimals: 5,
  name: 'Wen',
  logoURI: 'https://assets.coingecko.com/coins/images/34856/standard/wen-solana.png?1707872119'
}

export const SUI_MAIN: Token = {
  symbol: 'SUI',
  address: new PublicKey('G1vJEgzepqhnVu35BN4jrkv3wVwkujYWFFCxhbEZ1CZr'),
  decimals: 8,
  name: 'Sui (Wormhole)',
  logoURI:
    'https://assets.coingecko.com/coins/images/26375/standard/sui-ocean-square.png?1727791290'
}

export enum RPC {
  DEV = 'https://api.devnet.solana.com',
  TEST = 'https://api.testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com',
  MAIN_QUICKNODE = 'https://tame-ancient-mountain.solana-mainnet.quiknode.pro/6a9a95bf7bbb108aea620e7ee4c1fd5e1b67cc62/',
  MAIN_SERUM = 'https://solana-api.projectserum.com',
  MAIN_FIGMENT = 'https://solana--mainnet.datahub.figment.io/apikey/182e93d87a1f1d335c9d74d6c7371388',
  MAIN_GENESYSGO = 'https://ssc-dao.genesysgo.net',
  MAIN_ALCHEMY = 'https://solana-mainnet.g.alchemy.com/v2/YfX5E62sdlEoytQ9ZEOA_5KIE3QbwUUD',
  MAIN_HELLOMOON = 'https://global.rpc.hellomoon.io/e8a06073-325d-4183-bcad-d69e3e3fc739',
  MAIN_HELIUS = 'https://mainnet.helius-rpc.com/?api-key=3403a15b-efe7-40c8-9b87-800b6468c3f9',
  LOCAL = 'http://127.0.0.1:8899'
}

export const DEFAULT_SOL_PUBLICKEY = new PublicKey(0)
export const MAX_U64 = new BN('18446744073709551615')
export const PRICE_QUERY_COOLDOWN = 120 * 1000

export const tokens: Record<NetworkType, Token[]> = {
  Devnet: [USDC_DEV, USDT_DEV, BTC_DEV, MSOL_DEV],
  Mainnet: [],
  Testnet: [],
  Local: []
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
  Local: []
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
  Local: []
}

export const WRAPPED_SOL_ADDRESS = 'So11111111111111111111111111111111111111112'
export const NATIVE_TICK_CROSSES_PER_IX = TICK_CROSSES_PER_IX - 5

export const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT = new BN(9200961)

export const WSOL_POSITION_INIT_LAMPORTS = new BN(6164600)

export const WSOL_POOL_INIT_LAMPORTS = new BN(106000961)

export const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_DEV = new BN(9200961)
export const WSOL_MIN_DEPOSIT_SWAP_FROM_AMOUNT_MAIN = new BN(9200961)

export const WSOL_POSITION_INIT_LAMPORTS_MAIN = new BN(6164600)
export const WSOL_POSITION_INIT_LAMPORTS_DEV = new BN(6164600)

export const WSOL_POOL_INIT_LAMPORTS_MAIN = new BN(106000961)
export const WSOL_POOL_INIT_LAMPORTS_DEV = new BN(106000961)

export const WSOL_CLOSE_POSITION_LAMPORTS_MAIN = new BN(2404056)
export const WSOL_CLOSE_POSITION_LAMPORTS_DEV = new BN(2404056)

export const ALL_FEE_TIERS_DATA = FEE_TIERS.map((tier, index) => ({
  tier,
  primaryIndex: index
})).slice(3, -1) // remove slice if all tiers should be visible

export const POSITIONS_PER_PAGE = 5

export const SIGNING_SNACKBAR_CONFIG: Omit<ISnackbar, 'open'> = {
  message: 'Signing transactions',
  variant: 'pending',
  persist: true
}

export const ADDRESSES_TO_REVERT_TOKEN_PAIRS: string[] = [
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
  'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX', // USDH
  'So11111111111111111111111111111111111111112', // SOL
  'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', // JitoSOL
  'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSol
  '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4', // JLP
  'jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v', // JupSOL
  '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs' // ETH
]

export const REFRESHER_INTERVAL = 120

export const commonTokensForNetworks: Record<NetworkType, PublicKey[]> = {
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
  Mainnet: [
    new PublicKey('So11111111111111111111111111111111111111112'),
    new PublicKey('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'),
    new PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
    new PublicKey('HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3'),
    new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
    new PublicKey('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'),
    new PublicKey('CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks')
  ],
  Testnet: [],
  Local: []
}

export const FormatConfig = {
  B: 1000000000,
  M: 1000000,
  K: 1000,
  BDecimals: 9,
  MDecimals: 6,
  KDecimals: 3,
  DecimalsAfterDot: 2
}

export enum PositionTokenBlock {
  None,
  A,
  B
}

export const subNumbers = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']

export const defaultPrefixConfig: PrefixConfig = {
  B: 1000000000,
  M: 1000000,
  K: 10000
}

export const getAddressTickerMap = (network: NetworkType): { [k: string]: string } => {
  if (network === NetworkType.Mainnet) {
    return {
      SOL: 'So11111111111111111111111111111111111111112',
      USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      USDH: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
      mSOL: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
      bSOL: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
      stSOL: '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
      ETH: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
      LFNTY: 'LFNTYraetVioAPnGJht4yNg2aUZFXR776cMeN9VMjXp',
      DOGIN: DOGIN_MAIN.address.toString(),
      SNY: SNY_MAIN.address.toString(),
      WEN: WEN_MAIN.address.toString(),
      SUI: SUI_MAIN.address.toString()
    }
  } else {
    return {}
  }
}

export const getReversedAddressTickerMap = (network: NetworkType) => {
  return Object.fromEntries(
    Object.entries(getAddressTickerMap(network)).map(([key, value]) => [value, key])
  )
}

export const MINIMAL_POOL_INIT_PRICE = 0.00000001

export const DEFAULT_SWAP_SLIPPAGE = '0.50'
export const DEFAULT_NEW_POSITION_SLIPPAGE = '1.00'

export const CHAINS = [
  { name: Chain.Solana, address: 'https://invariant.app/swap', iconGlow: 'solanaGlow' },
  // { name: Chain.AlephZero, address: 'https://azero.invariant.app/exchange' },
  {
    name: Chain.Eclipse,
    address: 'https://eclipse.invariant.app/exchange',
    iconGlow: 'eclipseGlow'
  }
  // { name: Chain.Vara, address: 'https://vara.invariant.app/exchange' },
  // {
  //   name: Chain.Alephium,
  //   address: 'https://alph.invariant.app/exchange',
  //   iconGlow: 'alephiumGlow'
  // }
]

export const enum SortTypePoolList {
  NAME_ASC,
  NAME_DESC,
  FEE_ASC,
  FEE_DESC,
  VOLUME_ASC,
  VOLUME_DESC,
  TVL_ASC,
  TVL_DESC,
  APY_ASC,
  APY_DESC
}

export const enum SortTypeTokenList {
  NAME_ASC,
  NAME_DESC,
  PRICE_ASC,
  PRICE_DESC,
  // CHANGE_ASC,
  // CHANGE_DESC,
  VOLUME_ASC,
  VOLUME_DESC,
  TVL_ASC,
  TVL_DESC
}

export const RECOMMENDED_RPC_ADDRESS = {
  [NetworkType.Testnet]: RPC.TEST,
  [NetworkType.Mainnet]: RPC.MAIN_HELIUS,
  [NetworkType.Devnet]: RPC.DEV,
  [NetworkType.Local]: ''
}

export const DEFAULT_TOKEN_DECIMAL = 6

export const COINGECKO_QUERY_COOLDOWN = 20 * 60 * 1000

export const DEFAULT_TOKENS = ['ethereum', 'solana', 'usd-coin', 'dogwifhat']

export const TIMEOUT_ERROR_MESSAGE =
  'Transaction has timed out. Check the details to confirm success'

export const walletNames = {
  [WalletType.PHANTOM]: 'Phantom',
  [WalletType.BACKPACK]: 'Backpack',
  [WalletType.NIGHTLY]: 'Wallet Selector',
  [WalletType.SOLFLARE]: 'Solflare'
}

export const defaultImages: string[] = [dog1Icon, dog2Icon, cat1Icon, cat2Icon]

type Pool = {
  tokenX: string
  tokenY: string
  fee: string
}

export const EMPTY_POOLS = [
  {
    tokenX: Keypair.generate().publicKey.toString(),
    tokenY: Keypair.generate().publicKey.toString(),
    fee: '0'
  },
  {
    tokenX: Keypair.generate().publicKey.toString(),
    tokenY: Keypair.generate().publicKey.toString(),
    fee: '0'
  },
  {
    tokenX: Keypair.generate().publicKey.toString(),
    tokenY: Keypair.generate().publicKey.toString(),
    fee: '0'
  },
  {
    tokenX: Keypair.generate().publicKey.toString(),
    tokenY: Keypair.generate().publicKey.toString(),
    fee: '0'
  }
]

export const getPopularPools = (network: NetworkType): Pool[] => {
  switch (network) {
    case NetworkType.Mainnet:
      return [
        // {
        //   tokenX: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        //   tokenY: 'So11111111111111111111111111111111111111112',
        //   fee: '0.02'
        // },
        // {
        //   tokenX: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        //   tokenY: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        //   fee: '0.01'
        // },
        // {
        //   tokenX: '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4',
        //   tokenY: 'So11111111111111111111111111111111111111112',
        //   fee: '0.01'
        // },
        // {
        //   tokenX: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        //   tokenY: 'So11111111111111111111111111111111111111112',
        //   fee: '0.01'
        // }
      ]
    default:
      return []
  }
}

export const MAX_PRIORITY_FEE = 2
export const DEFAULT_PRIORITY_FEE = 0.0001

export const STATS_CACHE_TIME = 30 * 60 * 1000

export const ITEMS_PER_PAGE = 10
