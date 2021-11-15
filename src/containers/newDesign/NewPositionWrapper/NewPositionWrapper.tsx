import React, { useState } from 'react'
import NewPosition from '@components/NewDesign/NewPosition/NewPosition'
import { actions } from '@reducers/position'
import { actions as poolsActions } from '@reducers/pools'
import { useDispatch, useSelector } from 'react-redux'
import { swapTokens } from '@selectors/solanaWallet'
import { FEE_DECIMAL, FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { printBN } from '@consts/utils'
import { pools, ticks } from '@selectors/pools'
import { getLiquidityByX, getLiquidityByY } from '@invariant-labs/sdk/src/tick'
import BN from 'bn.js'
import { Decimal } from '@invariant-labs/sdk/lib/market'

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  const tokens = useSelector(swapTokens)
  const allPools = useSelector(pools)
  const ticksData = useSelector(ticks)

  const [poolIndex, setPoolIndex] = useState<number | null>(null)
  const [liquidity, setLiquidity] = useState<Decimal>({ v: new BN(0) })

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
                  (pool.tokenX === tokens[token1].assetAddress && pool.tokenY === tokens[token2].assetAddress) ||
                  (pool.tokenX === tokens[token2].assetAddress && pool.tokenY === tokens[token1].assetAddress)
                )
            )

            setPoolIndex(index !== -1 ? index : null)
            dispatch(poolsActions.getCurrentTicks({ index }))
          }
        }
      }
      feeTiers={FEE_TIERS.map((tier) => +printBN(tier.fee, FEE_DECIMAL))}
      data={ticksData}
      midPriceIndex={poolIndex !== null ? allPools[poolIndex].currentTickIndex : 0}
      addLiquidityHandler={() => {
        dispatch(actions.position({}))
      }}
      isCurrentPoolExisting={poolIndex !== null}
      calcAmountAndLiquidity={(amount, current, left, right, byX) => {
        if (byX) {
          const result = getLiquidityByX(amount, current, left, right, true)
          setLiquidity(result.liquidity)

          return result.y
        }

        const result = getLiquidityByY(amount, current, left, right, true)
        setLiquidity(result.liquidity)

        return result.x
      }}
      initialSlippageTolerance={1}
    />
  )
}

export default NewPositionWrapper
