import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import NewPosition from '@components/NewPosition/NewPosition'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import {
  ALL_FEE_TIERS_DATA,
  PositionOpeningMethod,
  bestTiers,
  commonTokensForNetworks
} from '@consts/static'
import {
  TokenPriceData,
  addNewTokenToLocalStorage,
  calcPrice,
  calcYPerXPrice,
  createPlaceholderLiquidityPlot,
  getJupTokenPrice,
  getJupTokensRatioPrice,
  getNewTokenOrThrow,
  printBN
} from '@consts/utils'
import { Pair, calculatePriceSqrt, getMarketAddress } from '@invariant-labs/sdk'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/math'
import { feeToTickSpacing, getMaxTick } from '@invariant-labs/sdk/src/utils'
import { Color } from '@material-ui/lab'
import { BN } from '@project-serum/anchor'
import { actions as poolsActions } from '@reducers/pools'
import { actions } from '@reducers/positions'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { Status } from '@reducers/solanaWallet'
import {
  isLoadingLatestPoolsForTransaction,
  poolsArraySortedByFees,
  volumeRanges
} from '@selectors/pools'
import { initPosition, plotTicks } from '@selectors/positions'
import { network } from '@selectors/solanaConnection'
import {
  canCreateNewPool,
  canCreateNewPosition,
  status,
  swapTokensDict
} from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection, networkTypetoProgramNetwork } from '@web3/connection'
import { openWalletSelectorModal } from '@web3/selector'
import { History } from 'history'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  history: History<unknown>
}

