import { colors } from '@static/theme'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenDetails from './TokenDetails'

storiesOf('Token/TokenDetails', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <TokenDetails
        currency={'SNY'}
        valueAmount={12.3451}
        valueBalanceBefore={460.3445}
        valueBalanceAfter={447.9994}
      />
    </div>
  ))
