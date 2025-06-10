import { ISinglePositionData } from '@components/Portfolio/Overview/Overview/Overview'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { Decimal } from '@invariant-labs/sdk/lib/market'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { PublicKey } from '@solana/web3.js'
import { TokenPositionEntry } from '@store/types/userOverview'
import { printBN } from '@utils/utils'
import { useMemo } from 'react'
interface TokenPosition {
  tokenX: {
    symbol: string
    decimals: number
    name: string
    assetAddress: PublicKey
    logoURI: string
  }
  tokenY: {
    symbol: string
    name: string
    decimals: number
    assetAddress: PublicKey
    logoURI: string
  }
  liquidity: Decimal
  upperTickIndex: number
  lowerTickIndex: number
  poolData: {
    sqrtPrice: Decimal
  }
  id: string
}

const calculateTokenValue = (
  position: TokenPosition,
  isTokenX: boolean,
  prices: Record<string, { price: number; buyPrice: number; sellPrice: number }>
): { value: number; amountBN: number } => {
  const token = isTokenX ? position.tokenX : position.tokenY
  const getValue = isTokenX ? getX : getY

  const amount = getValue(
    position.liquidity.v,
    calculatePriceSqrt(position.upperTickIndex).v,
    position.poolData.sqrtPrice.v,
    calculatePriceSqrt(position.lowerTickIndex).v
  )

  return {
    value: +printBN(amount, token.decimals) * prices[token.assetAddress.toString()]?.price || 0,
    amountBN: amount
  }
}

const createPositionEntry = (
  position: TokenPosition,
  isTokenX: boolean,
  value: number,
  isPriceWarning: boolean
): TokenPositionEntry => {
  const token = isTokenX ? position.tokenX : position.tokenY

  return {
    token: token.symbol,
    value,
    name: token.name,
    logo: token.logoURI,
    positionId: position.id,
    isPriceWarning: isPriceWarning
  }
}

const updateOrCreatePosition = (
  positions: TokenPositionEntry[],
  position: TokenPosition,
  isTokenX: boolean,
  prices: Record<string, { price: number; buyPrice: number; sellPrice: number }>
): TokenPositionEntry[] => {
  const token = isTokenX ? position.tokenX : position.tokenY
  const { value, amountBN } = calculateTokenValue(position, isTokenX, prices)

  const existingPosition = positions.find(p => p.token === token.symbol)

  if (existingPosition) {
    existingPosition.value += value
    existingPosition.isPriceWarning =
      !prices?.[token.assetAddress.toString()]?.price && +amountBN.toString() > 0
    return positions
  }

  return [
    ...positions,
    createPositionEntry(
      position,
      isTokenX,
      value,
      !prices?.[token.assetAddress.toString()]?.price && +amountBN.toString() > 0
    )
  ]
}
// Liquidity Assets
export const useAgregatedPositions = (
  positionList: ISinglePositionData[],
  prices: Record<string, { price: number; buyPrice: number; sellPrice: number }>
) => {
  const positions = useMemo(() => {
    return positionList.reduce((acc: TokenPositionEntry[], position) => {
      acc = updateOrCreatePosition(acc, position, true, prices)
      acc = updateOrCreatePosition(acc, position, false, prices)
      return acc
    }, [])
  }, [positionList, prices])
  return { positions }
}
