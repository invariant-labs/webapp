import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSwitch from './FeeSwitch'

storiesOf('position/feeSwitch', module)
  .add('default', () => {
    return (
      <div
        style={{
          backgroundColor: '#202946',
          padding: 20,
          width: 400
        }}>
        <FeeSwitch
          onSelect={val => {
            console.log(val)
          }}
          feeTiers={[0.05, 0.3, 1]}
        />
      </div>
    )
  })
  .add('onlyPercents', () => {
    return (
      <div
        style={{
          backgroundColor: '#202946',
          padding: 20,
          width: 416
        }}>
        <FeeSwitch
          onSelect={val => {
            console.log(val)
          }}
          feeTiers={[0.02, 0.04, 0.1, 0.3, 1]}
          showOnlyPercents
        />
      </div>
    )
  })
