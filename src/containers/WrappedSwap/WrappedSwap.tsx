import { Swap } from '@components/Swap/Swap'
import { isLoadingLatestPoolsForTransaction, pools, poolTicks } from '@selectors/pools'
import { swap as swapPool } from '@selectors/swap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/swap'
import { balance, status, swapTokens } from '@selectors/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { actions as poolsActions } from '@reducers/pools'
import { PublicKey } from '@solana/web3.js'

export const WrappedSwap = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(pools)
  const tokensList = useSelector(swapTokens)
  const { success, inProgress } = useSelector(swapPool)
  const fullSolBalance = useSelector(balance)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)

  const [progress, setProgress] = useState<ProgressState>('none')
  const [tokenFrom, setTokenFrom] = useState<PublicKey | null>(null)
  const [tokenTo, setTokenTo] = useState<PublicKey | null>(null)

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

  useEffect(() => {
    if (tokenFrom !== null && tokenTo !== null && !isFetchingNewPool) {
      dispatch(
        actions.setPair({
          tokenFrom,
          tokenTo
        })
      )
    }
  }, [isFetchingNewPool])

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
        setTokenFrom(tokenFrom)
        setTokenTo(tokenTo)
        dispatch(
          poolsActions.getAllPoolsForPairData({
            first: tokenFrom,
            second: tokenTo
          })
        )
      }}
      walletStatus={walletStatus}
      tokens={tokensList}
      pools={Object.values(allPools)}
      swapData={swap}
      progress={progress}
      poolTicks={poolTicksArray}
      fullSolBalance={fullSolBalance}
      isWaitingForNewPool={isFetchingNewPool}
    />
  )
}

export default WrappedSwap
