import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from './static'

declare global {
  interface Window {
    solana: any
  }

  interface ImportMeta {
    globEager: (x: string) => { [propertyName: string]: { default: string } }
  }
}

interface ActionsBasicType {
  [k: string]: ActionCreatorWithPayload<any>
}

export type PayloadType<actions extends ActionsBasicType> = {
  [k in keyof actions]: Parameters<actions[k]>[0]
}

export enum SwapError {
  InsufficientLiquidity,
  AmountIsZero,
  NoRouteFound,
  MaxSwapStepsReached,
  StateOutdated,
  Unknown
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

export interface ISelectNetwork {
  networkType: NetworkType
  rpc: string
  rpcName?: string
}

export interface PrefixConfig {
  B?: number
  M?: number
  K?: number
}

export interface BestTier {
  tokenX: PublicKey
  tokenY: PublicKey
  bestTierIndex: number
}

export type CoinGeckoAPIData = CoinGeckoAPIPriceData[]

export type CoinGeckoAPIPriceData = {
  id: string
  current_price: number
  price_change_percentage_24h: number
}

export type SimulateResult = {
  amountOut: BN
  poolIndex: number
  AmountOutWithFee: BN
  estimatedPriceAfterSwap: BN
  minimumReceived: BN
  priceImpact: BN
  error: string[]
}

export interface FormatNumberThreshold {
  value: number
  decimals: number
  divider?: number
}

export type PositionOpeningMethod = 'range' | 'concentration'

export interface TokenPriceData {
  price: number
  buyPrice: number
  sellPrice: number
}

export interface CoingeckoApiPriceData {
  id: string
  current_price: number
  price_change_percentage_24h: number
}

export interface CoingeckoPriceData {
  price: number
  priceChange: number
}

export interface SnapshotValueData {
  tokenBNFromBeginning: string
  usdValue24: number
}

export interface PrefixConfig {
  B?: number
  M?: number
  K?: number
}

export interface ParsedBN {
  BN: BN
  decimal: number
}

export interface IncentiveRewardData {
  apy: number
  apySingleTick: number
  total: number
  token: string
}

export interface PoolSnapshot {
  timestamp: number
  volumeX: SnapshotValueData
  volumeY: SnapshotValueData
  liquidityX: SnapshotValueData
  liquidityY: SnapshotValueData
  feeX: SnapshotValueData
  feeY: SnapshotValueData
}
// export interface Token {
//   symbol: string
//   address: PublicKey
//   decimals: number
//   name: string
//   logoURI: string
//   balance?: BN
//   coingeckoId?: string
//   isUnknown?: boolean
// }

export interface BestTier {
  tokenX: PublicKey
  tokenY: PublicKey
  bestTierIndex: number
}

export interface ISelectChain {
  name: Chain
  address: string
}

export enum Chain {
  Solana = 'Solana',
  AlephZero = 'Aleph Zero',
  Eclipse = 'Eclipse',
  Vara = 'Vara',
  Alephium = 'Alephium'
}

export interface SnapshotValueData {
  tokenBNFromBeginning: string
  usdValue24: number
}

export interface PoolSnapshot {
  timestamp: number
  volumeX: SnapshotValueData
  volumeY: SnapshotValueData
  liquidityX: SnapshotValueData
  liquidityY: SnapshotValueData
  feeX: SnapshotValueData
  feeY: SnapshotValueData
}

export interface FullSnap {
  volume24: {
    value: number
    change: number
  }
  tvl24: {
    value: number
    change: number
  }
  fees24: {
    value: number
    change: number
  }
  tokensData: TokenStatsDataWithString[]
  poolsData: PoolStatsDataWithString[]
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
}

export interface TokenStatsDataWithString {
  address: string
  price: number
  volume24: number
  tvl: number
}

export interface TimeData {
  timestamp: number
  value: number
}

export interface PoolStatsDataWithString {
  poolAddress: string
  tokenX: string
  tokenY: string
  fee: number
  volume24: number
  tvl: number
  apy: number
}

export interface SnapshotValueData {
  tokenBNFromBeginning: string
  usdValue24: number
}

export interface PoolSnapshot {
  timestamp: number
  volumeX: SnapshotValueData
  volumeY: SnapshotValueData
  liquidityX: SnapshotValueData
  liquidityY: SnapshotValueData
  feeX: SnapshotValueData
  feeY: SnapshotValueData
}

export interface FullSnap {
  volume24: {
    value: number
    change: number
  }
  tvl24: {
    value: number
    change: number
  }
  fees24: {
    value: number
    change: number
  }
  tokensData: TokenStatsDataWithString[]
  poolsData: PoolStatsDataWithString[]
  volumePlot: TimeData[]
  liquidityPlot: TimeData[]
}

export interface TokenStatsDataWithString {
  address: string
  price: number
  volume24: number
  tvl: number
}

export interface TimeData {
  timestamp: number
  value: number
}

export interface PoolStatsDataWithString {
  poolAddress: string
  tokenX: string
  tokenY: string
  fee: number
  volume24: number
  tvl: number
  apy: number
}

export interface IPriorityFeeOptions {
  label: string
  value: number | string
  saveValue: number | string
  description: string
}

export enum WalletType {
  NIGHTLY,
  PHANTOM,
  BACKPACK,
  SOLFLARE
}
