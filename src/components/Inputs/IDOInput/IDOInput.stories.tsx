import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import IDOInput from './IDOInput'

storiesOf('inputs/IDOInput', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <IDOInput
      currencyIcon='/src/static/svg/blueElipse.svg'
      onChange={() => {}}
      inputValue={0.000001}
      currencyShort='SNY'
      balanceCurrency='SNY'
      balanceValue='102 460.3445'
      changePercent={-4.14}
      bigNumberRightBottom='205 341.4361'
      onMaxClick={() => {}}
    />
  ))
