import React from 'react'
import { storiesOf } from '@storybook/react'
import SinglePositionPlot from './SinglePositionPlot'
import { tokens } from '@consts/static'

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

storiesOf('singlePosition/rightComponent', module)
  .add('plot', () => {
    return (
      <SinglePositionPlot
        data={data}
        leftRangeIndex={100}
        rightRangeIndex={200}
        midPriceIndex={150}
        style={{ width: 600, height: 212, backgroundColor: '#1C1B1E', borderRadius: 10 }}
        currentPrice={300}
        tokenY={'SNY'}
        tokenX={'xUSD'}
        onZoomOutOfData={() => {}}
        loadingTicks={false}
        positionData={{
          tokenXName: 'BTC',
          tokenXIcon: tokens[0].logoURI,
          tokenYIcon: tokens[1].logoURI,
          tokenYName: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
      />
    )
  })
