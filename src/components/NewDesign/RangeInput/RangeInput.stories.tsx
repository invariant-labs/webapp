import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeInput from './RangeInput'
import { useState } from '@storybook/client-api'

storiesOf('stats/rangeInput', module).add('default', () => {
  const [val, setVal] = useState(100)
  return (
    <div style={{
      backgroundColor: '#000000',
      width: 400,
      paddingBlock: 20
    }}>
      <RangeInput
        label='Min price'
        tokenFromSymbol='BAT'
        tokenToSymbol='ETH'
        currentValue={val}
        decreaseValue={() => { setVal(val - 1) }}
        increaseValue={() => { setVal(val + 1) }}
        style={{ width: 200, maxHeight: 300, margin: 'auto' }}
      />
    </div>
  )
})
