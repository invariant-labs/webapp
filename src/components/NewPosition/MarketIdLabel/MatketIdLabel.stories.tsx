import React from 'react'
import { storiesOf } from '@storybook/react'
import MarketIdLabel from './MatketIdLabel'

storiesOf('position/MarketIdLabel', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 200
      }}>
      <MarketIdLabel marketId={'asd17823a98sd7a9sd9a8sc98x789c7a98d7as'} displayLength={10} />
    </div>
  )
})
