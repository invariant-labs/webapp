import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSwitch from './FeeSwitch'
import { useState } from '@storybook/addons'

storiesOf('position/feeSwitch', module)
  .add('default', () => {
    const [feeTierIndex, setFeeTierIndex] = useState<number>(0)
    return (
      <div
        style={{
          backgroundColor: '#202946',
          padding: 20,
          width: 400
        }}>
        <FeeSwitch
          onSelect={val => {
            setFeeTierIndex(val)
            console.log(val)
          }}
          feeTiers={[0.05, 0.3, 1]}
          currentValue={feeTierIndex}
        />
      </div>
    )
  })
  .add('onlyPercents', () => {
    const [feeTierIndex, setFeeTierIndex] = useState<number>(0)
    return (
      <div
        style={{
          backgroundColor: '#202946',
          padding: 20,
          width: 416
        }}>
        <FeeSwitch
          onSelect={val => {
            setFeeTierIndex(val)
            console.log(val)
          }}
          feeTiers={[0.02, 0.04, 0.1, 0.3, 1]}
          showOnlyPercents
          currentValue={feeTierIndex}
        />
      </div>
    )
  })
