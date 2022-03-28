import React from 'react'
import { storiesOf } from '@storybook/react'
import ConcentrationSlider from './ConcentrationSlider'

storiesOf('position/concentrationSlider', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 600
      }}>
      <ConcentrationSlider
        values={[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096]}
        valueChangeHandler={val => {
          console.log(val)
        }}
        dragHandler={val => {
          console.log(val)
        }}
        valueIndex={3}
        unsafePercent={60}
      />
    </div>
  )
})
