/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { all, call, fork, put, select, spawn, take, takeLatest } from 'typed-redux-saga'
import {
  actions,
  FarmPositionData,
  ExtendedIncentive,
  ExtendedStake,
  FarmTotalsUpdate,
  StakeRangeTicks
} from '@reducers/farms'
import { actions as poolsActions, ListPoolsResponse, ListType } from '@reducers/pools'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { getStakerProgram } from '@web3/programs/staker'
import { getMarketProgram } from '@web3/programs/amm'
import { createAccount, getWallet, sleep } from './wallet'
import { PayloadAction } from '@reduxjs/toolkit'
import { network } from '@selectors/solanaConnection'
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
  getCoingeckoTokenPrice,
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
import { positionsRewardAPY, rewardsAPY } from '@invariant-labs/sdk/lib/utils'
import { Tick } from '@invariant-labs/sdk/lib/market'
import { PositionWithAddress } from '@reducers/positions'

export function* getFarmsTotals() {
  try {
    const allFarms = yield* select(farms)
    const allPools = yield* select(pools)
    const allTokens = yield* select(tokens)

    const marketProgram = yield* call(getMarketProgram)
    const stakerProgram = yield* call(getStakerProgram)

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

      const stakesObject: Record<string, Omit<ExtendedStake, 'apy'>> = {}
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

export function* handleGetFarmsList() {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const stakerProgram = yield* call(getStakerProgram)
    const connection = yield* call(getConnection)

    const list = yield* call([stakerProgram, stakerProgram.getAllIncentive])

    const currentNetwork = yield* select(network)
    const allTokens = yield* select(tokens)
    const poolsApy = yield* call(getPoolsAPY, currentNetwork.toLowerCase())
    const incentivesRewardData = yield* call(getIncentivesRewardData, currentNetwork.toLowerCase())

    const farmsObject: Record<string, ExtendedIncentive> = {}

    const poolsKeys: string[] = []
    const unknownTokens = new Set<PublicKey>()
    const rewardTokens: Record<string, PublicKey> = {}

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

      rewardTokens[incentive.publicKey.toString()] = rewardToken

      if (!allTokens[rewardToken.toString()]) {
        unknownTokens.add(rewardToken)
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

    const allPools = yield* select(pools)
    const tickDict: Record<string, Tick[]> = {}
    const prices: Record<string, number> = {}

    const apyPromises = list.map(async incentive => {
      const poolData = allPools?.[incentive.pool.toString()]

      const now = Date.now() / 1000

      let apy

      const rewardToken = rewardTokens[incentive.publicKey.toString()]

      if (now > incentive.endTime.v.toNumber() || !poolData) {
        apy = { apy: 0, apySingleTick: 0 }
      } else {
        try {
          if (typeof tickDict[incentive.pool.toString()] === 'undefined') {
            tickDict[incentive.pool.toString()] = await marketProgram.getAllTicks(
              new Pair(poolData.tokenX, poolData.tokenY, { fee: poolData.fee.v })
            )
          }

          const xId = allTokens?.[poolData.tokenX.toString()]?.coingeckoId ?? ''

          if (typeof prices[poolData.tokenX.toString()] === 'undefined' && !!xId.length) {
            prices[poolData.tokenX.toString()] = (await getCoingeckoTokenPrice(xId)).price
          }

          const rewardId = allTokens?.[rewardToken.toString()]?.coingeckoId ?? ''

          if (typeof prices[rewardToken.toString()] === 'undefined' && !!rewardId.length) {
            prices[rewardToken.toString()] = (await getCoingeckoTokenPrice(rewardId)).price
          }

          apy = rewardsAPY({
            ticksCurrentSnapshot: tickDict[incentive.pool.toString()],
            currentTickIndex: poolData.currentTickIndex,
            duration:
              (incentive.endTime.v.toNumber() - incentive.startTime.v.toNumber()) / 60 / 60 / 24,
            tokenDecimal: allTokens[poolData.tokenX.toString()].decimals ?? 0,
            rewardInUsd:
              prices[rewardToken.toString()] *
              (incentivesRewardData?.[incentive.publicKey.toString()]?.total ?? 0),
            tokenPrice: prices[poolData.tokenX.toString()]
          })
        } catch {
          apy = { apy: 0, apySingleTick: 0 }
        }
      }

      farmsObject[incentive.publicKey.toString()] = {
        ...incentive,
        address: incentive.publicKey,
        rewardToken,
        averageApy: apy.apy * 100,
        singleTickApy: apy.apySingleTick * 100,
        poolApy: poolsApy?.[incentive.pool.toString()] ?? 0,
        totalReward: incentivesRewardData?.[incentive.publicKey.toString()]?.total ?? 0
      }
    })

    yield* call(async () => {
      await Promise.all(apyPromises)
    })

    yield* put(actions.setFarms(farmsObject))

    yield* fork(getFarmsTotals)
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetUserStakes() {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const stakerProgram = yield* call(getStakerProgram)

    const allFarms = yield* select(farms)
    const { list: positions } = yield* select(positionsList)

    const positionsDict: Record<string, PositionWithAddress> = {}
    positions.forEach(position => {
      positionsDict[position.address.toString()] = position
    })

    const promises: Array<Promise<void>> = []
    const stakesObject: Record<string, ExtendedStake> = {}

    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const tickDict: Record<string, Tick[]> = {}
    const prices: Record<string, number> = {}

    const now = Date.now() / 1000

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
        ).then(async list => {
          for (const stake of list) {
            const positionData = positionsDict[stake.position.toString()]
            const poolData = allPools?.[farm.pool.toString()]

            let apy

            if (now > farm.endTime.v.toNumber() || !poolData) {
              apy = 0
            } else {
              try {
                if (typeof tickDict[farm.pool.toString()] === 'undefined') {
                  tickDict[farm.pool.toString()] = await marketProgram.getAllTicks(
                    new Pair(poolData.tokenX, poolData.tokenY, { fee: poolData.fee.v })
                  )
                }

                const xId = allTokens?.[poolData.tokenX.toString()]?.coingeckoId ?? ''

                if (typeof prices[poolData.tokenX.toString()] === 'undefined' && !!xId.length) {
                  prices[poolData.tokenX.toString()] = (await getCoingeckoTokenPrice(xId)).price
                }

                const rewardId = allTokens?.[farm.rewardToken.toString()]?.coingeckoId ?? ''

                if (
                  typeof prices[farm.rewardToken.toString()] === 'undefined' &&
                  !!rewardId.length
                ) {
                  prices[farm.rewardToken.toString()] = (
                    await getCoingeckoTokenPrice(rewardId)
                  ).price
                }

                apy = positionsRewardAPY({
                  ticksCurrentSnapshot: tickDict[farm.pool.toString()],
                  currentTickIndex: poolData.currentTickIndex,
                  duration:
                    (farm.endTime.v.toNumber() - farm.startTime.v.toNumber()) / 60 / 60 / 24,
                  tokenDecimal: allTokens[poolData.tokenX.toString()].decimals ?? 0,
                  rewardInUsd: prices[farm.rewardToken.toString()] * farm.totalReward,
                  tokenPrice: prices[poolData.tokenX.toString()],
                  lowerTickIndex: positionData.lowerTickIndex,
                  upperTickIndex: positionData.upperTickIndex,
                  positionLiquidity: positionData.liquidity
                })
              } catch {
                apy = 0
              }
            }

            stakesObject[stake.address.toString()] = {
              ...stake,
              apy: apy * 100 + farm.poolApy
            }
          }
        })
      )
    })

    yield* call(async () => {
      await Promise.all(promises)
    })

    yield* put(actions.setUserStakes(stakesObject))
  } catch (error) {
    console.log(error)
  }
}

