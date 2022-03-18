import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeSelector from './RangeSelector'
import { action } from '@storybook/addon-actions'
import { calcPrice } from '@consts/utils'
import { MAX_TICK, MIN_TICK } from '@invariant-labs/sdk'

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

storiesOf('position/rangeSelector', module)
  .add('setter', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
    />
  ))
  .add('blocked', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      blocked
      blockerInfo='Select tokens to set price range.'
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={4}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
    />
  ))
  .add('concentrated', () => (
    <RangeSelector
      data={data}
      midPrice={{
        x: calcPrice(140, true, 6, 6),
        index: 140
      }}
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      ticksLoading={false}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
      currentPairReversed={null}
      initialIsDiscreteValue={false}
      onDiscreteChange={() => {}}
      isConcentrated
    />
  ))
