import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  spawn,
  all,
  select,
  takeLatest
} from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, connectWallet, disconnectWallet, WalletType } from '@web3/wallet'
import { Account, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js'
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as positionsActions } from '@reducers/positions'
import { Status } from '@reducers/solanaConnection'
import { BN } from '@project-serum/anchor'
import { tou64 } from '@consts/utils'
import { WalletAdapter } from '@web3/adapters/types'
import { getTokenDetails } from './token'
import { PayloadAction } from '@reduxjs/toolkit'
import { accounts, address, status } from '@selectors/solanaWallet'
import { DEFAULT_PUBLICKEY, SOL, USDC, USDT } from '@consts/static'
import airdropAdmin from '@consts/airdropAdmin'
export function* getWallet(): SagaGenerator<WalletAdapter> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<BN> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return new BN(balance)
}

interface IparsedTokenInfo {
  mint: string
  owner: string
  tokenAmount: {
    amount: string
    decimals: number
    uiAmount: number
  }
}
export function* fetchTokensAccounts(): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID
    }
  )
  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield* put(
      actions.addTokenAccount({
        programId: new PublicKey(info.mint),
        balance: new BN(info.tokenAmount.amount),
        address: account.pubkey,
        decimals: info.tokenAmount.decimals
      })
    )
  }
}

export function* getToken(tokenAddress: PublicKey): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const token = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, new Account())
  return token
}

export function* handleAirdrop(): Generator {
  const walletStatus = yield* select(status)
  if (walletStatus !== Status.Initialized) {
    yield put(
      snackbarsActions.add({
        message: 'Connect your wallet first',
        variant: 'warning',
        persist: false
      })
    )
    return
  }

  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  let balance = yield* call([connection, connection.getBalance], wallet.publicKey)
  if (balance < 0.05 * 1e9) {
    yield* call([connection, connection.requestAirdrop], wallet.publicKey, 0.1 * 1e9)
    balance = yield* call([connection, connection.getBalance], wallet.publicKey)
    yield* call(sleep, 2000)
    let retries = 30
    for (;;) {
      // eslint-disable-next-line eqeqeq
      if (0.05 * 1e9 < (yield* call([connection, connection.getBalance], wallet.publicKey))) {
        break
      }
      yield* call(sleep, 2000)
      if (--retries <= 0) {
        break
      }
    }
  }
  const collateralsAddresses: PublicKey[] = [USDC.address, USDT.address, SOL.address]
  const collateralsQuantities: number[] = [100 * 10 ** USDC.decimal, 100 * 10 ** USDT.decimal, 10 ** SOL.decimal]
  yield* call(getCollateralTokenAirdrop, collateralsAddresses, collateralsQuantities)
  // yield* call(getCollateralTokenAirdrop, USDT.address, 100 * 10 ** USDT.decimal)
  // yield* call(getCollateralTokenAirdrop, SOL.address, 10 ** SOL.decimal)
  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )
}

export function* setEmptyAccounts(
  collateralsAddresses: PublicKey[]
): Generator {
  const tokensAccounts = yield* select(accounts)
  const acc: PublicKey[] = []
  for (const collateral of collateralsAddresses) {
    const collateralTokenProgram = yield* call(getToken, collateral)
    const accountAddress = tokensAccounts[collateral.toString()]
      ? tokensAccounts[collateral.toString()].address
      : null
    if (accountAddress == null) {
      acc.push(collateralTokenProgram.publicKey)
    }
  }
  if (acc.length !== 0) {
    yield* call(createAccount, acc)
  } else {
  }
}

