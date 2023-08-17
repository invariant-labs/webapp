import React from 'react'
import { storiesOf } from '@storybook/react'
import { VolumeHeatmapSwitch } from '@components/VolumeHeatmapSwitch/VolumeHeatmapSwitch'

storiesOf('position/volumeHeatmapSwitch', module).add('volumeHeatMapSwitch', () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <div
      style={{
        backgroundColor: '#202946',
        padding: 20,
        width: 400
      }}>
      <VolumeHeatmapSwitch
        checked={checked}
        handleChange={() => setChecked(prevState => !prevState)}
      />
    </div>
  )
})
