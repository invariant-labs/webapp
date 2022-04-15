import React from 'react'
import { storiesOf } from '@storybook/react'

import Amount from './Amount'

import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import icons from '@static/icons'

storiesOf('test/components/Amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px', width: 400 }}>
      <Amount
        setValue={() => {}}
        placeholder={'0.0'}
        currency={null}
        onMaxClick={() => {}}
        decimalsLimit={6}
        percentageChange={4.15}
        usdValue={205341.43}
      />
    </div>
  ))
  .add('currency', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px', width: 400 }}>
      <Amount
        setValue={() => {}}
        placeholder={'0.0'}
        currency={'SNY'}
        onMaxClick={() => {}}
        currencyIconSrc={undefined}
        decimalsLimit={6}
        percentageChange={4.15}
        usdValue={205341.43}
        balanceValue={'-200000000'}
      />
    </div>
  ))
  .add('long currency', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px', width: 400 }}>
      <Amount
        setValue={() => {}}
        placeholder={'0.0'}
        currency={'AERGO'}
        onMaxClick={() => {}}
        currencyIconSrc={icons.SNY}
        decimalsLimit={6}
        percentageChange={4.15}
        usdValue={205341.43}
      />
    </div>
  ))
  .add('blocked', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px', width: 400 }}>
      <Amount
        setValue={() => {}}
        placeholder={'0.0'}
        currency={null}
        onMaxClick={() => {}}
        blocked
        blockerInfo='Price outside range. Single-asset deposit only.'
        decimalsLimit={6}
        percentageChange={4.15}
        usdValue={205341.43}
      />
    </div>
  ))
