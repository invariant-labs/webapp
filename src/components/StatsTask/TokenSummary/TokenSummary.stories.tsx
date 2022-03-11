import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenSummary from './TokenSummary'

storiesOf('Token/TokenSummary', module)
  .addDecorator(withKnobs)
  .add('Token', () => (
    <TokenSummary
      valueAmount={12.3451}
      valueBalanceBefore={460.3445}
      valueBalanceAfter={447.9994}
      currency={'SNY'}></TokenSummary>
  ))
