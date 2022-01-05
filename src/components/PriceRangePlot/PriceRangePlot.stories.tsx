/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import { storiesOf } from '@storybook/react'
import PriceRangePlot from './PriceRangePlot'
import { useState } from '@storybook/client-api'
import { action } from '@storybook/addon-actions'
import { calcPrice } from '@consts/utils'
import { MIN_TICK, MAX_TICK } from '@invariant-labs/sdk'

const data = [
  {
    x: calcPrice(MIN_TICK, true, 6, 6),
    y: 10,
    index: MIN_TICK
  },
  {
    x: calcPrice(MAX_TICK, true, 6, 6),
    y: 10,
    index: MAX_TICK
  }
]
storiesOf('position/priceRangePlot', module)
  .add('ticks', () => {
    const [leftRange, setLeftRange] = useState(-1000)
    const [rightRange, setRightRange] = useState(2000)
    const [plotMin, setPlotMin] = useState(0)
    const [plotMax, setPlotMax] = useState(calcPrice(150, true, 6, 6) * 3)

    const zoomMinus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin - diff / 4)
      setPlotMax(plotMax + diff / 4)
    }

    const zoomPlus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin + diff / 6)
      setPlotMax(plotMax - diff / 6)
    }

    return (
      <PriceRangePlot
        data={data}
        leftRange={{
          x: calcPrice(leftRange, true, 6, 6),
          index: leftRange
        }}
        rightRange={{
          x: calcPrice(rightRange, true, 6, 6),
          index: rightRange
        }}
        midPrice={{
          x: calcPrice(150, true, 6, 6),
          index: 150
        }}
        onChangeRange={(left, right) => {
          action(`range indexes: ${left} - ${right}`)()
          setLeftRange(left)
          setRightRange(right)
        }}
        style={{ width: 600, height: 300, backgroundColor: '#1C1B1E' }}
        plotMin={plotMin}
        plotMax={plotMax}
        zoomMinus={zoomMinus}
        zoomPlus={zoomPlus}
        xDecimal={6}
        yDecimal={6}
        tickSpacing={4}
        isXtoY={true}
      />
    )
  })
  .add('disabled', () => {
    const [plotMin, setPlotMin] = useState(0)
    const [plotMax, setPlotMax] = useState(calcPrice(150, true, 6, 6) * 3)

    const zoomMinus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin - diff / 4)
      setPlotMax(plotMax + diff / 4)
    }

    const zoomPlus = () => {
      const diff = plotMax - plotMin
      setPlotMin(plotMin + diff / 6)
      setPlotMax(plotMax - diff / 6)
    }

    return (
      <PriceRangePlot
        data={data}
        leftRange={{
          x: calcPrice(-1000, true, 6, 6),
          index: -1000
        }}
        rightRange={{
          x: calcPrice(2000, true, 6, 6),
          index: 2000
        }}
        midPrice={{
          x: calcPrice(150, true, 6, 6),
          index: 150
        }}
        style={{ width: 600, height: 300, backgroundColor: '#1C1B1E' }}
        disabled
        plotMin={plotMin}
        plotMax={plotMax}
        zoomMinus={zoomMinus}
        zoomPlus={zoomPlus}
        xDecimal={6}
        yDecimal={6}
        tickSpacing={4}
        isXtoY={true}
      />
    )
  })
