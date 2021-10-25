import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'
storiesOf('liquidityPosition/items', module)
  .add('itemActive', () => {
    return (
      <LiquidityItem
        data={{
          active: true,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
      />
    )
  })
  .add('itemClose', () => {
    return (
      <LiquidityItem
        data={{
          active: false,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
      />
    )
  })
