import React from 'react'
import { storiesOf } from '@storybook/react'
import NewPosition from './NewPosition'

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

storiesOf('position/newPosition', module).add('new', () => (
  <div style={{ backgroundColor: '#000000', padding: 20, width: 'fit-content' }}>
    <NewPosition
      tokens={[]}
      data={data}
      midPriceIndex={140}
      addLiquidityHandler={() => {}}
      onChangePositionTokens={() => {}}
    />
  </div>
))
