/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { all, call, fork, put, select, spawn, take, takeLatest, takeEvery } from 'typed-redux-saga'
import {
  actions,
  FarmPositionData,
  ExtendedIncentive,
  ExtendedStake,
  FarmTotalsUpdate,
  StakeRangeTicks,
  FarmApyUpdate,
  StakeRewardData
} from '@reducers/farms'
import { actions as poolsActions, ListPoolsResponse, ListType } from '@reducers/pools'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { getStakerProgram } from '@web3/programs/staker'
import { getMarketProgram } from '@web3/programs/amm'
import { createAccount, getWallet, sleep } from './wallet'
import { PayloadAction } from '@reduxjs/toolkit'
import { network, rpcAddress } from '@selectors/solanaConnection'
import { networkTypetoProgramNetwork } from '@web3/connection'
import {
  positionsList,
  positionsWithPoolsData,
  PositionWithPoolData,
  singlePositionData
} from '@selectors/positions'
import { getMarketAddress, Pair } from '@invariant-labs/sdk'
import {
  AccountInfo,
  Keypair,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import { farms, stakesForPosition, userStakes } from '@selectors/farms'
import { accounts } from '@selectors/solanaWallet'
import { getConnection } from './connection'
import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  getJupTokenPrice,
  getFullNewTokensData,
  getIncentivesRewardData,
  getPoolsAPY,
  getPositionsForPool,
  getTicksList,
  getUserStakesForFarm,
  printBN
} from '@consts/utils'
import { pools, tokens } from '@selectors/pools'
import { BN } from '@project-serum/anchor'
import { calculatePriceSqrt, getX, getY } from '@invariant-labs/sdk/lib/math'
import { GuardPredicate } from '@redux-saga/types'
import {
  calculateUserDailyRewards,
  positionsRewardAPY,
  rewardsAPY
} from '@invariant-labs/sdk/lib/utils'
import { PositionWithAddress } from '@reducers/positions'

export function* getFarmsTotals() {
  try {
    const allFarms = yield* select(farms)
    const allPools = yield* select(pools)
    const allTokens = yield* select(tokens)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)

    const marketProgram = yield* call(getMarketProgram, networkType, rpc)
    const stakerProgram = yield* call(getStakerProgram, networkType, rpc)

    const updatesObject: Record<string, FarmTotalsUpdate> = {}

    for (const address in allFarms) {
      const poolAddress = allFarms[address].pool
      const allPositions = yield* call(getPositionsForPool, marketProgram, poolAddress)

      const stakes = yield* call(
        getUserStakesForFarm,
        stakerProgram,
        new PublicKey(address),
        poolAddress,
        allPositions.map(({ id }) => id),
        allPositions.map(({ address }) => address)
      )

      const stakesObject: Record<string, ExtendedStake> = {}
      stakes.forEach(stake => {
        stakesObject[stake.position.toString()] = stake
      })

      const positions = allPositions.filter(
        position => typeof stakesObject[position.address.toString()] !== 'undefined'
      )

      let liquidityX = new BN(0)
      let liquidityY = new BN(0)
      for (const position of positions) {
        let xVal, yVal

        try {
          xVal = getX(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            allPools[poolAddress.toString()].sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          )
        } catch (error) {
          xVal = new BN(0)
        }

        try {
          yVal = getY(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            allPools[poolAddress.toString()].sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          )
        } catch (error) {
          yVal = new BN(0)
        }

        liquidityX = liquidityX.add(xVal)
        liquidityY = liquidityY.add(yVal)
      }

      updatesObject[address.toString()] = {
        totalStakedX: +printBN(
          liquidityX,
          allTokens[allPools[poolAddress.toString()].tokenX.toString()].decimals
        ),
        totalStakedY: +printBN(
          liquidityY,
          allTokens[allPools[poolAddress.toString()].tokenY.toString()].decimals
        )
      }
    }

    yield* put(actions.updateFarmsTotals(updatesObject))
  } catch (error) {
    console.log(error)
  }
}

