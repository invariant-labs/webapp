import React, { useState, useEffect } from 'react'
import NewPosition from '@components/NewPosition/NewPosition'
import { actions } from '@reducers/positions'
import { useDispatch, useSelector } from 'react-redux'
import { SwapToken, swapTokens, status } from '@selectors/solanaWallet'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { printBN } from '@consts/utils'
import { pools } from '@selectors/pools'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/math'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { plotTicks } from '@selectors/positions'
import { BN } from '@project-serum/anchor'
import { PRICE_DECIMAL } from '@consts/static'
import { Status, actions as walletActions } from '@reducers/solanaWallet'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  const tokens = useSelector(swapTokens)
  const walletStatus = useSelector(status)
  const allPools = useSelector(pools)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)

  const [poolIndex, setPoolIndex] = useState<number | null>(null)

  const [liquidity, setLiquidity] = useState<Decimal>({ v: new BN(0) })
  const [midPriceIndex, setMidPriceIndex] = useState<number>(0)

  const [tokenAIndex, setTokenAIndex] = useState<number | null>(null)
  const [tokensB, setTokensB] = useState<SwapToken[]>([])

  useEffect(() => {
    if (tokenAIndex === null) {
      return
    }

    const tokensByKey: Record<string, SwapToken> = tokens.reduce((prev, token) => {
      return {
        [token.address.toString()]: token,
        ...prev
      }
    }, {})

    const poolsForTokenA = allPools.filter((pool) => pool.tokenX.equals(tokens[tokenAIndex].assetAddress) || pool.tokenY.equals(tokens[tokenAIndex].assetAddress))

    setTokensB(
      poolsForTokenA.map(
        (pool) => tokensByKey[pool.tokenX.equals(tokens[tokenAIndex].assetAddress) ? pool.tokenY.toString() : pool.tokenX.toString()]
      )
    )
  }, [tokenAIndex, allPools.length])

  useEffect(() => {
    if (poolIndex !== null) {
      const index = ticksData.findIndex((tick) => tick.index === allPools[poolIndex].currentTickIndex)

      setMidPriceIndex(index === -1 ? 0 : index)
    }
  }, [ticksData])

  return (
    <NewPosition
      tokens={tokens}
      tokensB={tokensB}
      onChangePositionTokens={
        (tokenA, tokenB, fee) => {
          setTokenAIndex(tokenA)
          if (tokenA !== null && tokenB !== null) {
            const index = allPools.findIndex(
              (pool) =>
                pool.fee.v.eq(FEE_TIERS[fee].fee) &&
                (
                  (pool.tokenX.equals(tokens[tokenA].assetAddress) && pool.tokenY.equals(tokens[tokenB].assetAddress)) ||
                  (pool.tokenX.equals(tokens[tokenB].assetAddress) && pool.tokenY.equals(tokens[tokenA].assetAddress))
                )
            )

            setPoolIndex(index !== -1 ? index : null)

            if (index !== -1) {
              dispatch(actions.getCurrentPlotTicks({
                poolIndex: index,
                isXtoY: allPools[index].tokenX.equals(tokens[tokenA].assetAddress)
              }))
            }
          }
        }
      }
      feeTiers={FEE_TIERS.map((tier) => +printBN(tier.fee, PRICE_DECIMAL - 2))}
      data={ticksData}
      midPriceIndex={midPriceIndex}
      addLiquidityHandler={(leftTickIndex, rightTickIndex) => {
        if (poolIndex === null) {
          return
        }

        const lowerTick = Math.min(ticksData[leftTickIndex].index, ticksData[rightTickIndex].index)
        const upperTick = Math.max(ticksData[leftTickIndex].index, ticksData[rightTickIndex].index)

        dispatch(actions.initPosition({
          poolIndex,
          lowerTick,
          upperTick,
          liquidityDelta: liquidity
        }))
      }}
      isCurrentPoolExisting={poolIndex !== null}
      calcAmount={(amount, left, right, tokenAddress) => {
        if (poolIndex === null) {
          return new BN(0)
        }

        const byX = tokenAddress.equals(allPools[poolIndex].tokenX)
        const lowerTick = Math.min(ticksData[left].index, ticksData[right].index)
        const upperTick = Math.max(ticksData[left].index, ticksData[right].index)

        console.log('liquidity calc by:', tokenAddress.toString())
        console.log('pool token x:', allPools[poolIndex].tokenX.toString())

        try {
          if (byX) {
            const result = getLiquidityByX(amount, lowerTick, upperTick, allPools[poolIndex].sqrtPrice, true)
            setLiquidity(result.liquidity)

            console.log('x:', amount.toString(), 'y:', result.y.toString(), 'ticks:', lowerTick, upperTick, 'liquidity', result.liquidity.v.toString())

            return result.y
          }

          const result = getLiquidityByY(amount, lowerTick, upperTick, allPools[poolIndex].sqrtPrice, true)
          setLiquidity(result.liquidity)

          console.log('y:', amount.toString(), 'x:', result.x.toString(), 'ticks:', lowerTick, upperTick, 'liquidity', result.liquidity.v.toString())

          return result.x
        } catch (error) {
          const result = (byX ? getLiquidityByY : getLiquidityByX)(amount, lowerTick, upperTick, allPools[poolIndex].sqrtPrice, true)
          setLiquidity(result.liquidity)

          console.log('err', byX ? 'x:' : 'y:', amount.toString(), 'ticks:', lowerTick, upperTick, 'liquidity:', result.liquidity.v.toString())
        }

        return new BN(0)
      }}
      ticksLoading={ticksLoading}
      isTokenXFirst={poolIndex !== null && tokenAIndex !== null && allPools[poolIndex].tokenX.equals(tokens[tokenAIndex].assetAddress)}
      onZoomOutOfData={(min, max) => {
        if (poolIndex !== null && tokenAIndex !== null) {
          dispatch(actions.getCurrentPlotTicks({
            poolIndex,
            isXtoY: allPools[poolIndex].tokenX.equals(tokens[tokenAIndex].assetAddress),
            min,
            max
          }))
        }
      }}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: (type) => { dispatch(walletActions.connect(type)) },
        onDisconnect: () => { dispatch(walletActions.disconnect()) },
        descCustomText: 'Cannot add any liquidity.'
      }}
    />
  )
}

export default NewPositionWrapper
