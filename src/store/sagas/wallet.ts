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

import { actions, ITokenAccount, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, connectWallet, disconnectWallet, WalletType } from '@web3/wallet'
import {
  Account,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js'
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
import {
  airdropQuantities,
  airdropTokens,
  DEFAULT_PUBLICKEY,
  Token as StoreToken
} from '@consts/static'
import airdropAdmin from '@consts/airdropAdmin'
import { network } from '@selectors/solanaConnection'
import { tokens } from '@selectors/pools'
import { actions as poolsActions } from '@reducers/pools'
import { actions as bondsActions } from '@reducers/bonds'

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
  const allTokens = yield* select(tokens)
  const newAccounts: ITokenAccount[] = []
  const unknownTokens: Record<string, StoreToken> = {}
  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    newAccounts.push({
      programId: new PublicKey(info.mint),
      balance: new BN(info.tokenAmount.amount),
      address: account.pubkey,
      decimals: info.tokenAmount.decimals
    })

    if (!allTokens[info.mint]) {
      unknownTokens[info.mint] = {
        name: info.mint,
        symbol: `${info.mint.slice(0, 4)}...${info.mint.slice(-4)}`,
        decimals: info.tokenAmount.decimals,
        address: new PublicKey(info.mint),
        logoURI: '/unknownToken.svg',
        isUnknown: true
      }
    }
  }

  yield* put(actions.addTokenAccounts(newAccounts))
  yield* put(poolsActions.addTokens(unknownTokens))
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
  const networkType = yield* select(network)
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

  yield* call(getCollateralTokenAirdrop, airdropTokens[networkType], airdropQuantities[networkType])
  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )
}

export function* setEmptyAccounts(collateralsAddresses: PublicKey[]): Generator {
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
    yield* call(createMultipleAccounts, acc)
  }
}

export function* getCollateralTokenAirdrop(
  collateralsAddresses: PublicKey[],
  collateralsQuantities: number[]
): Generator {
  const wallet = yield* call(getWallet)
  const instructions: TransactionInstruction[] = []
  yield* call(setEmptyAccounts, collateralsAddresses)
  const tokensAccounts = yield* select(accounts)
  for (const [index, collateral] of collateralsAddresses.entries()) {
    instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        collateral,
        tokensAccounts[collateral.toString()].address,
        airdropAdmin.publicKey,
        [],
        collateralsQuantities[index]
      )
    )
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

export function* createAccount(tokenAddress: PublicKey): SagaGenerator<PublicKey> {
  const wallet = yield* call(getWallet)
  const associatedAccount = yield* call(
    Token.getAssociatedTokenAddress,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenAddress,
    wallet.publicKey
  )
  const ix = Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenAddress,
    associatedAccount,
    wallet.publicKey,
    wallet.publicKey
  )
  yield* call(signAndSend, wallet, new Transaction().add(ix))
  const token = yield* call(getTokenDetails, tokenAddress.toString())
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: new BN(0),
      address: associatedAccount,
      decimals: token.decimals
    })
  )
  const allTokens = yield* select(tokens)
  if (!allTokens[tokenAddress.toString()]) {
    yield* put(
      poolsActions.addTokens({
        [tokenAddress.toString()]: {
          name: tokenAddress.toString(),
          symbol: `${tokenAddress.toString().slice(0, 4)}...${tokenAddress.toString().slice(-4)}`,
          decimals: token.decimals,
          address: tokenAddress,
          logoURI: '/unknownToken.svg',
          isUnknown: true
        }
      })
    )
  }
  yield* call(sleep, 1000) // Give time to subscribe to new token
  return associatedAccount
}

export function* createMultipleAccounts(tokenAddress: PublicKey[]): SagaGenerator<PublicKey[]> {
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
  yield* call(
    signAndSend,
    wallet,
    ixs.reduce((tx, ix) => tx.add(ix), new Transaction())
  )
  const allTokens = yield* select(tokens)
  const unknownTokens: Record<string, StoreToken> = {}
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
    // Give time to subscribe to new token
    yield* call(sleep, 1000)

    if (!allTokens[tokenAddress[index].toString()]) {
      unknownTokens[tokenAddress[index].toString()] = {
        name: tokenAddress[index].toString(),
        symbol: `${tokenAddress[index].toString().slice(0, 4)}...${tokenAddress[index]
          .toString()
          .slice(-4)}`,
        decimals: token.decimals,
        address: tokenAddress[index],
        logoURI: '/unknownToken.svg',
        isUnknown: true
      }
    }
  }

  yield* put(poolsActions.addTokens(unknownTokens))

  return associatedAccs
}

export function* init(): Generator {
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
    case WalletType.COIN98:
      enumWallet = 'coin98'
      break
    case WalletType.SLOPE:
      enumWallet = 'slope'
      break
    case WalletType.CLOVER:
      enumWallet = 'clover'
      break
    case WalletType.NIGHTLY:
      enumWallet = 'nightly'
      break
    default:
      enumWallet = 'phantom'
  }
  yield call([localStorage, localStorage.setItem], 'INVARIANT_SESSION_WALLET', enumWallet)
  yield* call(init)
}

export function* handleDisconnect(): Generator {
  try {
    yield* call(disconnectWallet)
    yield call([localStorage, localStorage.removeItem], 'INVARIANT_SESSION_WALLET')
    yield* put(actions.resetState())
    yield* put(positionsActions.setPositionsList([]))
    yield* put(
      positionsActions.setCurrentPositionRangeTicks({
        lowerTick: undefined,
        upperTick: undefined
      })
    )
    yield* put(bondsActions.setUserVested({}))
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
