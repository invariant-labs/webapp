import React from 'react'
import { storiesOf } from '@storybook/react'
import PriceRangePlot from './PriceRangePlot'
import { useState } from '@storybook/client-api'
import { action } from '@storybook/addon-actions'

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

storiesOf('stats/priceRangePlot', module)
  .add('ticks', () => {
    const [leftRange, setLeftRange] = useState(100)
    const [rightRange, setRightRange] = useState(200)
    return (
      <PriceRangePlot
        data={data}
        leftRangeIndex={leftRange}
        rightRangeIndex={rightRange}
        currentIndex={140}
        onChangeRange={(left, right) => {
          action(`range indexes: ${left} - ${right}`)()
          setLeftRange(left)
          setRightRange(right)
        }}
        style={{ width: 600, height: 300, backgroundColor: '#1C1B1E' }}
      />
    )
  })
  .add('disabled', () => {
    const [leftRange, setLeftRange] = useState(100)
    const [rightRange, setRightRange] = useState(200)
    return (
      <PriceRangePlot
        data={data}
        leftRangeIndex={leftRange}
        rightRangeIndex={rightRange}
        currentIndex={140}
        onChangeRange={(left, right) => {
          console.log(left)
          console.log(right)
          setLeftRange(left)
          setRightRange(right)
        }}
        style={{ width: 600, height: 300, backgroundColor: '#1C1B1E' }}
        disabled
      />
    )
  })
