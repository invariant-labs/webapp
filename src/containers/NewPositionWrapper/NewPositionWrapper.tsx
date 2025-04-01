import { ProgressState } from '@common/AnimatedButton/AnimatedButton'
import NewPosition from '@components/NewPosition/NewPosition'
import {
  ALL_FEE_TIERS_DATA,
  DEFAULT_NEW_POSITION_SLIPPAGE,
  commonTokensForNetworks
} from '@store/consts/static'
import { PositionOpeningMethod, TokenPriceData } from '@store/consts/types'
import {
  addNewTokenToLocalStorage,
  calcPriceBySqrtPrice,
  calcPriceByTickIndex,
  createPlaceholderLiquidityPlot,
  getTokenPrice,
  getJupTokensRatioPrice,
  getNewTokenOrThrow,
  printBN,
  tickerToAddress,
  ROUTES
} from '@utils/utils'
import { BN } from '@project-serum/anchor'
import { actions as poolsActions } from '@store/reducers/pools'
import { actions, actions as positionsActions } from '@store/reducers/positions'
import { actions as connectionActions } from '@store/reducers/solanaConnection'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { actions as walletActions } from '@store/reducers/solanaWallet'
import { network, timeoutError } from '@store/selectors/solanaConnection'
import {
  isLoadingLatestPoolsForTransaction,
  isLoadingPathTokens,
  isLoadingTicksAndTickMaps,
  isLoadingTokens,
  poolsArraySortedByFees,
  volumeRanges
} from '@store/selectors/pools'
import { initPosition, plotTicks, shouldNotUpdateRange } from '@store/selectors/positions'
import { balanceLoading, status, balance, swapTokensDict } from '@store/selectors/solanaWallet'
import { VariantType } from 'notistack'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@utils/web3/connection'
import { PublicKey } from '@solana/web3.js'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { DECIMAL, feeToTickSpacing, getMaxTick } from '@invariant-labs/sdk/lib/utils'
import { InitMidPrice } from '@common/PriceRangePlot/PriceRangePlot'
import { getMarketAddress, Pair } from '@invariant-labs/sdk'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/lib/math'
import { calculatePriceSqrt } from '@invariant-labs/sdk/src'
import { actions as statsActions } from '@store/reducers/stats'
import { isLoading, poolsStatsWithTokensDetails } from '@store/selectors/stats'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  initialConcentration: string
  initialIsRange: boolean | null
}

