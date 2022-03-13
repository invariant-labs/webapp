import { actions, PoolStatsData, TimeData, TokenStatsData } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import {
  getCoingeckoPricesData,
  getCoingeckoPricesHistory,
  getNetworkStats,
  getPoolsFromAdresses,
  PoolSnapshot,
  printBN,
  printBNtoBN
} from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { PoolWithAddress } from '@reducers/pools'
import { Token } from '@consts/static'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { BN } from '@project-serum/anchor'

interface Diff24 {
  prev: number
  current: number
}

const get24HValueDiffData = (
  snapshots: PoolSnapshot[],
  key: 'volumeX' | 'volumeY' | 'feeX' | 'feeY',
  tokenDecimals: number,
  tokenPriceHistory: Record<string, number>
): Diff24 => {
  if (!snapshots.length) {
    return {
      prev: 0,
      current: 0
    }
  }

  const lastSnapshot = snapshots[snapshots.length - 1]
  const lastTimestamp = lastSnapshot.timestamp
  const lastPrice = tokenPriceHistory[lastTimestamp]
    ? printBNtoBN(tokenPriceHistory[lastTimestamp].toFixed(DECIMAL), DECIMAL)
    : new BN(0)

  let currentBN: BN
  let prevBN: BN

  if (snapshots.length > 1) {
    const secondLastSnapshot = snapshots[snapshots.length - 2]
    const secondLastTimestamp = secondLastSnapshot.timestamp
    const secondLastPrice = tokenPriceHistory[secondLastTimestamp]
      ? printBNtoBN(tokenPriceHistory[secondLastTimestamp].toFixed(DECIMAL), DECIMAL)
      : new BN(0)

    currentBN = new BN(lastSnapshot[key])
      .sub(new BN(secondLastSnapshot[key]))
      .mul(lastPrice)
      .div(new BN(10 ** DECIMAL))

    if (snapshots.length > 2) {
      const thirdLastSnapshot = snapshots[snapshots.length - 3]

      prevBN = new BN(secondLastSnapshot[key])
        .sub(new BN(thirdLastSnapshot[key]))
        .mul(secondLastPrice)
        .div(new BN(10 ** DECIMAL))
    } else {
      prevBN = new BN(secondLastSnapshot[key]).mul(secondLastPrice).div(new BN(10 ** DECIMAL))
    }
  } else {
    currentBN = new BN(lastSnapshot[key]).mul(lastPrice).div(new BN(10 ** DECIMAL))
    prevBN = new BN(0)
  }

  return {
    prev: +printBN(prevBN, tokenDecimals),
    current: +printBN(currentBN, tokenDecimals)
  }
}

const get24HLiquidityDiffData = (
  snapshots: PoolSnapshot[],
  key: 'liquidityX' | 'liquidityY',
  tokenDecimals: number,
  tokenPriceHistory: Record<string, number>
): Diff24 => {
  if (!snapshots.length) {
    return {
      prev: 0,
      current: 0
    }
  }

  const lastSnapshot = snapshots[snapshots.length - 1]
  const lastTimestamp = lastSnapshot.timestamp
  const lastPrice = tokenPriceHistory[lastTimestamp]
    ? printBNtoBN(tokenPriceHistory[lastTimestamp].toFixed(DECIMAL), DECIMAL)
    : new BN(0)

  let currentBN: BN = new BN(lastSnapshot[key]).mul(lastPrice).div(new BN(10 ** DECIMAL))
  let prevBN: BN

  if (snapshots.length > 1) {
    const secondLastSnapshot = snapshots[snapshots.length - 2]
    const secondLastTimestamp = secondLastSnapshot.timestamp
    const secondLastPrice = tokenPriceHistory[secondLastTimestamp]
      ? printBNtoBN(tokenPriceHistory[secondLastTimestamp].toFixed(DECIMAL), DECIMAL)
      : new BN(0)

    prevBN = new BN(secondLastSnapshot[key]).mul(secondLastPrice).div(new BN(10 ** DECIMAL))
  } else {
    prevBN = new BN(0)
  }

  return {
    prev: +printBN(prevBN, tokenDecimals),
    current: +printBN(currentBN, tokenDecimals)
  }
}

