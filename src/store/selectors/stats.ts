import { Token } from '@consts/static'
import { createSelector } from '@reduxjs/toolkit'
import { IStatsStore, PoolStatsData, statsSliceName, TokenStatsData } from '../reducers/stats'
import { keySelectors, AnyProps } from './helpers'
import { tokens } from './pools'

const store = (s: AnyProps) => s[statsSliceName] as IStatsStore

export const {
  volumePlot,
  liquidityPlot,
  volume24,
  tvl24,
  fees24,
  tokensData,
  poolsData,
  isLoading
} = keySelectors(store, [
  'volumePlot',
  'liquidityPlot',
  'volume24',
  'tvl24',
  'fees24',
  'tokensData',
  'poolsData',
  'isLoading'
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
  tokensData,
  poolsData,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails,
  isLoading
}

export default statsSelectors
