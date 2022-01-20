import React from 'react'
import { storiesOf } from '@storybook/react'
import SinglePositionPlot from './SinglePositionPlot'
import { NetworkType, tokens } from '@consts/static'
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
      tokenY={'SNY'}
      tokenX={'xUSD'}
      positionData={{
        tokenXName: 'BTC',
        tokenXIcon: tokens[NetworkType.DEVNET][0].logoURI,
        tokenYIcon: tokens[NetworkType.DEVNET][1].logoURI,
        tokenYName: 'SNY',
        min: 2149.6,
        max: 149.6,
        fee: 0.05,
        tokenXDecimal: 6,
        tokenYDecimal: 6
      }}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={4}
    />
  )
})
