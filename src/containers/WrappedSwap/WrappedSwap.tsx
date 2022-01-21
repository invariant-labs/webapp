import { Swap } from '@components/Swap/Swap'
import { initPool, pools, poolTicks } from '@selectors/pools'
import { swap as swapPool } from '@selectors/swap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { network } from '@selectors/solanaConnection'
import { status, swapTokens } from '@selectors/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const networkType = useSelector(network)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(pools)
  const poolInit = useSelector(initPool)
  const tokensList = useSelector(swapTokens)
  const { success, inProgress } = useSelector(swapPool)

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
      onSwap={(slippage, price, knownPrice, simulate, poolIndex) => {
        setProgress('progress')
        dispatch(
          actions.swap({
            slippage,
            price,
            knownPrice,
            simulate,
            poolIndex
          })
        )
      }}
      onSimulate={(simulatePrice, fromToken, toToken, amount, success) => {
        dispatch(
          actions.simulate({
            simulatePrice,
            fromToken,
            toToken,
            amount,
            success
          })
        )
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
      swapData={swap}
      progress={progress}
      poolInit={poolInit}
      poolTicks={poolTicksArray}
      networkType={networkType}
    />
  )
}

export default WrappedSwap
