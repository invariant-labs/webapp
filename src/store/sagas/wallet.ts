import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  spawn,
  all,
  select,
  takeLatest,
  delay
} from 'typed-redux-saga'
import { actions, ITokenAccount, Status } from '@store/reducers/solanaWallet'
import { getConnection, handleRpcError } from './connection'
import { getSolanaWallet, disconnectWallet } from '@utils/web3/wallet'
import {
  Account,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js'
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { actions as positionsActions } from '@store/reducers/positions'
import { BN } from '@project-serum/anchor'
import { WalletAdapter } from '@utils/web3/adapters/types'
import { getTokenDetails } from './token'
import { accounts, status } from '@store/selectors/solanaWallet'
import { airdropQuantities, airdropTokens, WRAPPED_SOL_ADDRESS } from '@store/consts/static'
import { Token as StoreToken } from '@store/consts/types'
import airdropAdmin from '@store/consts/airdropAdmin'
import { network } from '@store/selectors/solanaConnection'
import { tokens } from '@store/selectors/pools'
import { actions as poolsActions } from '@store/reducers/pools'
import { actions as farmsActions } from '@store/reducers/farms'
import { actions as bondsActions } from '@store/reducers/bonds'
import { closeSnackbar } from 'notistack'
import { createLoaderKey } from '@utils/utils'
import { PayloadAction } from '@reduxjs/toolkit'

export function* getWallet(): SagaGenerator<WalletAdapter> {
  const wallet = yield* call(getSolanaWallet)

  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<BN> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return new BN(balance)
}

export function* handleBalance(): Generator {
  const wallet = yield* call(getWallet)
  if (wallet.publicKey.toString() === '11111111111111111111111111111111') {
    yield* put(actions.setStatus(Status.Error))
    throw new Error('Wallet not connected')
  }
  yield* put(actions.setAddress(wallet.publicKey))
  yield* put(actions.setIsBalanceLoading(true))
  const [balance] = yield* all([call(getBalance, wallet.publicKey), call(fetchTokensAccounts)])
  yield* put(actions.setBalance(balance))
  yield* put(actions.setIsBalanceLoading(false))
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
    if (account.pubkey.toString() === WRAPPED_SOL_ADDRESS.toString()) {
      console.log('account', account)
    }
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

  if (newAccounts.length) {
    yield* put(actions.addTokenAccounts(newAccounts))
  }

  if (unknownTokens.length) {
    yield* put(poolsActions.addTokens(unknownTokens))
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

  const loaderKey = createLoaderKey()
  yield put(
    snackbarsActions.add({
      message: 'Airdrop in progress',
      variant: 'pending',
      persist: true,
      key: loaderKey
    })
  )

  const connection = yield* call(getConnection)
  const networkType = yield* select(network)
  const wallet = yield* call(getWallet)

  let balance = 0
  try {
    balance = yield* call([connection, connection.getBalance], wallet.publicKey)
    if (balance < 0.05 * 1e9) {
      yield* call([connection, connection.requestAirdrop], wallet.publicKey, 0.1 * 1e9)
      balance = yield* call([connection, connection.getBalance], wallet.publicKey)
      yield* call(sleep, 2000)
      let retries = 30
      for (;;) {
        if (0.05 * 1e9 < (yield* call([connection, connection.getBalance], wallet.publicKey))) {
          break
        }
        yield* call(sleep, 2000)
        if (--retries <= 0) {
          break
        }
      }
    }
    yield* call(
      getCollateralTokenAirdrop,
      airdropTokens[networkType],
      airdropQuantities[networkType]
    )
    yield put(
      snackbarsActions.add({
        message: 'You will soon receive airdrop',
        variant: 'success',
        persist: false
      })
    )

    closeSnackbar(loaderKey)
    yield put(snackbarsActions.remove(loaderKey))
  } catch (error) {
    console.log('airdrop error', error)
    closeSnackbar(loaderKey)
    yield put(snackbarsActions.remove(loaderKey))
  }

  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )

  closeSnackbar(loaderKey)
  yield put(snackbarsActions.remove(loaderKey))
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
  const blockhash = yield* call([connection, connection.getLatestBlockhash])
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = blockhash.blockhash
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)

  signedTx.partialSign(airdropAdmin)

  yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
    skipPreflight: true
  })
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }

export function* signAndSend(wallet: WalletAdapter, tx: Transaction): SagaGenerator<string> {
  const connection = yield* call(getConnection)
  const blockhash = yield* call([connection, connection.getLatestBlockhash])
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

export function* init(isEagerConnect: boolean): Generator {
  try {
    if (isEagerConnect) {
      yield* delay(500)
    }

    const wallet = yield* call(getWallet)
    if (!wallet.connected) {
      yield* delay(500)
    }

    const wallet2 = yield* call(getWallet)

    if (!wallet2.connected) {
      yield* put(actions.setStatus(Status.Uninitialized))
      return
    }
    yield* put(actions.setStatus(Status.Init))

    if (isEagerConnect) {
      yield* put(
        snackbarsActions.add({
          message: 'Wallet reconnected.',
          variant: 'success',
          persist: false
        })
      )
    } else {
      yield* put(
        snackbarsActions.add({
          message: 'Wallet connected.',
          variant: 'success',
          persist: false
        })
      )
    }

    yield* call(handleBalance)
    yield* put(actions.setStatus(Status.Initialized))
  } catch (error) {}
}

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

export function* handleChangeWalletInExtenstion(): Generator {
  try {
    yield* call(init, false)
  } catch (error) {
    yield* call(handleRpcError, (error as Error).message)
  }
}

export function* handleConnect(action: PayloadAction<boolean>): Generator {
  try {
    const walletStatus = yield* select(status)
    const wallet = yield* call(getWallet)

    if (walletStatus === Status.Initialized && wallet.connected) {
      yield* put(
        snackbarsActions.add({
          message: 'Wallet already connected.',
          variant: 'info',
          persist: false
        })
      )
      return
    }
    yield* call(init, action.payload)
  } catch (error) {
    yield* call(handleRpcError, (error as Error).message)
  }
}

export function* handleDisconnect(): Generator {
  try {
    yield* call(disconnectWallet)
    yield* put(actions.resetState())
    yield* put(positionsActions.setPositionsList([]))
    yield* put(farmsActions.setUserStakes({}))
    yield* put(
      positionsActions.setCurrentPositionRangeTicks({
        lowerTick: undefined,
        upperTick: undefined
      })
    )
    yield* put(bondsActions.setUserVested({}))
  } catch (error) {
    console.log(error)

    yield* call(handleRpcError, (error as Error).message)
  }
}

export function* changeWalletInExtenstionHandler(): Generator {
  yield takeLatest(actions.changeWalletInExtension, handleChangeWalletInExtenstion)
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

export function* handleBalanceSaga(): Generator {
  yield takeLatest(actions.getBalance, handleBalance)
}

export function* walletSaga(): Generator {
  yield all(
    [
      airdropSaga,
      connectHandler,
      disconnectHandler,
      handleBalanceSaga,
      changeWalletInExtenstionHandler
    ].map(spawn)
  )
}
