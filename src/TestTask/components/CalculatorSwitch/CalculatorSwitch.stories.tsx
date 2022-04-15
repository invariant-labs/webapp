import React from 'react'
import { storiesOf } from '@storybook/react'
import CalculatorSwitch from './CalculatorSwitch'

storiesOf('test/components/CalculatorSwitch', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        maxWidth: 117,
        margin: 'auto',
        borderRadius: 10
      }}>
      <CalculatorSwitch onSwitch={() => {}} initialValue={0} />
    </div>
  )
})
