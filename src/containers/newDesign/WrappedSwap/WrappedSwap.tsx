import Swap from '@components/NewDesign/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { pools } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status } from '@selectors/solanaWallet'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const tokensList = [
    {
      balance: new BN(100).mul(new BN(126)),
      decimal: 6,
      symbol: 'USDC',
      assetAddress: new PublicKey(MOCK_TOKENS.USDC),
      name: 'USD coin',
      logoURI: `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png`
    },
    {
      balance: new BN(100).mul(new BN(34786)),
      decimal: 6,
      symbol: 'USDT',
      assetAddress: new PublicKey(MOCK_TOKENS.USDT),
      name: 'Tether USD',
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
    }
  ]
  return (
    <Swap
      onSwap={(fromToken, toToken, amount) => {
        dispatch(
          actions.swap({
            fromToken,
            toToken,
            amount
          })
        )
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
    />
  )
}

export default WrappedSwap
