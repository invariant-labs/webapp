import { Swap } from '@components/Swap/Swap'
import { pools } from '@selectors/pools'
import { swap as swapPool } from '@selectors/swap'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status, swapTokens } from '@selectors/solanaWallet'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)
  return (
    <Swap
      onSwap={(slippage, price, simulate) => {
        dispatch(
          actions.swap({
            slippage,
            price,
            simulate
          })
        )
      }}
      onSimulate={(simulatePrice, fromToken, toToken, amount) => {
        dispatch(
          actions.simulate(
            {
              simulatePrice,
              fromToken,
              toToken,
              amount
            }
          )
        )
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
      swapData={swap}
    />
  )
}

export default WrappedSwap
