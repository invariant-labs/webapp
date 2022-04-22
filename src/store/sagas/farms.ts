import { all, call, fork, put, select, spawn, take, takeLatest } from 'typed-redux-saga'
import {
  actions,
  FarmPositionData,
  ExtendedIncentive,
  StakeWithAddress,
  FarmTotalsUpdate
} from '@reducers/farms'
import { actions as poolsActions } from '@reducers/pools'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { getStakerProgram } from '@web3/programs/staker'
import { getMarketProgram } from '@web3/programs/amm'
import { createAccount, getWallet } from './wallet'
import { getStakerAddress } from '@invariant-labs/staker-sdk/lib/network'
import { PayloadAction } from '@reduxjs/toolkit'
import { network } from '@selectors/solanaConnection'
import { networkTypetoStakerNetwork } from '@web3/connection'
import { positionsForPool, singlePositionData } from '@selectors/positions'
import { Pair } from '@invariant-labs/sdk'
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
import { farms } from '@selectors/farms'
import { accounts } from '@selectors/solanaWallet'
import { getConnection } from './connection'
import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getPositionsForPool, getUserStakesForFarm, printBN } from '@consts/utils'
import { pools, tokens } from '@selectors/pools'
import { BN } from '@project-serum/anchor'
import { calculatePriceSqrt, getX, getY } from '@invariant-labs/sdk/lib/math'

export function* getFarmsTotals() {
  try {
    const allFarms = yield* select(farms)
    const allPools = yield* select(pools)
    const allTokens = yield* select(tokens)

    const marketProgram = yield* call(getMarketProgram)

    const updatesObject: Record<string, FarmTotalsUpdate> = {}

    for (const address in allFarms) {
      const poolAddress = allFarms[address].pool
      const positions = yield* call(getPositionsForPool, marketProgram, poolAddress)

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
    const stakerProgram = yield* call(getStakerProgram)
    const connection = yield* call(getConnection)

    const list = yield* call([stakerProgram, stakerProgram.getAllIncentive])
    const farmsObject: Record<string, ExtendedIncentive> = {}

    const poolsKeys: string[] = []

    const promises = list.map(async ({ account, publicKey }) => {
      poolsKeys.push(account.pool.toString())

      const info = await connection.getParsedAccountInfo(account.tokenAccount)

      farmsObject[publicKey.toString()] = {
        ...account,
        address: publicKey,
        rewardToken: (info as RpcResponseAndContext<AccountInfo<ParsedAccountData>>).value.data
          .parsed.info.mint
      }
    })

    yield* call(async () => {
      await Promise.all(promises)
    })

    yield* put(poolsActions.getPoolsDataForPositions(poolsKeys))

    yield* take(poolsActions.addPoolsForPositions)

    yield* put(actions.setFarms(farmsObject))

    yield* fork(getFarmsTotals)
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetUserStakes(action: PayloadAction<PublicKey>) {
  try {
    const stakerProgram = yield* call(getStakerProgram)

    const allFarms = yield* select(farms)
    const farmPositions = yield* select(positionsForPool(allFarms[action.payload.toString()].pool))

    const list = yield* call(
      getUserStakesForFarm,
      stakerProgram,
      action.payload,
      allFarms[action.payload.toString()].pool,
      farmPositions.map(({ id }) => id)
    )
    const stakesObject: Record<string, StakeWithAddress> = {}

    list.forEach(stake => {
      stakesObject[stake.address.toString()] = stake
    })

    yield* put(actions.addUserStakes(stakesObject))
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
        position: new PublicKey(''),
        incentive: action.payload.farm,
        owner: wallet.publicKey,
        index: positionData.positionIndex,
        invariant: new PublicKey(getStakerAddress(networkTypetoStakerNetwork(currentNetwork)))
      }
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
    initialTx.partialSign(wrappedSolAccount)

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
      position: new PublicKey(''),
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
      ownerTokenAcc = yield* call(createAccount, rewardToken)
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
        position: new PublicKey(''),
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

export function* farmsSaga(): Generator {
  yield all(
    [getFarmsListHandler, getUserStakesHandler, stakePositionHandler, withdrawRewardsHandler].map(
      spawn
    )
  )
}
