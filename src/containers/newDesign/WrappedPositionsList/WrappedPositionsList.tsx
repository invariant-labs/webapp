import React from 'react'
import { useSelector } from 'react-redux'
import { LiquidityList } from '@components/NewDesign/LiquidityList/LiquidityList'
import { positionsList } from '@selectors/positions'
import { useHistory } from 'react-router-dom'
import { PRICE_DECIMAL, tokens } from '@consts/static'
import { calculate_price_sqrt } from '@invariant-labs/sdk'
import { printBN } from '@consts/utils'

export const WrappedPositionsList: React.FC = () => {
  const { list } = useSelector(positionsList)
  const history = useHistory()

  const tokensByKey = tokens.reduce((prev, token) => {
    return {
      [token.address.toString()]: token,
      ...prev
    }
  }, {})

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
          nameToSwap: 'ABC',
          nameFromSwap: 'XYZ',
          fee: 0.02,
          min: +(Math.min(lowerSqrt ** 2, upperSqrt ** 2).toFixed(6)),
          max: +(Math.max(lowerSqrt ** 2, upperSqrt ** 2).toFixed(6))
        }
      })}
    />
  )
}

export default WrappedPositionsList
