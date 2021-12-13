import { calculate_price_sqrt, DENOMINATOR, MAX_TICK, MIN_TICK } from '@invariant-labs/sdk'
import { PoolStructure, Tick } from '@invariant-labs/sdk/src/market'
import { parseLiquidityOnTicks } from '@invariant-labs/sdk/src/utils'
import { BN } from '@project-serum/anchor'
import { PlotTickData } from '@reducers/positions'
import { u64 } from '@solana/spl-token'
import { PRICE_DECIMAL, tokens } from './static'

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
const zeroPad = (num: string, places: number) => num.padStart(places, '0')

export const showPrefix = (nr: number) => {
  if (nr >= 10000) {
    if (nr >= 1000000) {
      if (nr >= 1000000000) {
        return 'B'
      } else {
        return 'M'
      }
    } else {
      return 'K'
    }
  } else {
    return ''
  }
}

export const formatNumbers = (value: string) => {
  const num = Number(value)

  if (num < 10) {
    return num.toFixed(4)
  }

  if (num < 1000) {
    return num.toFixed(2)
  }

  if (num < 10000) {
    return num.toFixed(1)
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(2)
  }
  if (num < 1000000000) {
    return (num / 1000000).toFixed(2)
  }

  return (num / 1000000000).toFixed(2)
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

export const calcTicksAmountInRange = (min: number, max: number, tickSpacing: number): number => {
  const minIndex = logBase(min, 1.0001)
  const maxIndex = logBase(max, 1.0001)

  return Math.ceil((maxIndex - minIndex) / tickSpacing)
}

export const calcYPerXPrice = (sqrtPrice: BN, xDecimal: number, yDecimal: number): number => {
  const price = sqrtPrice.mul(sqrtPrice).div(DENOMINATOR).div(new BN(10 ** xDecimal))

  return +printBN(price, yDecimal)
}

export const createLiquidityPlot = (
  rawTicks: Tick[],
  pool: PoolStructure,
  isXtoY: boolean
) => {
  const tokenXDecimal = tokens.find((token) => token.address.equals(pool.tokenX))?.decimal ?? 0
  const tokenYDecimal = tokens.find((token) => token.address.equals(pool.tokenY))?.decimal ?? 0

  const parsedTicks = rawTicks.length ? parseLiquidityOnTicks(rawTicks, pool) : []

  const ticks = rawTicks.map((raw, index) => ({
    ...raw,
    liqudity: parsedTicks[index].liquidity
  }))

  const ticksData: PlotTickData[] = []

  ticks.forEach((tick, index) => {
    const price = calcYPerXPrice(tick.sqrtPrice.v, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: isXtoY
        ? price
        : (
          price !== 0
            ? 1 / price
            : Number.MAX_SAFE_INTEGER
        ),
      y: +printBN(tick.liqudity, PRICE_DECIMAL),
      index: tick.index
    })

    if (index < ticks.length - 1 && ticks[index + 1].index - ticks[index].index > pool.tickSpacing) {
      for (let i = ticks[index].index + pool.tickSpacing; i < ticks[index + 1].index; i += pool.tickSpacing) {
        const price = calcYPerXPrice(calculate_price_sqrt(i).v, tokenXDecimal, tokenYDecimal)

        ticksData.push({
          x: isXtoY
            ? price
            : (
              price !== 0
                ? 1 / price
                : Number.MAX_SAFE_INTEGER
            ),
          y: +printBN(tick.liqudity, PRICE_DECIMAL),
          index: i
        })
      }
    }
  })

  if (!ticksData.length) {
    const price = calcYPerXPrice(pool.sqrtPrice.v, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: isXtoY
        ? price
        : (
          price !== 0
            ? 1 / price
            : Number.MAX_SAFE_INTEGER
        ),
      y: 0,
      index: pool.currentTickIndex
    })
  }

  for (let i = (ticks.length ? ticks[0].index : pool.currentTickIndex) - pool.tickSpacing; i >= MIN_TICK; i -= pool.tickSpacing) {
    const price = calcYPerXPrice(calculate_price_sqrt(i).v, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: isXtoY
        ? price
        : (
          price !== 0
            ? 1 / price
            : Number.MAX_SAFE_INTEGER
        ),
      y: 0,
      index: i
    })
  }

  for (let i = (ticks.length ? ticks[ticks.length - 1].index : pool.currentTickIndex) + pool.tickSpacing; i <= MAX_TICK; i += pool.tickSpacing) {
    const price = calcYPerXPrice(calculate_price_sqrt(i).v, tokenXDecimal, tokenYDecimal)

    ticksData.push({
      x: isXtoY
        ? price
        : (
          price !== 0
            ? 1 / price
            : Number.MAX_SAFE_INTEGER
        ),
      y: 0,
      index: i
    })
  }

  return ticksData.sort((a, b) => a.x - b.x)
}
