import { createSelector } from '@reduxjs/toolkit'
import { IStatsStore, PoolStatsData, statsSliceName, TokenStatsData } from '../reducers/stats'
import { keySelectors, AnyProps } from './helpers'
import { tokens } from './pools'
import { Token } from '@store/consts/types'

const store = (s: AnyProps) => s[statsSliceName] as IStatsStore
export const {
  volumePlot,
  liquidityPlot,
  volume24,
  tvl24,
  fees24,
  volume,
  fees,
  tvl,
  tokensData,
  poolsData,
  isLoading,
  lastSnapTimestamp,
  lastTimestamp,
  lastInterval,
  currentInterval,
  cumulativeFees,
  cumulativeVolume
} = keySelectors(store, [
  'volumePlot',
  'liquidityPlot',
  'volume24',
  'tvl24',
  'fees24',
  'volume',
  'fees',
  'tvl',
  'tokensData',
  'poolsData',
  'isLoading',
  'lastSnapTimestamp',
  'lastTimestamp',
  'lastInterval',
  'currentInterval',
  'cumulativeFees',
  'cumulativeVolume'
])

export interface ExtendedPoolStatsData extends PoolStatsData {
  tokenXDetails: Token
  tokenYDetails: Token
}

export const poolsStatsWithTokensDetails = createSelector(
  poolsData,
  tokens,
  (allPoolsData, allTokens) =>
    allPoolsData.map(poolData => ({
      ...poolData,
      tokenXDetails: allTokens[poolData.tokenX.toString()],
      tokenYDetails: allTokens[poolData.tokenY.toString()]
    }))
)

export interface ExtendedTokenStatsData extends TokenStatsData {
  tokenDetails: Token
}
export const tokensStatsWithTokensDetails = createSelector(
  tokensData,
  tokens,
  (allTokensData, allTokens) =>
    allTokensData.map(tokenData => ({
      ...tokenData,
      tokenDetails: allTokens?.[tokenData.address.toString()]
    }))
)

export const statsSelectors = {
  volumePlot,
  liquidityPlot,
  volume24,
  tvl24,
  fees24,
  volume,
  fees,
  tvl,
  lastTimestamp,
  lastInterval,
  tokensData,
  poolsData,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails,
  isLoading,
  currentInterval,
  cumulativeVolume,
  cumulativeFees
}

export default statsSelectors
