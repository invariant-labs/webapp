import { calculatePriceSqrt, MAX_TICK, MIN_TICK, Pair } from '@invariant-labs/sdk'
import {
  Market,
  TICK_CROSSES_PER_IX,
  TICK_VIRTUAL_CROSSES_PER_IX,
  Tickmap
} from '@invariant-labs/sdk/lib/market'
import {
  CONCENTRATION_FACTOR,
  getMaxTick,
  getMinTick,
  PRICE_SCALE,
  Range
} from '@invariant-labs/sdk/lib/utils'
import { Decimal, PoolStructure, Tick } from '@invariant-labs/sdk/src/market'
import {
  DECIMAL,
  parseLiquidityOnTicks,
  simulateSwap,
  SimulationStatus
} from '@invariant-labs/sdk/src/utils'
import { BN } from '@project-serum/anchor'
import { PoolWithAddress } from '@store/reducers/pools'
import { PlotTickData, PositionWithoutTicks } from '@store/reducers/positions'
import { Token as SPLToken, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import axios from 'axios'
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
  USDC_DEV,
  USDH_DEV,
  USDT_DEV,
  VEMC2_DEV,
  VEMCK_DEV,
  WSOL_DEV,
  SNY_MAIN,
  WEN_MAIN,
  SUI_MAIN,
  WRAPPED_SOL_ADDRESS,
  NATIVE_TICK_CROSSES_PER_IX,
  ADDRESSES_TO_REVERT_TOKEN_PAIRS,
  POSITIONS_PER_PAGE,
  PRICE_QUERY_COOLDOWN,
  BASE_JUPITER_API_URL,
  Intervals
} from '@store/consts/static'
import mainnetList from '@store/consts/tokenLists/mainnet.json'
import { FormatConfig, subNumbers } from '@store/consts/static'
import { CoinGeckoAPIData, PriorityMode, Token } from '@store/consts/types'
import { sqrt } from '@invariant-labs/sdk/lib/math'
import { apyToApr } from './uiUtils'
import { alignTickToSpacing } from '@invariant-labs/sdk/src/tick'
import {
  mplTokenMetadata,
  fetchAllDigitalAsset,
  DigitalAsset,
  findMetadataPda,
  safeFetchMetadata
} from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { publicKey as umiPublicKey } from '@metaplex-foundation/umi'
import { TokenListProvider } from '@solana/spl-token-registry'

function resolveUriToHttp(uri?: string | null): string | null {
  if (!uri) return null
  if (uri.startsWith('ipfs://')) return uri.replace('ipfs://', 'https://dweb.link/ipfs/')
  if (uri.startsWith('ar://')) return uri.replace('ar://', 'https://arweave.net/')
  if (uri.startsWith('http://') || uri.startsWith('https://')) return uri
  return null
}

async function fetchJsonSafe(uri?: string | null): Promise<any | null> {
  try {
    const url = resolveUriToHttp(uri)
    if (!url) return null
    const res = await axios.get(url, { timeout: 10_000 })
    return res.data ?? null
  } catch (e) {
    console.warn('fetchJsonSafe error for', uri, e)
    return null
  }
}

export const getMarketNewTokensData = async (
  connection: Connection,
  mints: PublicKey[]
): Promise<Record<string, Token>> => {
  const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata())

  const tokenListProvider = new TokenListProvider()
  const tokenListContainer = await tokenListProvider.resolve()
  const tokenList = tokenListContainer.filterByClusterSlug('mainnet-beta').getList()

  const umiMints = mints.map(m => umiPublicKey(m.toBytes()))
  const assets = await fetchAllDigitalAsset(umi, umiMints)

  const converted = await Promise.all(
    assets.map(async asset => {
      const mintAddress = asset.publicKey.toString()
      const registryEntry = tokenList.find(t => t.address === mintAddress)
      const registryLogo = registryEntry?.logoURI ?? null

      let uri = asset.metadata.uri?.trim() || null

      if (!uri) {
        try {
          const mintUmiPub = umiPublicKey(new PublicKey(mintAddress).toBytes())
          const metadataPda = findMetadataPda(umi, { mint: mintUmiPub })
          const onchain = await safeFetchMetadata(umi, metadataPda)
          const rawUri = (onchain as any)?.data?.uri?.trim()
          if (rawUri) uri = rawUri
        } catch (err) {
          console.log(err)
        }
      }

      const metadataJson = await fetchJsonSafe(uri)
      const imageField = metadataJson?.image ?? metadataJson?.image_url ?? null

      const logoURI =
        resolveUriToHttp(imageField) ??
        resolveUriToHttp(registryLogo) ??
        resolveUriToHttp(uri) ??
        '/unknownToken.svg'

      return getTokenMetadata(asset, logoURI)
    })
  )

  return converted.reduce<Record<string, Token>>((acc, t) => {
    acc[t.address.toString()] = t
    return acc
  }, {})
}

