import { Swap } from '@components/Swap/Swap'
import { pools, poolTicks } from '@selectors/pools'
import { swap as swapPool } from '@selectors/swap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { status, swapTokens } from '@selectors/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { actions as walletActions } from '@reducers/solanaWallet'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(pools)
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
      onSwap={(
        slippage,
        estimatedPriceAfterSwap,
        tokenFrom,
        tokenTo,
        poolIndex,
        amountIn,
        amountOut,
        byAmountIn
      ) => {
        setProgress('progress')
        dispatch(
          actions.swap({
            slippage,
            estimatedPriceAfterSwap,
            poolIndex,
            tokenFrom,
            tokenTo,
            amountIn,
            amountOut,
            byAmountIn
          })
        )
      }}
      onSetPair={(tokenFrom, tokenTo) => {
        dispatch(
          actions.setPair({
            tokenFrom,
            tokenTo
          })
        )
      }}
      onWalletSelect={wallet => {
        dispatch(walletActions.connect(wallet))
      }}
      onDisconnectWallet={() => {
        dispatch(walletActions.disconnect())
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
      swapData={swap}
      progress={progress}
      poolTicks={poolTicksArray}
    />
  )
}

export default WrappedSwap
