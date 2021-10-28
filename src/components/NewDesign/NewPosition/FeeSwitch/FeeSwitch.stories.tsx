import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSwitch from './FeeSwitch'

storiesOf('stats/rangeInput', module).add('default', () => {
  return (
    <div style={{
      backgroundColor: '#000000',
      paddingBlock: 20
    }}>
      <FeeSwitch
        setFeeValue={(val) => { console.log(val) }}
      />
    </div>
  )
})
