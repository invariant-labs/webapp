import React, { useState, useMemo, useEffect } from 'react'
import NewPosition from '@components/NewPosition/NewPosition'
import { actions } from '@reducers/positions'
import { useDispatch, useSelector } from 'react-redux'
import { swapTokens, status } from '@selectors/solanaWallet'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { calcPrice, createPlaceholderLiquidityPlot, printBN } from '@consts/utils'
import { pools } from '@selectors/pools'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/math'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { initPosition, plotTicks } from '@selectors/positions'
import { BN } from '@project-serum/anchor'
import { PRICE_DECIMAL } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { ProgressState } from '@components/AnimatedButton/AnimatedButton'
import { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import { calculate_price_sqrt } from '@invariant-labs/sdk'
import { feeToTickSpacing } from '@invariant-labs/sdk/src/utils'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  const tokens = useSelector(swapTokens)
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const { success, inProgress } = useSelector(initPosition)
  const {
    data: ticksData,
    loading: ticksLoading,
    maxReached,
    currentMaxPriceFetched,
    currentMinPriceFetched
  } = useSelector(plotTicks)

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
      return tokens[tokenAIndex].assetAddress.toString() < tokens[tokenBIndex].assetAddress.toString()
    }
    return true
  }, [tokenAIndex, tokenBIndex])

  const xDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() < tokens[tokenBIndex].assetAddress.toString()
        ? tokens[tokenAIndex].decimals
        : tokens[tokenBIndex].decimals
    }
    return 0
  }, [tokenAIndex, tokenBIndex])

  const yDecimal = useMemo(() => {
    if (tokenAIndex !== null && tokenBIndex !== null) {
      return tokens[tokenAIndex].assetAddress.toString() < tokens[tokenBIndex].assetAddress.toString()
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

  useEffect(() => {
    if (poolIndex !== null) {
      setMidPrice({
        index: allPools[poolIndex].currentTickIndex,
        x: calcPrice(allPools[poolIndex].currentTickIndex, isXtoY, xDecimal, yDecimal)
      })

      return
    }

    setMidPrice({
      index: 0,
      x: 1
    })
  }, [poolIndex, isXtoY, xDecimal, yDecimal])

  const data = useMemo(() => {
    if (ticksLoading) {
      return createPlaceholderLiquidityPlot(isXtoY, 10, tickSpacing, xDecimal, yDecimal)
    }

    return ticksData
  }, [ticksData, ticksLoading, isXtoY, tickSpacing, xDecimal, yDecimal])

  return (
    <NewPosition
      tokens={tokens}
      onChangePositionTokens={(tokenA, tokenB, feeTierIndex) => {
        setTokenAIndex(tokenA)
        setTokenBIndex(tokenB)
        setFee(FEE_TIERS[feeTierIndex].fee)
        setTickSpacing(feeToTickSpacing(FEE_TIERS[feeTierIndex].fee))

        if (tokenA !== null && tokenB !== null) {
          const index = allPools.findIndex(
            pool =>
              pool.fee.v.eq(FEE_TIERS[feeTierIndex].fee) &&
              ((pool.tokenX.equals(tokens[tokenA].assetAddress) &&
                pool.tokenY.equals(tokens[tokenB].assetAddress)) ||
                (pool.tokenX.equals(tokens[tokenB].assetAddress) &&
                  pool.tokenY.equals(tokens[tokenA].assetAddress)))
          )

          setPoolIndex(index !== -1 ? index : null)

          if (index !== -1) {
            dispatch(
              actions.getCurrentPlotTicks({
                poolIndex: index,
                isXtoY: allPools[index].tokenX.equals(tokens[tokenA].assetAddress)
              })
            )
          }
        }
      }}
      feeTiers={FEE_TIERS.map(tier => +printBN(tier.fee, PRICE_DECIMAL - 2))}
      data={data}
      midPrice={midPrice}
      setMidPrice={setMidPrice}
      addLiquidityHandler={(leftTickIndex, rightTickIndex) => {
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
            initPool: poolIndex !== null
          })
        )
      }}
      isCurrentPoolExisting={poolIndex !== null}
      calcAmount={(amount, left, right, tokenAddress) => {
        if (tokenAIndex === null || tokenBIndex === null || isNaN(left) || isNaN(right)) {
          return new BN(0)
        }

        const byX = tokenAddress.equals(isXtoY ? tokens[tokenAIndex].assetAddress : tokens[tokenBIndex].assetAddress)
        const lowerTick = Math.min(left, right)
        const upperTick = Math.max(left, right)

        console.log('liquidity calc by:', tokenAddress.toString())
        console.log('pool token x:', tokens[isXtoY ? tokenAIndex : tokenBIndex].assetAddress.toString())
        console.log('curr sqrts:', calculate_price_sqrt(midPrice.index).v.toNumber(), poolIndex !== null ? allPools[poolIndex].sqrtPrice.v.toNumber() : 0)
        console.log('curr indexes:', midPrice.index, poolIndex !== null ? allPools[poolIndex].currentTickIndex : 0)

        try {
          if (byX) {
            const result = getLiquidityByX(
              amount,
              lowerTick,
              upperTick,
              poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculate_price_sqrt(midPrice.index),
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
            poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculate_price_sqrt(midPrice.index),
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
            poolIndex !== null ? allPools[poolIndex].sqrtPrice : calculate_price_sqrt(midPrice.index),
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
      onZoomOut={(min, max) => {
        if (
          poolIndex !== null &&
          tokenAIndex !== null &&
          !ticksLoading &&
          !maxReached &&
          ((typeof currentMinPriceFetched !== 'undefined' &&
            Math.max(min, 0) < currentMinPriceFetched) ||
            (typeof currentMaxPriceFetched !== 'undefined' && max > currentMaxPriceFetched))
        ) {
          dispatch(
            actions.getCurrentPlotTicks({
              poolIndex,
              isXtoY: allPools[poolIndex].tokenX.equals(tokens[tokenAIndex].assetAddress),
              min: Math.max(min, 0),
              max
            })
          )
        }
      }}
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
    />
  )
}

export default NewPositionWrapper
