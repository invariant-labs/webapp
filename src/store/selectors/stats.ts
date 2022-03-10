import { IStatsStore, statsSliceName } from '../reducers/stats'
import { keySelectors, AnyProps } from './helpers'

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

export const statsSelectors = {
  volumePlot,
  liquidityPlot,
  volume24,
  tvl24,
  fees24,
  tokensData,
  poolsData
}

export default statsSelectors
