import React from 'react'
import { storiesOf } from '@storybook/react'
import SinglePositionPlot from './SinglePositionPlot'
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

storiesOf('singlePosition/rightComponent', module).add('plot', () => {
  return (
    <SinglePositionPlot
      data={data}
      leftRange={{
        x: calcPrice(100, true, 6, 6),
        index: 100
      }}
      rightRange={{
        x: calcPrice(200, true, 6, 6),
        index: 200
      }}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      currentPrice={300}
      tokenX={{
        name: 'BTC',
        decimal: 9
      }}
      tokenY={{
        name: 'SNY',
        decimal: 9
      }}
      ticksLoading={false}
      tickSpacing={4}
      min={2149.6}
      max={149.6}
      xToY
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
      reloadHandler={() => {}}
    />
  )
})
