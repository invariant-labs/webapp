import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '@store/reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { PublicKey } from '@solana/web3.js'
import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { tokens } from './pools'
import {
  WRAPPED_SOL_ADDRESS,
  WSOL_POOL_INIT_LAMPORTS,
  WSOL_POSITION_INIT_LAMPORTS
} from '@store/consts/static'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status, balanceLoading, overviewSwitch } = keySelectors(
  store,
  ['address', 'balance', 'accounts', 'status', 'balanceLoading', 'overviewSwitch']
)

export const tokenBalance = (tokenAddress: PublicKey) =>
  createSelector(accounts, balance, (tokensAccounts, solBalance) => {
    if (tokenAddress.equals(new PublicKey(MOCK_TOKENS.SOL))) {
      return { balance: solBalance, decimals: 9 }
    } else {
      if (!tokensAccounts[tokenAddress.toString()]) {
        return { balance: new BN(0), decimals: 9 }
      }
      return {
        balance: tokensAccounts[tokenAddress.toString()].balance,
        decimals: tokensAccounts[tokenAddress.toString()].decimals
      }
    }
  })
export const tokenAccount = (tokenAddress: PublicKey) =>
  createSelector(accounts, tokensAccounts => {
    if (tokensAccounts[tokenAddress.toString()]) {
      return tokensAccounts[tokenAddress.toString()]
    }
  })

export const poolTokens = createSelector(
  accounts,
  tokens,
  balance,
  (allAccounts, tokens, fogoBalance) => {
    return Object.values(tokens).map(token => ({
      ...token,
      assetAddress: token.address,
      balance:
        token.address.toString() === WRAPPED_SOL_ADDRESS
          ? fogoBalance
          : allAccounts[token.address.toString()]?.balance ?? new BN(0)
    }))
  }
)

export const tokenAccountsAddress = () =>
  createSelector(accounts, tokenAccounts => {
    return Object.values(tokenAccounts).map(item => {
      return item.address
    })
  })
export interface SwapToken {
  balance: BN
  decimals: number
  symbol: string
  assetAddress: PublicKey
  name: string
  logoURI: string
  isUnknown?: boolean
  coingeckoId?: string
}

export const swapTokens = createSelector(
  accounts,
  tokens,
  balance,
  (allAccounts, tokens, solBalance) => {
    return Object.values(tokens).map(token => ({
      ...token,
      assetAddress: token.address,
      balance:
        token.address.toString() === WRAPPED_SOL_ADDRESS
          ? solBalance
          : allAccounts[token.address.toString()]?.balance ?? new BN(0)
    }))
  }
)

export const swapTokensDict = createSelector(
  accounts,
  tokens,
  balance,
  (allAccounts, tokens, solBalance) => {
    const swapTokens: Record<string, SwapToken> = {}

    Object.entries(tokens).forEach(([key, val]) => {
      swapTokens[key] = {
        ...val,
        assetAddress: val.address,
        balance:
          val.address.toString() === WRAPPED_SOL_ADDRESS
            ? solBalance
            : allAccounts[val.address.toString()]?.balance ?? new BN(0)
      }
    })

    return swapTokens
  }
)

export const canCreateNewPool = createSelector(balance, solBalance =>
  solBalance.gte(WSOL_POOL_INIT_LAMPORTS)
)

export const canCreateNewPosition = createSelector(balance, solBalance =>
  solBalance.gte(WSOL_POSITION_INIT_LAMPORTS)
)

export type TokenAccounts = ITokenAccount & {
  symbol: string
  usdValue: BN
  assetDecimals: number
}

export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokenAccount,
  balanceLoading,
  overviewSwitch
}
export default solanaWalletSelectors
