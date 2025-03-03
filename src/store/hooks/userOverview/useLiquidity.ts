import { ISinglePositionData } from '@components/OverviewYourPositions/components/Overview/Overview'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { printBN } from '@utils/utils'
import { useMemo } from 'react'

export const useLiquidity = (position: ISinglePositionData | undefined) => {
  const tokenXLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getX(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            position.poolData.sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          ),
          position.tokenX.decimals
        )
      } catch (error) {
        return 0
      }
    }

    return 0
  }, [position])

  const tokenYLiquidity = useMemo(() => {
    if (position) {
      try {
        return +printBN(
          getY(
            position.liquidity.v,
            calculatePriceSqrt(position.upperTickIndex).v,
            position.poolData.sqrtPrice.v,
            calculatePriceSqrt(position.lowerTickIndex).v
          ),
          position.tokenY.decimals
        )
      } catch (error) {
        console.log(error)
        return 0
      }
    }

    return 0
  }, [position])

  return { tokenXLiquidity, tokenYLiquidity }
}
