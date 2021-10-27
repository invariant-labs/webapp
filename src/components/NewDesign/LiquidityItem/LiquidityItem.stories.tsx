import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'
storiesOf('liquidityPosition/items', module)
  .add('itemActive', () => {
    return (
      <LiquidityItem
        data={{
          active: true,
          nameToSwap: 'BTC',
          nameFromSwap: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        actionMin={() => console.log('clicked min button')}
        actionMax={() => console.log('clicked max button')}
      />
    )
  })
  .add('itemClose', () => {
    return (
      <LiquidityItem
        data={{
          active: false,
          nameToSwap: 'BTC',
          nameFromSwap: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        actionMin={() => console.log('clicked min button')}
        actionMax={() => console.log('clicked max button')}
      />
    )
  })
