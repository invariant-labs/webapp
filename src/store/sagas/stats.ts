import { actions, PoolStatsData, TimeData, TokenStatsData } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network, rpcAddress } from '@selectors/solanaConnection'
import {
  getJupPricesData,
  getFullNewTokensData,
  getNetworkStats,
  getPoolsAPY,
  getPoolsFromAdresses,
  printBN
} from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { PoolWithAddress, actions as poolsActions } from '@reducers/pools'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { getConnection } from './connection'

export function* getStats(): Generator {
  try {
    const connection = yield* call(getConnection)
    const currentNetwork = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const data = yield* call(getNetworkStats, currentNetwork.toLowerCase())
    const poolsApy = yield* call(getPoolsAPY, currentNetwork.toLowerCase())

    const marketProgram = yield* call(getMarketProgram, currentNetwork, rpc)

    const allPoolsData = yield* call(
      getPoolsFromAdresses,
      Object.keys(data).map(addr => new PublicKey(addr)),
      marketProgram
    )
    const poolsDataObject: Record<string, PoolWithAddress> = {}
    allPoolsData.forEach(pool => {
      poolsDataObject[pool.address.toString()] = pool
    })

    let allTokens = yield* select(tokens)

    const unknownTokens = new Set<PublicKey>()

    allPoolsData.forEach(pool => {
      if (!allTokens[pool.tokenX.toString()]) {
        unknownTokens.add(pool.tokenX)
      }

      if (!allTokens[pool.tokenY.toString()]) {
        unknownTokens.add(pool.tokenY)
      }
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))
    allTokens = yield* select(tokens)

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
    let poolsData: PoolStatsData[] = []

    const volumeForTimestamps: Record<string, number> = {}
    const liquidityForTimestamps: Record<string, number> = {}
    const feesForTimestamps: Record<string, number> = {}

    const lastTimestamp = Math.max(
      ...Object.values(data)
        .filter(snaps => snaps.length > 0)
        .map(snaps => +snaps[snaps.length - 1].timestamp)
    )

    Object.entries(data).forEach(([address, snapshots]) => {
      if (!poolsDataObject[address]) {
        return
      }

      if (!tokensDataObject[poolsDataObject[address].tokenX.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenX.toString()] = {
          address: poolsDataObject[address].tokenX,
          price: 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!tokensDataObject[poolsDataObject[address].tokenY.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenY.toString()] = {
          address: poolsDataObject[address].tokenY,
          price: 0,
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
          fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2),
          apy: poolsApy[address] ?? 0,
          poolAddress: new PublicKey(address)
        })
        return
      }

      const tokenX = allTokens[poolsDataObject[address].tokenX.toString()]
      const tokenY = allTokens[poolsDataObject[address].tokenY.toString()]

      const lastSnapshot = snapshots[snapshots.length - 1]

      tokensDataObject[tokenX.address.toString()].volume24 +=
        lastSnapshot.timestamp === lastTimestamp ? lastSnapshot.volumeX.usdValue24 : 0
      tokensDataObject[tokenY.address.toString()].volume24 +=
        lastSnapshot.timestamp === lastTimestamp ? lastSnapshot.volumeY.usdValue24 : 0
      tokensDataObject[tokenX.address.toString()].tvl += lastSnapshot.liquidityX.usdValue24
      tokensDataObject[tokenY.address.toString()].tvl += lastSnapshot.liquidityY.usdValue24

      poolsData.push({
        volume24:
          lastSnapshot.timestamp === lastTimestamp
            ? lastSnapshot.volumeX.usdValue24 + lastSnapshot.volumeY.usdValue24
            : 0,
        tvl:
          lastSnapshot.timestamp === lastTimestamp
            ? lastSnapshot.liquidityX.usdValue24 + lastSnapshot.liquidityY.usdValue24
            : 0,
        tokenX: poolsDataObject[address].tokenX,
        tokenY: poolsDataObject[address].tokenY,
        fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2),
        apy: poolsApy[address] ?? 0,
        poolAddress: new PublicKey(address)
      })

      snapshots.slice(-30).forEach(snapshot => {
        const timestamp = snapshot.timestamp.toString()

        if (!volumeForTimestamps[timestamp]) {
          volumeForTimestamps[timestamp] = 0
        }

        if (!liquidityForTimestamps[timestamp]) {
          liquidityForTimestamps[timestamp] = 0
        }

        if (!feesForTimestamps[timestamp]) {
          feesForTimestamps[timestamp] = 0
        }

        volumeForTimestamps[timestamp] += snapshot.volumeX.usdValue24 + snapshot.volumeY.usdValue24
        liquidityForTimestamps[timestamp] +=
          snapshot.liquidityX.usdValue24 + snapshot.liquidityY.usdValue24
        feesForTimestamps[timestamp] += snapshot.feeX.usdValue24 + snapshot.feeY.usdValue24
      })
    })

    const tokensPricesData = yield* call(getJupPricesData, Object.keys(tokensDataObject))

    Object.entries(tokensPricesData).forEach(([address, token]) => {
      tokensDataObject[address].price = token.price
    })

    const volumePlot: TimeData[] = Object.entries(volumeForTimestamps)
      .map(([timestamp, value]) => ({
        timestamp: +timestamp,
        value
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
    const liquidityPlot: TimeData[] = Object.entries(liquidityForTimestamps)
      .map(([timestamp, value]) => ({
        timestamp: +timestamp,
        value
      }))
      .sort((a, b) => a.timestamp - b.timestamp)
    const feePlot: TimeData[] = Object.entries(feesForTimestamps)
      .map(([timestamp, value]) => ({
        timestamp: +timestamp,
        value
      }))
      .sort((a, b) => a.timestamp - b.timestamp)

    const tiersToOmit = [0.001, 0.003]

    poolsData = poolsData.filter(pool => !tiersToOmit.includes(pool.fee))

    volume24.value = volumePlot.length ? volumePlot[volumePlot.length - 1].value : 0
    tvl24.value = liquidityPlot.length ? liquidityPlot[liquidityPlot.length - 1].value : 0
    fees24.value = feePlot.length ? feePlot[feePlot.length - 1].value : 0

    const prevVolume24 = volumePlot.length > 1 ? volumePlot[volumePlot.length - 2].value : 0
    const prevTvl24 = liquidityPlot.length > 1 ? liquidityPlot[liquidityPlot.length - 2].value : 0
    const prevFees24 = feePlot.length > 1 ? feePlot[feePlot.length - 2].value : 0

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
