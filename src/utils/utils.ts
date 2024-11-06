import { calculateSellPrice } from '@invariant-labs/bonds-sdk/lib/math'
import { BondSaleStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { calculatePriceSqrt, MAX_TICK, MIN_TICK, Pair } from '@invariant-labs/sdk'
import { Market, TICK_CROSSES_PER_IX, Tickmap } from '@invariant-labs/sdk/lib/market'
import { getMaxTick, getMinTick, PRICE_SCALE, Range } from '@invariant-labs/sdk/lib/utils'
import { Decimal, PoolStructure, Tick } from '@invariant-labs/sdk/src/market'
import {
  calculateTickDelta,
  DECIMAL,
  parseLiquidityOnTicks,
  simulateSwap,
  SimulationStatus
} from '@invariant-labs/sdk/src/utils'
import { Staker } from '@invariant-labs/staker-sdk'
import { Stake } from '@invariant-labs/staker-sdk/lib/staker'
import { BN } from '@project-serum/anchor'
import { ExtendedStake } from '@store/reducers/farms'
import { PoolWithAddress } from '@store/reducers/pools'
import { PlotTickData, PositionWithAddress } from '@store/reducers/positions'
import { Token as SPLToken, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import axios, { AxiosResponse } from 'axios'
import bs58 from 'bs58'
import {
  BTC_DEV,
  getAddressTickerMap,
  getReversedAddressTickerMap,
  DOGIN_MAIN,
  HBB_DEV,
  MAX_U64,
  MC2_DEV,
  MC3_DEV,
  MCK_DEV,
  MSOL_DEV,
  NetworkType,
  PRICE_DECIMAL,
  RENDOGE_DEV,
  STABLECOIN_ADDRESSES,
  USDC_DEV,
  USDH_DEV,
  USDT_DEV,
  VEMC2_DEV,
  VEMCK_DEV,
  WSOL_DEV
} from '@store/consts/static'
import mainnetList from '@store/consts/tokenLists/mainnet.json'
import { FormatConfig, subNumbers } from '@store/consts/static'
import { CoingeckoPriceData, Token } from '@store/consts/types'
import { sqrt } from '@invariant-labs/sdk/lib/math'

export const transformBN = (amount: BN): string => {
  return (amount.div(new BN(1e2)).toNumber() / 1e4).toString()
}
export const printBN = (amount: BN, decimals: number): string => {
  const amountString = amount.toString()
  const isNegative = amountString.length > 0 && amountString[0] === '-'

  const balanceString = isNegative ? amountString.slice(1) : amountString

  if (balanceString.length <= decimals) {
    return (
      (isNegative ? '-' : '') + '0.' + '0'.repeat(decimals - balanceString.length) + balanceString
    )
  } else {
    return (
      (isNegative ? '-' : '') +
      trimZeros(
        balanceString.substring(0, balanceString.length - decimals) +
          '.' +
          balanceString.substring(balanceString.length - decimals)
      )
    )
  }
}
// Bad solution but i hate regex
export const trimZeros = (amount: string) => {
  try {
    return parseFloat(amount).toString()
  } catch (error) {
    return amount
  }
}
export const convertBalanceToBN = (amount: string, decimals: number): BN => {
  const balanceString = amount.split('.')
  if (balanceString.length !== 2) {
    return new BN(balanceString[0] + '0'.repeat(decimals))
  }
  // console.log(balanceString[1].length)
  if (balanceString[1].length <= decimals) {
    return new BN(
      balanceString[0] + balanceString[1] + '0'.repeat(decimals - balanceString[1].length)
    )
  }
  return new BN(0)
}
export interface ParsedBN {
  BN: BN
  decimal: number
}
export const stringToMinDecimalBN = (value: string): ParsedBN => {
  if (value.includes('.')) {
    const [before, after] = value.split('.')
    return {
      BN: new BN(`${before}${after}`),
      decimal: after.length || 0
    }
  }
  return {
    BN: new BN(value),
    decimal: 0
  }
}
export const capitalizeString = (str: string) => {
  if (!str) {
    return str
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase()
}

export const divUp = (a: BN, b: BN): BN => {
  return a.add(b.subn(1)).div(b)
}
export const divUpNumber = (a: number, b: number): number => {
  return Math.ceil(a / b)
}
export const removeTickerPrefix = (ticker: string, prefix: string[] = ['x', '$']): string => {
  const index = prefix.findIndex(p => ticker.startsWith(p))
  if (index && prefix[index]) {
    return ticker.substring(prefix[index].length)
  }
  return ticker
}

export interface PrefixConfig {
  B?: number
  M?: number
  K?: number
}

const defaultPrefixConfig: PrefixConfig = {
  B: 1000000000,
  M: 1000000,
  K: 10000
}

export const showPrefix = (nr: number, config: PrefixConfig = defaultPrefixConfig): string => {
  const abs = Math.abs(nr)

  if (typeof config.B !== 'undefined' && abs >= config.B) {
    return 'B'
  }

  if (typeof config.M !== 'undefined' && abs >= config.M) {
    return 'M'
  }

  if (typeof config.K !== 'undefined' && abs >= config.K) {
    return 'K'
  }

  return ''
}

export interface FormatNumberThreshold {
  value: number
  decimals: number
  divider?: number
}

export const defaultThresholds: FormatNumberThreshold[] = [
  {
    value: 10,
    decimals: 4
  },
  {
    value: 1000,
    decimals: 2
  },
  {
    value: 10000,
    decimals: 1
  },
  {
    value: 1000000,
    decimals: 2,
    divider: 1000
  },
  {
    value: 1000000000,
    decimals: 2,
    divider: 1000000
  },
  {
    value: Infinity,
    decimals: 2,
    divider: 1000000000
  }
]

export const formatNumbers =
  (thresholds: FormatNumberThreshold[] = defaultThresholds) =>
  (value: string) => {
    const num = Number(value)
    const abs = Math.abs(num)
    const threshold = thresholds.sort((a, b) => a.value - b.value).find(thr => abs < thr.value)

    const formatted = threshold
      ? (abs / (threshold.divider ?? 1)).toFixed(threshold.decimals)
      : value

    return num < 0 && threshold ? '-' + formatted : formatted
  }

export const nearestPriceIndex = (price: number, data: Array<{ x: number; y: number }>) => {
  let nearest = 0

  for (let i = 1; i < data.length; i++) {
    if (Math.abs(data[i].x - price) < Math.abs(data[nearest].x - price)) {
      nearest = i
    }
  }

  return nearest
}

export const getScaleFromString = (value: string): number => {
  const parts = value.split('.')

  if ((parts?.length ?? 0) < 2) {
    return 0
  }

  return parts[1]?.length ?? 0
}

export const logBase = (x: number, b: number): number => Math.log(x) / Math.log(b)

export const calcYPerXPriceBySqrtPrice = (
  sqrtPrice: BN,
  xDecimal: number,
  yDecimal: number
): number => {
  const sqrt = +printBN(sqrtPrice, PRICE_DECIMAL)
  const proportion = sqrt * sqrt

  return proportion / 10 ** (yDecimal - xDecimal)
}

export const calcPriceBySqrtPrice = (
  sqrtPrice: BN,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
): number => {
  const price = calcYPerXPriceBySqrtPrice(sqrtPrice, xDecimal, yDecimal) ** (isXtoY ? 1 : -1)

  return price
}

export const calcYPerXPriceByTickIndex = (
  tickIndex: number,
  xDecimal: number,
  yDecimal: number
): number => {
  return calcYPerXPriceBySqrtPrice(calculatePriceSqrt(tickIndex), xDecimal, yDecimal)
}

export const spacingMultiplicityLte = (arg: number, spacing: number): number => {
  if (Math.abs(arg % spacing) === 0) {
    return arg
  }

  if (arg >= 0) {
    return arg - (arg % spacing)
  }

  return arg - (spacing - (Math.abs(arg) % spacing))
}

export const spacingMultiplicityGte = (arg: number, spacing: number): number => {
  if (Math.abs(arg % spacing) === 0) {
    return arg
  }

  if (arg >= 0) {
    return arg + (spacing - (arg % spacing))
  }

  return arg + (Math.abs(arg) % spacing)
}

export const createLiquidityPlot = (
  rawTicks: Tick[],
  pool: PoolStructure,
  isXtoY: boolean,
  tokenXDecimal: number,
  tokenYDecimal: number
) => {
  const sortedTicks = rawTicks.sort((a, b) => a.index - b.index)
  const parsedTicks = rawTicks.length ? parseLiquidityOnTicks(sortedTicks) : []

  const ticks = rawTicks.map((raw, index) => ({
    ...raw,
    liqudity: parsedTicks[index].liquidity
  }))

  const ticksData: PlotTickData[] = []

  const min = getMinTick(pool.tickSpacing)
  const max = getMaxTick(pool.tickSpacing)

  if (!ticks.length || ticks[0].index > min) {
    const minPrice = calcPriceByTickIndex(min, isXtoY, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: minPrice,
      y: 0,
      index: min
    })
  }

  ticks.forEach((tick, i) => {
    if (i === 0 && tick.index - pool.tickSpacing > min) {
      const price = calcPriceByTickIndex(
        tick.index - pool.tickSpacing,
        isXtoY,
        tokenXDecimal,
        tokenYDecimal
      )
      ticksData.push({
        x: price,
        y: 0,
        index: tick.index - pool.tickSpacing
      })
    } else if (i > 0 && tick.index - pool.tickSpacing > ticks[i - 1].index) {
      const price = calcPriceByTickIndex(
        tick.index - pool.tickSpacing,
        isXtoY,
        tokenXDecimal,
        tokenYDecimal
      )
      ticksData.push({
        x: price,
        y: +printBN(ticks[i - 1].liqudity, DECIMAL),
        index: tick.index - pool.tickSpacing
      })
    }

    const price = calcPriceByTickIndex(tick.index, isXtoY, tokenXDecimal, tokenYDecimal)
    ticksData.push({
      x: price,
      y: +printBN(ticks[i].liqudity, DECIMAL),
      index: tick.index
    })
  })

  if (!ticks.length) {
    const maxPrice = calcPriceByTickIndex(max, isXtoY, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: maxPrice,
      y: 0,
      index: max
    })
  } else if (ticks[ticks.length - 1].index < max) {
    if (max - ticks[ticks.length - 1].index > pool.tickSpacing) {
      const price = calcPriceByTickIndex(
        ticks[ticks.length - 1].index + pool.tickSpacing,
        isXtoY,
        tokenXDecimal,
        tokenYDecimal
      )
      ticksData.push({
        x: price,
        y: 0,
        index: ticks[ticks.length - 1].index + pool.tickSpacing
      })
    }

    const maxPrice = calcPriceByTickIndex(max, isXtoY, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: maxPrice,
      y: 0,
      index: max
    })
  }

  return isXtoY ? ticksData : ticksData.reverse()
}