export function getTokenMetadata(asset: DigitalAsset, resolvedImageUrl?: string | null): Token {
  const address = new PublicKey(asset.publicKey.toString())
  return {
    address,
    decimals: asset.mint?.decimals ?? 0,
    name: asset.metadata?.name ?? '',
    symbol: asset.metadata?.symbol ?? '',
    logoURI: resolvedImageUrl ?? '/unknownToken.svg',
    isUnknown: true
  }
}

export const transformBN = (amount: BN): string => {
  return (amount.div(new BN(1e2)).toNumber() / 1e4).toString()
}
export const printBN = (amount: BN, decimals: number): string => {
  if (!amount) {
    return '0'
  }
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

export const trimZeros = (numStr: string): string => {
  if (!numStr) {
    return ''
  }
  return numStr
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/^0+(\d)|(\d)0+$/gm, '$1$2')
    .replace(/\.$/, '')
}

export const convertBalanceToBN = (amount: string, decimals: number): BN => {
  const balanceString = amount.split('.')
  if (balanceString.length !== 2) {
    return new BN(balanceString[0] + '0'.repeat(decimals))
  }

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
      obj[SNY_MAIN.address.toString()] = SNY_MAIN
      obj[WEN_MAIN.address.toString()] = WEN_MAIN
      obj[SUI_MAIN.address.toString()] = SUI_MAIN
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
    let maxCrosses = TICK_CROSSES_PER_IX
    if (
      fromToken.toString() === WRAPPED_SOL_ADDRESS ||
      toToken.toString() === WRAPPED_SOL_ADDRESS
    ) {
      maxCrosses = NATIVE_TICK_CROSSES_PER_IX
    }

    try {
      const swapSimulateResult = simulateSwap({
        xToY: isXtoY,
        byAmountIn: byAmountIn,
        swapAmount: amount,
        slippage: slippage,
        pool: pool,
        ticks: ticks,
        tickmap: tickmaps[pool.tickmap.toString()],
        maxCrosses,
        maxVirtualCrosses: TICK_VIRTUAL_CROSSES_PER_IX
      })

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
        byAmountIn
          ? allFailedData.amountOut.lt(result)
          : allFailedData.amountOut.eq(MAX_U64)
            ? true
            : allFailedData.amountOut.lt(result)
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
        lastSwappedPrice: {
          lastJupiterSellPrice: string
          lastJupiterBuyPrice: string
        }
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
  lastBuyPrice?: number
  lastSellPrice?: number
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
        `${BASE_JUPITER_API_URL}/price/v3?ids=${idsChunk.join(',')}&showExtraInfo=true`
      )
  )

  const responses = await Promise.all(requests)
  const concatRes = responses.flatMap(response =>
    Object.values(response.data).map(({ id, usdPrice }) => ({ id, usdPrice }))
  )

  return concatRes.reduce<Record<string, TokenPriceData>>((acc, { id, usdPrice }) => {
    acc[id] = {
      price: Number(usdPrice),
      buyPrice: 0,
      sellPrice: 0,
      lastBuyPrice: 0,
      lastSellPrice: 0
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

export const calculateTickDelta = (
  tickSpacing: number,
  minimumRange: number,
  concentration: number
) => {
  const targetValue = 1 / (concentration * CONCENTRATION_FACTOR)

  const base = 1.0001
  const inner = 1 - targetValue
  const powered = Math.pow(inner, 4)
  const tickDiff = -Math.log(powered) / Math.log(base)

  const parsedTickDelta = tickDiff / tickSpacing - minimumRange / 2

  const tickDelta = Math.round(parsedTickDelta + 1)

  return tickDelta
}

export const calculateConcentrationRange = (
  tickSpacing: number,
  concentration: number,
  minimumRange: number,
  currentTick: number,
  isXToY: boolean
) => {
  const tickDelta = calculateTickDelta(tickSpacing, minimumRange, concentration)

  const lowerTick =
    tickDelta === 1
      ? currentTick - alignTickToSpacing((tickDelta * tickSpacing) / 2, tickSpacing)
      : currentTick - alignTickToSpacing((tickDelta * tickSpacing) / 2, tickSpacing) + tickSpacing
  const upperTick =
    currentTick + alignTickToSpacing((tickDelta * tickSpacing) / 2, tickSpacing) + tickSpacing

  return {
    leftRange: isXToY ? lowerTick : upperTick,
    rightRange: isXToY ? upperTick : lowerTick
  }
}

export const calculateConcentration = (lowerTick: number, upperTick: number) => {
  const deltaPrice = Math.pow(1.0001, -Math.abs(lowerTick - upperTick))

  const denominator = 1 - Math.pow(deltaPrice, 1 / 4)
  const result = 1 / denominator

  return Math.abs(result / CONCENTRATION_FACTOR)
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

  const results = await Promise.allSettled(promises)

  for (const [index, result] of results.entries()) {
    tokens[addresses[index].toString()] = generateUnknownTokenDataObject(
      addresses[index],
      result.status === 'fulfilled' ? result.value.decimals : 6
    )
  }

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
  const tokens = await getMarketNewTokensData(connection, [new PublicKey(address)])

  const [tokenAddress, tokenData] = Object.entries(tokens)[0]

  return {
    [tokenAddress]: tokenData
  }
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
  })) as PositionWithoutTicks[]
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

export const thresholdsWithTokenDecimal = (decimals: number): FormatNumberThreshold[] => [
  {
    value: 10,
    decimals
  },
  {
    value: 10000,
    decimals: 6
  },
  {
    value: 100000,
    decimals: 4
  },
  {
    value: 1000000,
    decimals: 3
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

export const getCoinGeckoTokenPrice = async (id: string) => {
  try {
    const { data } = await axios.get<CoinGeckoAPIData>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
    )
    return data[0]
  } catch (e) {}
}

export const getTokenPrice = async (
  address: string,
  coinGeckoId?: string
): Promise<TokenPriceData> => {
  const cachedPriceData = localStorage.getItem(`TOKEN_PRICE_DATA`)
  const priceData = cachedPriceData ? JSON.parse(cachedPriceData) : {}
  const lastQueryTimestamp = priceData[address]?.timestamp ?? 0

  let tokenPriceData = {
    price: 0,
    buyPrice: 0,
    sellPrice: 0
  }

  if (!priceData[address] || Number(lastQueryTimestamp) + PRICE_QUERY_COOLDOWN <= Date.now()) {
    try {
      const jupPrice = await getJupTokenPrice(address)

      if (jupPrice.price !== 0) {
        tokenPriceData = jupPrice
      } else if (coinGeckoId) {
        const coingeckoPrice = await getCoinGeckoTokenPrice(coinGeckoId)
        tokenPriceData = {
          price: coingeckoPrice?.current_price || 0,
          buyPrice: coingeckoPrice?.current_price || 0,
          sellPrice: coingeckoPrice?.current_price || 0
        }
      }
      priceData[address] = { ...tokenPriceData, timestamp: Date.now() }
    } catch (e: unknown) {
      console.error(e)
    }
  }

  localStorage.setItem('TOKEN_PRICE_DATA', JSON.stringify(priceData))
  return priceData[address]
}

export const getJupTokenPrice = async (id: string): Promise<TokenPriceData> => {
  try {
    const response = await axios.get<RawJupApiResponse>(
      `${BASE_JUPITER_API_URL}/price/v3?ids=${id}`
    )

    return {
      price: Number(response.data[id].usdPrice),
      buyPrice: 0,
      sellPrice: 0,
      lastBuyPrice: 0,
      lastSellPrice: 0
    }
  } catch (error) {
    return {
      buyPrice: 0,
      price: 0,
      sellPrice: 0
    }
  }
}

export const getJupTokensRatioPrice = async (
  id: string,
  vsId: string
): Promise<Omit<TokenPriceData, 'buyPrice' | 'sellPrice'>> => {
  const idResponse = await axios.get<RawJupApiResponse>(
    `${BASE_JUPITER_API_URL}/price/v3?ids=${id}`
  )

  const vsIdResponse = await axios.get<RawJupApiResponse>(
    `${BASE_JUPITER_API_URL}/price/v3?ids=${vsId}`
  )
  const tokensRatio = idResponse.data[id].usdPrice / vsIdResponse.data[vsId].usdPrice

  return {
    price: tokensRatio
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

export const numberToString = (number: number | bigint | string): string => {
  if (typeof number === 'bigint') {
    return number.toString()
  }

  const numStr = String(number)

  if (numStr.includes('e')) {
    const [base, exp] = numStr.split('e')
    const exponent = parseInt(exp, 10)

    if (exponent < 0) {
      const decimalPlaces = Math.abs(exponent) + base.replace('.', '').length - 1
      return Number(number).toFixed(decimalPlaces)
    }

    return Number(number).toString()
  }

  return numStr
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
export const formatNumberWithSuffix = (
  number: number | bigint | string,
  noDecimals?: boolean,
  decimalsAfterDot: number = 3
): string => {
  const numberAsNumber = Number(number)
  const isNegative = numberAsNumber < 0
  const absNumberAsNumber = Math.abs(numberAsNumber)

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

    if (parsedAfterDot) {
      formattedNumber =
        beforeDot +
        '.' +
        (parsedAfterDot
          ? leadingZeros > decimalsAfterDot
            ? '0' + printSubNumber(leadingZeros) + trimZeros(parsedAfterDot)
            : trimZeros(parsedAfterDot)
          : '')
    } else {
      formattedNumber = beforeDot
    }
  }

  return isNegative ? '-' + formattedNumber : formattedNumber
}

function trimEndingZeros(num) {
  return num.toString().replace(/0+$/, '')
}

export const formatNumberWithoutSuffix = (
  number: number | bigint | string,
  options?: { twoDecimals?: boolean }
): string => {
  const numberAsNumber = Number(number)
  const isNegative = numberAsNumber < 0
  const absNumberAsNumber = Math.abs(numberAsNumber)

  if (options?.twoDecimals) {
    if (absNumberAsNumber === 0) {
      return '0'
    }
    if (absNumberAsNumber > 0 && absNumberAsNumber < 0.01) {
      return isNegative ? '-<0.01' : '<0.01'
    }
    return isNegative
      ? '-' + absNumberAsNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : absNumberAsNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const absNumberAsString = numberToString(absNumberAsNumber)
  const [beforeDot, afterDot] = absNumberAsString.split('.')

  const leadingZeros = afterDot ? countLeadingZeros(afterDot) : 0

  const parsedBeforeDot = beforeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const parsedAfterDot =
    leadingZeros >= 4 && absNumberAsNumber < 1
      ? '0' + printSubNumber(leadingZeros) + trimEndingZeros(String(parseInt(afterDot)).slice(0, 3))
      : trimEndingZeros(String(afterDot).slice(0, absNumberAsNumber >= 1 ? 2 : leadingZeros + 3))

  const formattedNumber = parsedBeforeDot + (afterDot && parsedAfterDot ? '.' + parsedAfterDot : '')

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

export const stringToFixed = (
  string: string,
  numbersAfterDot: number,
  trimZeros?: boolean
): string => {
  const toFixedString = string.includes('.')
    ? string.slice(0, string.indexOf('.') + 1 + numbersAfterDot)
    : string

  if (trimZeros) {
    return trimDecimalZeros(toFixedString)
  } else {
    return toFixedString
  }
}

export const tickerToAddress = (network: NetworkType, ticker: string): string => {
  return getAddressTickerMap(network)[ticker] || ticker
}

export const addressToTicker = (network: NetworkType, address: string): string => {
  return getReversedAddressTickerMap(network)[address] || address
}

export const initialXtoY = (tokenXAddress?: string | null, tokenYAddress?: string | null) => {
  if (!tokenXAddress || !tokenYAddress) {
    return true
  }

  const tokenXIndex = ADDRESSES_TO_REVERT_TOKEN_PAIRS.findIndex(token => token === tokenXAddress)
  const tokenYIndex = ADDRESSES_TO_REVERT_TOKEN_PAIRS.findIndex(token => token === tokenYAddress)

  if (tokenXIndex === -1 || tokenYIndex === -1) {
    return true
  }

  if (tokenXIndex !== -1 && tokenYIndex !== -1) {
    if (tokenXIndex < tokenYIndex) {
      return false
    } else {
      return true
    }
  } else if (tokenXIndex > tokenYIndex) {
    return true
  } else {
    return false
  }
}

export const parseFeeToPathFee = (fee: BN): string => {
  const parsedFee = (fee / Math.pow(10, 8)).toString().padStart(3, '0')
  return parsedFee.slice(0, parsedFee.length - 2) + '_' + parsedFee.slice(parsedFee.length - 2)
}

export const parsePathFeeToFeeString = (pathFee: string): string => {
  return (+pathFee.replace('_', '') * Math.pow(10, 8)).toString()
}

export const shortenAddress = (address: string, chars = 4) =>
  address.length > 8 ? `${address.slice(0, chars)}...${address.slice(-chars)}` : address

export const getConcentrationIndex = (concentrationArray: number[], neededValue: number = 34) => {
  let concentrationIndex = 0

  for (let index = 0; index < concentrationArray.length; index++) {
    const value = +concentrationArray[index].toFixed(0)

    if (value === neededValue) {
      break
    } else if (value > neededValue) {
      concentrationIndex = index - 1
      break
    } else {
      concentrationIndex = index + 1
    }
  }

  return concentrationIndex
}

export const getCurrentDynamicFee = async (): Promise<number> => {
  const response = await fetch('https://solanacompass.com/api/fees')
  const data = await response.json()
  return data['15'].avg
}

export const calculatePriorityFee = (fee: number, priorityMode: PriorityMode): number => {
  switch (priorityMode) {
    case PriorityMode.Economic:
      return +(fee / 4).toFixed(9)
    case PriorityMode.Market:
      return +fee.toFixed(9)
    case PriorityMode.High:
      return +(fee * 1.5).toFixed(9)
    case PriorityMode.Turbo:
      return +(fee * 3).toFixed(9)
    default:
      return 0.000005
  }
}

export const generatePositionTableLoadingData = () => {
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  return Array(POSITIONS_PER_PAGE)
    .fill(null)
    .map((_, index) => {
      const currentPrice = Math.random() * 10000

      return {
        id: `loading-${index}`,
        address: `pool-${index}`,
        tokenXName: 'ETH',
        tokenYName: 'USDC',
        tokenXIcon: undefined,
        tokenYIcon: undefined,
        currentPrice,
        fee: getRandomNumber(1, 10) / 10,
        min: currentPrice * 0.8,
        max: currentPrice * 1.2,
        position: getRandomNumber(1000, 10000),
        valueX: getRandomNumber(1000, 10000),
        valueY: getRandomNumber(1000, 10000),
        poolData: {},
        isActive: Math.random() > 0.5,
        tokenXLiq: getRandomNumber(100, 1000),
        tokenYLiq: getRandomNumber(10000, 100000),
        network: NetworkType.Mainnet,
        unclaimedFeesInUSD: { value: 0, loading: true }
      }
    })
}
export const ROUTES = {
  ROOT: '/',
  EXCHANGE: '/exchange',
  EXCHANGE_WITH_PARAMS: '/exchange/:item1?/:item2?',
  LIQUIDITY: '/liquidity',
  STATISTICS: '/statistics',
  NEW_POSITION: '/newPosition',
  NEW_POSITION_WITH_PARAMS: '/newPosition/:item1?/:item2?/:item3?',
  POSITION: '/position',
  POSITION_WITH_ID: '/position/:id',
  PORTFOLIO: '/portfolio',

  getExchangeRoute: (item1?: string, item2?: string): string => {
    const parts = [item1, item2].filter(Boolean)
    return `${ROUTES.EXCHANGE}${parts.length ? '/' + parts.join('/') : ''}`
  },

  getNewPositionRoute: (item1?: string, item2?: string, item3?: string): string => {
    const parts = [item1, item2, item3].filter(Boolean)
    return `${ROUTES.NEW_POSITION}${parts.length ? '/' + parts.join('/') : ''}`
  },

  getPositionRoute: (id: string): string => `${ROUTES.POSITION}/${id}`
}

export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'

  stringified = JSON.stringify(value)

  const error = new Error(stringified)
  return error
}

export const getTicksFromPositions = async (
  marketProgram: Market,
  positionsData: {
    pair: Pair
    position: PositionWithoutTicks
  }[]
): Promise<(Tick | null)[]> => {
  try {
    const tickAddressPromises: Promise<PublicKey>[] = []

    for (const data of positionsData) {
      tickAddressPromises.push(
        marketProgram
          .getTickAddress(data.pair, data.position.lowerTickIndex)
          .then(res => res.tickAddress),
        marketProgram
          .getTickAddress(data.pair, data.position.upperTickIndex)
          .then(res => res.tickAddress)
      )
    }

    const tickAddresses = await Promise.all(tickAddressPromises)

    const ticks = (await marketProgram.program.account.tick.fetchMultiple(
      tickAddresses
    )) as Array<Tick | null>

    return ticks
  } catch (error) {
    console.log(error)
    return []
  }
}

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength + 1) {
    return str
  }

  return str.slice(0, maxLength) + '...'
}

export const formatNumberWithCommas = (number: string) => {
  const trimmedNumber = number.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')

  return trimmedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const removeAdditionalDecimals = (value: string, desiredDecimals: number): string => {
  const dotIndex = value.indexOf('.')
  if (dotIndex === -1) {
    return value
  }
  const decimals = value.length - dotIndex - 1
  if (decimals > desiredDecimals) {
    const sliced = value.slice(0, dotIndex + desiredDecimals + 1)
    const lastCommaIndex = sliced.lastIndexOf(',')

    if (lastCommaIndex === -1 || lastCommaIndex < dotIndex) {
      return sliced
    }

    return value.slice(0, lastCommaIndex) + value.slice(lastCommaIndex + 1, lastCommaIndex + 2)
  } else {
    return value
  }
}

const poolsToRecalculateAPY: string[] = []

export const calculateAPYAndAPR = (
  apy: number,
  poolAddress?: string,
  volume?: number,
  fee?: number,
  tvl?: number
) => {
  if (volume === undefined || fee === undefined || tvl === undefined) {
    return { convertedApy: Math.abs(apy), convertedApr: Math.abs(apyToApr(apy)) }
  }

  if (poolsToRecalculateAPY.includes(poolAddress ?? '')) {
    const parsedApr = ((volume * fee) / tvl) * 365

    const parsedApy = (Math.pow((volume * fee * 0.01) / tvl + 1, 365) - 1) * 100

    return { convertedApy: Math.abs(parsedApy), convertedApr: Math.abs(parsedApr) }
  } else {
    return { convertedApy: Math.abs(apy), convertedApr: Math.abs(apyToApr(apy)) }
  }
}

export const getPositionByIdAndPoolAddress = async (
  marketProgram: Market,
  id: string,
  poolAddress: string
): Promise<PositionWithoutTicks | null> => {
  const positions = await marketProgram.program.account.position.all([
    {
      memcmp: {
        bytes: bs58.encode(new PublicKey(poolAddress).toBuffer()),
        offset: 40
      }
    },
    {
      memcmp: {
        bytes: bs58.encode(new BN(id).toBuffer('le', 16)),
        offset: 72
      }
    }
  ])

  return positions[0]
    ? {
        ...positions[0].account,
        feeGrowthInsideX: positions[0].account.feeGrowthInsideX,
        feeGrowthInsideY: positions[0].account.feeGrowthInsideY,
        liquidity: positions[0].account.liquidity,
        secondsPerLiquidityInside: positions[0].account.secondsPerLiquidityInside,
        tokensOwedX: positions[0].account.tokensOwedX,
        tokensOwedY: positions[0].account.tokensOwedY,
        address: positions[0].publicKey
      }
    : null
}
export const calculatePercentageRatio = (
  tokenXLiq: number,
  tokenYLiq: number,
  currentPrice: number,
  xToY: boolean
) => {
  const firstTokenPercentage =
    ((tokenXLiq * currentPrice) / (tokenYLiq + tokenXLiq * currentPrice)) * 100
  const tokenXPercentageFloat = xToY ? firstTokenPercentage : 100 - firstTokenPercentage
  const tokenXPercentage =
    tokenXPercentageFloat > 50
      ? Math.floor(tokenXPercentageFloat)
      : Math.ceil(tokenXPercentageFloat)

  return {
    tokenXPercentage,
    tokenYPercentage: 100 - tokenXPercentage
  }
}

export const getIntervalsFullSnap = async (
  name: string,
  interval: Intervals
): Promise<FullSnap> => {
  const parsedInterval =
    interval === Intervals.Daily
      ? 'daily'
      : interval === Intervals.Weekly
        ? 'weekly'
        : interval === Intervals.Monthly
          ? 'monthly'
          : 'yearly'
  const { data } = await axios.get<FullSnap>(
    `https://stats.invariant.app/solana/intervals/solana-${name}?interval=${parsedInterval}`
  )
  return data
}
