import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeSelector from './RangeSelector'
import { action } from '@storybook/addon-actions'
import { PlotTickData } from '@reducers/positions'

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
  const fields: PlotTickData[] = []

  let currentLiquidity = 10
  for (let i = 0; i < 10000; i += 1) {
    if (ticks.length > 0 && i > ticks[0].index) {
      currentLiquidity += ticks[0].delta
      ticks.shift()
    }

    fields.push({ x: i, y: currentLiquidity, index: i })
  }

  return fields
}

const data = ticksToData()

storiesOf('position/rangeSelector', module)
  .add('setter', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: 140,
        index: 140
      }}
      tokenFromSymbol='BAT'
      tokenToSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      onZoomOut={() => {}}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
    />
  ))
  .add('blocked', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: 140,
        index: 140
      }}
      tokenFromSymbol='BAT'
      tokenToSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      blocked
      blockerInfo='Select tokens to set price range.'
      onZoomOut={() => {}}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
    />
  ))
