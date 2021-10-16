import React from 'react'
import { storiesOf } from '@storybook/react'
import NewPosition from './NewPosition'

const fillData = (mul: number) => {
  const tmp: Array<{ x: number; y: number }> = []
  for (let i = 0; i < 200000; i++) {
    tmp.push({ x: i / 10, y: i ** mul })
  }
  return tmp
}

const pairs = [
  {
    token1Symbol: 'USDC',
    token2Symbol: 'SOL',
    ticks: fillData(1),
    midPriceIndex: 5000
  },
  {
    token1Symbol: 'SOL',
    token2Symbol: 'USDC',
    ticks: fillData(0.5),
    midPriceIndex: 15000
  },
  {
    token1Symbol: 'WSOL',
    token2Symbol: 'SOL',
    ticks: fillData(3),
    midPriceIndex: 2000
  }
]

storiesOf('stats/newPosition', module).add('new', () => (
  <NewPosition
    pairs={pairs}
    onAddPosition={(pair, amount1, amount2, left, right) => {
      console.log(pair)
      console.log(amount1)
      console.log(amount2)
      console.log(left)
      console.log(right)
    }}
    calcProportion={(_pair, _left, _right) => 2}
  />
))
