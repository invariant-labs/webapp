import React from 'react'
import { storiesOf } from '@storybook/react'
import NewPosition from './NewPosition'

storiesOf('position/newPosition', module).add('new', () => (
  <NewPosition
    tokens={[]}
    data={[]}
    midPriceIndex={0}
    addLiquidityHandler={() => {}}
  />
))
