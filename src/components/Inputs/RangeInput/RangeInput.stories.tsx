import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeInput from './RangeInput'
import { useState } from '@storybook/client-api'

storiesOf('position/rangeInput', module).add('default', () => {
  const [val, setVal] = useState('100')
  return (
    <div style={{
      backgroundColor: '#202946',
      width: 400,
      paddingBlock: 20
    }}>
      <RangeInput
        label='Min price'
        tokenFromSymbol='BAT'
        tokenToSymbol='ETH'
        currentValue={val}
        decreaseValue={() => { setVal((+val - 0.01).toFixed(2).toString()) }}
        increaseValue={() => { setVal((+val + 0.01).toFixed(2).toString()) }}
        setValue={(value) => { setVal(value) }}
        onBlur={() => { setVal(((+val).toFixed(2)).toString()) }}
        style={{ width: 200, maxHeight: 300, margin: 'auto' }}
      />
    </div>
  )
})
