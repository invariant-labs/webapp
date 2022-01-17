import { all, call, put, select, spawn, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as swapActions } from '@reducers/swap'
import { swap } from '@selectors/swap'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { pools } from '@selectors/pools'
import { Pair } from '@invariant-labs/sdk'
import { getConnection } from './connection'
import { FEE_TIERS, simulateSwap, SimulateSwapInterface } from '@invariant-labs/sdk/src/utils'
import { sendAndConfirmRawTransaction } from '@solana/web3.js'
import BN from 'bn.js'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PRICE_DECIMAL } from '@consts/static'
import { printBN } from '@consts/utils'

export function* handleSimulate(): Generator {
  try {
    const allPools = yield* select(pools)
    const { slippage, simulate } = yield* select(swap)
    const marketProgram = yield* call(getMarketProgram)
    const swapPool = allPools.find(
      pool =>
        (simulate.fromToken.toString() === pool.tokenX.toString() &&
          simulate.toToken.toString() === pool.tokenY.toString()) ||
        (simulate.fromToken.toString() === pool.tokenY.toString() &&
          simulate.toToken.toString() === pool.tokenX.toString())
    )
    console.log('sqrtPrice to simulate: ', printBN(simulate.simulatePrice, PRICE_DECIMAL))

    if (!swapPool) {
      return
    }
    const isXtoY =
      simulate.fromToken.toString() === swapPool.tokenX.toString() &&
      simulate.toToken.toString() === swapPool.tokenY.toString()
    const tickMap = yield* call(
      [marketProgram, marketProgram.getTickmap],
      new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0])
    )
    const ticksArray = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
      Infinity,
      undefined,
      isXtoY ? 'down' : 'up'
    )
    const test = new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0])
    let ticks: Map<number, Tick> = new Map<number, Tick>()

    if (ticks.size === 0) {
      for (var tick of ticksArray) {
        ticks.set(tick.index, tick)
      }
    }

    if (simulate.amount.gt(new BN(0))) {
      const simulateObject: SimulateSwapInterface = {
        pair: new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
        xToY: isXtoY,
        byAmountIn: false, // to jest jeszcze do zrobienia
        swapAmount: simulate.amount,
        currentPrice: { v: simulate.simulatePrice },
        slippage: slippage,
        pool: swapPool,
        ticks: ticks,
        tickmap: tickMap,
        market: marketProgram
      }

      yield put(swapActions.changePrice(simulateSwap(simulateObject).accumulatedAmountOut))
      console.log('simulate price: ', simulateSwap(simulateObject).accumulatedAmountOut)
    } else {
      yield put(swapActions.changePrice(new BN(0)))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* handleSwap(): Generator {
  try {
    const allPools = yield* select(pools)
    const { slippage, price, simulate } = yield* select(swap)
    console.log('amount', simulate.amount.toString())
    console.log('price', price.v.toString())
    const swapPool = allPools.find(
      pool =>
        (simulate.fromToken.toString() === pool.tokenX.toString() &&
          simulate.toToken.toString() === pool.tokenY.toString()) ||
        (simulate.fromToken.toString() === pool.tokenY.toString() &&
          simulate.toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return
    }

    const isXtoY =
      simulate.fromToken.toString() === swapPool.tokenX.toString() &&
      simulate.toToken.toString() === swapPool.tokenY.toString()

    const wallet = yield* call(getWallet)

    const tokensAccounts = yield* select(accounts)
    const marketProgram = yield* call(getMarketProgram)

    let fromAddress = tokensAccounts[simulate.fromToken.toString()]
      ? tokensAccounts[simulate.fromToken.toString()].address
      : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, simulate.fromToken)
    }
    let toAddress = tokensAccounts[simulate.toToken.toString()]
      ? tokensAccounts[simulate.toToken.toString()].address
      : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, simulate.toToken)
    }
    const swapTx = yield* call([marketProgram, marketProgram.swapTransaction], {
      pair: new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
      XtoY: isXtoY,
      amount: simulate.amount,
      knownPrice: price,
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress
    })
    const connection = yield* call(getConnection)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    swapTx.recentBlockhash = blockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], swapTx)
    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(swapActions.setSwapSuccess(!!txid.length))

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapping failed. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }
  } catch (error) {
    console.log(error)

    yield put(swapActions.setSwapSuccess(false))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* simulateHandler(): Generator {
  yield* takeEvery(swapActions.simulate, handleSimulate)
}
export function* swapHandler(): Generator {
  yield* takeEvery(swapActions.swap, handleSwap)
}

export function* swapSaga(): Generator {
  yield all([simulateHandler, swapHandler].map(spawn))
}
