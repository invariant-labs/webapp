import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import TokenSection from './TokenSection'

storiesOf('Token/TokenInfo', module)
  .addDecorator(withKnobs)
  .add('TokenInfo', () => (
    <TokenSection
      valueAmount={12.3451}
      valueBalanceBefore={460.3445}
      valueBalanceAfter={447.9994}
      currency={'SNY'}
      TokenPercent={0.1}
      TokenVolume={1.0}
      positions={[
        {
          id: 'current range',
          data: [
            { x: '1AM', y: 0 },
            { x: '7AM', y: 25 },
            { x: '1PM', y: 10 },
            { x: '7PM', y: 35 }
          ]
        }
      ]}></TokenSection>
  ))
