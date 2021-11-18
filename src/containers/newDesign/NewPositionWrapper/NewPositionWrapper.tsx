import React, { useState, useEffect } from 'react'
import NewPosition from '@components/NewDesign/NewPosition/NewPosition'
import { actions } from '@reducers/positions'
import { useDispatch, useSelector } from 'react-redux'
import { swapTokens } from '@selectors/solanaWallet'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { printBN } from '@consts/utils'
import { pools } from '@selectors/pools'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/tick'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { plotTicks } from '@selectors/positions'
import { BN } from '@project-serum/anchor'
import { PRICE_DECIMAL } from '@consts/static'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  const tokens = useSelector(swapTokens)
  const allPools = useSelector(pools)
  const { data: ticksData, loading: ticksLoading } = useSelector(plotTicks)

  const [poolIndex, setPoolIndex] = useState<number | null>(null)
  const [liquidity, setLiquidity] = useState<Decimal>({ v: new BN(0) })
  const [midPriceIndex, setMidPriceIndex] = useState<number>(0)

  useEffect(() => {
    if (poolIndex !== null) {
      const index = ticksData.findIndex((tick) => tick.index === allPools[poolIndex].currentTickIndex)

      setMidPriceIndex(index === -1 ? 0 : index)
    }
  }, [ticksData])

  return (
    <NewPosition
      tokens={tokens}
      onChangePositionTokens={
        (token1, token2, fee) => {
          if (token1 !== null && token2 !== null) {
            const index = allPools.findIndex(
              (pool) =>
                pool.fee.v.eq(FEE_TIERS[fee].fee) &&
                (
                  (pool.tokenX.equals(tokens[token1].assetAddress) && pool.tokenY.equals(tokens[token2].assetAddress)) ||
                  (pool.tokenX.equals(tokens[token2].assetAddress) && pool.tokenY.equals(tokens[token1].assetAddress))
                )
            )

            setPoolIndex(index !== -1 ? index : null)

            if (index !== -1) {
              dispatch(actions.getCurrentPlotTicks({
                poolIndex: index,
                isXtoY: allPools[index].tokenX.equals(tokens[token1].assetAddress)
              }))
            }
          }
        }
      }
      feeTiers={FEE_TIERS.map((tier) => +printBN(tier.fee, PRICE_DECIMAL - 2))}
      data={ticksData}
      midPriceIndex={midPriceIndex}
      addLiquidityHandler={(leftTickIndex, rightTickIndex, _slippageTolerance) => {
        if (poolIndex === null) {
          return
        }

        const lowerTick = Math.min(leftTickIndex, rightTickIndex)
        const upperTick = Math.max(leftTickIndex, rightTickIndex)

        dispatch(actions.initPosition({
          poolIndex,
          lowerTick,
          upperTick,
          liquidityDelta: liquidity
        }))
      }}
      isCurrentPoolExisting={poolIndex !== null}
      calcAmount={(amount, current, left, right, tokenAddress) => {
        if (poolIndex === null) {
          return new BN(0)
        }

        const byX = tokenAddress.equals(allPools[poolIndex].tokenX)
        const lowerTick = Math.min(ticksData[left].index, ticksData[right].index)
        const upperTick = Math.max(ticksData[left].index, ticksData[right].index)

        try {
          if (byX) {
            const result = getLiquidityByX(amount, lowerTick, upperTick, ticksData[current].index, true)
            setLiquidity(result.liquidity)

            return result.y
          }

          const result = getLiquidityByY(amount, lowerTick, upperTick, ticksData[current].index, true)
          setLiquidity(result.liquidity)

          return result.x
        } catch (error) {
          const result = (byX ? getLiquidityByY : getLiquidityByX)(amount, lowerTick, upperTick, ticksData[current].index, true)
          setLiquidity(result.liquidity)
        }

        return new BN(0)
      }}
      initialSlippageTolerance={1}
      ticksLoading={ticksLoading}
    />
  )
}

export default NewPositionWrapper
