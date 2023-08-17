import React from 'react'
import { storiesOf } from '@storybook/react'
import VolumeHeatmapSwitch from './VolumeHeatmapSwitch'

storiesOf('position/volumeHeatmapSwitch', module).add('default', () => {
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 400,
      }}>
      <VolumeHeatmapSwitch onSwitch={() => {}} initialValue={false} />
    </div>
  )
})