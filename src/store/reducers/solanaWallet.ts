import {
  BTC_DEV,
  DEFAULT_PUBLICKEY,
  MC2_DEV,
  MC3_DEV,
  MCK_DEV,
  MSOL_DEV,
  NetworkType,
  RENDOGE_DEV,
  SOL_DEV,
  USDC_DEV,
  USDH_DEV,
  USDT_DEV
} from '@consts/static'
import { BN } from '@project-serum/anchor'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { PayloadType } from './types'
export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initialized = 'initalized'
}
export interface ITokenAccount {
  programId: PublicKey
  balance: BN
  address: PublicKey
  decimals: number
}
export interface ITokenData {
  programId: string
  mintAuthority: string | null
  freezeAuthority: string | null
  supply: number
  decimals: number
}
export interface ITransaction {
  recipient: string
  amount: number
  txid: string
  sending: boolean
  token?: PublicKey
  error?: string
}
export interface ISolanaWallet {
  status: Status
  address: PublicKey
  balance: BN
  accounts: { [key in string]: ITokenAccount }
  balanceLoading: boolean
  commonTokens: Record<NetworkType, PublicKey[]>
}

export const defaultState: ISolanaWallet = {
  status: Status.Uninitialized,
  address: DEFAULT_PUBLICKEY,
  balance: new BN(0),
  accounts: {},
  balanceLoading: false,
  commonTokens: {
    Devnet: [
      USDC_DEV.address,
      USDT_DEV.address,
      SOL_DEV.address,
      MSOL_DEV.address,
      BTC_DEV.address,
      RENDOGE_DEV.address,
      MCK_DEV.address,
      MC2_DEV.address,
      MC3_DEV.address,
      USDH_DEV.address
    ],
    Mainnet: [
      new PublicKey('So11111111111111111111111111111111111111112'),
      new PublicKey('JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'),
      new PublicKey('85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ'),
      new PublicKey('HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3'),
      new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
      new PublicKey('EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'),
      new PublicKey('CKaKtYvz6dKPyMvYq9Rh3UBrnNqYZAyd7iF4hJtjUvks')
    ],
    Testnet: [],
    Localnet: []
  }
}

export const solanaWalletSliceName = 'solanaWallet'
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    initWallet(state) {
      return state
    },
    setAddress(state, action: PayloadAction<PublicKey>) {
      state.address = action.payload
      return state
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<BN>) {
      state.balance = action.payload
      return state
    },
    getBalance(state) {
      return state
    },
    setIsBalanceLoading(state, action: PayloadAction<Boolean>) {
      action.payload ? (state.balanceLoading = true) : (state.balanceLoading = false)
      return state
    },
    addTokenAccount(state, action: PayloadAction<ITokenAccount>) {
      state.accounts[action.payload.programId.toString()] = action.payload
      return state
    },
    addTokenAccounts(state, action: PayloadAction<ITokenAccount[]>) {
      action.payload.forEach(account => {
        state.accounts[account.programId.toString()] = account
      })
      return state
    },
    setTokenBalance(state, action: PayloadAction<IsetTokenBalance>) {
      state.accounts[action.payload.programId].balance = action.payload.balance
      return state
    },
    setCommonTokens(state, action: PayloadAction<{ network: NetworkType; tokens: PublicKey[] }>) {
      state.commonTokens[action.payload.network] = action.payload.tokens
      return state
    },
    // Triggers rescan for tokens that we control
    rescanTokens() {},
    airdrop() {},
    connect() {},
    disconnect() {}
  }
})
interface IsetTokenBalance {
  address: string
  programId: string
  balance: BN
}

export const actions = solanaWalletSlice.actions
export const reducer = solanaWalletSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
