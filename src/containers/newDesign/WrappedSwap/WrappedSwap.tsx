import Swap from '@components/NewDesign/Swap/Swap'
import { BN } from '@project-serum/anchor'
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
      balance: new BN(100).mul(new BN(34786)),
      decimal: 6,
      symbol: 'SOL',
      assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
      name: 'Wrapped Solana',
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    {
      balance: new BN(100).mul(new BN(126)),
      decimal: 6,
      symbol: 'BTC',
      assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      name: 'BTC',
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
    },
    {
      balance: new BN(10).mul(new BN(5342)),
      decimal: 6,
      symbol: 'USDC',
      assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      name: 'USD coin',
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
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
    />
  )
}

export default WrappedSwap
