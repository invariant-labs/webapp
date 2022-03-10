import { colors } from '@static/theme'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenInfo from './TokenInfo'

storiesOf('token/TokenInfo', module)
  .addDecorator(withKnobs)
  .add('TokenInfo', () => (
    <TokenInfo
      percentChart={0.1}
      volumeChart={1}
      positions={[
        {
          id: 'current range',
          data: [
            { x: '1AM', y: 0 },
            { x: '7AM', y: 10 },
            { x: '1PM', y: 5 },
            { x: '7PM', y: 15 }
          ]
        }
      ]}
      currency={'SNY'}
      valueAmount={12.3451}
      valueBalanceBefore={460.3445}
      valueBalanceAfter={447.9994}></TokenInfo>
  ))
