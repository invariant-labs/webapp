import Swap from '@components/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { pools } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status, swapTokens } from '@selectors/solanaWallet'
import { PRICE_DECIMAL } from '@consts/static'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)

  const isPairExisting = (fromToken: PublicKey, toToken: PublicKey) =>
    allPools.some(
      pool =>
        (fromToken.toString() === pool.tokenX.toString() &&
          toToken.toString() === pool.tokenY.toString()) ||
        (fromToken.toString() === pool.tokenY.toString() &&
          toToken.toString() === pool.tokenX.toString())
    )

  const getIsXToY = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = allPools.find(
      pool =>
        (fromToken.toString() === pool.tokenX.toString() &&
          toToken.toString() === pool.tokenY.toString()) ||
        (fromToken.toString() === pool.tokenY.toString() &&
          toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return false
    }

    return (
      fromToken.toString() === swapPool.tokenX.toString() &&
      toToken.toString() === swapPool.tokenY.toString()
    )
  }

  const getPriceProportion = (fromToken: PublicKey, toToken: PublicKey) => {
    const swapPool = allPools.find(
      pool =>
        (fromToken.toString() === pool.tokenX.toString() &&
          toToken.toString() === pool.tokenY.toString()) ||
        (fromToken.toString() === pool.tokenY.toString() &&
          toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return new BN(1)
    }

    return swapPool.sqrtPrice.v
      .div(new BN(10 ** PRICE_DECIMAL))
      .mul(swapPool.sqrtPrice.v.div(new BN(10 ** PRICE_DECIMAL)))
  }

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
      isPairExisting={isPairExisting}
      getPriceProportion={getPriceProportion}
      tokens={tokensList}
      getIsXToY={getIsXToY}
    />
  )
}

export default WrappedSwap
