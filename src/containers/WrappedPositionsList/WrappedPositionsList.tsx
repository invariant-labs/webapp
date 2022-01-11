import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isLoadingPositionsList, positionsWithPoolsData } from '@selectors/positions'
import { useHistory } from 'react-router-dom'
import { PRICE_DECIMAL } from '@consts/static'
import { calculate_price_sqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { calcYPerXPrice, getX, getY, printBN } from '@consts/utils'
import { Status, actions } from '@reducers/solanaWallet'
import { status } from '@selectors/solanaWallet'
import { PositionsList } from '@components/PositionsList/PositionsList'

export const WrappedPositionsList: React.FC = () => {
  const dispatch = useDispatch()

  const list = useSelector(positionsWithPoolsData)
  const isLoading = useSelector(isLoadingPositionsList)
  const walletStatus = useSelector(status)

  const history = useHistory()

  return (
    <PositionsList
      onAddPositionClick={() => {
        history.push('/newPosition')
      }}
      data={list.map(position => {
        const lowerPrice = calcYPerXPrice(
          calculate_price_sqrt(position.lowerTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )
        const upperPrice = calcYPerXPrice(
          calculate_price_sqrt(position.upperTickIndex).v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const min = Math.min(lowerPrice, upperPrice)
        const max = Math.max(lowerPrice, upperPrice)

        let tokenXLiq, tokenYLiq

        try {
          tokenXLiq = +printBN(
            getX(
              position.liquidity.v,
              calculate_price_sqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculate_price_sqrt(position.lowerTickIndex).v
            ).div(DENOMINATOR),
            position.tokenX.decimals
          )
        } catch (error) {
          tokenXLiq = 0
        }

        try {
          tokenYLiq = +printBN(
            getY(
              position.liquidity.v,
              calculate_price_sqrt(position.upperTickIndex).v,
              position.poolData.sqrtPrice.v,
              calculate_price_sqrt(position.lowerTickIndex).v
            ).div(DENOMINATOR),
            position.tokenY.decimals
          )
        } catch (error) {
          tokenYLiq = 0
        }

        const currentPrice = calcYPerXPrice(
          position.poolData.sqrtPrice.v,
          position.tokenX.decimals,
          position.tokenY.decimals
        )

        const value = tokenXLiq + tokenYLiq / currentPrice

        return {
          tokenXName: position.tokenX.symbol,
          tokenYName: position.tokenY.symbol,
          tokenXIcon: position.tokenX.logoURI,
          tokenYIcon: position.tokenY.logoURI,
          fee: +printBN(position.poolData.fee.v, PRICE_DECIMAL - 2),
          min,
          max,
          tokenXLiq,
          tokenYLiq,
          value,
          id: position.id.toString() + '_' + position.pool.toString()
        }
      })}
      loading={isLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      noConnectedBlockerProps={{
        onConnect: type => {
          dispatch(actions.connect(type))
        },
        onDisconnect: () => {
          dispatch(actions.disconnect())
        },
        descCustomText: 'No liquidity positions to show.'
      }}
    />
  )
}

export default WrappedPositionsList
