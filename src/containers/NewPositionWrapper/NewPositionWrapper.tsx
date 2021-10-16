import React from 'react'
import NewPosition from '@components/NewPosition/NewPosition'
import { SOL, USDC, USDT } from '@consts/static'
import { actions } from '@reducers/position'
import { useDispatch } from 'react-redux'

const fillData = (mul: number) => {
  const tmp: Array<{ x: number; y: number }> = []
  for (let i = 0; i < 200000; i++) {
    tmp.push({ x: i / 10, y: i ** mul })
  }
  return tmp
}

const pairs = [
  {
    token1Symbol: 'USDT',
    token2Symbol: 'USDC',
    decimalX: 6,
    decimalY: 6,
    ticks: fillData(1),
    midPriceIndex: 0
  },
  {
    token1Symbol: 'USDC',
    token2Symbol: 'SOL',
    decimalX: 6,
    decimalY: 9,
    ticks: fillData(0.5),
    midPriceIndex: 11000
  }
]

export const NewPositionWrapper = () => {
  const dispatch = useDispatch()

  return (
    <>
      <NewPosition
        pairs={pairs}
        onAddPosition={(pair, amount1, amount2, left, right) => {
          dispatch(actions.position({}))
        }}
        calcProportion={(_pair, _left, _right) => 0.00625}
      />
    </>
  )
}

export default NewPositionWrapper