export const NewPositionWrapper: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  initialConcentration,
  initialIsRange
}) => {
  const dispatch = useDispatch()
  const connection = getCurrentSolanaConnection()
  const solBalance = useSelector(balance)
  const tokens = useSelector(swapTokensDict)
  const walletStatus = useSelector(status)
  const allPools = useSelector(poolsArraySortedByFees)
  const poolsVolumeRanges = useSelector(volumeRanges)
  const loadingTicksAndTickMaps = useSelector(isLoadingTicksAndTickMaps)
  const isBalanceLoading = useSelector(balanceLoading)

  const shouldNotUpdatePriceRange = useSelector(shouldNotUpdateRange)
  const currentNetwork = useSelector(network)
  const { success, inProgress } = useSelector(initPosition)
  // const [onlyUserPositions, setOnlyUserPositions] = useState(false)
  const { data: ticksData, loading: ticksLoading, hasError: hasTicksError } = useSelector(plotTicks)

  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)

  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const isLoadingStats = useSelector(isLoading)

  const isTimeoutError = useSelector(timeoutError)
  const isCurrentlyLoadingTokens = useSelector(isLoadingTokens)

  const isPathTokensLoading = useSelector(isLoadingPathTokens)
  const { state } = useLocation()
  const [block, setBlock] = useState(state?.referer === 'stats')

  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const [progress, setProgress] = useState<ProgressState>('none')

  const [tokenA, setTokenA] = useState<PublicKey | null>(null)
  const [tokenB, setTokenB] = useState<PublicKey | null>(null)

  const [currentPairReversed, setCurrentPairReversed] = useState<boolean | null>(null)

  const [globalPrice, setGlobalPrice] = useState<number | undefined>(undefined)

  const [initialLoader, setInitialLoader] = useState(true)
  const isMountedRef = useRef(false)
  const navigate = useNavigate()

  const initialIsConcentrationOpening =
    localStorage.getItem('OPENING_METHOD') === 'concentration' ||
    localStorage.getItem('OPENING_METHOD') === null

  const [initialOpeningPositionMethod, setInitialOpeningPositionMethod] =
    useState<PositionOpeningMethod>(
      initialIsRange !== null
        ? initialIsRange
          ? 'range'
          : 'concentration'
        : initialIsConcentrationOpening
          ? 'concentration'
          : 'range'
    )

  useEffect(() => {
    const pathTokens: string[] = []

    if (initialTokenFrom !== '' && !tokens[tickerToAddress(currentNetwork, initialTokenFrom)]) {
      pathTokens.push(initialTokenFrom)
    }

    if (initialTokenTo !== '' && !tokens[tickerToAddress(currentNetwork, initialTokenTo)]) {
      pathTokens.push(initialTokenTo)
    }

    if (pathTokens.length) {
      dispatch(poolsActions.getPathTokens(pathTokens))
    }

    setBlock(false)
  }, [tokens])

  const canNavigate = connection !== null && !isPathTokensLoading && !block

  useEffect(() => {
    if (canNavigate) {
      const tokenA = tokens[initialTokenFrom]
      if (tokenA?.assetAddress) {
        setTokenA(tokenA.assetAddress)
      }

      const tokenB = tokens[initialTokenTo]
      if (tokenB?.assetAddress) {
        setTokenB(tokenB.assetAddress)
      }
    }
  }, [canNavigate])

  const constructNavigationPath = () => {
    if (!canNavigate) return null

    const tokenFromAddress = tickerToAddress(currentNetwork, initialTokenFrom)
    const tokenToAddress = tickerToAddress(currentNetwork, initialTokenTo)

    const tokenFrom = tokens[tokenFromAddress]
    const tokenTo = tokens[tokenToAddress]

    const concentrationParam = initialConcentration ? `?conc=${initialConcentration}` : ''

    const rangeParam =
      initialIsRange !== null
        ? initialIsRange
          ? `&range=true`
          : '&range=false'
        : initialIsConcentrationOpening
          ? '&range=false'
          : '&range=true'

    if (rangeParam === '&range=true') {
      setPositionOpeningMethod('range')
      setInitialOpeningPositionMethod('range')
    } else {
      setPositionOpeningMethod('concentration')
      setInitialOpeningPositionMethod('concentration')
    }

    if (tokenFromAddress && tokenFrom?.assetAddress && tokenToAddress && tokenTo?.assetAddress) {
      return ROUTES.getNewPositionRoute(
        initialTokenFrom,
        initialTokenTo,
        initialFee + concentrationParam + rangeParam
      )
    }

    if (tokenFromAddress && tokenFrom?.assetAddress) {
      return ROUTES.getNewPositionRoute(initialTokenFrom, initialFee)
    }

    return ROUTES.getNewPositionRoute(initialFee)
  }

  useEffect(() => {
    const path = constructNavigationPath()
    if (path) {
      navigate(path)
    }
  }, [tokens, canNavigate])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const liquidityRef = useRef<Decimal>({ v: new BN(0) })

  useEffect(() => {
    setProgress('none')
  }, [poolIndex])

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout
    let timeoutId2: NodeJS.Timeout

    if (!inProgress && progress === 'progress') {
      setProgress(success ? 'approvedWithSuccess' : 'approvedWithFail')

      if (poolIndex !== null && tokenA !== null && tokenB !== null) {
        dispatch(
          actions.getCurrentPlotTicks({
            poolIndex,
            isXtoY: allPools[poolIndex].tokenX.equals(
              currentPairReversed === true ? tokenB : tokenA
            ),
            disableLoading: true
          })
        )
      }

      timeoutId1 = setTimeout(() => {
        setProgress(success ? 'success' : 'failed')
      }, 500)

      timeoutId2 = setTimeout(() => {
        setProgress('none')
        dispatch(actions.setInitPositionSuccess(false))
      }, 1800)
    }

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [success, inProgress])

  const isXtoY = useMemo(() => {
    if (tokenA !== null && tokenB !== null) {
      return tokenA.toString() < tokenB.toString()
    }
    return true
  }, [tokenA, tokenB])

  const xDecimal = useMemo(() => {
    if (tokenA !== null && tokenB !== null) {
      return tokenA.toString() < tokenB.toString()
        ? tokens[tokenA.toString()].decimals
        : tokens[tokenB.toString()].decimals
    }
    return 0
  }, [tokenA, tokenB])

  const yDecimal = useMemo(() => {
    if (tokenA !== null && tokenB !== null) {
      return tokenA.toString() < tokenB.toString()
        ? tokens[tokenB.toString()].decimals
        : tokens[tokenA.toString()].decimals
    }
    return 0
  }, [tokenA, tokenB])

  const [feeIndex, setFeeIndex] = useState(0)

  const fee = useMemo(() => ALL_FEE_TIERS_DATA[feeIndex].tier.fee, [feeIndex])
  const tickSpacing = useMemo(
    () =>
      ALL_FEE_TIERS_DATA[feeIndex].tier.tickSpacing ??
      feeToTickSpacing(ALL_FEE_TIERS_DATA[feeIndex].tier.fee),
    [feeIndex]
  )
  const [midPrice, setMidPrice] = useState<InitMidPrice>({
    index: 0,
    x: 1,
    sqrtPrice: 0
  })

  const isWaitingForNewPool = useMemo(() => {
    if (poolIndex !== null) {
      return false
    }

    return isFetchingNewPool
  }, [isFetchingNewPool, poolIndex])

  useEffect(() => {
    if (initialLoader && !isWaitingForNewPool) {
      setInitialLoader(false)
    }
  }, [isWaitingForNewPool])

  useEffect(() => {
    if (!isWaitingForNewPool && tokenA !== null && tokenB !== null && !tokenA.equals(tokenB)) {
      const index = allPools.findIndex(
        pool =>
          pool.fee.v.eq(fee) &&
          ((pool.tokenX.equals(tokenA) && pool.tokenY.equals(tokenB)) ||
            (pool.tokenX.equals(tokenB) && pool.tokenY.equals(tokenA)))
      )
      setPoolIndex(index !== -1 ? index : null)

      if (index !== -1) {
        dispatch(
          actions.getCurrentPlotTicks({
            poolIndex: index,
            isXtoY: allPools[index].tokenX.equals(tokenA)
          })
        )
      }
    }
  }, [isWaitingForNewPool, allPools.length])

  useEffect(() => {
    if (poolIndex !== null) {
      setMidPrice({
        index: allPools[poolIndex].currentTickIndex,
        x: calcPriceBySqrtPrice(allPools[poolIndex].sqrtPrice.v, isXtoY, xDecimal, yDecimal),
        sqrtPrice: allPools[poolIndex].sqrtPrice.v
      })
    }
  }, [poolIndex, isXtoY, xDecimal, yDecimal, allPools])

  useEffect(() => {
    if (poolIndex === null) {
      setMidPrice({
        index: 0,
        x: calcPriceByTickIndex(0, isXtoY, xDecimal, yDecimal),
        sqrtPrice: new BN(0)
      })
    }
  }, [poolIndex, isXtoY, xDecimal, yDecimal])

  const data = useMemo(() => {
    if (ticksLoading) {
      return createPlaceholderLiquidityPlot(isXtoY, 10, tickSpacing, xDecimal, yDecimal)
    }

    if (currentPairReversed === true) {
      return ticksData.map(tick => ({ ...tick, x: 1 / tick.x })).reverse()
    }

    return ticksData
  }, [ticksData, ticksLoading, isXtoY, tickSpacing, xDecimal, yDecimal, currentPairReversed])

  useEffect(() => {
    if (
      tokenA !== null &&
      tokenB !== null &&
      poolIndex === null &&
      progress === 'approvedWithSuccess'
    ) {
      dispatch(
        poolsActions.getPoolData(
          new Pair(tokenA, tokenB, {
            fee,
            tickSpacing
          })
        )
      )
    }
  }, [progress])

  useEffect(() => {
    if (tokenA !== null && tokenB !== null && poolIndex !== null && !allPools[poolIndex]) {
      dispatch(
        poolsActions.getPoolData(
          new Pair(tokenA, tokenB, {
            fee,
            tickSpacing
          })
        )
      )
    }
  }, [poolIndex])

  const addTokenHandler = (address: string) => {
    if (connection !== null && !tokens[address]) {
      getNewTokenOrThrow(address, connection)
        .then(data => {
          dispatch(poolsActions.addTokens(data))

          addNewTokenToLocalStorage(address, currentNetwork)
          dispatch(
            snackbarsActions.add({
              message: 'Token added',
              variant: 'success',
              persist: false
            })
          )
        })
        .catch(() => {
          dispatch(
            snackbarsActions.add({
              message: 'Token add failed',
              variant: 'error',
              persist: false
            })
          )
        })
    } else {
      dispatch(
        snackbarsActions.add({
          message: 'Token already in list',
          variant: 'info',
          persist: false
        })
      )
    }
  }

  const copyPoolAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  const setPositionOpeningMethod = (val: PositionOpeningMethod) => {
    localStorage.setItem('OPENING_METHOD', val)
  }

  const initialHideUnknownTokensValue =
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === 'true' ||
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === null

  const setHideUnknownTokensValue = (val: boolean) => {
    localStorage.setItem('HIDE_UNKNOWN_TOKENS', val ? 'true' : 'false')
  }

  const [tokenAPriceData, setTokenAPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceALoading, setPriceALoading] = useState(false)

  useEffect(() => {
    if (tokenA === null || (tokenA !== null && !tokens[tokenA.toString()])) {
      return
    }

    if (tokenA) {
      setPriceALoading(true)
      getTokenPrice(tokenA.toString(), tokens[tokenA.toString()]?.coingeckoId)
        .then(data => {
          return setTokenAPriceData(data)
        })
        .catch(() => setTokenAPriceData(undefined))
        .finally(() => setPriceALoading(false))
    } else {
      setTokenAPriceData(undefined)
    }
  }, [tokenA])

  const [tokenBPriceData, setTokenBPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceBLoading, setPriceBLoading] = useState(false)

  const getGlobalPrice = () => {
    if (tokenA === null || tokenB === null) {
      return
    }

    getJupTokensRatioPrice(tokenA.toString(), tokenB.toString())
      .then(data => setGlobalPrice(data.price))
      .catch(() => setGlobalPrice(undefined))
  }

  useEffect(() => {
    getGlobalPrice()
  }, [tokenB, tokenA])

  useEffect(() => {
    if (tokenB === null || (tokenB !== null && !tokens[tokenB.toString()])) {
      return
    }

    setPriceBLoading(true)
    getTokenPrice(tokenB.toString(), tokens[tokenB.toString()].coingeckoId)
      .then(data => setTokenBPriceData(data))
      .catch(() => setTokenBPriceData(undefined))
      .finally(() => setPriceBLoading(false))
  }, [tokenB])

  const currentVolumeRange = useMemo(() => {
    if (poolIndex === null) {
      return undefined
    }

    const poolAddress = allPools[poolIndex].address.toString()

    if (!poolsVolumeRanges[poolAddress]) {
      return undefined
    }

    const lowerTicks: number[] = poolsVolumeRanges[poolAddress]
      .map(range => (range.tickLower === null ? undefined : range.tickLower))
      .filter(tick => typeof tick !== 'undefined') as number[]
    const upperTicks: number[] = poolsVolumeRanges[poolAddress]
      .map(range => (range.tickUpper === null ? undefined : range.tickUpper))
      .filter(tick => typeof tick !== 'undefined') as number[]

    const lowerPrice = calcPriceByTickIndex(
      !lowerTicks.length || !upperTicks.length
        ? allPools[poolIndex].currentTickIndex
        : Math.min(...lowerTicks),
      isXtoY,
      xDecimal,
      yDecimal
    )

    const upperPrice = calcPriceByTickIndex(
      !lowerTicks.length || !upperTicks.length
        ? Math.min(
            allPools[poolIndex].currentTickIndex + allPools[poolIndex].tickSpacing,
            getMaxTick(tickSpacing)
          )
        : Math.max(...upperTicks),
      isXtoY,
      xDecimal,
      yDecimal
    )

    return {
      min: Math.min(lowerPrice, upperPrice),
      max: Math.max(lowerPrice, upperPrice)
    }
  }, [poolsVolumeRanges, poolIndex, isXtoY, xDecimal, yDecimal])

  const initialSlippage =
    localStorage.getItem('INVARIANT_NEW_POSITION_SLIPPAGE') ?? DEFAULT_NEW_POSITION_SLIPPAGE

  const onSlippageChange = (slippage: string) => {
    localStorage.setItem('INVARIANT_NEW_POSITION_SLIPPAGE', slippage)
  }
  const calculatePoolAddress = async () => {
    if (tokenA === null || tokenB === null) {
      return ''
    }

    const pair = new Pair(tokenA, tokenB, ALL_FEE_TIERS_DATA[feeIndex].tier)

    const marketProgramId = new PublicKey(
      getMarketAddress(networkTypetoProgramNetwork(currentNetwork))
    )
    const poolAddress: string = (await pair.getAddress(marketProgramId)).toString()

    return poolAddress
  }

  const calcAmount = (amount: BN, left: number, right: number, tokenAddress: PublicKey) => {
    if (tokenA === null || tokenB === null || isNaN(left) || isNaN(right)) {
      return new BN(0)
    }

    const byX = tokenAddress.equals(isXtoY ? tokenA : tokenB)
    const lowerTick = Math.min(left, right)
    const upperTick = Math.max(left, right)

    try {
      if (byX) {
        const result = getLiquidityByX(
          amount,
          lowerTick,
          upperTick,
          poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculatePriceSqrt(midPrice.index),
          true
        )
        if (isMountedRef.current) {
          liquidityRef.current = result.liquidity
        }
        return result.y
      }
      const result = getLiquidityByY(
        amount,
        lowerTick,
        upperTick,
        poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculatePriceSqrt(midPrice.index),
        true
      )
      if (isMountedRef.current) {
        liquidityRef.current = result.liquidity
      }
      return result.x
    } catch (error) {
      const result = (byX ? getLiquidityByY : getLiquidityByX)(
        amount,
        lowerTick,
        upperTick,
        poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculatePriceSqrt(midPrice.index),
        true
      )
      if (isMountedRef.current) {
        liquidityRef.current = result.liquidity
      }
    }

    return new BN(0)
  }

  const unblockUpdatePriceRange = () => {
    dispatch(positionsActions.setShouldNotUpdateRange(false))
  }

  const onRefresh = async () => {
    if (tokenB === null || tokenA === null || tokenA === tokenB) {
      return
    }
    dispatch(walletActions.getBalance())

    if (tokenA) {
      setPriceALoading(true)
      await getTokenPrice(tokenA.toString(), tokens[tokenA.toString()].coingeckoId)
        .then(data => setTokenAPriceData(data))
        .catch(() => setTokenAPriceData(undefined))
        .finally(() => setPriceALoading(false))
    } else {
      setTokenAPriceData(undefined)
    }

    if (tokenB) {
      setPriceBLoading(true)
      getTokenPrice(tokenB.toString(), tokens[tokenB.toString()].coingeckoId)
        .then(data => setTokenBPriceData(data))
        .catch(() => setTokenBPriceData(undefined))
        .finally(() => setPriceBLoading(false))
    } else {
      setTokenBPriceData(undefined)
    }

    dispatch(
      poolsActions.getAllPoolsForPairData({
        first: tokens[tokenA.toString()].assetAddress,
        second: tokens[tokenB.toString()].assetAddress
      })
    )

    dispatch(
      poolsActions.getPoolData(
        new Pair(tokens[tokenA.toString()].assetAddress, tokens[tokenB.toString()].assetAddress, {
          fee: ALL_FEE_TIERS_DATA[feeIndex].tier.fee,
          tickSpacing: ALL_FEE_TIERS_DATA[feeIndex].tier.tickSpacing
        })
      )
    )

    if (tokenA !== null && tokenB !== null) {
      const index = allPools.findIndex(
        pool =>
          pool.fee.v.eq(fee) &&
          ((pool.tokenX.equals(tokens[tokenA.toString()].assetAddress) &&
            pool.tokenY.equals(tokens[tokenB.toString()].assetAddress)) ||
            (pool.tokenX.equals(tokens[tokenB.toString()].assetAddress) &&
              pool.tokenY.equals(tokens[tokenA.toString()].assetAddress)))
      )
      setPoolIndex(index !== -1 ? index : null)

      if (index !== -1) {
        dispatch(
          actions.getCurrentPlotTicks({
            poolIndex: index,
            isXtoY: allPools[index].tokenX.equals(tokens[tokenA.toString()].assetAddress)
          })
        )
      }
    }

    getGlobalPrice()
  }

  useEffect(() => {
    if (isTimeoutError) {
      void onRefresh()
      dispatch(connectionActions.setTimeoutError(false))
    }
  }, [isTimeoutError])

  useEffect(() => {
    dispatch(statsActions.getCurrentStats())
  }, [])

  const { feeTiersWithTvl, totalTvl } = useMemo(() => {
    const feeTiersWithTvl: Record<number, number> = {}
    let totalTvl = 0

    poolsList.map(pool => {
      if (!tokenA || !tokenB) return
      if (
        (pool.tokenX.equals(tokenA) && pool.tokenY.equals(tokenB)) ||
        (pool.tokenX.equals(tokenB) && pool.tokenY.equals(tokenA))
      ) {
        feeTiersWithTvl[pool.fee] = pool.tvl
        totalTvl += pool.tvl
      }
    })

    return { feeTiersWithTvl, totalTvl }
  }, [poolsList, tokenA, tokenB])

  return (
    <NewPosition
      initialTokenFrom={initialTokenFrom}
      initialTokenTo={initialTokenTo}
      initialFee={initialFee}
      initialConcentration={initialConcentration}
      copyPoolAddressHandler={copyPoolAddressHandler}
      poolAddress={poolIndex !== null ? allPools[poolIndex].address.toString() : ''}
      calculatePoolAddress={calculatePoolAddress}
      tokens={tokens}
      data={data}
      midPrice={midPrice}
      setMidPrice={setMidPrice}
      onChangePositionTokens={(tokenAKey, tokenBKey, feeTierIndex) => {
        if (
          tokenAKey !== null &&
          tokenBKey !== null &&
          !tokenAKey.equals(tokenBKey) &&
          !(
            tokenA?.equals(tokenAKey) &&
            tokenB?.equals(tokenBKey) &&
            fee.eq(ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee)
          )
        ) {
          const index = allPools.findIndex(
            pool =>
              pool.fee.v.eq(ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee) &&
              ((pool.tokenX.equals(tokenAKey) && pool.tokenY.equals(tokenBKey)) ||
                (pool.tokenX.equals(tokenBKey) && pool.tokenY.equals(tokenAKey)))
          )

          if (
            index !== poolIndex &&
            !(
              tokenA?.equals(tokenBKey) &&
              tokenB?.equals(tokenAKey) &&
              fee.eq(ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee)
            )
          ) {
            if (isMountedRef.current) {
              setPoolIndex(index !== -1 ? index : null)
              setCurrentPairReversed(null)
            }
          } else if (
            tokenA?.equals(tokenBKey) &&
            tokenB?.equals(tokenAKey) &&
            fee.eq(ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee)
          ) {
            if (isMountedRef.current) {
              setCurrentPairReversed(currentPairReversed === null ? true : !currentPairReversed)
            }
          }
          if (index !== -1 && index !== poolIndex) {
            dispatch(
              actions.getCurrentPlotTicks({
                poolIndex: index,
                isXtoY: allPools[index].tokenX.equals(tokenAKey)
              })
            )
            setPoolIndex(index)
          } else if (
            !(
              tokenA?.equals(tokenBKey) &&
              tokenB?.equals(tokenAKey) &&
              fee.eq(ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee)
            )
          ) {
            dispatch(
              poolsActions.getPoolData(
                new Pair(tokenAKey, tokenBKey, {
                  fee: ALL_FEE_TIERS_DATA[feeTierIndex].tier.fee,
                  tickSpacing: ALL_FEE_TIERS_DATA[feeTierIndex].tier.tickSpacing
                })
              )
            )
          }
        }

        setTokenA(tokenAKey)
        setTokenB(tokenBKey)
        setFeeIndex(feeTierIndex)
      }}
      feeTiers={ALL_FEE_TIERS_DATA.map(tier => ({
        feeValue: +printBN(tier.tier.fee, DECIMAL - 2)
      }))}
      isCurrentPoolExisting={poolIndex !== null && !!allPools[poolIndex]}
      addLiquidityHandler={(leftTickIndex, rightTickIndex, xAmount, yAmount, slippage) => {
        if (tokenA === null || tokenB === null) {
          return
        }
        if (poolIndex !== null) {
          dispatch(positionsActions.setShouldNotUpdateRange(true))
        }
        if (progress === 'none') {
          setProgress('progress')
        }

        const lowerTickIndex = Math.min(leftTickIndex, rightTickIndex)
        const upperTickIndex = Math.max(leftTickIndex, rightTickIndex)

        dispatch(
          positionsActions.initPosition({
            tokenX: isXtoY ? tokenA : tokenB,
            tokenY: isXtoY ? tokenB : tokenA,
            fee,
            lowerTick: lowerTickIndex,
            upperTick: upperTickIndex,
            liquidityDelta: liquidityRef.current,
            initPool: poolIndex === null,
            initTick: poolIndex === null ? midPrice.index : undefined,
            xAmount: Math.floor(xAmount),
            yAmount: Math.floor(yAmount),
            slippage,
            tickSpacing,
            knownPrice:
              poolIndex === null
                ? calculatePriceSqrt(midPrice.index)
                : allPools[poolIndex].sqrtPrice
          })
        )
      }}
      onRefresh={onRefresh}
      isBalanceLoading={isBalanceLoading}
      shouldNotUpdatePriceRange={shouldNotUpdatePriceRange}
      unblockUpdatePriceRange={unblockUpdatePriceRange}
      isGetLiquidityError={false}
      onlyUserPositions={false} //TODO implement logic
      setOnlyUserPositions={() => {}} //TODO implement logic
      network={currentNetwork}
      isLoadingTokens={isCurrentlyLoadingTokens}
      solBalance={solBalance}
      walletStatus={walletStatus}
      onConnectWallet={() => {
        dispatch(walletActions.connect(false))
      }}
      onDisconnectWallet={() => {
        dispatch(walletActions.disconnect())
      }}
      calcAmount={calcAmount}
      ticksLoading={ticksLoading}
      loadingTicksAndTickMaps={loadingTicksAndTickMaps}
      noConnectedBlockerProps={{
        onConnect: () => {
          dispatch(walletActions.connect(false))
        },
        descCustomText: 'Cannot add any liquidity.'
      }}
      progress={progress}
      isXtoY={isXtoY}
      tickSpacing={tickSpacing}
      xDecimal={xDecimal}
      yDecimal={yDecimal}
      isWaitingForNewPool={isWaitingForNewPool || initialLoader}
      poolIndex={poolIndex}
      currentPairReversed={currentPairReversed}
      currentPriceSqrt={
        poolIndex !== null && !!allPools[poolIndex]
          ? allPools[poolIndex].sqrtPrice.v
          : calculatePriceSqrt(midPrice.index).v
      }
      handleAddToken={addTokenHandler}
      commonTokens={commonTokensForNetworks[currentNetwork]}
      initialOpeningPositionMethod={initialOpeningPositionMethod}
      onPositionOpeningMethodChange={setPositionOpeningMethod}
      initialHideUnknownTokensValue={initialHideUnknownTokensValue}
      onHideUnknownTokensChange={setHideUnknownTokensValue}
      tokenAPriceData={tokenAPriceData}
      tokenBPriceData={tokenBPriceData}
      priceALoading={priceALoading}
      priceBLoading={priceBLoading}
      hasTicksError={hasTicksError}
      reloadHandler={() => {
        if (poolIndex !== null && tokenA !== null && tokenB !== null) {
          dispatch(
            actions.getCurrentPlotTicks({
              poolIndex,
              isXtoY: allPools[poolIndex].tokenX.equals(
                currentPairReversed === true ? tokenB : tokenA
              )
            })
          )
        }
      }}
      plotVolumeRange={currentVolumeRange}
      currentFeeIndex={feeIndex}
      onSlippageChange={onSlippageChange}
      initialSlippage={initialSlippage}
      globalPrice={globalPrice}
      canNavigate={canNavigate}
      feeTiersWithTvl={feeTiersWithTvl}
      totalTvl={totalTvl}
      isLoadingStats={isLoadingStats}
    />
  )
}

export default NewPositionWrapper
