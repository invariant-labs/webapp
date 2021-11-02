import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeSetter from './RangeSetter'

const fillData = () => {
  const tmp: Array<{ x: number; y: number }> = []
  for (let i = 0; i < 200000; i++) {
    tmp.push({ x: i / 10, y: i })
  }
  return tmp
}

storiesOf('stats/rangeSetter', module).add('setter', () => (
  <RangeSetter
    data={fillData()}
    midPriceIndex={5000}
    tokenFromSymbol='BAT'
    tokenToSymbol='ETH'
    onChangeRange={(left, right) => {
      console.log(left)
      console.log(right)
    }}
    isSol={false}
  />
))
