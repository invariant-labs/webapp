import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { Swap } from '@components/Swap/Swap'
import { commonTokensForNetworks } from '@consts/static'
import {
  addNewTokenToLocalStorage,
  TokenPriceData,
  getJupTokenPrice,
  getNewTokenOrThrow
} from '@consts/utils'
import { actions as poolsActions } from '@reducers/pools'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as walletActions } from '@reducers/solanaWallet'
import { actions } from '@reducers/swap'
import {
  isLoadingLatestPoolsForTransaction,
  poolsArraySortedByFees,
  poolTicks,
  tickMaps
} from '@selectors/pools'
import { network } from '@selectors/solanaConnection'
import { status, swapTokens, swapTokensDict, balanceLoading } from '@selectors/solanaWallet'
import { swap as swapPool } from '@selectors/swap'
import { PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@web3/connection'
import { openWalletSelectorModal } from '@web3/selector'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const WrappedSwap = () => {
  const dispatch = useDispatch()

  const connection = getCurrentSolanaConnection()

  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const tickmap = useSelector(tickMaps)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(poolsArraySortedByFees)
  const tokensList = useSelector(swapTokens)
  const tokensDict = useSelector(swapTokensDict)
  const isBalanceLoading = useSelector(balanceLoading)
  const { success, inProgress } = useSelector(swapPool)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)
  const networkType = useSelector(network)

  const [progress, setProgress] = useState<ProgressState>('none')
  const [tokenFrom, setTokenFrom] = useState<PublicKey | null>(null)
  const [tokenTo, setTokenTo] = useState<PublicKey | null>(null)

  useEffect(() => {
    let timerId1: any
    let timerId2: any

    if (!inProgress && progress === 'progress') {
      setProgress(success ? 'approvedWithSuccess' : 'approvedWithFail')

      timerId1 = setTimeout(() => {
        setProgress(success ? 'success' : 'failed')
      }, 1500)

      timerId2 = setTimeout(() => {
        setProgress('none')
      }, 3000)
    }

    return () => {
      clearTimeout(timerId1)
      clearTimeout(timerId2)
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
  const lastTokenFrom = localStorage.getItem(`INVARIANT_LAST_TOKEN_FROM_${networkType}`)
  const lastTokenTo = localStorage.getItem(`INVARIANT_LAST_TOKEN_TO_${networkType}`)

  const initialTokenFrom = lastTokenFrom ? new PublicKey(lastTokenFrom) : null
  const initialTokenTo = lastTokenTo ? new PublicKey(lastTokenTo) : null

  const addTokenHandler = (address: string) => {
    if (
      connection !== null &&
      tokensList.findIndex(token => token.address.toString() === address) === -1
    ) {
      getNewTokenOrThrow(address, connection)
        .then(data => {
          console.log(data)
          dispatch(poolsActions.addTokens(data))
          addNewTokenToLocalStorage(address, networkType)
          dispatch(
            snackbarsActions.add({
              message: 'Token added to your list',
              variant: 'success',
              persist: false
            })
          )
        })
        .catch(() => {
          dispatch(
            snackbarsActions.add({
              message: 'Token adding failed, check if address is valid and try again',
              variant: 'error',
              persist: false
            })
          )
        })
    } else {
      dispatch(
        snackbarsActions.add({
          message: 'Token already exists on your list',
          variant: 'info',
          persist: false
        })
      )
    }
  }

  const initialHideUnknownTokensValue =
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === 'true' ||
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === null

  const setHideUnknownTokensValue = (val: boolean) => {
    localStorage.setItem('HIDE_UNKNOWN_TOKENS', val ? 'true' : 'false')
  }

  const [tokenFromPriceData, setTokenFromPriceData] = useState<TokenPriceData | undefined>(
    undefined
  )
  const [priceFromLoading, setPriceFromLoading] = useState(false)
  useEffect(() => {
    if (tokenFrom === null) {
      return
    }

    const id = tokensDict[tokenFrom.toString()].assetAddress.toString() ?? ''
    if (id) {
      setPriceFromLoading(true)
      getJupTokenPrice(id)
        .then(data => setTokenFromPriceData(data))
        .catch(() => setTokenFromPriceData(undefined))
        .finally(() => setPriceFromLoading(false))
    } else {
      setTokenFromPriceData(undefined)
    }
  }, [tokenFrom])

  const [tokenToPriceData, setTokenToPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceToLoading, setPriceToLoading] = useState(false)
  useEffect(() => {
    if (tokenTo === null) {
      return
    }

    const id = tokensDict[tokenTo.toString()].assetAddress.toString() ?? ''
    if (id) {
      setPriceToLoading(true)
      getJupTokenPrice(id)
        .then(data => setTokenToPriceData(data))
        .catch(() => setTokenToPriceData(undefined))
        .finally(() => setPriceToLoading(false))
    } else {
      setTokenToPriceData(undefined)
    }
  }, [tokenTo])

  const initialSlippage = localStorage.getItem('INVARIANT_SWAP_SLIPPAGE') ?? '1'

  const onSlippageChange = (slippage: string) => {
    localStorage.setItem('INVARIANT_SWAP_SLIPPAGE', slippage)
  }

  const onRefresh = (tokenFrom: PublicKey | null, tokenTo: PublicKey | null) => {
    dispatch(walletActions.getBalance())

    if (tokenFrom === null || tokenTo == null || tokenFrom === null || tokenTo === null) {
      return
    }

    dispatch(
      poolsActions.getAllPoolsForPairData({
        first: tokenFrom,
        second: tokenTo
      })
    )

    const idFrom = tokensDict[tokenFrom.toString()].assetAddress.toString() ?? ''
    if (idFrom) {
      setPriceFromLoading(true)
      getJupTokenPrice(idFrom)
        .then(data => setTokenFromPriceData(data))
        .catch(() => setTokenFromPriceData(undefined))
        .finally(() => setPriceFromLoading(false))
    } else {
      setTokenFromPriceData(undefined)
    }

    const idTo = tokensDict[tokenTo.toString()].assetAddress.toString() ?? ''
    if (idTo) {
      setPriceToLoading(true)
      getJupTokenPrice(idTo)
        .then(data => setTokenToPriceData(data))
        .catch(() => setTokenToPriceData(undefined))
        .finally(() => setPriceToLoading(false))
    } else {
      setTokenToPriceData(undefined)
    }
  }

  return (
    <Swap
      isFetchingNewPool={isFetchingNewPool}
      onRefresh={onRefresh}
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
        setTokenFrom(tokenFrom)
        setTokenTo(tokenTo)

        if (tokenFrom !== null) {
          localStorage.setItem(`INVARIANT_LAST_TOKEN_FROM_${networkType}`, tokenFrom.toString())
        }

        if (tokenTo !== null) {
          localStorage.setItem(`INVARIANT_LAST_TOKEN_TO_${networkType}`, tokenTo.toString())
        }
        if (tokenFrom !== null && tokenTo !== null && !tokenFrom.equals(tokenTo)) {
          dispatch(
            poolsActions.getAllPoolsForPairData({
              first: tokenFrom,
              second: tokenTo
            })
          )
        }
      }}
      onConnectWallet={openWalletSelectorModal}
      onDisconnectWallet={() => {
        dispatch(walletActions.disconnect())
      }}
      walletStatus={walletStatus}
      tokens={tokensDict}
      pools={allPools}
      swapData={swap}
      progress={progress}
      poolTicks={poolTicksArray}
      isWaitingForNewPool={isFetchingNewPool}
      tickmap={tickmap}
      initialTokenFrom={initialTokenFrom}
      initialTokenTo={initialTokenTo}
      handleAddToken={addTokenHandler}
      commonTokens={commonTokensForNetworks[networkType]}
      initialHideUnknownTokensValue={initialHideUnknownTokensValue}
      onHideUnknownTokensChange={setHideUnknownTokensValue}
      tokenFromPriceData={tokenFromPriceData}
      tokenToPriceData={tokenToPriceData}
      priceFromLoading={priceFromLoading || isBalanceLoading}
      priceToLoading={priceToLoading || isBalanceLoading}
      onSlippageChange={onSlippageChange}
      initialSlippage={initialSlippage}
      isBalanceLoading={isBalanceLoading}
    />
  )
}

export default WrappedSwap
