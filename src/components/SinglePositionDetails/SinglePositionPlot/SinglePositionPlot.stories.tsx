import React from 'react'
import { storiesOf } from '@storybook/react'
import { useState } from '@storybook/client-api'
import SinglePositionPlot from './SinglePositionPlot'

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
    const [plotMin, setPlotMin] = useState(0)
    const [plotMax, setPlotMax] = useState(data[140].x * 3)

    const zoomMinus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin - (diff / 4))
      setPlotMax(plotMax + (diff / 4))
    }

    const zoomPlus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin + (diff / 6))
      setPlotMax(plotMax - (diff / 6))
    }
    return (
      <SinglePositionPlot
        data={data}
        leftRangeIndex={100}
        rightRangeIndex={200}
        style={{ width: 600, height: 212, backgroundColor: '#1C1B1E', borderRadius: 10 }}
        disabled
        plotMin={plotMin}
        plotMax={plotMax}
        zoomMinus={zoomMinus}
        zoomPlus={zoomPlus}
        currentPrice={300}
        fromToken={'SNY'}
        toToken={'xUSD'}
      />
    )
  })
