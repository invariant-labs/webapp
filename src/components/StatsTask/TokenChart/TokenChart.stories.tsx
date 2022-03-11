import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenChart from './TokenChart'

storiesOf('Token/TokenChart', module)
  .addDecorator(withKnobs)
  .add('TokenChart', () => {
    const [TokenPercent] = React.useState<number>(0.1)
    const [TokenVolume] = React.useState<number>(1.0)

    const positions = [
      {
        id: 'current range',
        data: [
          { x: '1AM', y: 0 },
          { x: '7AM', y: 25 },
          { x: '1PM', y: 5 },
          { x: '7PM', y: 35 }
        ]
      }
    ]
    return (
      <TokenChart TokenPercent={TokenPercent} TokenVolume={TokenVolume} positions={positions} />
    )
  })