export function* getCollateralTokenAirdrop(
  collateralsAddresses: PublicKey[],
  collateralsQuantities: number[]
): Generator {
  const wallet = yield* call(getWallet)
  const instructions: Transaction[] = []
  for (const [index, collateral] of collateralsAddresses.entries()) {
    yield* call(setEmptyAccounts, collateralsAddresses)
    const tokensAccounts = yield* select(accounts)
    const ix = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      collateral,
      tokensAccounts[collateral.toString()].address,
      airdropAdmin.publicKey,
      [],
      collateralsQuantities[index]
    )
    instructions.push(new Transaction().add(ix))
  }
  const tx = instructions.reduce((tx, ix) => tx.add(ix), new Transaction())
  const connection = yield* call(getConnection)
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  tx.sign(airdropAdmin)
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
    skipPreflight: true
  })

  console.log('Token Airdroped')
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }
export function* sendToken(from: PublicKey, target: PublicKey, amount: BN): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const ix = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    from,
    target,
    wallet.publicKey,
    [],
    tou64(amount)
  )
  const signature = yield* call(signAndSend, wallet, new Transaction().add(ix))

  return signature
}
export function* signAndSend(wallet: WalletAdapter, tx: Transaction): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  const signature = yield* call([connection, connection.sendRawTransaction], signedTx.serialize())
  return signature
}
export function* createAccount(tokenAddress: PublicKey[]): SagaGenerator<PublicKey[]> {
  const wallet = yield* call(getWallet)
  const ixs: TransactionInstruction[] = []
  const associatedAccs: PublicKey[] = []
  for (const address of tokenAddress) {
    const associatedAccount = yield* call(
      Token.getAssociatedTokenAddress,
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      address,
      wallet.publicKey
    )
    associatedAccs.push(associatedAccount)
    const ix = Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      address,
      associatedAccount,
      wallet.publicKey,
      wallet.publicKey
    )
    ixs.push(ix)
  }
  yield* call(signAndSend, wallet, ixs.reduce((tx, ix) => tx.add(ix), new Transaction()))
  for (const [index, address] of tokenAddress.entries()) {
    const token = yield* call(getTokenDetails, tokenAddress[index].toString())
    yield* put(
      actions.addTokenAccount({
        programId: address,
        balance: new BN(0),
        address: associatedAccs[index],
        decimals: token.decimals
      })
    )
    yield* call(sleep, 1000)
  }
  return associatedAccs
}

export function* init(): Generator {
  console.log('init saga')
  yield* put(actions.setStatus(Status.Init))
  const wallet = yield* call(getWallet)
  // const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setAddress(wallet.publicKey))
  const balance = yield* call(getBalance, wallet.publicKey)
  yield* put(actions.setBalance(balance))
  yield* put(actions.setStatus(Status.Initialized))
  yield* call(fetchTokensAccounts)
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export function* sendSol(amount: BN, recipient: PublicKey): SagaGenerator<string> {
  const wallet = yield* call(getWallet)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount.toNumber()
    })
  )

  const txid = yield* call(signAndSend, wallet, transaction)
  return txid
}

export function* handleConnect(action: PayloadAction<PayloadTypes['connect']>): Generator {
  const walletAddress = yield* select(address)
  let enumWallet = ''
  if (!walletAddress.equals(DEFAULT_PUBLICKEY)) {
    yield* put(
      snackbarsActions.add({
        message: 'Wallet already connected.',
        variant: 'info',
        persist: false
      })
    )
    return
  }
  try {
    yield* call(connectWallet, action.payload)
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Unable to connect to wallet.',
        variant: 'error',
        persist: false
      })
    )
    return
  }
  switch (action.payload) {
    case WalletType.PHANTOM:
      enumWallet = 'phantom'
      break
    case WalletType.SOLLET:
      enumWallet = 'sollet'
      break
    case WalletType.MATH:
      enumWallet = 'math'
      break
    case WalletType.SOLFLARE:
      enumWallet = 'solflare'
      break
    default:
      enumWallet = 'phantom'
  }
  yield call([sessionStorage, sessionStorage.setItem], 'INVARIANT_SESSION_WALLET', enumWallet)
  yield* call(init)
}

export function* handleDisconnect(): Generator {
  try {
    yield* call(disconnectWallet)
    yield call([sessionStorage, sessionStorage.removeItem], 'INVARIANT_SESSION_WALLET')
    yield* put(actions.resetState())
    yield* put(positionsActions.resetState())
  } catch (error) {
    console.log(error)
  }
}

export function* connectHandler(): Generator {
  yield takeLatest(actions.connect, handleConnect)
}

export function* disconnectHandler(): Generator {
  yield takeLatest(actions.disconnect, handleDisconnect)
}

export function* airdropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}

export function* initSaga(): Generator {
  yield takeLeading(actions.initWallet, init)
}
export function* walletSaga(): Generator {
  yield all([initSaga, airdropSaga, connectHandler, disconnectHandler].map(spawn))
}
