import React from 'react'
import { storiesOf } from '@storybook/react'
import PriceRangePlot from './PriceRangePlot'
import { colors } from '@static/theme'

const ticksToData = () => {
  const ticks = [
    { index: 90, delta: 10 },
    { index: 110, delta: 30 },
    { index: 160, delta: 60 },
    { index: 170, delta: 20 },
    { index: 210, delta: -20 },
    { index: 220, delta: -10 },
    { index: 230, delta: -30 },
    { index: 260, delta: -20 },
    { index: 280, delta: -40 }
  ]
  const fields: Array<{ x: number; y: number }> = []

  let currentLiquidity = 10
  for (let i = 0; i < 10000; i += 1) {
    if (ticks.length > 0 && i > ticks[0].index) {
      currentLiquidity += ticks[0].delta
      ticks.shift()
    }

    fields.push({ x: i, y: currentLiquidity })
  }

  return fields
}

const data = ticksToData()

storiesOf('stats/priceRangePlot', module).add('ticks', () => (
  <PriceRangePlot
    data={data}
    leftRangeIndex={100}
    rightRangeIndex={200}
    currentIndex={140}
    onChangeRange={(left, right) => {
      console.log(left)
      console.log(right)
    }}
    style={{ width: 600, height: 300, backgroundColor: colors.navy.component }}
  />
))
