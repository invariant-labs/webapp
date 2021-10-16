import React from 'react'
import { storiesOf } from '@storybook/react'
import TicksPlot from './TicksPlot'
import { colors } from '@static/theme'

const fillData = () => {
  const tmp: Array<{ x: number; y: number }> = []
  for (let i = 0; i < 200000; i++) {
    tmp.push({ x: i / 10, y: i })
  }
  return tmp
}

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

const currentIndex = 200
const midPriceIndex = currentIndex
const data = ticksToData()
const sliced = data.slice(Math.max(0, midPriceIndex - 150), Math.min(data.length - 1, midPriceIndex + 150))

storiesOf('stats/ticksPlot', module).add('ticks', () => (
  <TicksPlot
    data={sliced}
    leftRangeIndex={100}
    rightRangeIndex={200}
    currentIndex={140}
    xStep={25}
    onChangeRange={(left, right) => {
      console.log(left)
      console.log(right)
    }}
    style={{ width: 500, height: 200, backgroundColor: colors.navy.component }}
  />
))
