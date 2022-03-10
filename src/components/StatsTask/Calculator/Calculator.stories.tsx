import icons from '@static/icons'
import { colors } from '@static/theme'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Calculator from './Calculator'

storiesOf('calculator/currency', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Calculator
      currency={'SNY'}
      currencyIconSrc={icons.SNY}
      value={'12.3451'}
      decimalsLimit={4}
      outputValue={12.3451}
    />
  ))
