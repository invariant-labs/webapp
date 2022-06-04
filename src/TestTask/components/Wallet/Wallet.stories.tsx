import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wallet from './Wallet'

import { printBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'

storiesOf('test/components/Wallet', module).add('default', () => {
  const balance = printBN(new BN(100).mul(new BN(4603445)), 6)
  const [value, setValue] = React.useState<string>('')
  const [currencyType, setCurrencyType] = React.useState<string>('SNY')
  const [currentCurrency, setCurrentCurrency] = React.useState<number>(0)
  const changeCurrencyType = (currentCurrencyType: string) => {
    if (currentCurrencyType === 'SNY') {
      setCurrencyType('AERGO')
    } else {
      setCurrencyType('SNY')
    }
  }
  const toCurrency = [
    {
      name: 'USD',
      rate: 0.448797
    },

    {
      name: 'ETH',
      rate: 0.003
    },

    {
      name: 'BTC',
      rate: 0.00001119
    }
  ]

  return (
    <div style={{ maxWidth: 464, width: '100%', minWidth: 386 }}>
      <Wallet
        percentageChange={-4.15}
        balance={'123'}
        value={value}
        setValue={setValue}
        currencyType={currencyType}
        currentCurrency={currentCurrency}
        setCurrentCurrency={setCurrentCurrency}
        toCurrency={toCurrency}
        changeCurrencyType={changeCurrencyType}
      />
    </div>
  )
})
