import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { Swap } from '@components/Swap/Swap'
import {
  commonTokensForNetworks,
  DEFAULT_SWAP_SLIPPAGE,
  tokens,
  WRAPPED_SOL_ADDRESS
} from '@store/consts/static'
import { actions as poolsActions } from '@store/reducers/pools'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { actions as walletActions } from '@store/reducers/solanaWallet'
import { actions as connectionActions } from '@store/reducers/solanaConnection'
import { actions } from '@store/reducers/swap'
import {
  isLoadingLatestPoolsForTransaction,
  isLoadingPathTokens,
  poolsArraySortedByFees,
  poolTicks,
  tickMaps
} from '@store/selectors/pools'
import { network, timeoutError } from '@store/selectors/solanaConnection'
import { status, swapTokensDict, balanceLoading, balance } from '@store/selectors/solanaWallet'
import { swap as swapPool } from '@store/selectors/swap'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewTokenToLocalStorage,
  getTokenPrice,
  getNewTokenOrThrow,
  tickerToAddress
} from '@utils/utils'
import { TokenPriceData } from '@store/consts/types'
import { getCurrentSolanaConnection } from '@utils/web3/connection'
import { VariantType } from 'notistack'
import { useLocation } from 'react-router-dom'
import { getToken } from '@store/sagas/wallet'

type Props = {
  initialTokenFrom: string
  initialTokenTo: string
}

