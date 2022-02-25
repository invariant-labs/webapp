import React, { useState, useMemo, useEffect } from 'react'
import NewPosition from '@components/NewPosition/NewPosition'
import { actions } from '@reducers/positions'
import { useDispatch, useSelector } from 'react-redux'
import { swapTokens, status } from '@selectors/solanaWallet'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { calcPrice, createPlaceholderLiquidityPlot, printBN } from '@consts/utils'
import { isLoadingLatestPoolsForTransaction, poolsArraySortedByFees } from '@selectors/pools'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/math'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { initPosition, plotTicks } from '@selectors/positions'
import { BN } from '@project-serum/anchor'
import { bestTiers, PRICE_DECIMAL } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import { calculatePriceSqrt, Pair } from '@invariant-labs/sdk'
import { feeToTickSpacing } from '@invariant-labs/sdk/src/utils'
import { actions as poolsActions } from '@reducers/pools'
import { network } from '@selectors/solanaConnection'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  const tokens = useSelector(swapTokens)
  const walletStatus = useSelector(status)
  const allPools = useSelector(poolsArraySortedByFees)

  const { success, inProgress } = useSelector(initPosition)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)
  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)
  const currentNetwork = useSelector(network)

  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const [liquidity, setLiquidity] = useState<Decimal>({ v: new BN(0) })

  const [progress, setProgress] = useState<ProgressState>('none')

  useEffect(() => {
    setProgress('none')
  }, [poolIndex])

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

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokenBIndex, setTokenBIndex] = useState<number | null>(null)

  const isXtoY = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return (
        tokens[tokenAIndex].assetAddress.toString() < tokens[tokenBIndex].assetAddress.toString()
      )
    }
    return true
  }, [tokenAIndex, tokenBIndex])

  const xDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() <
        tokens[tokenBIndex].assetAddress.toString()
        ? tokens[tokenAIndex].decimals
        : tokens[tokenBIndex].decimals
    }
    return 0
  }, [tokenAIndex, tokenBIndex])

  const yDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() <
        tokens[tokenBIndex].assetAddress.toString()
        ? tokens[tokenBIndex].decimals
        : tokens[tokenAIndex].decimals
    }
    return 0
  }, [tokenAIndex, tokenBIndex])

  const [fee, setFee] = useState<BN>(FEE_TIERS[0].fee)
  const [tickSpacing, setTickSpacing] = useState<number>(feeToTickSpacing(FEE_TIERS[0].fee))

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
    if (!isWaitingForNewPool && tokenAIndex !== null && tokenBIndex !== null) {
      const index = allPools.findIndex(
        pool =>
          pool.fee.v.eq(fee) &&
          ((pool.tokenX.equals(tokens[tokenAIndex].assetAddress) &&
            pool.tokenY.equals(tokens[tokenBIndex].assetAddress)) ||
            (pool.tokenX.equals(tokens[tokenBIndex].assetAddress) &&
              pool.tokenY.equals(tokens[tokenAIndex].assetAddress)))
      )

      setPoolIndex(index !== -1 ? index : null)

      if (index !== -1) {
        dispatch(
          actions.getCurrentPlotTicks({
            poolIndex: index,
            isXtoY: allPools[index].tokenX.equals(tokens[tokenAIndex].assetAddress)
          })
        )
      }
    }
  }, [isWaitingForNewPool])

  useEffect(() => {
    if (poolIndex !== null) {
      setMidPrice({
        index: allPools[poolIndex].currentTickIndex,
        x: calcPrice(allPools[poolIndex].currentTickIndex, isXtoY, xDecimal, yDecimal)
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

  const [currentPairReversed, setCurrentPairReversed] = useState<boolean | null>(null)

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
      tokenAIndex !== null &&
      tokenBIndex !== null &&
      poolIndex === null &&
      progress === 'approvedWithSuccess'
    ) {
      dispatch(
        poolsActions.getPoolData(
          new Pair(tokens[tokenAIndex].assetAddress, tokens[tokenBIndex].assetAddress, {
            fee
          })
        )
      )
    }
  }, [progress])

  return (
    <NewPosition
      tokens={tokens}
      onChangePositionTokens={(tokenA, tokenB, feeTierIndex) => {
        if (
          tokenA !== null &&
          tokenB !== null &&
          !(tokenAIndex === tokenA && tokenBIndex === tokenB && fee.eq(FEE_TIERS[feeTierIndex].fee))
        ) {
          const index = allPools.findIndex(
            pool =>
              pool.fee.v.eq(FEE_TIERS[feeTierIndex].fee) &&
              ((pool.tokenX.equals(tokens[tokenA].assetAddress) &&
                pool.tokenY.equals(tokens[tokenB].assetAddress)) ||
                (pool.tokenX.equals(tokens[tokenB].assetAddress) &&
                  pool.tokenY.equals(tokens[tokenA].assetAddress)))
          )

          if (
            index !== poolIndex &&
            !(
              tokenAIndex === tokenB &&
              tokenBIndex === tokenA &&
              fee.eq(FEE_TIERS[feeTierIndex].fee)
            )
          ) {
            setPoolIndex(index !== -1 ? index : null)
            setCurrentPairReversed(null)
          } else if (
            tokenAIndex === tokenB &&
            tokenBIndex === tokenA &&
            fee.eq(FEE_TIERS[feeTierIndex].fee)
          ) {
            setCurrentPairReversed(currentPairReversed === null ? true : !currentPairReversed)
          }

          if (index !== -1 && index !== poolIndex) {
            dispatch(
              actions.getCurrentPlotTicks({
                poolIndex: index,
                isXtoY: allPools[index].tokenX.equals(tokens[tokenA].assetAddress)
              })
            )
          } else if (
            !(
              tokenAIndex === tokenB &&
              tokenBIndex === tokenA &&
              fee.eq(FEE_TIERS[feeTierIndex].fee)
            )
          ) {
            dispatch(
              poolsActions.getPoolData(
                new Pair(tokens[tokenA].assetAddress, tokens[tokenB].assetAddress, {
                  fee: FEE_TIERS[feeTierIndex].fee
                })
              )
            )
          }
        }

        setTokenAIndex(tokenA)
        setTokenBIndex(tokenB)
        setFee(FEE_TIERS[feeTierIndex].fee)
        setTickSpacing(feeToTickSpacing(FEE_TIERS[feeTierIndex].fee))
      }}
      feeTiers={FEE_TIERS.map(tier => +printBN(tier.fee, PRICE_DECIMAL - 2))}
      data={data}
      midPrice={midPrice}
      setMidPrice={setMidPrice}
      addLiquidityHandler={(leftTickIndex, rightTickIndex, xAmount, yAmount) => {
        if (tokenAIndex === null || tokenBIndex === null) {
          return
        }

        if (progress === 'none') {
          setProgress('progress')
        }

        const lowerTick = Math.min(leftTickIndex, rightTickIndex)
        const upperTick = Math.max(leftTickIndex, rightTickIndex)

        dispatch(
          actions.initPosition({
            tokenX: tokens[isXtoY ? tokenAIndex : tokenBIndex].assetAddress,
            tokenY: tokens[isXtoY ? tokenBIndex : tokenAIndex].assetAddress,
            fee,
            lowerTick,
            upperTick,
            liquidityDelta: liquidity,
            initPool: poolIndex === null,
            initTick: poolIndex === null ? midPrice.index : undefined,
            xAmount,
            yAmount
          })
        )
      }}
      isCurrentPoolExisting={poolIndex !== null}
      calcAmount={(amount, left, right, tokenAddress) => {
        if (tokenAIndex === null || tokenBIndex === null || isNaN(left) || isNaN(right)) {
          return new BN(0)
        }

        const byX = tokenAddress.equals(
          isXtoY ? tokens[tokenAIndex].assetAddress : tokens[tokenBIndex].assetAddress
        )
        const lowerTick = Math.min(left, right)
        const upperTick = Math.max(left, right)

        console.log('liquidity calc by:', tokenAddress.toString())
        console.log(
          'pool token x:',
          tokens[isXtoY ? tokenAIndex : tokenBIndex].assetAddress.toString()
        )

        try {
          if (byX) {
            const result = getLiquidityByX(
              amount,
              lowerTick,
              upperTick,
              poolIndex !== null
                ? allPools[poolIndex].sqrtPrice
                : calculatePriceSqrt(midPrice.index),
              true
            )
            setLiquidity(result.liquidity)

            console.log(
              'x:',
              amount.toString(),
              'y:',
              result.y.toString(),
              'ticks:',
              lowerTick,
              upperTick,
              'liquidity',
              result.liquidity.v.toString()
            )

            return result.y
          }

          const result = getLiquidityByY(
            amount,
            lowerTick,
            upperTick,
            poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculatePriceSqrt(midPrice.index),
            true
          )
          setLiquidity(result.liquidity)

          console.log(
            'y:',
            amount.toString(),
            'x:',
            result.x.toString(),
            'ticks:',
            lowerTick,
            upperTick,
            'liquidity',
            result.liquidity.v.toString()
          )

          return result.x
        } catch (error) {
          const result = (byX ? getLiquidityByY : getLiquidityByX)(
            amount,
            lowerTick,
            upperTick,
            poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculatePriceSqrt(midPrice.index),
            true
          )
          setLiquidity(result.liquidity)

          console.log(
            'err',
            byX ? 'x:' : 'y:',
            amount.toString(),
            'ticks:',
            lowerTick,
            upperTick,
            'liquidity:',
            result.liquidity.v.toString()
          )
        }

        return new BN(0)
      }}
      ticksLoading={ticksLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: type => {
          dispatch(walletActions.connect(type))
        },
        onDisconnect: () => {
          dispatch(walletActions.disconnect())
        },
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
    />
  )
}

export default NewPositionWrapper
