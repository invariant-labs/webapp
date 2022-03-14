import { createSelector } from '@reduxjs/toolkit'
import { IStatsStore, statsSliceName } from '../reducers/stats'
import { keySelectors, AnyProps } from './helpers'
import { tokens } from './pools'

const store = (s: AnyProps) => s[statsSliceName] as IStatsStore

export const { volumePlot, liquidityPlot, volume24, tvl24, fees24, tokensData, poolsData } =
  keySelectors(store, [
    'volumePlot',
    'liquidityPlot',
    'volume24',
    'tvl24',
    'fees24',
    'tokensData',
    'poolsData'
  ])

export const poolsStatsWithTokensDetails = createSelector(poolsData, tokens, (allPoolsData, allTokens) => allPoolsData.map((poolData) => ({
  ...poolData,
  tokenXDetails: allTokens[poolData.tokenX.toString()],
  tokenYDetails: allTokens[poolData.tokenY.toString()]
})))

export const tokensStatsWithTokensDetails = createSelector(tokensData, tokens, (allTokensData, allTokens) => allTokensData.map((tokenData) => ({
  ...tokenData,
  tokenDetails: allTokens[tokenData.address.toString()]
})))

export const statsSelectors = {
  volumePlot,
  liquidityPlot,
  volume24,
  tvl24,
  fees24,
  tokensData,
  poolsData,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails
}

export default statsSelectors
