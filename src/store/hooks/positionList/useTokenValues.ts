import { useMemo, useState } from 'react'
import { useLiquidity } from '../userOverview/useLiquidity'
import { usePrices } from '../userOverview/usePrices'
import { ISinglePositionData } from '@components/Portfolio/Overview/Overview/Overview'
import { IPositionItem } from '@store/consts/types'
import { calculatePercentageRatio } from '@utils/utils'

interface TokenValuesHook extends IPositionItem {
  positionSingleData?: ISinglePositionData
  xToY: boolean
}

export const useTokenValues = ({
  currentPrice,
  tokenXLiq,
  tokenYLiq,
  positionSingleData,
  xToY
}: Pick<
  TokenValuesHook,
  'currentPrice' | 'id' | 'position' | 'tokenXLiq' | 'tokenYLiq' | 'positionSingleData' | 'xToY'
>) => {
  const [previousTokenValueInUsd, setPreviousTokenValueInUsd] = useState<number>(0)

  const { tokenXPercentage, tokenYPercentage } = useMemo(
    () => calculatePercentageRatio(tokenXLiq, tokenYLiq, currentPrice, xToY),
    [tokenXLiq, tokenYLiq, currentPrice, xToY]
  )

  const { tokenXLiquidity, tokenYLiquidity } = useLiquidity(positionSingleData)
  const { tokenXPriceData, tokenYPriceData } = usePrices({
    tokenX: {
      assetsAddress: positionSingleData?.tokenX.assetAddress.toString(),
      name: positionSingleData?.tokenX.name
    },
    tokenY: {
      assetsAddress: positionSingleData?.tokenY.assetAddress.toString(),
      name: positionSingleData?.tokenY.name
    }
  })

  const tokenValueInUsd = useMemo(() => {
    const loading = tokenXPriceData.loading || tokenYPriceData.loading

    if (loading && previousTokenValueInUsd > 0) {
      return { loading: false, value: previousTokenValueInUsd }
    }

    if (loading) {
      return { loading: true, value: previousTokenValueInUsd }
    }

    if (!tokenXLiquidity && !tokenYLiquidity) {
      return { loading: false, value: 0 }
    }

    const totalValue =
      tokenXLiquidity * tokenXPriceData.price + tokenYLiquidity * tokenYPriceData.price

    if (Math.abs(totalValue - previousTokenValueInUsd) > 0.000001) {
      setPreviousTokenValueInUsd(totalValue)
    }

    return {
      loading: false,
      value: totalValue,
      priceWarning: tokenXPriceData.price === 0 || tokenYPriceData.price === 0
    }
  }, [tokenXLiquidity, tokenYLiquidity, tokenXPriceData, tokenYPriceData, previousTokenValueInUsd])

  return { tokenValueInUsd, tokenXPercentage, tokenYPercentage }
}