export const createPlaceholderLiquidityPlot = (
  isXtoY: boolean,
  yValueToFill: number,
  tickSpacing: number,
  tokenXDecimal: number,
  tokenYDecimal: number
) => {
  const ticksData: PlotTickData[] = []

  const min = getMinTick(tickSpacing)
  const max = getMaxTick(tickSpacing)

  const minPrice = calcPriceByTickIndex(min, isXtoY, tokenXDecimal, tokenYDecimal)

  ticksData.push({
    x: minPrice,
    y: yValueToFill,
    index: min
  })

  const maxPrice = calcPriceByTickIndex(max, isXtoY, tokenXDecimal, tokenYDecimal)

  ticksData.push({
    x: maxPrice,
    y: yValueToFill,
    index: max
  })

  return isXtoY ? ticksData : ticksData.reverse()
}

export const getNetworkTokensList = (networkType: NetworkType): Record<string, Token> => {
  const obj: Record<string, Token> = {}
  switch (networkType) {
    case NetworkType.Mainnet:
      Object.entries(mainnetList as unknown as Record<string, Token>).forEach(
        ([address, token]) => {
          obj[address] = {
            ...token,
            address: new PublicKey(address)
          }
        }
      )
      obj[DOGIN_MAIN.address.toString()] = DOGIN_MAIN

      return obj
    case NetworkType.Devnet:
      return {
        [USDC_DEV.address.toString()]: USDC_DEV,
        [USDT_DEV.address.toString()]: USDT_DEV,
        [MSOL_DEV.address.toString()]: MSOL_DEV,
        [BTC_DEV.address.toString()]: BTC_DEV,
        [WSOL_DEV.address.toString()]: WSOL_DEV,
        [RENDOGE_DEV.address.toString()]: RENDOGE_DEV,
        [MCK_DEV.address.toString()]: MCK_DEV,
        [VEMCK_DEV.address.toString()]: VEMCK_DEV,
        [MC2_DEV.address.toString()]: MC2_DEV,
        [VEMC2_DEV.address.toString()]: VEMC2_DEV,
        [MC3_DEV.address.toString()]: MC3_DEV,
        [USDH_DEV.address.toString()]: USDH_DEV,
        [HBB_DEV.address.toString()]: HBB_DEV
      }
    default:
      return {}
  }
}

