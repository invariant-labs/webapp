import React from 'react'
import { useSelector } from 'react-redux'
import { LiquidityList } from '@components/NewDesign/LiquidityList/LiquidityList'
import { positionsWithPoolsData } from '@selectors/positions'
import { useHistory } from 'react-router-dom'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt } from '@invariant-labs/sdk'
import { printBN } from '@consts/utils'

export const WrappedPositionsList: React.FC = () => {
  const list = useSelector(positionsWithPoolsData)
  const history = useHistory()

  return (
    <LiquidityList
      onAddPositionClick={() => { history.push('/pool') }}
      data={list.map((position) => {
        const lowerSqrtDec = calculate_price_sqrt(position.lowerTickIndex)
        const upperSqrtDec = calculate_price_sqrt(position.upperTickIndex)

        const lowerSqrt = +printBN(lowerSqrtDec.v, PRICE_DECIMAL)
        const upperSqrt = +printBN(upperSqrtDec.v, PRICE_DECIMAL)

        return {
          active: true,
          nameToSwap: position.tokenX.symbol,
          nameFromSwap: position.tokenY.symbol,
          iconToSwap: position.tokenX.logoURI,
          iconFromSwap: position.tokenY.logoURI,
          fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
          min: +(Math.min(lowerSqrt ** 2, upperSqrt ** 2).toFixed(4)),
          max: +(Math.max(lowerSqrt ** 2, upperSqrt ** 2).toFixed(4))
        }
      })}
    />
  )
}

export default WrappedPositionsList
