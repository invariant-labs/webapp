import { actions, RedeemBond, BuyBond, BondSaleWithAddress, BondWithAddress } from '@reducers/bonds'
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
import { bondsList, userVested } from '@selectors/bonds'
import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { BN } from '@project-serum/anchor'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { network, rpcAddress } from '@selectors/solanaConnection'

export function* handleGetBondsList() {
  try {
    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)

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
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)
    const walletAddess = yield* select(address)

    const list = yield* call([bondsProgram, bondsProgram.getAllOwnerBonds], walletAddess)
    const vestedObject: Record<string, BondWithAddress> = {}

    list.forEach(({ publicKey, account }) => {
      vestedObject[publicKey.toString()] = {
        ...account,
        address: publicKey
      }
    })

    yield* put(actions.setUserVested(vestedObject))
  } catch (error) {
    console.log(error)
  }
}

export function* handleBuyBondWithWSOL(data: BuyBond) {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)

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

    const bondKeypair = Keypair.generate()
    const bondTx = yield* call(
      [bondsProgram, bondsProgram.createBondTransaction],
      {
        ...data,
        ownerQuoteAccount: wrappedSolAccount.publicKey
      },
      bondKeypair.publicKey
    )

    const initialTx = new Transaction()
      .add(createIx)
      .add(transferIx)
      .add(initIx)
      .add(bondTx)
      .add(unwrapIx)

    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], initialTx)

    signedTx.partialSign(wrappedSolAccount, bondKeypair)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    if (!txid.length) {
      yield* put(actions.setBuyBondSuccess(false))
      yield* put(
        snackbarsActions.add({
          message: 'Failed to buy bond. Please unwrap wrapped SOL in your wallet and try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield* put(actions.setBuyBondSuccess(true))
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
    yield* put(actions.setBuyBondSuccess(false))
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
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)

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
      yield* put(actions.setBuyBondSuccess(false))
      yield* put(
        snackbarsActions.add({
          message: 'Failed to buy bond. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield* put(actions.setBuyBondSuccess(true))
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
    yield* put(actions.setBuyBondSuccess(false))
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
    const allUserVested = yield* select(userVested)

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)

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

    const redeemTx = yield* call([bondsProgram, bondsProgram.claimBondTransaction], {
      bondSale: data.bondSale,
      bondId: data.bondId,
      ownerBondAccount: wrappedSolAccount.publicKey
    })

    const initialTx = new Transaction().add(createIx).add(initIx).add(redeemTx).add(unwrapIx)

    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

    const initialSignedTx = yield* call([wallet, wallet.signTransaction], initialTx)

    initialSignedTx.partialSign(wrappedSolAccount)

    const txid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      initialSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

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

      if (allUserVested[data.vestedAddress.toString()].vestingEnd.toNumber() * 1000 < Date.now()) {
        yield* put(actions.removeVested(data.vestedAddress))
      }
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
    const allUserVested = yield* select(userVested)

    if (allBonds[action.payload.bondSale.toString()].tokenBond.toString() === WRAPPED_SOL_ADDRESS) {
      return yield* call(handleRedeemBondWithWSOL, action.payload)
    }

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const bondsProgram = yield* call(getBondsProgram, networkType, rpc)

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
      bondSale: action.payload.bondSale,
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

      if (
        allUserVested[action.payload.vestedAddress.toString()].vestingEnd.toNumber() * 1000 <
        Date.now()
      ) {
        yield* put(actions.removeVested(action.payload.vestedAddress))
      }
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