export const getPrimaryUnitsPrice = (
  price: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const xToYPrice = isXtoY ? price : 1 / price

  return xToYPrice * 10 ** (yDecimal - xDecimal)
}

export const calculateSqrtPriceFromBalance = (
  price: number,
  spacing: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const minTick = getMinTick(spacing)
  const maxTick = getMaxTick(spacing)

  const basePrice = Math.min(
    Math.max(
      price,
      Number(calcPriceByTickIndex(isXtoY ? minTick : maxTick, isXtoY, xDecimal, yDecimal))
    ),
    Number(calcPriceByTickIndex(isXtoY ? maxTick : minTick, isXtoY, xDecimal, yDecimal))
  )

  const primaryUnitsPrice = getPrimaryUnitsPrice(
    basePrice,
    isXtoY,
    Number(xDecimal),
    Number(yDecimal)
  )

  const parsedPrimaryUnits =
    primaryUnitsPrice > 1 && Number.isInteger(primaryUnitsPrice)
      ? primaryUnitsPrice.toString()
      : primaryUnitsPrice.toFixed(24)

  const priceBN = convertBalanceToBN(parsedPrimaryUnits, PRICE_SCALE)
  const sqrtPrice = sqrt(priceBN)

  const minSqrtPrice = calculatePriceSqrt(minTick).v
  const maxSqrtPrice = calculatePriceSqrt(maxTick).v

  let validatedSqrtPrice = sqrtPrice

  if (sqrtPrice.lt(minSqrtPrice)) {
    validatedSqrtPrice = minSqrtPrice
  } else if (sqrtPrice.gt(maxSqrtPrice)) {
    validatedSqrtPrice = maxSqrtPrice
  }

  return validatedSqrtPrice
}

export const validConcentrationMidPriceTick = (
  midPriceTick: number,
  isXtoY: boolean,
  tickSpacing: number
) => {
  const minTick = getMinTick(tickSpacing)
  const maxTick = getMaxTick(tickSpacing)

  const parsedTickSpacing = Number(tickSpacing)
  const tickDelta = calculateTickDelta(parsedTickSpacing, 2, 2)

  const minTickLimit = minTick + (2 + tickDelta) * tickSpacing
  const maxTickLimit = maxTick - (2 + tickDelta) * tickSpacing

  if (isXtoY) {
    if (midPriceTick < minTickLimit) {
      return minTickLimit
    } else if (midPriceTick > maxTickLimit) {
      return maxTickLimit
    }
  } else {
    if (midPriceTick > maxTickLimit) {
      return maxTickLimit
    } else if (midPriceTick < minTickLimit) {
      return minTickLimit
    }
  }

  return midPriceTick
}

export const findClosestIndexByValue = (arr: number[], value: number): number => {
  const high = arr.length - 1

  if (value < arr[0]) {
    return 0
  }

  if (value > arr[high]) {
    return high
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (Number(arr[i].toFixed(0)) <= Number(value.toFixed(0))) {
      return i
    }
  }
  return high
}

export const calculateTickFromBalance = (
  price: number,
  spacing: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const minTick = getMinTick(spacing)
  const maxTick = getMaxTick(spacing)

  const basePrice = Math.max(
    price,
    calcPriceByTickIndex(isXtoY ? minTick : maxTick, isXtoY, xDecimal, yDecimal)
  )
  const primaryUnitsPrice = getPrimaryUnitsPrice(basePrice, isXtoY, xDecimal, yDecimal)
  const tick = Math.round(logBase(primaryUnitsPrice, 1.0001))

  return Math.max(Math.min(tick, getMaxTick(spacing)), getMinTick(spacing))
}