export const WrappedSwap = ({ initialTokenFrom, initialTokenTo }: Props) => {
  const dispatch = useDispatch()

  const connection = getCurrentSolanaConnection()

  const walletStatus = useSelector(status)
  const swap = useSelector(swapPool)
  const tickmap = useSelector(tickMaps)
  const poolTicksArray = useSelector(poolTicks)
  const allPools = useSelector(poolsArraySortedByFees)
  const tokensDict = useSelector(swapTokensDict)
  const isBalanceLoading = useSelector(balanceLoading)
  const { success, inProgress } = useSelector(swapPool)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)
  const networkType = useSelector(network)

  const [progress, setProgress] = useState<ProgressState>('none')
  const [tokenFrom, setTokenFrom] = useState<PublicKey | null>(null)
  const [tokenTo, setTokenTo] = useState<PublicKey | null>(null)
  const solBalance = useSelector(balance)
  const isTimeoutError = useSelector(timeoutError)
  const isPathTokensLoading = useSelector(isLoadingPathTokens)
  const { state } = useLocation()
  const [block, setBlock] = useState(state?.referer === 'stats')

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout
    let timeoutId2: NodeJS.Timeout

    if (!inProgress && progress === 'progress') {
      setProgress(success ? 'approvedWithSuccess' : 'approvedWithFail')

      timeoutId1 = setTimeout(() => {
        setProgress(success ? 'success' : 'failed')
      }, 1000)

      timeoutId2 = setTimeout(() => {
        setProgress('none')
      }, 3000)
    }

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
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

  const lastTokenFrom =
    tickerToAddress(networkType, initialTokenFrom) && initialTokenFrom !== '-'
      ? tickerToAddress(networkType, initialTokenFrom)
      : (localStorage.getItem(`INVARIANT_LAST_TOKEN_FROM_${networkType}`) ?? WRAPPED_SOL_ADDRESS)

  const lastTokenTo =
    tickerToAddress(networkType, initialTokenTo) && initialTokenTo !== '-'
      ? tickerToAddress(networkType, initialTokenTo)
      : (localStorage.getItem(`INVARIANT_LAST_TOKEN_TO_${networkType}`) ?? '')

  const initTokenFrom =
    lastTokenFrom === null ? null : (tokensDict[lastTokenFrom]?.assetAddress ?? null)

  const initTokenTo = lastTokenTo === null ? null : (tokensDict[lastTokenTo]?.assetAddress ?? null)

  useEffect(() => {
    const tokens: string[] = []

    if (initTokenFrom === null && lastTokenFrom && !tokensDict[lastTokenFrom]) {
      tokens.push(lastTokenFrom)
    }

    if (initTokenTo === null && lastTokenTo && !tokensDict[lastTokenTo]) {
      tokens.push(lastTokenTo)
    }

    if (tokens.length) {
      dispatch(poolsActions.getPathTokens(tokens))
    }

    setBlock(false)
  }, [tokensDict])

  const canNavigate = connection !== null && !isPathTokensLoading && !block

  const addTokenHandler = (address: string) => {
    if (connection !== null && !tokensDict[address]) {
      getNewTokenOrThrow(address, connection)
        .then(data => {
          dispatch(poolsActions.addTokens(data))
          addNewTokenToLocalStorage(address, networkType)
          dispatch(
            snackbarsActions.add({
              message: 'Token added.',
              variant: 'success',
              persist: false
            })
          )
        })
        .catch(() => {
          dispatch(
            snackbarsActions.add({
              message: 'Token add failed.',
              variant: 'error',
              persist: false
            })
          )
        })
    } else {
      dispatch(
        snackbarsActions.add({
          message: 'Token already in list.',
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

    const id = tokensDict[tokenFrom.toString()]?.assetAddress.toString() ?? ''
    if (id) {
      setPriceFromLoading(true)
      getTokenPrice(id, tokensDict[tokenFrom.toString()].coingeckoId)
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

    const id = tokensDict[tokenTo.toString()]?.assetAddress.toString() ?? ''
    if (id) {
      setPriceToLoading(true)
      getTokenPrice(id, tokensDict[tokenTo.toString()].coingeckoId)
        .then(data => setTokenToPriceData(data))
        .catch(() => setTokenToPriceData(undefined))
        .finally(() => setPriceToLoading(false))
    } else {
      setTokenToPriceData(undefined)
    }
  }, [tokenTo])

  const initialSlippage = localStorage.getItem('INVARIANT_SWAP_SLIPPAGE') ?? DEFAULT_SWAP_SLIPPAGE

  const onSlippageChange = (slippage: string) => {
    localStorage.setItem('INVARIANT_SWAP_SLIPPAGE', slippage)
  }

  const onRefresh = (tokenFrom: PublicKey | null, tokenTo: PublicKey | null) => {
    dispatch(walletActions.getBalance())

    if (tokenFrom === null || tokenTo == null) {
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
      getTokenPrice(idFrom, tokensDict[tokenFrom.toString()].coingeckoId)
        .then(data => setTokenFromPriceData(data))
        .catch(() => setTokenFromPriceData(undefined))
        .finally(() => setPriceFromLoading(false))
    } else {
      setTokenFromPriceData(undefined)
    }

    const idTo = tokensDict[tokenTo.toString()].assetAddress.toString() ?? ''
    if (idTo) {
      setPriceToLoading(true)
      getTokenPrice(idTo, tokensDict[tokenTo.toString()].coingeckoId)
        .then(data => setTokenToPriceData(data))
        .catch(() => setTokenToPriceData(undefined))
        .finally(() => setPriceToLoading(false))
    } else {
      setTokenToPriceData(undefined)
    }
  }

  const copyTokenAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  // const allAccounts = useSelector(accounts)

  // const wrappedETHAccountExist = useMemo(() => {
  //   let wrappedETHAccountExist = false

  //   Object.entries(allAccounts).map(([address, token]) => {
  //     if (address === WRAPPED_SOL_ADDRESS && token.balance.gt(new BN(0))) {
  //       wrappedETHAccountExist = true
  //     }
  //   })

  //   return wrappedETHAccountExist
  // }, [allAccounts])

  // const unwrapWETH = () => {
  //   dispatch(walletActions.unwrapWETH())
  // }

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
      onConnectWallet={() => {
        dispatch(walletActions.connect())
      }}
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
      initialTokenFrom={initTokenFrom}
      initialTokenTo={initTokenTo}
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
      copyTokenAddressHandler={copyTokenAddressHandler}
      solBalance={solBalance}
      network={networkType}
      // unwrapWETH={unwrapWETH}
      // wrappedETHAccountExist={wrappedETHAccountExist}
      isTimeoutError={isTimeoutError}
      deleteTimeoutError={() => {
        dispatch(connectionActions.setTimeoutError(false))
      }}
      canNavigate={canNavigate}
    />
  )
}

export default WrappedSwap
