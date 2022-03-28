import React from 'react'
import { storiesOf } from '@storybook/react'
import VolumeBar from './volumeBar'

storiesOf('stats/volumeBar', module).add('volumeBar', () => {
  return (
    <VolumeBar
      percentVolume={1.14}
      volume={231258435934}
      tvlVolume={231258435934}
      percentTvl={-1.14}
      feesVolume={231258435934}
      percentFees={-1.14}
    />
  )
})
