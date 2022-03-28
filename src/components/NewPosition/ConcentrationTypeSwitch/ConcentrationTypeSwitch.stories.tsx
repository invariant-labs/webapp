import React from 'react'
import { storiesOf } from '@storybook/react'
import ConcentrationTypeSwitch from './ConcentrationTypeSwitch'

storiesOf('position/concentrationTypeSwitch', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 200
      }}>
      <ConcentrationTypeSwitch onSwitch={() => {}} initialValue={0} />
    </div>
  )
})
