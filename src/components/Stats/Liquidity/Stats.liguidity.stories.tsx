import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Liquidity from './Liquidity'

storiesOf('position/stats', module)
  .addDecorator(withKnobs)
  .add('liquidity', () => {
    const [liquidityVolume] = React.useState<number>(231258435934)
    const [liquidityPercent] = React.useState<number>(-4.14)

    const positions = [
      {
        id: 'current range',
        data: [
          { x: '1AM', y: 20 },
          { x: '4AM', y: 15 },
          { x: '7AM', y: 10 },
          { x: '10AM', y: 9 },
          { x: '1PM', y: 5 },
          { x: '4PM', y: 3 },
          { x: '7PM', y: 10 },
          { x: '10PM', y: 0 }
        ]
      }
    ]

    return (
      <Liquidity
        liquidityPercent={liquidityPercent}
        liquidityVolume={liquidityVolume}
        positions={positions}
      />
    )
  })