export function* getStats(): Generator {
  try {
    const currentNetwork = yield* select(network)
    const data = yield* call(getNetworkStats, currentNetwork.toLowerCase())

    const marketProgram = yield* call(getMarketProgram)

    const allPoolsData = yield* call(
      getPoolsFromAdresses,
      Object.keys(data).map(addr => new PublicKey(addr)),
      marketProgram
    )
    const poolsDataObject: Record<string, PoolWithAddress> = allPoolsData.reduce(
      (acc, pool) => ({
        ...acc,
        [pool.address.toString()]: pool
      }),
      {}
    )

    const existingPoolsData: Record<string, PoolSnapshot[]> = Object.entries(data).reduce(
      (acc, [key, val]) =>
        typeof poolsDataObject[key] !== 'undefined'
          ? {
              ...acc,
              [key]: val
            }
          : acc,
      {}
    )

    const allTokens = yield* select(tokens)
    const coingeckoTokens: Record<string, Required<Token>> = Object.entries(allTokens).reduce(
      (acc, [key, val]) =>
        typeof val.coingeckoId !== 'undefined'
          ? {
              ...acc,
              [key]: val
            }
          : acc,
      {}
    )
    const coingeckoPricesData = yield* call(
      getCoingeckoPricesData,
      Object.values(coingeckoTokens).map(token => token.coingeckoId)
    )
    const coingeckoPricesHistory = yield* call(getCoingeckoPricesHistory)

    const volume24 = {
      value: 0,
      change: 0
    }
    const tvl24 = {
      value: 0,
      change: 0
    }
    const fees24 = {
      value: 0,
      change: 0
    }

    const tokensDataObject: Record<string, TokenStatsData> = {}
    const poolsData: PoolStatsData[] = []

    const volumePlot: TimeData[] = []
    const liquidityPlot: TimeData[] = []

    let prevVolume24 = 0
    let prevTvl24 = 0
    let prevFees24 = 0

    Object.entries(existingPoolsData).forEach(([address, snapshots]) => {
      const coingeckoXId =
        coingeckoTokens?.[poolsDataObject[address].tokenX.toString()].coingeckoId ?? ''
      const coingeckoYId =
        coingeckoTokens?.[poolsDataObject[address].tokenY.toString()].coingeckoId ?? ''

      if (!tokensDataObject[poolsDataObject[address].tokenX.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenX.toString()] = {
          address: poolsDataObject[address].tokenX,
          price: coingeckoPricesData?.[coingeckoXId].price ?? 0,
          priceChange: coingeckoPricesData?.[coingeckoXId].priceChange ?? 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!tokensDataObject[poolsDataObject[address].tokenY.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenY.toString()] = {
          address: poolsDataObject[address].tokenY,
          price: coingeckoPricesData?.[coingeckoYId].price ?? 0,
          priceChange: coingeckoPricesData?.[coingeckoXId].priceChange ?? 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!snapshots.length) {
        poolsData.push({
          volume24: 0,
          tvl: 0,
          tokenX: poolsDataObject[address].tokenX,
          tokenY: poolsDataObject[address].tokenY,
          fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2)
        })
        return
      }

      const tokenX = allTokens[poolsDataObject[address].tokenX.toString()]
      const tokenY = allTokens[poolsDataObject[address].tokenY.toString()]

      const { prev: prevVolumeX, current: currentVolumeX } = get24HValueDiffData(
        snapshots,
        'volumeX',
        tokenX.decimals,
        coingeckoPricesHistory?.[coingeckoXId] ?? {}
      )
      const { prev: prevVolumeY, current: currentVolumeY } = get24HValueDiffData(
        snapshots,
        'volumeY',
        tokenY.decimals,
        coingeckoPricesHistory?.[coingeckoYId] ?? {}
      )
      const { prev: prevFeeX, current: currentFeeX } = get24HValueDiffData(
        snapshots,
        'feeX',
        tokenX.decimals,
        coingeckoPricesHistory?.[coingeckoXId] ?? {}
      )
      const { prev: prevFeeY, current: currentFeeY } = get24HValueDiffData(
        snapshots,
        'feeY',
        tokenY.decimals,
        coingeckoPricesHistory?.[coingeckoYId] ?? {}
      )
      const { prev: prevLiquidityX, current: currentLiquidityX } = get24HLiquidityDiffData(
        snapshots,
        'liquidityX',
        tokenX.decimals,
        coingeckoPricesHistory?.[coingeckoXId] ?? {}
      )
      const { prev: prevLiquidityY, current: currentLiquidityY } = get24HLiquidityDiffData(
        snapshots,
        'liquidityY',
        tokenY.decimals,
        coingeckoPricesHistory?.[coingeckoYId] ?? {}
      )

      volume24.value += currentVolumeX + currentVolumeY
      fees24.value += currentFeeX + currentFeeY
      tvl24.value += currentLiquidityX + currentLiquidityY

      prevVolume24 += prevVolumeX + prevVolumeY
      prevFees24 += prevFeeX + prevFeeY
      prevTvl24 += prevLiquidityX + prevLiquidityY

      tokensDataObject[tokenX.address.toString()].volume24 += currentVolumeX
      tokensDataObject[tokenY.address.toString()].volume24 += currentVolumeY
      tokensDataObject[tokenX.address.toString()].tvl += currentLiquidityX
      tokensDataObject[tokenY.address.toString()].tvl += currentLiquidityY

      poolsData.push({
        volume24: currentVolumeX + currentVolumeY,
        tvl: currentLiquidityX + currentLiquidityY,
        tokenX: poolsDataObject[address].tokenX,
        tokenY: poolsDataObject[address].tokenY,
        fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2)
      })
    })

    volume24.change = ((volume24.value - prevVolume24) / prevVolume24) * 100
    tvl24.change = ((tvl24.value - prevTvl24) / prevTvl24) * 100
    fees24.change = ((fees24.value - prevFees24) / prevFees24) * 100

    yield* put(
      actions.setCurrentStats({
        volume24,
        tvl24,
        fees24,
        tokensData: Object.values(tokensDataObject),
        poolsData,
        volumePlot,
        liquidityPlot
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* statsHandler(): Generator {
  yield* takeEvery(actions.getCurrentStats, getStats)
}