export const NewPositionWrapper: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  history
}) => {
  const dispatch = useDispatch()

  const networkType = useSelector(network)

  const connection = getCurrentSolanaConnection()

  const tokens = useSelector(swapTokensDict)
  const walletStatus = useSelector(status)
  const allPools = useSelector(poolsArraySortedByFees)
  const poolsVolumeRanges = useSelector(volumeRanges)

  const canUserCreateNewPool = useSelector(canCreateNewPool)
  const canUserCreateNewPosition = useSelector(canCreateNewPosition)

  const { success, inProgress } = useSelector(initPosition)
  const { data: ticksData, loading: ticksLoading, hasError: hasTicksError } = useSelector(plotTicks)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)
  const currentNetwork = useSelector(network)

  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const [progress, setProgress] = useState<ProgressState>('none')

  const [tokenA, setTokenA] = useState<PublicKey | null>(null)
  const [tokenB, setTokenB] = useState<PublicKey | null>(null)

  const [currentPairReversed, setCurrentPairReversed] = useState<boolean | null>(null)

  const [globalPrice, setGlobalPrice] = useState<number | undefined>(undefined)

  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const liquidityRef = useRef<any>({ v: new BN(0) })

  useEffect(() => {
    setProgress('none')
  }, [poolIndex])

  useEffect(() => {
    let timerId1: any
    let timerId2: any

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

  const [midPrice, setMidPrice] = useState<TickPlotPositionData>({
    index: 0,
    x: 1
  })

  const isWaitingForNewPool = useMemo(() => {
    if (poolIndex !== null) {
      return false
    }

    return isFetchingNewPool
  }, [isFetchingNewPool, poolIndex])

  useEffect(() => {
    if (!isWaitingForNewPool && tokenA !== null && tokenB !== null) {
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
  }, [isWaitingForNewPool])
  useEffect(() => {
    if (poolIndex !== null) {
      setMidPrice({
        index: allPools[poolIndex].currentTickIndex,
        x: calcYPerXPrice(allPools[poolIndex].sqrtPrice.v, xDecimal, yDecimal) ** (isXtoY ? 1 : -1)
      })
    }
  }, [poolIndex, isXtoY, xDecimal, yDecimal, allPools])

  useEffect(() => {
    if (poolIndex === null) {
      setMidPrice({
        index: 0,
        x: calcPrice(0, isXtoY, xDecimal, yDecimal)
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
            fee
          })
        )
      )
    }
  }, [progress])

  const initialIsDiscreteValue = localStorage.getItem('IS_PLOT_DISCRETE')
    ? localStorage.getItem('IS_PLOT_DISCRETE') === 'true'
    : true

  const setIsDiscreteValue = (val: boolean) => {
    localStorage.setItem('IS_PLOT_DISCRETE', val ? 'true' : 'false')
  }

  const addTokenHandler = (address: string) => {
    if (connection !== null && !tokens[address]) {
      getNewTokenOrThrow(address, connection)
        .then(data => {
          dispatch(poolsActions.addTokens(data))
          addNewTokenToLocalStorage(address, currentNetwork)
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

  const copyPoolAddressHandler = (message: string, variant: Color) => {
    dispatch(
      snackbarsActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  const initialIsConcentrationOpening =
    localStorage.getItem('OPENING_METHOD') === 'concentration' ||
    localStorage.getItem('OPENING_METHOD') === null

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
    if (tokenA === null) {
      return
    }

    if (tokenA) {
      setPriceALoading(true)
      getJupTokenPrice(tokenA.toString())
        .then(data => setTokenAPriceData(data))
        .catch(() => setTokenAPriceData(undefined))
        .finally(() => setPriceALoading(false))
    } else {
      setTokenAPriceData(undefined)
    }
  }, [tokenA])

  const [tokenBPriceData, setTokenBPriceData] = useState<TokenPriceData | undefined>(undefined)
  const [priceBLoading, setPriceBLoading] = useState(false)
  useEffect(() => {
    if (tokenA === null || tokenB === null) {
      return
    }

    getJupTokensRatioPrice(tokenB.toString(), tokenA.toString())
      .then(data => setGlobalPrice(data.price))
      .catch(() => setGlobalPrice(undefined))
  }, [tokenA, tokenB])

  useEffect(() => {
    if (tokenB === null) {
      return
    }

    setPriceBLoading(true)
    getJupTokenPrice(tokenB.toString())
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

    const lowerPrice = calcPrice(
      !lowerTicks.length || !upperTicks.length
        ? allPools[poolIndex].currentTickIndex
        : Math.min(...lowerTicks),
      isXtoY,
      xDecimal,
      yDecimal
    )

    const upperPrice = calcPrice(
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

  const initialSlippage = localStorage.getItem('INVARIANT_NEW_POSITION_SLIPPAGE') ?? '1'

  const onSlippageChange = (slippage: string) => {
    localStorage.setItem('INVARIANT_NEW_POSITION_SLIPPAGE', slippage)
  }

  const calculatePoolAddress = async () => {
    if (tokenA === null || tokenB === null) {
      return ''
    }

    const pair = new Pair(tokenA, tokenB, ALL_FEE_TIERS_DATA[feeIndex].tier)

    const marketProgramId = new PublicKey(
      getMarketAddress(networkTypetoProgramNetwork(networkType))
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

  return (
    <NewPosition
      initialTokenFrom={initialTokenFrom}
      initialTokenTo={initialTokenTo}
      initialFee={initialFee}
      history={history}
      copyPoolAddressHandler={copyPoolAddressHandler}
      poolAddress={poolIndex !== null ? allPools[poolIndex].address.toString() : ''}
      calculatePoolAddress={calculatePoolAddress}
      tokens={tokens}
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
      data={data}
      midPrice={midPrice}
      setMidPrice={setMidPrice}
      addLiquidityHandler={(leftTickIndex, rightTickIndex, xAmount, yAmount, slippage) => {
        if (tokenA === null || tokenB === null) {
          return
        }

        if (progress === 'none') {
          setProgress('progress')
        }

        const lowerTick = Math.min(leftTickIndex, rightTickIndex)
        const upperTick = Math.max(leftTickIndex, rightTickIndex)

        dispatch(
          actions.initPosition({
            tokenX: isXtoY ? tokenA : tokenB,
            tokenY: isXtoY ? tokenB : tokenA,
            fee,
            lowerTick,
            upperTick,
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
      isCurrentPoolExisting={poolIndex !== null}
      calcAmount={calcAmount}
      ticksLoading={ticksLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: openWalletSelectorModal,
        descCustomText: 'Cannot add any liquidity.'
      }}
      progress={progress}
      isXtoY={isXtoY}
      tickSpacing={tickSpacing}
      xDecimal={xDecimal}
      yDecimal={yDecimal}
      isWaitingForNewPool={isWaitingForNewPool}
      poolIndex={poolIndex}
      currentPairReversed={currentPairReversed}
      bestTiers={bestTiers[currentNetwork]}
      initialIsDiscreteValue={initialIsDiscreteValue}
      onDiscreteChange={setIsDiscreteValue}
      currentPriceSqrt={
        poolIndex !== null ? allPools[poolIndex].sqrtPrice.v : calculatePriceSqrt(midPrice.index).v
      }
      canCreateNewPool={canUserCreateNewPool}
      canCreateNewPosition={canUserCreateNewPosition}
      handleAddToken={addTokenHandler}
      commonTokens={commonTokensForNetworks[currentNetwork]}
      initialOpeningPositionMethod={initialIsConcentrationOpening ? 'concentration' : 'range'}
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
    />
  )
}

export default NewPositionWrapper
