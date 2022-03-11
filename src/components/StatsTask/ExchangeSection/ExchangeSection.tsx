import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import InputSection from '../InputSection/InputSection'
import DisplaySection from '../DisplaySection/DisplaySection'

interface CalculatorSectionInterface {
  setValue: (value: string) => void
  coin: string | null
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  decimalsLimit: number
  percentageChange?: number
  balanceValue?: string
  usdValue?: number
  onMaxClick: () => void
  onClick: () => void
  outputValue: number
}

const CalculatorSection: React.FC<CalculatorSectionInterface> = ({
  setValue,
  coin,
  currency,
  currencyIconSrc,
  value,
  placeholder,
  decimalsLimit,
  percentageChange,
  balanceValue,
  usdValue,
  onClick,
  onMaxClick,
  outputValue
}) => {
  const classes = useStyles()

  const [chosen, setChosen] = useState<string>('USD')
  return (
    <Grid className={classes.sectionMainContainer}>
      <Grid className={classes.sectionContainer}>
        <InputSection
          setValue={setValue}
          coin={coin}
          currencyIconSrc={currencyIconSrc}
          value={value}
          placeholder={placeholder}
          decimalsLimit={decimalsLimit}
          percentageChange={percentageChange}
          balanceValue={balanceValue}
          usdValue={usdValue}
          onMaxClick={onMaxClick}></InputSection>
      </Grid>
      <Grid container className={classes.container} direction='row'>
        <Typography className={classes.currencyButtons}>Calculator</Typography>
        <Grid container className={classes.calculatorCurrency} direction='row'>
          <Button
            onClick={() => {
              setChosen('USD')
            }}
            className={chosen === 'USD' ? classes.chosen : classes.button}>
            USD
          </Button>
          <Button
            className={chosen === 'ETH' ? classes.chosen : classes.button}
            onClick={() => {
              setChosen('ETH')
            }}>
            ETH
          </Button>
          <Button
            className={chosen === 'BTC' ? classes.chosen : classes.button}
            onClick={() => {
              setChosen('BTC')
            }}>
            BTC
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.displaySectionContainer}>
        <DisplaySection
          currency={currency}
          currencyIconSrc={currencyIconSrc}
          value={value}
          placeholder={placeholder}
          decimalsLimit={decimalsLimit}
          chosen={chosen}
          outputValue={outputValue}></DisplaySection>
      </Grid>
      <Grid container className={classes.bottomContainer}>
        <Button className={classes.activationButton} onClick={onClick}>
          Button
        </Button>
      </Grid>
    </Grid>
  )
}

export default CalculatorSection
