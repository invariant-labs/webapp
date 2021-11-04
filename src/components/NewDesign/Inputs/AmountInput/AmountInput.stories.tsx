import React from 'react'
import { storiesOf } from '@storybook/react'
import AmountInput from './AmountInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import icons from '@static/icons'

storiesOf('newInputs/amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <AmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={null}
        onMaxClick={() => {}}
      />
    </div>
  ))
  .add('currency', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <AmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={'SNY'}
        onMaxClick={() => {}}
        currencyIconSrc={icons.SNY}
      />
    </div>
  ))
