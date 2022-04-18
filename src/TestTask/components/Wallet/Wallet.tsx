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
import { string } from 'yup'

export interface IWallet {
  balance: string
  value: string
  setValue: (value: string) => void
  currencyType: string
  currentCurrency: number
  setCurrentCurrency: (currentCurrencyType: number) => void
  toCurrency: { name: string; rate: number }[]
  changeCurrencyType: (currentCurrencyType: string) => void
  percentageChange: number
  balanceUSD: string
}

export const Wallet: React.FC<IWallet> = ({
  balance,
  value,
  setValue,
  currencyType,
  currentCurrency,
  setCurrentCurrency,
  toCurrency,
  changeCurrencyType,
  percentageChange,
  balanceUSD
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container className={classes.rootContainer}>
        <Grid container className={classes.amountContainer}>
          <Typography variant='h2' className={classes.title}>
            Click on SNY
          </Typography>

          <Amount
            value={value}
            setValue={setValue}
            currency={currencyType}
            onMaxClick={() => {}}
            decimalsLimit={6}
            currencyIconSrc={currencyType === 'SNY' ? undefined : icons['SNY']}
            percentageChange={percentageChange}
            usdValue={parseFloat(balanceUSD)}
            balanceValue={balance}
            placeholder='0.0'
            changeCurrencyType={changeCurrencyType}
          />
        </Grid>
        <Grid container className={classes.calculatorValueSwitch}>
          <Typography variant='h5' className={classes.subSubtitle}>
            Calculator
          </Typography>
          <CalculatorSwitch
            onSwitch={() => {}}
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
            currencyIconSrc={currencyType === 'SNY' ? undefined : icons['SNY']}
          />
        </Grid>

        <AnimatedButton
          onClick={() => {}}
          content={'Happy Button'}
          progress={'none'}
          className={classNames(classes.IDOButton, classes.buttonDisabled)}
        />
      </Grid>
    </Grid>
  )
}
export default Wallet