export const nearestSpacingMultiplicity = (arg: number, spacing: number) => {
  const greater = spacingMultiplicityGte(arg, spacing)
  const lower = spacingMultiplicityLte(arg, spacing)

  const nearest = Math.abs(greater - arg) < Math.abs(lower - arg) ? greater : lower

  return Math.max(Math.min(nearest, getMaxTick(spacing)), getMinTick(spacing))
}

export const nearestTickIndex = (
  price: number,
  spacing: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const base = Math.max(
    price,
    calcPriceByTickIndex(isXtoY ? MIN_TICK : MAX_TICK, isXtoY, xDecimal, yDecimal)
  )
  const primaryUnitsPrice = getPrimaryUnitsPrice(base, isXtoY, xDecimal, yDecimal)
  const log = Math.round(logBase(primaryUnitsPrice, 1.0001))
  return nearestSpacingMultiplicity(log, spacing)
}

export const calcTicksAmountInRange = (
  min: number,
  max: number,
  tickSpacing: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
): number => {
  const primaryUnitsMin = getPrimaryUnitsPrice(min, isXtoY, xDecimal, yDecimal)
  const primaryUnitsMax = getPrimaryUnitsPrice(max, isXtoY, xDecimal, yDecimal)
  const minIndex = logBase(primaryUnitsMin, 1.0001)
  const maxIndex = logBase(primaryUnitsMax, 1.0001)

  return Math.ceil(Math.abs(maxIndex - minIndex) / tickSpacing)
}

export const calcPriceByTickIndex = (
  index: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const price = calcYPerXPriceBySqrtPrice(calculatePriceSqrt(index).v, xDecimal, yDecimal)

  return isXtoY ? price : price !== 0 ? 1 / price : Number.MAX_SAFE_INTEGER
}

export const findPoolIndex = (address: PublicKey, pools: PoolWithAddress[]) => {
  return pools.findIndex(pool => pool.address.equals(address))
}

export const findPairIndex = (
  fromToken: PublicKey,
  toToken: PublicKey,
  pools: PoolWithAddress[]
) => {
  return pools.findIndex(
    pool =>
      (fromToken.equals(pool.tokenX) && toToken.equals(pool.tokenY)) ||
      (fromToken.equals(pool.tokenY) && toToken.equals(pool.tokenX))
  )
}

export const findPairs = (tokenFrom: PublicKey, tokenTo: PublicKey, pairs: PoolWithAddress[]) => {
  return pairs.filter(
    pool =>
      (tokenFrom.equals(pool.tokenX) && tokenTo.equals(pool.tokenY)) ||
      (tokenFrom.equals(pool.tokenY) && tokenTo.equals(pool.tokenX))
  )
}

export const calcCurrentPriceOfPool = (
  pool: PoolWithAddress,
  xDecimal: number,
  yDecimal: number
) => {
  const decimalDiff = PRICE_DECIMAL + (xDecimal - yDecimal)
  const sqrtPricePow: number =
    +printBN(pool.sqrtPrice.v, PRICE_DECIMAL) * +printBN(pool.sqrtPrice.v, PRICE_DECIMAL)

  const knownPrice: BN = new BN(sqrtPricePow * 10 ** decimalDiff)

  return convertBalanceToBN(knownPrice.toString(), 0)
}

export const handleSimulate = async (
  pools: PoolWithAddress[],
  poolTicks: { [key in string]: Tick[] },
  tickmaps: { [key in string]: Tickmap },
  slippage: Decimal,
  fromToken: PublicKey,
  toToken: PublicKey,
  amount: BN,
  byAmountIn: boolean
): Promise<{
  amountOut: BN
  poolIndex: number
  AmountOutWithFee: BN
  estimatedPriceAfterSwap: BN
  minimumReceived: BN
  priceImpact: BN
  error: string[]
}> => {
  const filteredPools = findPairs(fromToken, toToken, pools)
  const errorMessage: string[] = []
  let isXtoY = false
  let result
  let okChanges = 0
  let failChanges = 0
  const initAmountOut = byAmountIn ? new BN(-1) : MAX_U64

  let successData = {
    amountOut: initAmountOut,
    poolIndex: 0,
    AmountOutWithFee: new BN(0),
    estimatedPriceAfterSwap: new BN(0),
    minimumReceived: new BN(0),
    priceImpact: new BN(0)
  }

  let allFailedData = {
    amountOut: initAmountOut,
    poolIndex: 0,
    AmountOutWithFee: new BN(0),
    estimatedPriceAfterSwap: new BN(0),
    minimumReceived: new BN(0),
    priceImpact: new BN(0)
  }

  if (amount.eq(new BN(0))) {
    return {
      amountOut: new BN(0),
      poolIndex: 0,
      AmountOutWithFee: new BN(0),
      estimatedPriceAfterSwap: new BN(0),
      minimumReceived: new BN(0),
      priceImpact: new BN(0),
      error: errorMessage
    }
  }

  for (const pool of filteredPools) {
    isXtoY = fromToken.equals(pool.tokenX)

    const ticks: Map<number, Tick> = new Map<number, Tick>()
    for (const tick of poolTicks[pool.address.toString()]) {
      ticks.set(tick.index, tick)
    }

    try {
      const swapSimulateResult = simulateSwap({
        xToY: isXtoY,
        byAmountIn: byAmountIn,
        swapAmount: amount,
        slippage: slippage,
        pool: pool,
        ticks: ticks,
        tickmap: tickmaps[pool.tickmap.toString()]
      })
      if (swapSimulateResult.amountPerTick.length > TICK_CROSSES_PER_IX) {
        errorMessage.push('Too large amount')
      }

      if (!byAmountIn) {
        result = swapSimulateResult.accumulatedAmountIn.add(swapSimulateResult.accumulatedFee)
      } else {
        result = swapSimulateResult.accumulatedAmountOut
      }
      if (
        (byAmountIn ? successData.amountOut.lt(result) : successData.amountOut.gt(result)) &&
        swapSimulateResult.status === SimulationStatus.Ok &&
        swapSimulateResult.amountPerTick.length <= TICK_CROSSES_PER_IX
      ) {
        successData = {
          amountOut: result,
          poolIndex: findPoolIndex(pool.address, pools),
          AmountOutWithFee: result.add(swapSimulateResult.accumulatedFee),
          estimatedPriceAfterSwap: swapSimulateResult.priceAfterSwap,
          minimumReceived: swapSimulateResult.minReceived,
          priceImpact: swapSimulateResult.priceImpact
        }

        okChanges += 1
      } else if (
        byAmountIn ? allFailedData.amountOut.lt(result) : allFailedData.amountOut.gt(result)
      ) {
        allFailedData = {
          amountOut: result,
          poolIndex: findPoolIndex(pool.address, pools),
          AmountOutWithFee: result.add(swapSimulateResult.accumulatedFee),
          estimatedPriceAfterSwap: swapSimulateResult.priceAfterSwap,
          minimumReceived: swapSimulateResult.minReceived,
          priceImpact: swapSimulateResult.priceImpact
        }

        failChanges += 1
      }

      if (swapSimulateResult.status !== SimulationStatus.Ok) {
        errorMessage.push(swapSimulateResult.status)
      }
    } catch (err: any) {
      errorMessage.push(err.toString())
    }
  }
  if (okChanges === 0 && failChanges === 0) {
    return {
      amountOut: new BN(0),
      poolIndex: 0,
      AmountOutWithFee: new BN(0),
      estimatedPriceAfterSwap: new BN(0),
      minimumReceived: new BN(0),
      priceImpact: new BN(0),
      error: errorMessage
    }
  }

  if (okChanges === 0) {
    return {
      ...allFailedData,
      error: errorMessage
    }
  }

  return {
    ...successData,
    error: []
  }
}

