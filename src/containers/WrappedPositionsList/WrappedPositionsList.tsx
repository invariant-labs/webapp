import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isLoadingPositionsList, positionsWithPoolsData } from '@selectors/positions'
import { status } from '@selectors/solanaWallet'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { Status } from '@reducers/solanaWallet'
import { PositionsList } from '@components/PositionsList/PositionsList'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { getNCSelector } from '@web3/selector'

export const WrappedPositionsList: React.FC = () => {
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
              ),
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
              ),
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

          const valueX = tokenXLiq + tokenYLiq / currentPrice
          const valueY = tokenYLiq + tokenXLiq * currentPrice

          return {
            tokenXName: position.tokenX.symbol,
            tokenYName: position.tokenY.symbol,
            tokenXIcon: position.tokenX.logoURI,
            tokenYIcon: position.tokenY.logoURI,
            fee: +printBN(position.poolData.fee.v, DECIMAL - 2),
            min,
            max,
            tokenXLiq,
            tokenYLiq,
            valueX,
            valueY,
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            id: position.id.toString() + '_' + position.pool.toString(),
            isActive: currentPrice >= min && currentPrice <= max
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
        onConnect: async () => {
          const selector = await getNCSelector()
          selector?.openModal()
        },
        descCustomText: 'You have no positions.'
      }}
    />
  )
}

export default WrappedPositionsList
