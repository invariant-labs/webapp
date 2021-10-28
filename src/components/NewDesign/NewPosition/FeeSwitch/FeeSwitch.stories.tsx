import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSwitch from './FeeSwitch'

storiesOf('position/feeSwitch', module).add('default', () => {
  return (
    <div style={{
      backgroundColor: '#000000',
      padding: 20,
      width: 400
    }}>
      <FeeSwitch
        setFeeValue={(val) => { console.log(val) }}
      />
    </div>
  )
})
