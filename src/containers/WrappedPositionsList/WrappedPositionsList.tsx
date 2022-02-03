import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isLoadingPositionsList, positionsWithPoolsData } from '@selectors/positions'
import { status } from '@selectors/solanaWallet'
import { PRICE_DECIMAL } from '@consts/static'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { calculatePriceSqrt, DENOMINATOR } from '@invariant-labs/sdk'
import { Status, actions } from '@reducers/solanaWallet'
import { PositionsList } from '@components/PositionsList/PositionsList'
import { getX, getY } from '@invariant-labs/sdk/lib/math'

export const WrappedPositionsList: React.FC = () => {
  const dispatch = useDispatch()

  const list = useSelector(positionsWithPoolsData)
  const isLoading = useSelector(isLoadingPositionsList)
  const walletStatus = useSelector(status)
  const history = useHistory()

  const [value, setValue] = useState<string>('')

  const handleSearchValue = (value: string) => {
    setValue(value)
  }

  return (
    <PositionsList
      searchValue={value}
      searchSetValue={handleSearchValue}
      onAddPositionClick={() => {
        history.push('/newPosition')
      }}
      data={list
        .map(position => {
          const lowerPrice = calcYPerXPrice(
            calculatePriceSqrt(position.lowerTickIndex).v,
            position.tokenX.decimals,
            position.tokenY.decimals
          )
          const upperPrice = calcYPerXPrice(
            calculatePriceSqrt(position.upperTickIndex).v,
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
                calculatePriceSqrt(position.upperTickIndex).v,
                position.poolData.sqrtPrice.v,
                calculatePriceSqrt(position.lowerTickIndex).v
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
                calculatePriceSqrt(position.upperTickIndex).v,
                position.poolData.sqrtPrice.v,
                calculatePriceSqrt(position.lowerTickIndex).v
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
        })
        .filter(item => {
          return (
            item.tokenXName.toLowerCase().includes(value) ||
            item.tokenYName.toLowerCase().includes(value)
          )
        })}
      loading={isLoading}
      showNoConnected={walletStatus !== Status.Initialized}
      itemsPerPage={5}
      noConnectedBlockerProps={{
        onConnect: type => {
          dispatch(actions.connect(type))
        },
        onDisconnect: () => {
          dispatch(actions.disconnect())
        },
        descCustomText: 'No liquidity positions to show.'
      }}
      searchPosition={''}
    />
  )
}

export default WrappedPositionsList
