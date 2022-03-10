import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenChart from './TokenChart'

storiesOf('token/TokenChart', module)
  .addDecorator(withKnobs)
  .add('Token Chart', () => {
    const percentChart = 0.1
    const volumeChart = 1.0

    const positions = [
      {
        id: 'current range',
        data: [
          { x: '1AM', y: 0 },
          { x: '7AM', y: 10 },
          { x: '1PM', y: 5 },
          { x: '7PM', y: 15 }
        ]
      }
    ]

    return (
      <TokenChart percentChart={percentChart} volumeChart={volumeChart} positions={positions} />
    )
  })
