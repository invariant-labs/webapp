import { calculatePriceSqrt, MAX_TICK, MIN_TICK, Pair, TICK_LIMIT } from '@invariant-labs/sdk'
import { Decimal, PoolStructure, Tick } from '@invariant-labs/sdk/src/market'
import { DECIMAL, parseLiquidityOnTicks, simulateSwap } from '@invariant-labs/sdk/src/utils'
import { BN } from '@project-serum/anchor'
import { PlotTickData } from '@reducers/positions'
import { u64 } from '@solana/spl-token'
import {
  BTC_DEV,
  MSOL_DEV,
  NetworkType,
  PRICE_DECIMAL,
  RENDOGE_DEV,
  Token,
  USDC_DEV,
  USDT_DEV,
  WSOL_DEV
} from './static'
import mainnetList from './tokenLists/mainnet.json'
import { PublicKey } from '@solana/web3.js'
import { PoolWithAddress } from '@reducers/pools'
import { Market, Tickmap } from '@invariant-labs/sdk/lib/market'
import axios, { AxiosResponse } from 'axios'

export const tou64 = (amount: BN | String) => {
  // eslint-disable-next-line new-cap
  return new u64(amount.toString())
}
export const transformBN = (amount: BN): string => {
  // eslint-disable-next-line new-cap
  return (amount.div(new BN(1e2)).toNumber() / 1e4).toString()
}
export const printBN = (amount: BN, decimals: number): string => {
  const balanceString = amount.toString()
  if (balanceString.length <= decimals) {
    return '0.' + '0'.repeat(decimals - balanceString.length) + balanceString
  } else {
    return trimZeros(
      balanceString.substring(0, balanceString.length - decimals) +
        '.' +
        balanceString.substring(balanceString.length - decimals)
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
export const printBNtoBN = (amount: string, decimals: number): BN => {
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

const defaultThresholds: FormatNumberThreshold[] = [
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

export const calcYPerXPrice = (sqrtPrice: BN, xDecimal: number, yDecimal: number): number => {
  const sqrt = +printBN(sqrtPrice, PRICE_DECIMAL)
  const proportion = sqrt * sqrt

  return proportion / 10 ** (yDecimal - xDecimal)
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
  const parsedTicks = rawTicks.length ? parseLiquidityOnTicks(sortedTicks, pool) : []

  const ticks = rawTicks.map((raw, index) => ({
    ...raw,
    liqudity: parsedTicks[index].liquidity
  }))

  const ticksData: PlotTickData[] = []

  const min = minSpacingMultiplicity(pool.tickSpacing)
  const max = maxSpacingMultiplicity(pool.tickSpacing)

  if (!ticks.length || ticks[0].index !== min) {
    const minPrice = calcPrice(min, isXtoY, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: minPrice,
      y: 0,
      index: min
    })
  }

  ticks.forEach((tick, i) => {
    if (i === 0 && tick.index - pool.tickSpacing > min) {
      const price = calcPrice(tick.index - pool.tickSpacing, isXtoY, tokenXDecimal, tokenYDecimal)
      ticksData.push({
        x: price,
        y: 0,
        index: tick.index - pool.tickSpacing
      })
    } else if (i > 0 && tick.index - pool.tickSpacing > ticks[i - 1].index) {
      const price = calcPrice(tick.index - pool.tickSpacing, isXtoY, tokenXDecimal, tokenYDecimal)
      ticksData.push({
        x: price,
        y: +printBN(ticks[i - 1].liqudity, DECIMAL),
        index: tick.index - pool.tickSpacing
      })
    }

    const price = calcPrice(tick.index, isXtoY, tokenXDecimal, tokenYDecimal)
    ticksData.push({
      x: price,
      y: +printBN(ticks[i].liqudity, DECIMAL),
      index: tick.index
    })
  })

  if (!ticks.length) {
    const maxPrice = calcPrice(max, isXtoY, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: maxPrice,
      y: 0,
      index: max
    })
  } else if (ticks[ticks.length - 1].index !== max) {
    if (max - ticks[ticks.length - 1].index > pool.tickSpacing) {
      const price = calcPrice(
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

    const maxPrice = calcPrice(max, isXtoY, tokenXDecimal, tokenYDecimal)

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

  const min = minSpacingMultiplicity(tickSpacing)
  const max = maxSpacingMultiplicity(tickSpacing)

  const minPrice = calcPrice(min, isXtoY, tokenXDecimal, tokenYDecimal)

  ticksData.push({
    x: minPrice,
    y: yValueToFill,
    index: min
  })

  const maxPrice = calcPrice(max, isXtoY, tokenXDecimal, tokenYDecimal)

  ticksData.push({
    x: maxPrice,
    y: yValueToFill,
    index: max
  })

  return isXtoY ? ticksData : ticksData.reverse()
}

export const getNetworkTokensList = (networkType: NetworkType): Record<string, Token> => {
  switch (networkType) {
    case NetworkType.MAINNET:
      return mainnetList.reduce(
        (all, token) => ({
          ...all,
          [token.address]: {
            ...token,
            address: new PublicKey(token.address),
            coingeckoId: token?.extensions?.coingeckoId
          }
        }),
        {}
      )
    case NetworkType.DEVNET:
      return {
        [USDC_DEV.address.toString()]: USDC_DEV,
        [USDT_DEV.address.toString()]: USDT_DEV,
        [MSOL_DEV.address.toString()]: MSOL_DEV,
        [BTC_DEV.address.toString()]: BTC_DEV,
        [WSOL_DEV.address.toString()]: WSOL_DEV,
        [RENDOGE_DEV.address.toString()]: RENDOGE_DEV
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

export const nearestSpacingMultiplicity = (arg: number, spacing: number) => {
  const greater = spacingMultiplicityGte(arg, spacing)
  const lower = spacingMultiplicityLte(arg, spacing)

  const nearest = Math.abs(greater - arg) < Math.abs(lower - arg) ? greater : lower

  return Math.max(
    Math.min(nearest, maxSpacingMultiplicity(spacing)),
    minSpacingMultiplicity(spacing)
  )
}

export const nearestTickIndex = (
  price: number,
  spacing: number,
  isXtoY: boolean,
  xDecimal: number,
  yDecimal: number
) => {
  const base = Math.max(price, calcPrice(isXtoY ? MIN_TICK : MAX_TICK, isXtoY, xDecimal, yDecimal))
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

export const calcPrice = (index: number, isXtoY: boolean, xDecimal: number, yDecimal: number) => {
  const price = calcYPerXPrice(calculatePriceSqrt(index).v, xDecimal, yDecimal)

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

  return printBNtoBN(knownPrice.toString(), 0)
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
  error: string
}> => {
  const filteredPools = findPairs(fromToken, toToken, pools)
  let swapSimulateRouterAmount: BN = new BN(-1)
  let errorMessage: string = ''
  let poolIndex: number = 0
  let isXtoY = false
  let resultWithFee: BN = new BN(0)
  let result
  let estimatedPrice: BN = new BN(0)

  if (amount.eq(new BN(0))) {
    return {
      amountOut: new BN(0),
      poolIndex: poolIndex,
      AmountOutWithFee: new BN(0),
      estimatedPriceAfterSwap: new BN(0),
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
      const swapSimulateResult = await simulateSwap({
        xToY: isXtoY,
        byAmountIn: byAmountIn,
        swapAmount: amount,
        priceLimit: {
          v: isXtoY ? new BN(1) : new BN('340282366920938463463374607431768211455')
        },
        slippage: slippage,
        pool: pool,
        ticks: ticks,
        tickmap: tickmaps[pool.tickmap.toString()]
      })

      if (swapSimulateResult.amountPerTick.length >= 8) {
        throw new Error('Too large amount')
      }
      console.log(swapSimulateResult.accumulatedAmountOut.toString())
      if (!byAmountIn) {
        result = swapSimulateResult.accumulatedAmountIn.add(swapSimulateResult.accumulatedFee)
      } else {
        result = swapSimulateResult.accumulatedAmountOut
      }
      if (swapSimulateRouterAmount.lt(result)) {
        resultWithFee = result.add(swapSimulateResult.accumulatedFee)
        poolIndex = findPoolIndex(pool.address, pools)
        swapSimulateRouterAmount = result
        estimatedPrice = swapSimulateResult.priceAfterSwap
      }
    } catch (err: any) {
      errorMessage = err.toString()
      console.log(err.toString())
    }
  }
  if (swapSimulateRouterAmount.lt(new BN(0))) {
    return {
      amountOut: new BN(0),
      poolIndex: poolIndex,
      AmountOutWithFee: new BN(0),
      estimatedPriceAfterSwap: new BN(0),
      error: errorMessage
    }
  }

  return {
    amountOut: swapSimulateRouterAmount,
    poolIndex: poolIndex,
    AmountOutWithFee: resultWithFee,
    estimatedPriceAfterSwap: estimatedPrice,
    error: ''
  }
}

export const minSpacingMultiplicity = (spacing: number) => {
  return Math.max(spacingMultiplicityGte(MIN_TICK, spacing), -(TICK_LIMIT - 2) * spacing)
}

export const maxSpacingMultiplicity = (spacing: number) => {
  return Math.min(spacingMultiplicityLte(MAX_TICK, spacing), (TICK_LIMIT - 2) * spacing)
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

export interface PoolSnapshot {
  timestamp: number
  volumeX: string
  volumeY: string
  liquidityX: string
  liquidityY: string
  feeX: string
  feeY: string
}

export const getNetworkStats = async (name: string): Promise<Record<string, PoolSnapshot[]>> => {
  const { data } = await axios.get<Record<string, PoolSnapshot[]>>(`https://api.invariant.app/stats/${name}`)

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

export interface CoingeckoApiPriceData {
  current_price: number
  price_change_percentage_24h: number
}

export interface CoingeckoPriceData {
  price: number
  priceChange: number
}

export const getCoingeckoPricesData = async (ids: string[]): Promise<CoingeckoPriceData[]> => {
  const requests: Array<Promise<AxiosResponse<CoingeckoApiPriceData[]>>> = []
  for (let i = 0; i < ids.length; i += 250) {
    const idsSlice = ids.slice(i, i + 250)
    const idsList = idsSlice.reduce((acc, id, index) => acc + id + (index < 249 ? ',' : ''), '')
    requests.push(axios.get<CoingeckoApiPriceData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsList}&per_page=250`))
  }

  return await Promise.all(requests).then((responses) => {
    const concatRes: CoingeckoApiPriceData[] = responses.map(res => res.data).reduce((acc, data) => [...acc, ...data], [])

    return concatRes.map((tokenData) => ({
      price: tokenData.current_price,
      priceChange: tokenData.price_change_percentage_24h
    }))
  })
}
