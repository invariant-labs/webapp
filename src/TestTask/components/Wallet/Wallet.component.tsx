import React from 'react'

import { Typography, Grid } from '@material-ui/core'

import Amount from '../Amount/Amount'
import CalculatorValue from '../CalculatorValue/CalculatorValue'
import CalculatorSwitch from '../CalculatorSwitch/CalculatorSwitch'

import { BN } from '@project-serum/anchor'
import { printBN } from '@consts/utils'

import icons from '@static/icons'
import classNames from 'classnames'
import useStyles from './style'
import AnimatedButton from '../AnimatedButton/AnimatedButton'

export interface IWallet {}

export const Wallet: React.FC<IWallet> = ({}) => {
  const classes = useStyles()

  const balance = printBN(new BN(100).mul(new BN(4603445)), 6)
  const [value, setValue] = React.useState<string>('')
  const [currencyType, setCurrencyType] = React.useState<string>('SNY')
  const [currentCurrency, setCurrentCurrency] = React.useState<number>(0)

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
    <Grid container className={classes.root}>
      <Grid container className={classes.rootContainer}>
        <Grid container className={classes.amountContainer}>
          <Typography variant='h2' className={classes.title}>
            Your wallet
          </Typography>
          {/* Values of usdValue AND percentageChange AND balanceValue are STATIC */}
          {/* No percentageChange info was found in DepositSelector and above - percentageChangeA and percentageChangB were undefined */}
          {/* No usdValue info was found in DepositSelector and above - usdValueA and usdValueB were undefined */}
          <Amount
            value={value}
            setValue={setValue}
            currency='SNY'
            onMaxClick={() => {}}
            decimalsLimit={6}
            currencyIconSrc={currencyType !== 'SNY' ? icons[currencyType] : undefined}
            percentageChange={-4.15}
            usdValue={205341.43}
            balanceValue={balance}
            placeholder='0.0'
          />
        </Grid>
        <Grid container className={classes.calculatorValueSwitch}>
          <Typography variant='h5' className={classes.subSubtitle}>
            Calculator
          </Typography>
          <CalculatorSwitch
            onSwitch={() => {}}
            initialValue={0}
            currentCurrency={currentCurrency}
            setCurrentCurrency={setCurrentCurrency}
          />
        </Grid>
        <Grid container className={classes.calculatorValueContainer}>
          <CalculatorValue
            currency={currencyType}
            value={value}
            currencyRate={toCurrency[currentCurrency].rate}
            toCurrency={toCurrency[currentCurrency].name}
            currencyIconSrc={undefined}
          />
        </Grid>

        <AnimatedButton
          onClick={() => {}}
          content={'Connect a wallet'}
          progress={'none'}
          className={classNames(classes.IDOButton, classes.buttonDisabled)}
        />
      </Grid>
    </Grid>
  )
}
export default Wallet
