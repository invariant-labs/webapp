import icons from '@static/icons'
import { colors } from '@static/theme'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import CalculatorSection from './CalculatorSection'

storiesOf('Calculator/CalculatorSection', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CalculatorSection
      setValue={() => {}}
      currency={'SNY'}
      currencyIconSrc={icons.SNY}
      placeholder={'12.3451'}
      decimalsLimit={4}
      percentageChange={-4.14}
      balanceValue={460.3445}
      usdValue={205341.4361}
      onMaxClick={() => {}}
      outputValue={12.3451}
      onClick={() => {}}></CalculatorSection>
  ))
