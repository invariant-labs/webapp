import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'
storiesOf('liquidityPosition/items', module)
  .add('itemActive', () => {
    return (
      <LiquidityItem
        active={true}
        nameToSwap={'BTC'}
        nameFromSwap={'SNY'}
        min={2149.6}
        max={149.6}
        fee={0.05}
      />
    )
  })
  .add('itemClose', () => {
    return (
      <LiquidityItem
        active={false}
        nameToSwap={'BTC'}
        nameFromSwap={'SNY'}
        min={2149.6}
        max={149.6}
        fee={0.05}
      />
    )
  })
