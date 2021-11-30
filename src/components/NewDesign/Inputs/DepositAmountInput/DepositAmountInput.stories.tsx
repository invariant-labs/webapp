import React from 'react'
import { storiesOf } from '@storybook/react'
import DepositAmountInput from './DepositAmountInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import icons from '@static/icons'

storiesOf('newInputs/amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <DepositAmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={null}
        onMaxClick={() => {}}
        decimalsLimit={6}
      />
    </div>
  ))
  .add('currency', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <DepositAmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={'SNY'}
        onMaxClick={() => {}}
        currencyIconSrc={icons.SNY}
        decimalsLimit={6}
      />
    </div>
  ))
  .add('long currency', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <DepositAmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={'AERGO'}
        onMaxClick={() => {}}
        currencyIconSrc={icons.SNY}
        decimalsLimit={6}
      />
    </div>
  ))
  .add('blocked', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px', width: 400 }}>
      <DepositAmountInput
        setValue={() => {}}
        placeholder={'0.0'}
        currency={null}
        onMaxClick={() => {}}
        blocked
        blockerInfo='Price outside range. Single-asset deposit only.'
        decimalsLimit={6}
      />
    </div>
  ))
