import { Swap } from '@components/Swap/Swap'
import { isLoadingLatestSinglePool, pools, poolTicks } from '@selectors/pools'
import { swap as swapPool } from '@selectors/swap'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { balance, status, swapTokens } from '@selectors/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)
  const { success, inProgress } = useSelector(swapPool)
  const fullSolBalance = useSelector(balance)
  const isFetchingNewPool = useSelector(isLoadingLatestSinglePool)

  const [progress, setProgress] = useState<ProgressState>('none')
  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const isWaitingForNewPool = useMemo(() => {
    if (poolIndex !== null) {
      return false
    }

    return isFetchingNewPool
  }, [isFetchingNewPool, poolIndex])

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
      onSwap={(slippage, knownPrice, tokenFrom, tokenTo, poolIndex, amount, byAmountIn) => {
        setProgress('progress')
        dispatch(
          actions.swap({
            slippage,
            knownPrice,
            poolIndex,
            tokenFrom,
            tokenTo,
            amount,
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
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={allPools}
      swapData={swap}
      progress={progress}
      poolTicks={poolTicksArray}
      fullSolBalance={fullSolBalance}
      isWaitingForNewPool={isWaitingForNewPool}
    />
  )
}

export default WrappedSwap
