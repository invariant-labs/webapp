import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isLoadingPositionsList, positionsWithPoolsData } from '@selectors/positions'
import { useHistory } from 'react-router-dom'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { Status, actions } from '@reducers/solanaWallet'
import { status } from '@selectors/solanaWallet'
import { PositionsList } from '@components/PositionsList/PositionsList'
import { getX, getY } from '@invariant-labs/sdk/lib/math'

export const WrappedPositionsList: React.FC = () => {
  const dispatch = useDispatch()

  const list = useSelector(positionsWithPoolsData)
  const isLoading = useSelector(isLoadingPositionsList)
  const walletStatus = useSelector(status)

  const history = useHistory()

  const maxDecimals = (value: number): number => {
    if (value >= 10000) {
      return 0
    }

    if (value >= 1000) {
      return 1
    }

    if (value >= 100) {
      return 2
    }

    return 5
  }

  return (
    <PositionsList
      onAddPositionClick={() => { history.push('/newPosition') }}
      data={list.map((position) => {
        const lowerPrice = calcYPerXPrice(calculate_price_sqrt(position.lowerTickIndex).v, position.tokenX.decimal, position.tokenY.decimal)
        const upperPrice = calcYPerXPrice(calculate_price_sqrt(position.upperTickIndex).v, position.tokenX.decimal, position.tokenY.decimal)

        const min = Math.min(lowerPrice, upperPrice)
        const max = Math.max(lowerPrice, upperPrice)

        console.log(position)

        let tokenXLiq, tokenYLiq

        try {
          tokenXLiq = +printBN(
            getX(position.liquidity.v, calculate_price_sqrt(position.upperTickIndex).v, position.poolData.sqrtPrice.v).div(DENOMINATOR),
            position.tokenX.decimal
          )
        } catch (error) {
          tokenXLiq = 0
        }

        try {
          tokenYLiq = +printBN(
            getY(position.liquidity.v, position.poolData.sqrtPrice.v, calculate_price_sqrt(position.lowerTickIndex).v).div(DENOMINATOR),
            position.tokenY.decimal
          )
        } catch (error) {
          tokenYLiq = 0
        }

        const currentPrice = calcYPerXPrice(position.poolData.sqrtPrice.v, position.tokenX.decimal, position.tokenY.decimal)

        const value = tokenXLiq + (tokenYLiq / currentPrice)

        return {
          tokenXName: position.tokenX.symbol,
          tokenYName: position.tokenY.symbol,
          tokenXIcon: position.tokenX.logoURI,
          tokenYIcon: position.tokenY.logoURI,
          fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
          min: +(min.toFixed(maxDecimals(min))),
          max: +(max.toFixed(maxDecimals(max))),
          tokenXLiq: +(tokenXLiq.toFixed(maxDecimals(tokenXLiq))),
          tokenYLiq: +(tokenYLiq.toFixed(maxDecimals(tokenYLiq))),
          value: +(value.toFixed(maxDecimals(value))),
          id: position.id.toString()
        }
      })}
      loading={isLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: (type) => { dispatch(actions.connect(type)) },
        onDisconnect: () => { dispatch(actions.disconnect()) },
        descCustomText: 'No liquidity positions to show.'
      }}
    />
  )
}

export default WrappedPositionsList
