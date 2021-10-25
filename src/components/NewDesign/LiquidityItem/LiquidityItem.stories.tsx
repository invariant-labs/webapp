import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'

storiesOf('liquidityPosition/items', module)
  .add('itemActive', () => {
    return (
      <LiquidityItem
        active={true}
        name1={'BTC'}
        name2={'SNY'}
        min={2149.6}
        max={2149.6}
        fee={0.05}
      />
    )
  })
  .add('itemClose', () => {
    return (
      <LiquidityItem
        active={false}
        name1={'BTC'}
        name2={'SNY'}
        min={2149.6}
        max={2149.6}
        fee={0.05}
      />
    )
  })