export const toMaxNumericPlaces = (num: number, places: number): string => {
  const log = Math.floor(Math.log10(num))

  if (log >= places) {
    return num.toFixed(0)
  }

  if (log >= 0) {
    return num.toFixed(places - log - 1)
  }

  return num.toFixed(places + Math.abs(log) - 1)
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

export const getNetworkStats = async (name: string): Promise<Record<string, PoolSnapshot[]>> => {
  const { data } = await axios.get<Record<string, PoolSnapshot[]>>(
    `https://stats.invariant.app/full/${name}`
  )

  return data
}

interface FullSnap {
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

export const getFullSnap = async (name: string): Promise<FullSnap> => {
  const { data } = await axios.get<FullSnap>(`https://stats.invariant.app/svm/full_snap/${name}`)

  return data
}

export const getPoolsFromAdresses = async (
  addresses: PublicKey[],
  marketProgram: Market
): Promise<PoolWithAddress[]> => {
  const pools = (await marketProgram.program.account.pool.fetchMultiple(
    addresses
  )) as Array<PoolStructure | null>

  return pools
    .map((pool, index) =>
      pool !== null
        ? {
            ...pool,
            address: addresses[index]
          }
        : null
    )
    .filter(pool => pool !== null) as PoolWithAddress[]
}

export const getPools = async (
  pairs: Pair[],
  marketProgram: Market
): Promise<PoolWithAddress[]> => {
  const addresses: PublicKey[] = await Promise.all(
    pairs.map(async pair => await pair.getAddress(marketProgram.program.programId))
  )

  return await getPoolsFromAdresses(addresses, marketProgram)
}

interface RawJupApiResponse {
  data: Record<
    string,
    {
      id: string
      price: string
      extraInfo?: {
        quotedPrice: {
          buyPrice: string
          sellPrice: string
        }
      }
    }
  >
  timeTaken: number
}

export interface JupApiPriceData {
  id: string
  price: number
}

export interface CoingeckoApiPriceData {
  id: string
  current_price: number
  price_change_percentage_24h: number
}

export interface TokenPriceData {
  price: number
  buyPrice: number
  sellPrice: number
}

export const getCoingeckoPricesData = async (
  ids: string[]
): Promise<Record<string, Omit<TokenPriceData, 'buyPrice' | 'sellPrice'>>> => {
  const maxTokensPerRequest = 250
  const chunkedIds: string[][] = []
  for (let i = 0; i < ids.length; i += maxTokensPerRequest) {
    chunkedIds.push(ids.slice(i, i + maxTokensPerRequest))
  }

  const requests = chunkedIds.map(
    async idsChunk =>
      await axios.get<CoingeckoApiPriceData[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsChunk.join(
          ','
        )}&per_page=250`
      )
  )

  const responses = await Promise.all(requests)
  const concatRes = responses.flatMap(response =>
    Object.values(response.data).map(({ id, current_price: price }) => ({ id, price }))
  )

  return concatRes.reduce<Record<string, Omit<TokenPriceData, 'buyPrice' | 'sellPrice'>>>(
    (acc, { id, price }) => {
      acc[id] = { price: price ?? 0 }
      return acc
    },
    {}
  )
}



export const getJupPricesData = async (ids: string[]): Promise<Record<string, TokenPriceData>> => {
  const maxTokensPerRequest = 100

  const chunkedIds: string[][] = []
  for (let i = 0; i < ids.length; i += maxTokensPerRequest) {
    chunkedIds.push(ids.slice(i, i + maxTokensPerRequest))
  }

  const requests = chunkedIds.map(
    async idsChunk =>
      await axios.get<RawJupApiResponse>(
        `https://api.jup.ag/price/v2?ids=${idsChunk.join(',')}&showExtraInfo=true`
      )
  )

  const responses = await Promise.all(requests)
  const concatRes = responses.flatMap(response =>
    Object.values(response.data.data).map(({ id, price, extraInfo }) => ({ id, price, extraInfo }))
  )

  return concatRes.reduce<Record<string, TokenPriceData>>((acc, { id, price, extraInfo }) => {
    acc[id] = {
      price: Number(price),
      buyPrice: Number(extraInfo?.quotedPrice.buyPrice ?? 0),
      sellPrice: Number(extraInfo?.quotedPrice.sellPrice ?? 0)
    }
    return acc
  }, {})
}

export const trimLeadingZeros = (amount: string): string => {
  const amountParts = amount.split('.')

  if (!amountParts.length) {
    return '0'
  }

  if (amountParts.length === 1) {
    return amountParts[0]
  }

  const reversedDec = Array.from(amountParts[1]).reverse()
  const firstNonZero = reversedDec.findIndex(char => char !== '0')

  if (firstNonZero === -1) {
    return amountParts[0]
  }

  const trimmed = reversedDec.slice(firstNonZero, reversedDec.length).reverse().join('')

  return `${amountParts[0]}.${trimmed}`
}

export const calculateConcentrationRange = (
  tickSpacing: number,
  concentration: number,
  minimumRange: number,
  currentTick: number,
  isXToY: boolean
) => {
  const tickDelta = calculateTickDelta(tickSpacing, minimumRange, concentration)
  const lowerTick = currentTick - (minimumRange / 2 + tickDelta) * tickSpacing
  const upperTick = currentTick + (minimumRange / 2 + tickDelta) * tickSpacing

  return {
    leftRange: isXToY ? lowerTick : upperTick,
    rightRange: isXToY ? upperTick : lowerTick
  }
}

export enum PositionTokenBlock {
  None,
  A,
  B
}

export const determinePositionTokenBlock = (
  currentSqrtPrice: BN,
  lowerTick: number,
  upperTick: number,
  isXtoY: boolean
) => {
  const lowerPrice = calculatePriceSqrt(lowerTick)
  const upperPrice = calculatePriceSqrt(upperTick)

  if (lowerPrice.v.gte(currentSqrtPrice)) {
    return isXtoY ? PositionTokenBlock.B : PositionTokenBlock.A
  }

  if (upperPrice.v.lte(currentSqrtPrice)) {
    return isXtoY ? PositionTokenBlock.A : PositionTokenBlock.B
  }

  return PositionTokenBlock.None
}

export const generateUnknownTokenDataObject = (address: PublicKey, decimals: number): Token => ({
  address,
  decimals,
  symbol: `${address.toString().slice(0, 4)}...${address.toString().slice(-4)}`,
  name: address.toString(),
  logoURI: '/unknownToken.svg',
  isUnknown: true
})

export const getFullNewTokensData = async (
  addresses: PublicKey[],
  connection: Connection
): Promise<Record<string, Token>> => {
  const promises = addresses
    .map(address => new SPLToken(connection, address, TOKEN_PROGRAM_ID, new Keypair()))
    .map(async token => await token.getMintInfo())

  const tokens: Record<string, Token> = {}

  await Promise.allSettled(promises).then(results =>
    results.forEach((result, index) => {
      tokens[addresses[index].toString()] = generateUnknownTokenDataObject(
        addresses[index],
        result.status === 'fulfilled' ? result.value.decimals : 6
      )
    })
  )

  return tokens
}

export const addNewTokenToLocalStorage = (address: string, network: NetworkType) => {
  const currentListStr = localStorage.getItem(`CUSTOM_TOKENS_${network}`)

  const currentList = currentListStr !== null ? JSON.parse(currentListStr) : []

  currentList.push(address)

  localStorage.setItem(`CUSTOM_TOKENS_${network}`, JSON.stringify([...new Set(currentList)]))
}

export const getNewTokenOrThrow = async (
  address: string,
  connection: Connection
): Promise<Record<string, Token>> => {
  const key = new PublicKey(address)
  const token = new SPLToken(connection, key, TOKEN_PROGRAM_ID, new Keypair())

  const info = await token.getMintInfo()

  console.log(info)

  return {
    [address.toString()]: generateUnknownTokenDataObject(key, info.decimals)
  }
}

export const getUserStakesForFarm = async (
  stakerProgram: Staker,
  incentive: PublicKey,
  pool: PublicKey,
  ids: BN[],
  positionsAdresses: PublicKey[]
) => {
  const promises = ids.map(async id => {
    const [userStakeAddress] = await stakerProgram.getUserStakeAddressAndBump(incentive, pool, id)

    return userStakeAddress
  })

  const addresses = await Promise.all(promises)

  const stakes = await stakerProgram.program.account.userStake.fetchMultiple(addresses)

  const fullStakes: ExtendedStake[] = []

  stakes.forEach((stake, index) => {
    if (stake !== null) {
      fullStakes.push({
        ...(stake as Stake),
        address: addresses[index],
        position: positionsAdresses[index]
      })
    }
  })

  return fullStakes
}

export const getPositionsForPool = async (marketProgram: Market, pool: PublicKey) => {
  return (
    await marketProgram.program.account.position.all([
      {
        memcmp: { bytes: bs58.encode(pool.toBuffer()), offset: 40 }
      }
    ])
  ).map(({ account, publicKey }) => ({
    ...account,
    address: publicKey
  })) as PositionWithAddress[]
}

export const getPositionsAddressesFromRange = async (
  marketProgram: Market,
  owner: PublicKey,
  lowerIndex: number,
  upperIndex: number
) => {
  const promises: Array<
    Promise<{
      positionAddress: PublicKey
      positionBump: number
    }>
  > = []

  for (let i = lowerIndex; i <= upperIndex; i++) {
    promises.push(marketProgram.getPositionAddress(owner, i))
  }

  return await Promise.all(promises).then(data =>
    data.map(({ positionAddress }) => positionAddress)
  )
}

export const calculateEstBondPriceForQuoteAmount = (bondSale: BondSaleStruct, amount: BN) => {
  let lowerBondAmount = new BN(0)
  let upperBondAmount = MAX_U64
  let price = calculateSellPrice(bondSale, upperBondAmount)

  while (upperBondAmount.sub(lowerBondAmount).abs().gt(new BN(1))) {
    const middleBondAmount = upperBondAmount.add(lowerBondAmount).div(new BN(2))
    price = calculateSellPrice(bondSale, middleBondAmount)
    const middleQuoteAmount = middleBondAmount.mul(price).div(new BN(10 ** DECIMAL))

    if (middleQuoteAmount.sub(amount).abs().lte(new BN(1))) {
      break
    }

    if (middleQuoteAmount.lt(amount)) {
      lowerBondAmount = middleBondAmount
    } else {
      upperBondAmount = middleBondAmount
    }
  }

  return price
}

export const calculateBondPrice = (bondSale: BondSaleStruct, amount: BN, byAmountBond: boolean) =>
  byAmountBond
    ? calculateSellPrice(bondSale, amount)
    : calculateEstBondPriceForQuoteAmount(bondSale, amount)

export const thresholdsWithTokenDecimal = (decimals: number): FormatNumberThreshold[] => [
  {
    value: 10,
    decimals
  },
  {
    value: 100,
    decimals: 4
  },
  {
    value: 1000,
    decimals: 2
  },
  {
    value: 10000,
    decimals: 1
  },
  {
    value: 1000000,
    decimals: 2,
    divider: 1000
  },
  {
    value: 1000000000,
    decimals: 2,
    divider: 1000000
  },
  {
    value: Infinity,
    decimals: 2,
    divider: 1000000000
  }
]

export const getJupTokenPrice = async (id: string): Promise<TokenPriceData> => {
  const response = await axios.get<RawJupApiResponse>(
    `https://api.jup.ag/price/v2?ids=${id}&showExtraInfo=true`
  )

  return {
    price: Number(response.data.data[id].price),
    buyPrice: Number(response.data.data[id].extraInfo?.quotedPrice.buyPrice ?? 0),
    sellPrice: Number(response.data.data[id].extraInfo?.quotedPrice.sellPrice ?? 0)
  }
}

export const getJupTokensRatioPrice = async (
  id: string,
  vsId: string
): Promise<Omit<TokenPriceData, 'buyPrice' | 'sellPrice'>> => {
  const response = await axios.get<RawJupApiResponse>(
    `https://api.jup.ag/price/v2?ids=${id}&vsToken=${vsId}`
  )

  return {
    price: Number(response.data.data[id].price)
  }
}

export const getTicksList = async (
  marketProgram: Market,
  data: Array<{ pair: Pair; index: number }>
): Promise<Array<Tick | null>> => {
  const ticksAddresses = await Promise.all(
    data.map(async ({ pair, index }) => {
      const { tickAddress } = await marketProgram.getTickAddress(pair, index)

      return tickAddress
    })
  )

  const ticks = await marketProgram.program.account.tick.fetchMultiple(ticksAddresses)

  return ticks.map(tick => (tick === null ? null : (tick as Tick)))
}

export const getPoolsAPY = async (name: string): Promise<Record<string, number>> => {
  try {
    const { data } = await axios.get<Record<string, number>>(
      `https://stats.invariant.app/pool_apy/${name}`
    )

    return data
  } catch (_err) {
    return {}
  }
}

export interface IncentiveRewardData {
  apy: number
  apySingleTick: number
  total: number
  token: string
}

export const getIncentivesRewardData = async (
  name: string
): Promise<Record<string, IncentiveRewardData>> => {
  try {
    const { data } = await axios.get<Record<string, IncentiveRewardData>>(
      `https://stats.invariant.app/incentive_rewards/${name}`
    )

    return data
  } catch (_err) {
    return {}
  }
}

export const getPoolsVolumeRanges = async (name: string): Promise<Record<string, Range[]>> => {
  try {
    const { data } = await axios.get<Record<string, Range[]>>(
      `https://stats.invariant.app/pool_volume_range/${name}`
    )

    return data
  } catch (_err) {
    return {}
  }
}

const PRIORITY_FEE_DENOMINATOR = 9

export const solToPriorityFee = (sol: number) => {
  return Math.round((sol * 5 * 10 ** PRIORITY_FEE_DENOMINATOR) / 10)
}

export const createLoaderKey = () => (new Date().getMilliseconds() + Math.random()).toString()

export const getMainnetCommonTokens = async (): Promise<PublicKey[]> => {
  const { data } = await axios.get('https://tokens.jup.ag/tokens?tags=verified')

  const commonTokens = data
    .slice(0, 8)
    .map((token: { address: string }) => new PublicKey(token.address))

  return commonTokens
}

export const numberToString = (number: number | bigint | string): string => {
  return String(number).includes('e-')
    ? Number(number).toFixed(parseInt(String(number).split('e-')[1]))
    : String(number)
}

export const containsOnlyZeroes = (string: string): boolean => {
  return /^(?!.*[1-9]).*$/.test(string)
}

export const printSubNumber = (amount: number): string => {
  return Array.from(String(amount))
    .map(char => subNumbers[+char])
    .join('')
}

export const countLeadingZeros = (str: string): number => {
  return (str.match(/^0+/) || [''])[0].length
}

export const formatNumber = (
  number: number | bigint | string,
  noDecimals?: boolean,
  decimalsAfterDot: number = 3
): string => {
  const numberAsNumber = Number(number)
  const isNegative = numberAsNumber < 0
  const absNumberAsNumber = Math.abs(numberAsNumber)

  if (absNumberAsNumber.toString().includes('e')) {
    const exponential = absNumberAsNumber.toExponential(decimalsAfterDot)
    return isNegative ? `-${exponential}` : exponential
  }

  const absNumberAsString = numberToString(absNumberAsNumber)

  if (containsOnlyZeroes(absNumberAsString)) {
    return '0'
  }

  const [beforeDot, afterDot] = absNumberAsString.split('.')

  let formattedNumber

  if (Math.abs(numberAsNumber) >= FormatConfig.B) {
    const formattedDecimals = noDecimals
      ? ''
      : (FormatConfig.DecimalsAfterDot ? '.' : '') +
        (beforeDot.slice(-FormatConfig.BDecimals) + (afterDot ? afterDot : '')).slice(
          0,
          FormatConfig.DecimalsAfterDot
        )

    formattedNumber =
      beforeDot.slice(0, -FormatConfig.BDecimals) + (noDecimals ? '' : formattedDecimals) + 'B'
  } else if (Math.abs(numberAsNumber) >= FormatConfig.M) {
    const formattedDecimals = noDecimals
      ? ''
      : (FormatConfig.DecimalsAfterDot ? '.' : '') +
        (beforeDot.slice(-FormatConfig.MDecimals) + (afterDot ? afterDot : '')).slice(
          0,
          FormatConfig.DecimalsAfterDot
        )
    formattedNumber =
      beforeDot.slice(0, -FormatConfig.MDecimals) + (noDecimals ? '' : formattedDecimals) + 'M'
  } else if (Math.abs(numberAsNumber) >= FormatConfig.K) {
    const formattedDecimals = noDecimals
      ? ''
      : (FormatConfig.DecimalsAfterDot ? '.' : '') +
        (beforeDot.slice(-FormatConfig.KDecimals) + (afterDot ? afterDot : '')).slice(
          0,
          FormatConfig.DecimalsAfterDot
        )
    formattedNumber =
      beforeDot.slice(0, -FormatConfig.KDecimals) + (noDecimals ? '' : formattedDecimals) + 'K'
  } else if (afterDot && countLeadingZeros(afterDot) <= decimalsAfterDot) {
    const roundedNumber = numberAsNumber
      .toFixed(countLeadingZeros(afterDot) + decimalsAfterDot + 1)
      .slice(0, -1)
    formattedNumber = trimZeros(roundedNumber)
  } else {
    const leadingZeros = afterDot ? countLeadingZeros(afterDot) : 0

    const parsedAfterDot =
      String(parseInt(afterDot)).length > decimalsAfterDot
        ? String(parseInt(afterDot)).slice(0, decimalsAfterDot)
        : afterDot
    formattedNumber = trimZeros(
      beforeDot +
        '.' +
        (parsedAfterDot
          ? leadingZeros > decimalsAfterDot
            ? '0' + printSubNumber(leadingZeros) + parseInt(parsedAfterDot)
            : parsedAfterDot
          : '')
    )
  }

  return isNegative ? '-' + formattedNumber : formattedNumber
}

export const trimDecimalZeros = (numStr: string): string => {
  if (/^[0.]+$/.test(numStr)) {
    return '0'
  }

  const withoutTrailingDot = numStr.replace(/\.$/, '')

  if (!withoutTrailingDot.includes('.')) {
    return withoutTrailingDot.replace(/^0+/, '') || '0'
  }

  const [integerPart, decimalPart] = withoutTrailingDot.split('.')

  const trimmedDecimal = decimalPart.replace(/0+$/, '')

  const trimmedInteger = integerPart.replace(/^0+/, '')

  return trimmedDecimal ? `${trimmedInteger || '0'}.${trimmedDecimal}` : trimmedInteger || '0'
}

export const stringToFixed = (string: string, numbersAfterDot: number): string => {
  return string.includes('.') ? string.slice(0, string.indexOf('.') + 1 + numbersAfterDot) : string
}

export const tickerToAddress = (network: NetworkType, ticker: string): string => {
  try {
    return getAddressTickerMap(network)[ticker].toString()
  } catch (error) {
    return ticker
  }
}

export const addressToTicker = (network: NetworkType, address: string): string => {
  return getReversedAddressTickerMap(network)[address] || address
}

export const initialXtoY = (tokenXAddress?: string, tokenYAddress?: string) => {
  if (!tokenXAddress || !tokenYAddress) {
    return true
  }

  const isTokeXStablecoin = STABLECOIN_ADDRESSES.includes(tokenXAddress)
  const isTokenYStablecoin = STABLECOIN_ADDRESSES.includes(tokenYAddress)

  return isTokeXStablecoin === isTokenYStablecoin || (!isTokeXStablecoin && !isTokenYStablecoin)
}

export const parseFeeToPathFee = (fee: BN): string => {
  const parsedFee = (fee / Math.pow(10, 8)).toString().padStart(3, '0')
  return parsedFee.slice(0, parsedFee.length - 2) + '_' + parsedFee.slice(parsedFee.length - 2)
}

export const parsePathFeeToFeeString = (pathFee: string): string => {
  return (+pathFee.replace('_', '') * Math.pow(10, 8)).toString()
}

export const shortenAddress = (address: string, chars = 4) =>
  `${address.slice(0, chars)}...${address.slice(-chars)}`
