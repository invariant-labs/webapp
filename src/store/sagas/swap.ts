import { all, call, put, select, spawn, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as swapActions } from '@reducers/swap'
import { swap } from '@selectors/swap'
import { poolTicks, pools, tokens } from '@selectors/pools'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { getConnection } from './connection'
import { Keypair, sendAndConfirmRawTransaction, SystemProgram, Transaction } from '@solana/web3.js'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { WRAPPED_SOL_ADDRESS, PAIRS } from '@consts/static'
import { simulateSwap, SimulateSwapInterface } from '@invariant-labs/sdk/src/utils'
import BN from 'bn.js'
import { Tick } from '@invariant-labs/sdk/src/market'
import { network } from '@selectors/solanaConnection'

export function* handleSimulate(): Generator {
  try {
    const allPools = yield* select(pools)
    const ticksArray = yield* select(poolTicks)
    const networkType = yield* select(network)
    const { slippage, simulate } = yield* select(swap)
    const marketProgram = yield* call(getMarketProgram)
    const poolIndexes: number[] = []
    const swapPool = PAIRS[networkType].filter(
      pool =>
        (simulate.fromToken.equals(pool.tokenX) && simulate.toToken.equals(pool.tokenY)) ||
        (simulate.fromToken.equals(pool.tokenY) && simulate.toToken.equals(pool.tokenX))
    )
    // trunk-ignore(eslint/array-callback-return)
    PAIRS[networkType].map((pair, index) => {
      if (
        (simulate.fromToken.equals(pair.tokenX) && simulate.toToken.equals(pair.tokenY)) ||
        (simulate.fromToken.equals(pair.tokenY) && simulate.toToken.equals(pair.tokenX))
      ) {
        poolIndexes.push(index)
      }
    })
    if (!swapPool) {
      return
    }
    let i = 0
    let swapSimulateRouterAmount: BN = new BN(0)
    for (const pool of swapPool) {
      const isXtoY = simulate.fromToken.equals(pool.tokenX) && simulate.toToken.equals(pool.tokenY)

      const tickMap = yield* call(
        [marketProgram, marketProgram.getTickmap],
        new Pair(pool.tokenX, pool.tokenY, pool.feeTier)
      )
      const ticks: Map<number, Tick> = new Map<number, Tick>()
      if (ticks.size === 0) {
        for (const tick of ticksArray[i]) {
          ticks.set(tick.index, tick)
        }
      }
      if (simulate.amount.gt(new BN(0))) {
        const simulateObject: SimulateSwapInterface = {
          pair: new Pair(pool.tokenX, pool.tokenY, pool.feeTier),
          xToY: isXtoY,
          byAmountIn: true,
          swapAmount: simulate.amount,
          currentPrice: { v: simulate.simulatePrice },
          slippage: slippage,
          pool: allPools[poolIndexes[i]],
          ticks: ticks,
          tickmap: tickMap,
          market: marketProgram
        }
        const swapSimulateResault = simulateSwap(simulateObject)
        if (swapSimulateRouterAmount.lt(swapSimulateResault.accumulatedAmountOut)) {
          swapSimulateRouterAmount = swapSimulateResault.accumulatedAmountOut
          yield put(swapActions.setPoolIndex(poolIndexes[i]))
        }
        yield put(swapActions.simulateSuccess(true))
      } else {
        yield put(swapActions.changePrice(new BN(0)))
      }
      i++
    }
    yield put(swapActions.changePrice(swapSimulateRouterAmount))
  } catch (error) {
    yield put(swapActions.simulateSuccess(false))
    console.log(error)
  }
}

export function* handleSwapWithSOL(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const networkType = yield* select(network)
    const { slippage, simulate, poolIndex } = yield* select(swap)

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const swapPool = allPools.find(
      pool =>
        (simulate.fromToken.equals(pool.tokenX) && simulate.toToken.equals(pool.tokenY)) ||
        (simulate.fromToken.equals(pool.tokenY) && simulate.toToken.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    const isXtoY =
      simulate.fromToken.equals(swapPool.tokenX) && simulate.toToken.equals(swapPool.tokenY)

    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
    })

    const transferIx = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wrappedSolAccount.publicKey,
      lamports:
        allTokens[simulate.fromToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS
          ? simulate.amount.toNumber()
          : 0
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

    let fromAddress =
      allTokens[simulate.fromToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[simulate.fromToken.toString()]
        ? tokensAccounts[simulate.fromToken.toString()].address
        : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, simulate.fromToken)
    }
    let toAddress =
      allTokens[simulate.toToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[simulate.toToken.toString()]
        ? tokensAccounts[simulate.toToken.toString()].address
        : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, simulate.toToken)
    }
    console.log(poolIndex)
    console.log('swap amount: ', simulate.amount.toString())
    const swapTx = yield* call([marketProgram, marketProgram.swapTransactionSplit], {
      pair: new Pair(simulate.fromToken, simulate.toToken, PAIRS[networkType][poolIndex].feeTier),
      xToY: isXtoY,
      amount: simulate.amount,
      knownPrice: { v: simulate.simulatePrice },
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: true,
      owner: wallet.publicKey
    })
    console.log('swap amount: ', simulate.amount.toString())
    const tx =
      allTokens[simulate.fromToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? new Transaction().add(createIx).add(transferIx).add(initIx).add(swapTx).add(unwrapIx)
        : new Transaction().add(createIx).add(initIx).add(swapTx).add(unwrapIx)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    signedTx.partialSign(wrappedSolAccount)
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

export function* handleSwap(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const networkType = yield* select(network)
    const { slippage, simulate, poolIndex } = yield* select(swap)

    if (
      allTokens[simulate.fromToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[simulate.toToken.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleSwapWithSOL)
    }

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const marketProgram = yield* call(getMarketProgram)
    const swapPool = allPools.find(
      pool =>
        (simulate.fromToken.equals(pool.tokenX) && simulate.toToken.equals(pool.tokenY)) ||
        (simulate.fromToken.equals(pool.tokenY) && simulate.toToken.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    const isXtoY =
      simulate.fromToken.equals(swapPool.tokenX) && simulate.toToken.equals(swapPool.tokenY)

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
    const swapTx = yield* call([marketProgram, marketProgram.swapTransactionSplit], {
      pair: new Pair(simulate.fromToken, simulate.toToken, PAIRS[networkType][poolIndex].feeTier),
      xToY: isXtoY,
      amount: simulate.amount,
      knownPrice: { v: simulate.simulatePrice },
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: true,
      owner: wallet.publicKey
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
