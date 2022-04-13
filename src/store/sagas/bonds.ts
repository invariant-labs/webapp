import { actions, RedeemBond, BuyBond, BondSaleWithAddress } from '@reducers/bonds'
import { getBondsProgram } from '@web3/programs/bonds'
import { all, call, put, select, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { PayloadAction } from '@reduxjs/toolkit'
import { getFullNewTokensData } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { actions as poolsActions } from '@reducers/pools'
import { getConnection } from './connection'
import {
  Keypair,
  PublicKey,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction
} from '@solana/web3.js'
import { accounts, address } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { bondsList } from '@selectors/bonds'
import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { BN } from '@project-serum/anchor'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'

export function* handleGetBondsList() {
  try {
    const connection = yield* call(getConnection)
    const bondsProgram = yield* call(getBondsProgram)

    const list = yield* call([bondsProgram, bondsProgram.getAllBondSales])

    const allTokens = yield* select(tokens)

    const unknownTokens = new Set<PublicKey>()
    const bondsObject: Record<string, BondSaleWithAddress> = {}

    list.forEach(({ publicKey, account }) => {
      bondsObject[publicKey.toString()] = {
        ...account,
        address: publicKey
      }
      if (!allTokens[account.tokenBond.toString()]) {
        unknownTokens.add(account.tokenBond)
      }

      if (!allTokens[account.tokenQuote.toString()]) {
        unknownTokens.add(account.tokenQuote)
      }
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))

    yield* put(actions.setBondsList(bondsObject))
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetUserVested() {
  try {
    const bondsProgram = yield* call(getBondsProgram)
    const walletAddess = yield* select(address)

    const list = yield* call([bondsProgram, bondsProgram.getAllOwnerBonds], walletAddess)

    yield* put(actions.setUserVested(list.map(e => e.account)))
  } catch (error) {
    console.log(error)
  }
}

export function* handleBuyBondWithWSOL(data: BuyBond) {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const bondsProgram = yield* call(getBondsProgram)

    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
    })

    const solAmount = data.amount.mul(data.priceLimit).div(new BN(10 ** DECIMAL))

    const transferIx = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wrappedSolAccount.publicKey,
      lamports: solAmount.toNumber()
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

    const initialTx = new Transaction().add(createIx).add(transferIx).add(initIx)

    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey
    initialTx.partialSign(wrappedSolAccount)

    const bondKeypair = Keypair.generate()
    const bondTx = yield* call(
      [bondsProgram, bondsProgram.createBondTransaction],
      {
        ...data,
        ownerQuoteAccount: wrappedSolAccount.publicKey
      },
      bondKeypair.publicKey
    )
    const bondBlockhash = yield* call([connection, connection.getRecentBlockhash])
    bondTx.recentBlockhash = bondBlockhash.blockhash
    bondTx.feePayer = wallet.publicKey
    bondTx.partialSign(bondKeypair)

    const unwrapTx = new Transaction().add(unwrapIx)
    const unwrapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    const [initialSignedTx, bondSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, bondTx, unwrapTx]
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

    const bondTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      bondSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!bondTxid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to buy bond. Please unwrap wrapped SOL in your wallet and try again.',
          variant: 'error',
          persist: false,
          txid: bondTxid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Bond bought successfully.',
          variant: 'success',
          persist: false,
          txid: bondTxid
        })
      )

      yield* put(actions.getUserVested())
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
        message: 'Failed to buy bond. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleBuyBond(action: PayloadAction<BuyBond>) {
  try {
    const allBonds = yield* select(bondsList)

    if (
      allBonds[action.payload.bondSale.toString()].tokenQuote.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleBuyBondWithWSOL, action.payload)
    }

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const bondsProgram = yield* call(getBondsProgram)

    const tokensAccounts = yield* select(accounts)

    let ownerQuoteAccount = tokensAccounts[
      allBonds[action.payload.bondSale.toString()].tokenQuote.toString()
    ]
      ? tokensAccounts[allBonds[action.payload.bondSale.toString()].tokenQuote.toString()].address
      : null

    if (ownerQuoteAccount === null) {
      ownerQuoteAccount = yield* call(
        createAccount,
        allBonds[action.payload.bondSale.toString()].tokenQuote
      )
    }

    const bondKeypair = Keypair.generate()
    const tx = yield* call(
      [bondsProgram, bondsProgram.createBondTransaction],
      {
        ...action.payload,
        ownerQuoteAccount
      },
      bondKeypair.publicKey
    )
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    signedTx.partialSign(bondKeypair)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    if (!txid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to buy bond. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Bond bought successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )

      yield* put(actions.getUserVested())
    }
  } catch (error) {
    console.log(error)
    yield* put(
      snackbarsActions.add({
        message: 'Failed to buy bond. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleRedeemBondWithWSOL(data: RedeemBond) {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const bondsProgram = yield* call(getBondsProgram)

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

    const redeemTx = yield* call([bondsProgram, bondsProgram.claimBondTransaction], {
      bondId: data.bondId,
      ownerBondAccount: wrappedSolAccount.publicKey
    })
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    redeemTx.recentBlockhash = blockhash.blockhash
    redeemTx.feePayer = wallet.publicKey

    const unwrapTx = new Transaction().add(unwrapIx)
    const unwrapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    const [initialSignedTx, redeemSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, redeemTx, unwrapTx]
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

    const redeemTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      redeemSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!redeemTxid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to redeem bond. Please try again.',
          variant: 'error',
          persist: false,
          txid: redeemTxid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Bond redeemed successfully.',
          variant: 'success',
          persist: false,
          txid: redeemTxid
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
        message: 'Failed to redeem bond. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleRedeemBond(action: PayloadAction<RedeemBond>) {
  try {
    const allBonds = yield* select(bondsList)

    if (allBonds[action.payload.bondSale.toString()].tokenBond.toString() === WRAPPED_SOL_ADDRESS) {
      return yield* call(handleRedeemBondWithWSOL, action.payload)
    }

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const bondsProgram = yield* call(getBondsProgram)

    const tokensAccounts = yield* select(accounts)

    let ownerBondAccount = tokensAccounts[
      allBonds[action.payload.bondSale.toString()].tokenBond.toString()
    ]
      ? tokensAccounts[allBonds[action.payload.bondSale.toString()].tokenBond.toString()].address
      : null

    if (ownerBondAccount === null) {
      ownerBondAccount = yield* call(
        createAccount,
        allBonds[action.payload.bondSale.toString()].tokenBond
      )
    }

    const tx = yield* call([bondsProgram, bondsProgram.claimBondTransaction], {
      bondId: action.payload.bondId,
      ownerBondAccount
    })
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    if (!txid.length) {
      yield* put(
        snackbarsActions.add({
          message: 'Failed to redeem bond. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Bond redeemed successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }
  } catch (error) {
    console.log(error)
    yield* put(
      snackbarsActions.add({
        message: 'Failed to redeem bond. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* getBondsListHandler(): Generator {
  yield* takeLatest(actions.getBondsList, handleGetBondsList)
}

export function* getUserVestedHandler(): Generator {
  yield* takeLatest(actions.getUserVested, handleGetUserVested)
}

export function* buyBondHandler(): Generator {
  yield* takeLatest(actions.buyBond, handleBuyBond)
}

export function* redeemBondHandler(): Generator {
  yield* takeLatest(actions.redeemBond, handleRedeemBond)
}

export function* bondsSaga(): Generator {
  yield all(
    [getBondsListHandler, getUserVestedHandler, buyBondHandler, redeemBondHandler].map(spawn)
  )
}
