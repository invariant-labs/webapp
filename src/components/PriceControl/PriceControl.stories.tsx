import React from 'react'
import { storiesOf } from '@storybook/react'
import PriceControl from './PriceControl'
import { useState } from '@storybook/client-api'

storiesOf('stats/priceControl', module).add('control', () => {
  const [val, setVal] = useState(100)
  return (
    <PriceControl
      label='Min price'
      tokenFromSymbol='BAT'
      tokenToSymbol='ETH'
      currentValue={val}
      decreaseValue={() => { setVal(val - 1) }}
      increaseValue={() => { setVal(val + 1) }}
      style={{ width: 300, maxHeight: 300 }}
    />
  )
})
