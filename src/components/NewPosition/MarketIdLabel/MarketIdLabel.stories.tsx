import React from 'react'
import { storiesOf } from '@storybook/react'
import MarketIdLabel from './MarketIdLabel'

storiesOf('position/MarketIdLabel', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 200
      }}>
      <MarketIdLabel poolIndex={0} displayLength={10} />
    </div>
  )
})
