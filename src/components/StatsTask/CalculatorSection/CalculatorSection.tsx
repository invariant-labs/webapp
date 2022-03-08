import { Button, Grid, Typography } from '@material-ui/core'
import React, { CSSProperties } from 'react'
import Calculator from '../Calculator/Calculator'
import TokenInput from '../TokenInput/TokenInput'
import useStyles from './style'

interface CalculatorSectionInterface {
  setValue: (value: string) => void
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  style?: CSSProperties
  decimalsLimit: number
  percentageChange?: number
  balanceValue?: string
  usdValue?: number
  onMaxClick: () => void
  outputValue?: string
  outputIconSrc?: string
  selected: string
}

const CalculatorSection: React.FC<CalculatorSectionInterface> = ({
  setValue,
  currency,
  currencyIconSrc,
  value,
  placeholder,
  style,
  decimalsLimit,
  percentageChange,
  balanceValue,
  usdValue,
  onMaxClick,
  outputValue,
  outputIconSrc,
  selected
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.mainContainer}>
      <Grid className={classes.containterSection}>
        <TokenInput
          setValue={setValue}
          currency={currency}
          currencyIconSrc={currencyIconSrc}
          value={value}
          placeholder={placeholder}
          decimalsLimit={decimalsLimit}
          percentageChange={percentageChange}
          balanceValue={balanceValue}
          usdValue={usdValue}
          onMaxClick={onMaxClick}></TokenInput>
      </Grid>
      <Grid className={classes.topContainer} direction='row'>
        <Typography className={classes.calculatorName}>Calculator</Typography>
        <Grid className={classes.calculatorButtons} direction='row'>
          <Button className={selected === 'USD' ? classes.selected : classes.button}>USD</Button>
          <Button className={selected === 'ETH' ? classes.selected : classes.button}>ETH</Button>
          <Button className={selected === 'BTC' ? classes.selected : classes.button}>BTC</Button>
        </Grid>
      </Grid>
      <Calculator
        currency={currency}
        currencyIconSrc={currencyIconSrc}
        value={value}
        placeholder={placeholder}
        decimalsLimit={decimalsLimit}
        outputValue={outputValue}
        outputIconSrc={outputIconSrc}></Calculator>
      <Grid container>
        <Button className={classes.unstakeButton}>Button</Button>
      </Grid>
    </Grid>
  )
}

export default CalculatorSection