export function* getFarmsApy() {
  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)

    const marketProgram = yield* call(getMarketProgram, networkType, rpc)

    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const allFarms = yield* select(farms)

    const prices: Record<string, number> = {}
    const allLiquidity: Record<string, BN> = {}
    const apyObject: Record<string, FarmApyUpdate> = {}

    const apyPromises = Object.values(allFarms).map(async incentive => {
      const poolData = allPools?.[incentive.pool.toString()]

      const now = Date.now() / 1000

      let apy

      if (now > incentive.endTime.v.toNumber() || !poolData) {
        apy = { apy: 0, apySingleTick: 0 }
      } else {
        try {
          if (typeof allLiquidity[incentive.pool.toString()] === 'undefined') {
            allLiquidity[incentive.pool.toString()] =
              await marketProgram.getAllPoolLiquidityInTokens(incentive.pool)
          }

          const xId = allTokens?.[poolData.tokenX.toString()]?.coingeckoId ?? ''

          if (typeof prices[poolData.tokenX.toString()] === 'undefined' && !!xId.length) {
            prices[poolData.tokenX.toString()] = (await getJupTokenPrice(xId)).price
          }

          const rewardId = allTokens?.[incentive.rewardToken.toString()]?.coingeckoId ?? ''

          if (
            typeof prices[incentive.rewardToken.toString()] === 'undefined' &&
            !!rewardId.length
          ) {
            prices[incentive.rewardToken.toString()] = (await getJupTokenPrice(rewardId)).price
          }

          apy = rewardsAPY({
            currentTickIndex: poolData.currentTickIndex,
            duration:
              (incentive.endTime.v.toNumber() - incentive.startTime.v.toNumber()) / 60 / 60 / 24,
            tokenDecimal: allTokens[poolData.tokenX.toString()].decimals ?? 0,
            rewardInUsd: prices[incentive.rewardToken.toString()] * incentive.totalReward,
            tokenPrice: prices[poolData.tokenX.toString()],
            tickSpacing: poolData.tickSpacing,
            currentLiquidity: poolData.liquidity.v,
            allLiquidityInTokens: allLiquidity[incentive.pool.toString()]
          })
        } catch {
          apy = { apy: 0, apySingleTick: 0 }
        }
      }

      apyObject[incentive.address.toString()] = {
        averageApy: apy.apy * 100,
        singleTickApy: apy.apySingleTick * 100
      }
    })

    yield* call(async () => {
      await Promise.all(apyPromises)
    })

    yield* put(actions.updateFarmsApy(apyObject))
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetFarmsList() {
  try {
    const currentNetwork = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const stakerProgram = yield* call(getStakerProgram, currentNetwork, rpc)
    const connection = yield* call(getConnection)

    const list = yield* call([stakerProgram, stakerProgram.getAllIncentive])

    const allTokens = yield* select(tokens)
    const poolsApy = yield* call(getPoolsAPY, currentNetwork.toLowerCase())
    const incentivesRewardData = yield* call(getIncentivesRewardData, currentNetwork.toLowerCase())

    const farmsObject: Record<string, ExtendedIncentive> = {}

    const poolsKeys: string[] = []
    const unknownTokens = new Set<PublicKey>()

    const promises = list.map(async incentive => {
      poolsKeys.push(incentive.pool.toString())

      let rewardToken: PublicKey

      if (typeof incentivesRewardData?.[incentive.publicKey.toString()]?.token === 'undefined') {
        const info = await connection.getParsedAccountInfo(incentive.tokenAccount)
        rewardToken = (info as RpcResponseAndContext<AccountInfo<ParsedAccountData>>).value.data
          .parsed.info.mint
      } else {
        rewardToken = new PublicKey(incentivesRewardData[incentive.publicKey.toString()].token)
      }

      if (!allTokens[rewardToken.toString()]) {
        unknownTokens.add(rewardToken)
      }

      farmsObject[incentive.publicKey.toString()] = {
        ...incentive,
        address: incentive.publicKey,
        rewardToken,
        poolApy: poolsApy?.[incentive.pool.toString()] ?? 0,
        totalReward: incentivesRewardData?.[incentive.publicKey.toString()]?.total ?? 0
      }
    })

    yield* call(async () => {
      await Promise.all(promises)
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))

    yield* put(
      poolsActions.getPoolsDataForList({
        addresses: poolsKeys,
        listType: ListType.FARMS
      })
    )

    const pattern: GuardPredicate<PayloadAction<ListPoolsResponse>> = (
      action
    ): action is PayloadAction<ListPoolsResponse> => {
      return (
        typeof action?.payload?.listType !== 'undefined' &&
        action.payload.listType === ListType.FARMS
      )
    }

    yield* take(pattern)

    yield* put(actions.setFarms(farmsObject))

    yield* fork(getFarmsTotals)
    yield* fork(getFarmsApy)
  } catch (error) {
    console.log(error)
  }
}

