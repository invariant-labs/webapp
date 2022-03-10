import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import TokenInput from './TokenInput'
import icons from '@static/icons'

storiesOf('tokenInput/currency', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TokenInput
      setValue={() => {}}
      placeholder={'12.3451'}
      currency={'SNY'}
      currencyIconSrc={icons.SNY}
      onMaxClick={() => {}}
      decimalsLimit={4}
      percentageChange={-4.14}
      usdValue={205341.4361}
      balanceValue={'460.3445'}
    />
  ))
