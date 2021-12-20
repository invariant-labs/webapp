import { Swap } from '@components/Swap/Swap'
import { pools } from '@selectors/pools'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status, swapTokens } from '@selectors/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { swap } from '@selectors/swap'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)
  const { success, inProgress } = useSelector(swap)

  const [progress, setProgress] = useState<ProgressState>('none')

  useEffect(() => {
    if (!inProgress && progress === 'progress') {
      setProgress(success ? 'approvedWithSuccess' : 'approvedWithFail')

      setTimeout(() => {
        setProgress(success ? 'success' : 'failed')
      }, 1500)

      setTimeout(() => {
        setProgress('none')
      }, 3000)
    }
  }, [success, inProgress])

  return (
    <Swap
      onSwap={(fromToken, toToken, amount, slippage, price) => {
        setProgress('progress')
        dispatch(
          actions.swap({
            fromToken,
            toToken,
            amount,
            slippage,
            price
          })
        )
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
      progress={progress}
    />
  )
}

export default WrappedSwap
