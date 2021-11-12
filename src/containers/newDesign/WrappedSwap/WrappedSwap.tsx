import { Swap } from '@components/NewDesign/Swap/Swap'
import { pools } from '@selectors/pools'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status, swapTokens } from '@selectors/solanaWallet'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)
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
