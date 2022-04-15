import React from 'react'
import { storiesOf } from '@storybook/react'

import CalculatorValue from './CalculatorValue'

import { BN } from '@project-serum/anchor'
import { printBN } from '@consts/utils'

import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import icons from '@static/icons'

storiesOf('test/components/CalculatorValue', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div
      style={{
        backgroundColor: colors.invariant.component,
        padding: '10px',
        width: 400,
        borderRadius: 10,
        margin: 'auto'
      }}>
      <CalculatorValue
        value={printBN(new BN(100).mul(new BN(4603445)), 6)}
        currency='SNY'
        currencyIconSrc={undefined}
        currencyRate={0.448797}
        toCurrency={'USD'}
      />
    </div>
  ))
