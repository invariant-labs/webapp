import { StrategyConfig } from '@store/types/userOverview'
import { USDC_DEV, SOL_DEV } from './static'
// import { SOL_MAIN, TETH_MAIN, USDC_MAIN, WETH_MAIN } from './static'
export const DEFAULT_FEE_TIER = '0_10'
export const STRATEGIES: StrategyConfig[] = [
  {
    tokenAddressA: USDC_DEV.address.toString(),
    tokenAddressB: SOL_DEV.address.toString(),
    feeTier: '0_09'
  }
  // {
  //   tokenAddressA: SOL_MAIN.address.toString(),
  //   tokenAddressB: WETH_MAIN.address.toString(),
  //   feeTier: '0_09'
  // },
  // {
  //   tokenAddressA: TETH_MAIN.address.toString(),
  //   tokenAddressB: WETH_MAIN.address.toString(),
  //   feeTier: '0_01'
  // }
]
