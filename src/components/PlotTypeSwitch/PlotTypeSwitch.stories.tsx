import React from 'react'
import { storiesOf } from '@storybook/react'
import PlotTypeSwitch from './PlotTypeSwitch'

storiesOf('position/plotTypeSwitch', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 400
      }}>
      <PlotTypeSwitch onSwitch={() => {}} />
    </div>
  )
})
