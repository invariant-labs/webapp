import icons from '@static/icons'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ExchangeSection from './ExchangeSection'

storiesOf('exchange/exchangeSection', module)
  .addDecorator(withKnobs)
  .add('exchange', () => (
      <ExchangeSection
        setValue= {() => {}} 
        coin={'SYN'}
        currency={'SYN'}
        currencyIconSrc={icons.SNY}
        placeholder={'12,3451'}
        decimalsLimit={4}
        percentageChange={-4.15}
        balanceValue={'460,3445'}
        usdValue={205341.43}
        onMaxClick={() => {}}
        onClick={() =>{}}
        outputValue={12.3451}>
      </ExchangeSection>
  ))

  
