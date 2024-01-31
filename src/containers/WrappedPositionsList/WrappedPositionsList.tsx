import { PositionsList } from '@components/PositionsList/PositionsList'
import { calcYPerXPrice, printBN } from '@consts/utils'
import { calculatePriceSqrt } from '@invariant-labs/sdk'
import { getX, getY } from '@invariant-labs/sdk/lib/math'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { actions } from '@reducers/positions'
import { Status } from '@reducers/solanaWallet'
import {
  isLoadingPositionsList,
  lastPageSelector,
  positionsWithPoolsData
} from '@selectors/positions'
import { status } from '@selectors/solanaWallet'
import { openWalletSelectorModal } from '@web3/selector'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const WrappedPositionsList: React.FC = () => {
  const list = useSelector(positionsWithPoolsData)
  const isLoading = useSelector(isLoadingPositionsList)
  const lastPage = useSelector(lastPageSelector)
  const walletStatus = useSelector(status)
  const history = useHistory()
  const dispatch = useDispatch()

  const [value, setValue] = useState<string>('')

  const handleSearchValue = (value: string) => {
    setValue(value)
  }

  const setLastPage = (page: number) => {
    dispatch(actions.setLastPage(page))
  }

  useEffect(() => {
    if (list.length === 0) {
      setLastPage(1)
    }

    if (lastPage > Math.ceil(list.length / 5)) {
      setLastPage(lastPage - 1)
    }
  }, [list])

  return (
    <PositionsList
      initialPage={lastPage}
      setLastPage={setLastPage}
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
        onConnect: openWalletSelectorModal,
        descCustomText: 'You have no positions.'
      }}
    />
  )
}

export default WrappedPositionsList