export function* handleStakePosition(action: PayloadAction<FarmPositionData>) {
  try {
    const stakerProgram = yield* call(getStakerProgram)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const currentNetwork = yield* select(network)
    const positionData = yield* select(
      singlePositionData(action.payload.id.toString() + '_' + action.payload.pool.toString())
    )

    if (typeof positionData === 'undefined') {
      return
    }

    const { stringTx } = yield* call(
      [stakerProgram, stakerProgram.createStake],
      marketProgram,
      {
        pair: new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
          fee: positionData.poolData.fee.v
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
        let apy

        if (now > farmData.endTime.v.toNumber()) {
          apy = 0
        } else {
          try {
            const ticks = yield* call(
              [marketProgram, marketProgram.getAllTicks],
              new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
                fee: positionData.poolData.fee.v
              })
            )

            let xPrice = 0
            let rewardPrice = 0

            const xId = allTokens?.[positionData.poolData.tokenX.toString()]?.coingeckoId ?? ''

            if (xId.length) {
              const data = yield* call(getCoingeckoTokenPrice, xId)
              xPrice = data.price
            }

            const rewardId = allTokens?.[farmData.rewardToken.toString()]?.coingeckoId ?? ''

            if (rewardId.length) {
              const data = yield* call(getCoingeckoTokenPrice, rewardId)
              rewardPrice = data.price
            }

            apy = positionsRewardAPY({
              ticksCurrentSnapshot: ticks,
              currentTickIndex: positionData.poolData.currentTickIndex,
              duration:
                (farmData.endTime.v.toNumber() - farmData.startTime.v.toNumber()) / 60 / 60 / 24,
              tokenDecimal: allTokens[positionData.poolData.tokenX.toString()].decimals ?? 0,
              rewardInUsd: rewardPrice * farmData.totalReward,
              tokenPrice: xPrice,
              lowerTickIndex: positionData.lowerTickIndex,
              upperTickIndex: positionData.upperTickIndex,
              positionLiquidity: positionData.liquidity
            })
          } catch {
            apy = 0
          }
        }

        yield* put(
          actions.updateStateAfterStake({
            newStake: {
              ...stakes[0],
              apy: apy * 100 + farmData.poolApy
            },
            totalStakedXAddition,
            totalStakedYAddition
          })
        )
      }
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
}

export function* handleWithdrawRewardsWithWSOL(data: FarmPositionData) {
  try {
    const allFarms = yield* select(farms)

    const stakerProgram = yield* call(getStakerProgram)
    const marketProgram = yield* call(getMarketProgram)
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
          fee: positionData.poolData.fee.v
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

    const stakerProgram = yield* call(getStakerProgram)
    const marketProgram = yield* call(getMarketProgram)
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
          fee: positionData.poolData.fee.v
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
  const stakerProgram = yield* call(getStakerProgram)
  const marketProgram = yield* call(getMarketProgram)
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
        fee: positionData.poolData.fee.v
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

    tx = tx.add(withdrawIx)
  }

  return tx
}

export function* handleGetNewStakeRangeTicks(action: PayloadAction<string[]>) {
  try {
    const marketProgram = yield* call(getMarketProgram)

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
        fee: position.poolData.fee.v
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
  yield* takeLatest(actions.stakePosition, handleStakePosition)
}

export function* withdrawRewardsHandler(): Generator {
  yield* takeLatest(actions.withdrawRewardsForPosition, handleWithdrawRewards)
}

export function* getNewStakeRangeTicksHandler(): Generator {
  yield* takeLatest(actions.getNewStakeRangeTicks, handleGetNewStakeRangeTicks)
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
