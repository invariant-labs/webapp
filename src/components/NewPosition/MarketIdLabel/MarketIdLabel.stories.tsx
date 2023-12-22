import React from 'react'
import { storiesOf } from '@storybook/react'
import MarketIdLabel from './MarketIdLabel'

storiesOf('position/marketIdLabel', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 300
      }}>
      <MarketIdLabel
        marketId='as8d9asdjkl1239871aslkdjas0d978as123hjasjdh'
        displayLength={9}
        copyPoolAddressHandler={() => {}}
      />
    </div>
  )
})