export function* getStakesApy() {
  try {
    const allFarms = yield* select(farms)
    const allStakes = yield* select(userStakes)
    const { list: positions } = yield* select(positionsList)

    const positionsDict: Record<string, PositionWithAddress> = {}
    positions.forEach(position => {
      positionsDict[position.address.toString()] = position
    })

    const apyObject: Record<string, StakeRewardData> = {}

    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const prices: Record<string, number> = {}

    const now = Date.now() / 1000

    const promises: Array<Promise<void>> = Object.values(allStakes).map(async stake => {
      let apy, dailyReward

      const positionData = positionsDict[stake.position.toString()]
      const farmData = allFarms?.[stake.incentive.toString()]
      const poolData = !farmData ? undefined : allPools?.[farmData.pool.toString()]

      if (!farmData || !poolData || now > farmData.endTime.v.toNumber()) {
        apy = 0
        dailyReward = 0
      } else {
        try {
          const xId = allTokens?.[poolData.tokenX.toString()]?.coingeckoId ?? ''

          if (typeof prices[poolData.tokenX.toString()] === 'undefined' && !!xId.length) {
            prices[poolData.tokenX.toString()] = (await getJupTokenPrice(xId)).price
          }

          const rewardId = allTokens?.[farmData.rewardToken.toString()]?.coingeckoId ?? ''

          if (typeof prices[farmData.rewardToken.toString()] === 'undefined' && !!rewardId.length) {
            prices[farmData.rewardToken.toString()] = (await getJupTokenPrice(rewardId)).price
          }

          apy = positionsRewardAPY({
            currentTickIndex: poolData.currentTickIndex,
            duration:
              (farmData.endTime.v.toNumber() - farmData.startTime.v.toNumber()) / 60 / 60 / 24,
            tokenDecimal: allTokens[poolData.tokenX.toString()].decimals ?? 0,
            rewardInUsd: prices[farmData.rewardToken.toString()] * farmData.totalReward,
            tokenPrice: prices[poolData.tokenX.toString()],
            lowerTickIndex: positionData.lowerTickIndex,
            upperTickIndex: positionData.upperTickIndex,
            positionLiquidity: positionData.liquidity,
            poolLiquidity: poolData.liquidity.v
          })

          dailyReward = calculateUserDailyRewards({
            currentTickIndex: poolData.currentTickIndex,
            rewardInTokens: farmData.totalReward,
            userLiquidity: positionData.liquidity,
            duration:
              (farmData.endTime.v.toNumber() - farmData.startTime.v.toNumber()) / 60 / 60 / 24,
            lowerTickIndex: positionData.lowerTickIndex,
            upperTickIndex: positionData.upperTickIndex,
            poolLiquidity: poolData.liquidity.v
          })
        } catch {
          apy = 0
          dailyReward = 0
        }
      }

      apyObject[stake.address.toString()] = {
        apy: apy * 100 + farmData.poolApy,
        dailyReward
      }
    })

    yield* call(async () => {
      await Promise.all(promises)
    })

    yield* put(actions.updateStakesRewardData(apyObject))
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetUserStakes() {
  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const stakerProgram = yield* call(getStakerProgram, networkType, rpc)

    const allFarms = yield* select(farms)
    const { list: positions } = yield* select(positionsList)

    const positionsDict: Record<string, PositionWithAddress> = {}
    positions.forEach(position => {
      positionsDict[position.address.toString()] = position
    })

    const promises: Array<Promise<void>> = []
    const stakesObject: Record<string, ExtendedStake> = {}

    Object.values(allFarms).forEach(farm => {
      const farmPositions = positions.filter(({ pool }) => pool.equals(farm.pool))

      if (!farmPositions.length) {
        return
      }

      promises.push(
        getUserStakesForFarm(
          stakerProgram,
          farm.address,
          farm.pool,
          farmPositions.map(({ id }) => id),
          farmPositions.map(({ address }) => address)
        ).then(list => {
          list.forEach(stake => {
            stakesObject[stake.address.toString()] = stake
          })
        })
      )
    })

    yield* call(async () => {
      await Promise.all(promises)
    })

    yield* put(actions.setUserStakes(stakesObject))

    yield* fork(getStakesApy)
  } catch (error) {
    console.log(error)
  }
}

export function* handleStakePosition(action: PayloadAction<FarmPositionData>) {
  const currentNetwork = yield* select(network)
  const rpc = yield* select(rpcAddress)
  const stakerProgram = yield* call(getStakerProgram, currentNetwork, rpc)
  const marketProgram = yield* call(getMarketProgram, currentNetwork, rpc)
  const wallet = yield* call(getWallet)

  const positionData = yield* select(
    singlePositionData(action.payload.id.toString() + '_' + action.payload.pool.toString())
  )

  if (typeof positionData === 'undefined') {
    return
  }

  try {
    const { stringTx } = yield* call(
      [stakerProgram, stakerProgram.createStake],
      marketProgram,
      {
        pair: new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
          fee: positionData.poolData.fee.v,
          tickSpacing: positionData.poolData.tickSpacing
        }),
        owner: wallet.publicKey,
        lowerTickIndex: positionData.lowerTickIndex,
        upperTickIndex: positionData.upperTickIndex,
        index: positionData.positionIndex
      },
      {
        pool: action.payload.pool,
        id: action.payload.id,
        position: positionData.address,
        incentive: action.payload.farm,
        owner: wallet.publicKey,
        index: positionData.positionIndex,
        invariant: new PublicKey(getMarketAddress(networkTypetoProgramNetwork(currentNetwork)))
      }
    )

    yield* put(
      actions.setStakePositionSuccess({
        pool: action.payload.pool,
        id: action.payload.id,
        success: !!stringTx.length
      })
    )

    if (!stringTx.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to stake position. Please try again.',
          variant: 'error',
          persist: false,
          txid: stringTx
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Position staked successfully.',
          variant: 'success',
          persist: false,
          txid: stringTx
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield* put(
      snackbarsActions.add({
        message: 'Failed to stake position. Please try again.',
        variant: 'error',
        persist: false
      })
    )

    yield* put(
      actions.setStakePositionSuccess({
        pool: action.payload.pool,
        id: action.payload.id,
        success: false
      })
    )
  }

  try {
    const stakes = yield* call(
      getUserStakesForFarm,
      stakerProgram,
      action.payload.farm,
      action.payload.pool,
      [action.payload.id],
      [positionData.address]
    )

    if (stakes.length === 1) {
      yield* call(sleep, 2000)
      const allFarms = yield* select(farms)
      const allTokens = yield* select(tokens)
      const farmData = allFarms[action.payload.farm.toString()]

      let totalStakedXAddition, totalStakedYAddition

      try {
        totalStakedXAddition = +printBN(
          getX(
            positionData.liquidity.v,
            calculatePriceSqrt(positionData.upperTickIndex).v,
            positionData.poolData.sqrtPrice.v,
            calculatePriceSqrt(positionData.lowerTickIndex).v
          ),
          positionData.tokenX.decimals
        )
      } catch (error) {
        totalStakedXAddition = 0
      }

      try {
        totalStakedYAddition = +printBN(
          getY(
            positionData.liquidity.v,
            calculatePriceSqrt(positionData.upperTickIndex).v,
            positionData.poolData.sqrtPrice.v,
            calculatePriceSqrt(positionData.lowerTickIndex).v
          ),
          positionData.tokenY.decimals
        )
      } catch (error) {
        totalStakedYAddition = 0
      }

      const now = Date.now() / 1000
      let apy, dailyReward

      if (now > farmData.endTime.v.toNumber()) {
        apy = 0
        dailyReward = 0
      } else {
        try {
          let xPrice = 0
          let rewardPrice = 0

          const xId = allTokens?.[positionData.poolData.tokenX.toString()]?.coingeckoId ?? ''

          if (xId.length) {
            const data = yield* call(getJupTokenPrice, xId)
            xPrice = data.price
          }

          const rewardId = allTokens?.[farmData.rewardToken.toString()]?.coingeckoId ?? ''

          if (rewardId.length) {
            const data = yield* call(getJupTokenPrice, rewardId)
            rewardPrice = data.price
          }

          apy = positionsRewardAPY({
            currentTickIndex: positionData.poolData.currentTickIndex,
            duration:
              (farmData.endTime.v.toNumber() - farmData.startTime.v.toNumber()) / 60 / 60 / 24,
            tokenDecimal: allTokens[positionData.poolData.tokenX.toString()].decimals ?? 0,
            rewardInUsd: rewardPrice * farmData.totalReward,
            tokenPrice: xPrice,
            lowerTickIndex: positionData.lowerTickIndex,
            upperTickIndex: positionData.upperTickIndex,
            positionLiquidity: positionData.liquidity,
            poolLiquidity: positionData.poolData.liquidity.v
          })

          dailyReward = calculateUserDailyRewards({
            currentTickIndex: positionData.poolData.currentTickIndex,
            rewardInTokens: farmData.totalReward,
            userLiquidity: positionData.liquidity,
            duration:
              (farmData.endTime.v.toNumber() - farmData.startTime.v.toNumber()) / 60 / 60 / 24,
            lowerTickIndex: positionData.lowerTickIndex,
            upperTickIndex: positionData.upperTickIndex,
            poolLiquidity: positionData.poolData.liquidity.v
          })
        } catch {
          apy = 0
          dailyReward = 0
        }
      }

      yield* put(
        actions.updateStateAfterStake({
          newStake: {
            ...stakes[0],
            apy: apy * 100 + farmData.poolApy,
            dailyReward
          },
          totalStakedXAddition,
          totalStakedYAddition
        })
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* handleWithdrawRewardsWithWSOL(data: FarmPositionData) {
  try {
    const allFarms = yield* select(farms)

    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const stakerProgram = yield* call(getStakerProgram, networkType, rpc)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc)
    const wallet = yield* call(getWallet)
    const connection = yield* call(getConnection)

    const positionData = yield* select(
      singlePositionData(data.id.toString() + '_' + data.pool.toString())
    )

    if (typeof positionData === 'undefined') {
      return
    }

    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
    })

    const initIx = Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      NATIVE_MINT,
      wrappedSolAccount.publicKey,
      wallet.publicKey
    )

    const unwrapIx = Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrappedSolAccount.publicKey,
      wallet.publicKey,
      wallet.publicKey,
      []
    )

    const initialTx = new Transaction().add(createIx).add(initIx)

    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

    const updateIx = yield* call(
      [marketProgram, marketProgram.updateSecondsPerLiquidityInstruction],
      {
        pair: new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
          fee: positionData.poolData.fee.v,
          tickSpacing: positionData.poolData.tickSpacing
        }),
        owner: wallet.publicKey,
        lowerTickIndex: positionData.lowerTickIndex,
        upperTickIndex: positionData.upperTickIndex,
        index: positionData.positionIndex
      }
    )

    const withdrawIx = yield* call([stakerProgram, stakerProgram.withdrawIx], {
      pool: data.pool,
      id: data.id,
      position: positionData.address,
      incentive: data.farm,
      owner: wallet.publicKey,
      index: positionData.positionIndex,
      incentiveTokenAccount: allFarms[data.farm.toString()].tokenAccount,
      ownerTokenAcc: wrappedSolAccount.publicKey
    })

    const withdrawTx = new Transaction().add(updateIx).add(withdrawIx)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    withdrawTx.recentBlockhash = blockhash.blockhash
    withdrawTx.feePayer = wallet.publicKey

    const unwrapTx = new Transaction().add(unwrapIx)
    const unwrapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    const [initialSignedTx, withdrawSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, withdrawTx, unwrapTx]
    )

    initialSignedTx.partialSign(wrappedSolAccount)

    const initialTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      initialSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!initialTxid.length) {
      return yield* put(
        snackbarsActions.add({
          message: 'SOL wrapping failed. Please try again.',
          variant: 'error',
          persist: false,
          txid: initialTxid
        })
      )
    }

    const withdrawTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      withdrawSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!withdrawTxid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to withdraw rewards. Please try again.',
          variant: 'error',
          persist: false,
          txid: withdrawTxid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Rewards withdrawn successfully.',
          variant: 'success',
          persist: false,
          txid: withdrawTxid
        })
      )
    }

    const unwrapTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      unwrapSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!unwrapTxid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Wrapped SOL unwrap failed. Try to unwrap it in your wallet.',
          variant: 'warning',
          persist: false,
          txid: unwrapTxid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'SOL unwrapped successfully.',
          variant: 'success',
          persist: false,
          txid: unwrapTxid
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield* put(
      snackbarsActions.add({
        message: 'Failed to withdraw rewards. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleWithdrawRewards(action: PayloadAction<FarmPositionData>) {
  try {
    const tokensAccounts = yield* select(accounts)
    const allFarms = yield* select(farms)
    const rewardToken = allFarms[action.payload.farm.toString()].rewardToken

    if (rewardToken.toString() === WRAPPED_SOL_ADDRESS) {
      return yield* call(handleWithdrawRewardsWithWSOL, action.payload)
    }

    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const stakerProgram = yield* call(getStakerProgram, networkType, rpc)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc)
    const wallet = yield* call(getWallet)

    const positionData = yield* select(
      singlePositionData(action.payload.id.toString() + '_' + action.payload.pool.toString())
    )

    if (typeof positionData === 'undefined') {
      return
    }

    let ownerTokenAcc = tokensAccounts[rewardToken.toString()]
      ? tokensAccounts[rewardToken.toString()].address
      : null
    if (ownerTokenAcc === null) {
      ownerTokenAcc = yield* call(createAccount, new PublicKey(rewardToken.toString()))
    }

    const stringTx = yield* call(
      [stakerProgram, stakerProgram.withdraw],
      marketProgram,
      {
        pair: new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
          fee: positionData.poolData.fee.v,
          tickSpacing: positionData.poolData.tickSpacing
        }),
        owner: wallet.publicKey,
        lowerTickIndex: positionData.lowerTickIndex,
        upperTickIndex: positionData.upperTickIndex,
        index: positionData.positionIndex
      },
      {
        pool: action.payload.pool,
        id: action.payload.id,
        position: positionData.address,
        incentive: action.payload.farm,
        owner: wallet.publicKey,
        index: positionData.positionIndex,
        incentiveTokenAccount: allFarms[action.payload.farm.toString()].tokenAccount,
        ownerTokenAcc
      }
    )

    if (!stringTx.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to withdraw rewards. Please try again.',
          variant: 'error',
          persist: false,
          txid: stringTx
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Rewards withdrawn successfully.',
          variant: 'success',
          persist: false,
          txid: stringTx
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield* put(
      snackbarsActions.add({
        message: 'Failed to withdraw rewards. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* createClaimAllPositionRewardsTx(positionIndex: number) {
  const networkType = yield* select(network)
  const rpc = yield* select(rpcAddress)
  const stakerProgram = yield* call(getStakerProgram, networkType, rpc)
  const marketProgram = yield* call(getMarketProgram, networkType, rpc)
  const wallet = yield* call(getWallet)

  const allPositionsData = yield* select(positionsWithPoolsData)
  const positionData = allPositionsData[positionIndex]

  const tokensAccounts = yield* select(accounts)
  const allFarms = yield* select(farms)
  const positionStakes = yield* select(stakesForPosition(positionData.address))

  const updateIx = yield* call(
    [marketProgram, marketProgram.updateSecondsPerLiquidityInstruction],
    {
      pair: new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
        fee: positionData.poolData.fee.v,
        tickSpacing: positionData.poolData.tickSpacing
      }),
      owner: wallet.publicKey,
      lowerTickIndex: positionData.lowerTickIndex,
      upperTickIndex: positionData.upperTickIndex,
      index: positionData.positionIndex
    }
  )

  let tx = new Transaction().add(updateIx)

  for (const stake of positionStakes) {
    const rewardToken = allFarms[stake.incentive.toString()].rewardToken
    let ownerTokenAcc = tokensAccounts[rewardToken.toString()]
      ? tokensAccounts[rewardToken.toString()].address
      : null
    if (ownerTokenAcc === null) {
      ownerTokenAcc = yield* call(createAccount, new PublicKey(rewardToken.toString()))
    }

    const withdrawIx = yield* call([stakerProgram, stakerProgram.withdrawIx], {
      pool: positionData.pool,
      id: positionData.id,
      position: positionData.address,
      incentive: stake.incentive,
      owner: wallet.publicKey,
      index: positionData.positionIndex,
      incentiveTokenAccount: allFarms[stake.incentive.toString()].tokenAccount,
      ownerTokenAcc
    })

    const closeIx = yield* call(
      [stakerProgram, stakerProgram.closeStakeByOwnerIx],
      stake.address,
      stake.incentive,
      stake.position,
      wallet.publicKey,
      positionData.positionIndex
    )

    tx = tx.add(withdrawIx).add(closeIx)
  }

  return tx
}

export function* handleGetNewStakeRangeTicks(action: PayloadAction<string[]>) {
  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)

    const marketProgram = yield* call(getMarketProgram, networkType, rpc)

    const allStakes = yield* select(userStakes)
    const allPositions = yield* select(positionsWithPoolsData)

    const positionsDict: Record<string, PositionWithPoolData> = {}
    allPositions.forEach(position => {
      positionsDict[position.address.toString()] = position
    })

    const ticksData: Array<{ pair: Pair; index: number; payloadIndex: number; isLower: boolean }> =
      []
    action.payload.forEach((address, index) => {
      const stake = allStakes[address]
      const position = positionsDict[stake.position.toString()]

      const pair = new Pair(position.poolData.tokenX, position.poolData.tokenY, {
        fee: position.poolData.fee.v,
        tickSpacing: position.poolData.tickSpacing
      })

      ticksData.push({
        pair,
        index: position.lowerTickIndex,
        payloadIndex: index,
        isLower: true
      })
      ticksData.push({
        pair,
        index: position.upperTickIndex,
        payloadIndex: index,
        isLower: false
      })
    })

    const ticks = yield* call(getTicksList, marketProgram, ticksData)

    const rangeTicks: Record<string, StakeRangeTicks> = {}

    ticks.forEach((tick, index) => {
      if (typeof rangeTicks[action.payload[ticksData[index].payloadIndex]] === 'undefined') {
        rangeTicks[action.payload[ticksData[index].payloadIndex]] = {}
      }

      if (tick !== null) {
        rangeTicks[action.payload[ticksData[index].payloadIndex]][
          ticksData[index].isLower ? 'lowerTick' : 'upperTick'
        ] = tick
      }
    })

    yield* put(actions.addNewStakeRangeTicks(rangeTicks))
  } catch (error) {
    console.log(error)
  }
}

export function* getFarmsListHandler(): Generator {
  yield* takeLatest(actions.getFarms, handleGetFarmsList)
}

export function* getUserStakesHandler(): Generator {
  yield* takeLatest(actions.getUserStakes, handleGetUserStakes)
}

export function* stakePositionHandler(): Generator {
  yield* takeEvery(actions.stakePosition, handleStakePosition)
}

export function* withdrawRewardsHandler(): Generator {
  yield* takeEvery(actions.withdrawRewardsForPosition, handleWithdrawRewards)
}

export function* getNewStakeRangeTicksHandler(): Generator {
  yield* takeEvery(actions.getNewStakeRangeTicks, handleGetNewStakeRangeTicks)
}

export function* farmsSaga(): Generator {
  yield all(
    [
      getFarmsListHandler,
      getUserStakesHandler,
      stakePositionHandler,
      withdrawRewardsHandler,
      getNewStakeRangeTicksHandler
    ].map(spawn)
  )
}
