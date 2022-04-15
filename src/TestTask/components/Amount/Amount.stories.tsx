import React from 'react'
import { useState } from '@storybook/client-api'
import { storiesOf } from '@storybook/react'

import Amount from './Amount'

import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import icons from '@static/icons'

const changeCurrencyType = (
  currentCurrencyType: string,
  setCurrencyType: (curr: string) => void
) => {
  if (currentCurrencyType === 'SNY') {
    setCurrencyType('AERGO')
  } else {
    setCurrencyType('SNY')
  }
}

storiesOf('test/components/Amount', module)
  .addDecorator(withKnobs)
  .add('currency', () => {
    const [current, setCurrent] = useState<string>('SNY')
    return (
      <div
        style={{
          backgroundColor: colors.invariant.component,
          padding: '10px',
          width: 400,
          borderRadius: 20,
          margin: 'auto'
        }}>
        <Amount
          setValue={() => {}}
          placeholder={'0.0'}
          currency={current}
          onMaxClick={() => {}}
          currencyIconSrc={current === 'SNY' ? undefined : icons.SNY}
          decimalsLimit={6}
          percentageChange={4.15}
          usdValue={205341.43}
          balanceValue={'-200000000'}
          changeCurrencyType={() => changeCurrencyType(current, setCurrent)}
        />
      </div>
    )
  })
  .add('long currency', () => {
    const [current, setCurrent] = useState<string>('AERGO')
    return (
      <div
        style={{
          backgroundColor: colors.invariant.component,
          padding: '10px',
          width: 400,
          borderRadius: 20,
          margin: 'auto'
        }}>
        <Amount
          setValue={() => {}}
          placeholder={'0.0'}
          currency={current}
          onMaxClick={() => {}}
          currencyIconSrc={current === 'SNY' ? undefined : icons.SNY}
          decimalsLimit={6}
          percentageChange={4.15}
          usdValue={205341.43}
          changeCurrencyType={() => changeCurrencyType(current, setCurrent)}
        />
      </div>
    )
  })
