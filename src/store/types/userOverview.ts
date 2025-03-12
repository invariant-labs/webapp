import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { PoolWithAddressAndIndex } from '@store/selectors/positions'

export interface StrategyConfig {
  tokenAddressA: string
  tokenAddressB?: string
  feeTier: string
}

export interface Token {
  name: string
  decimal: number
  balance: BN
  assetsAddress: string
  coingeckoId?: string
  icon: string
}

export interface UnclaimedFee {
  id: number
  tokenX: Token
  tokenY: Token
  fee: number
  value: number
  unclaimedFee: number
}

export interface PoolAsset {
  id: number
  name: string
  fee: number
  value: number
  unclaimedFee: number
}

export interface TokenPool {
  id: PublicKey
  symbol: string
  icon: string
  isUnknown?: boolean
  value: number
  amount: number
}

export interface ProcessedPool {
  id: string
  fee: number
  lowerTickIndex: number
  upperTickIndex: number
  poolData: PoolWithAddressAndIndex
  tokenX: Token
  tokenY: Token
}

export interface TokenPositionEntry {
  token: string
  value: number
  positionId: string
  logo?: string
}
