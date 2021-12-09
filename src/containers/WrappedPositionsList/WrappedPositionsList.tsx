import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LiquidityList } from '@components/LiquidityList/LiquidityList'
import { isLoadingPositionsList, positionsWithPoolsData } from '@selectors/positions'
import { useHistory } from 'react-router-dom'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { printBN } from '@consts/utils'
import { Status, actions } from '@reducers/solanaWallet'
import { status } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'

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
    <LiquidityList
      onAddPositionClick={() => { history.push('/newPosition') }}
      data={list.map((position) => {
        const lowerSqrtDec = calculate_price_sqrt(position.lowerTickIndex)
        const upperSqrtDec = calculate_price_sqrt(position.upperTickIndex)

        const lowerPriceBN = lowerSqrtDec.v.mul(lowerSqrtDec.v).div(DENOMINATOR).div(new BN(10 ** position.tokenX.decimal))
        const upperPriceBN = upperSqrtDec.v.mul(upperSqrtDec.v).div(DENOMINATOR).div(new BN(10 ** position.tokenX.decimal))

        const lowerPrice = +printBN(lowerPriceBN, position.tokenY.decimal)
        const upperPrice = +printBN(upperPriceBN, position.tokenY.decimal)

        const min = Math.min(lowerPrice, upperPrice)
        const max = Math.max(lowerPrice, upperPrice)

        return {
          tokenXName: position.tokenX.symbol,
          tokenYName: position.tokenY.symbol,
          tokenXIcon: position.tokenX.logoURI,
          tokenYIcon: position.tokenY.logoURI,
          fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
          min: +(min.toFixed(maxDecimals(min))),
          max: +(max.toFixed(maxDecimals(max))),
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
