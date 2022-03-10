import { Button, Grid, Typography } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import Calculator from '../Calculator/Calculator'
import TokenInput from '../TokenInput/TokenInput'
import useStyles from './style'

interface CalculatorSectionInterface {
  setValue: (value: string) => void
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

  const [selected, setSelected] = useState<string>('USD')
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
          onMaxClick={onMaxClick}
        />
      </Grid>
      <Grid container className={classes.topContainer}>
        <Typography className={classes.calculatorName}>Calculator</Typography>
        <Grid container className={classes.calculatorButtons}>
          <Button
            onClick={() => {
              setSelected('USD')
            }}
            className={selected === 'USD' ? classes.selected : classes.button}>
            USD
          </Button>
          <Button
            className={selected === 'ETH' ? classes.selected : classes.button}
            onClick={() => {
              setSelected('ETH')
            }}>
            ETH
          </Button>
          <Button
            className={selected === 'BTC' ? classes.selected : classes.button}
            onClick={() => {
              setSelected('BTC')
            }}>
            BTC
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.calculator}>
        <Calculator
          currency={currency}
          currencyIconSrc={currencyIconSrc}
          value={value}
          placeholder={placeholder}
          decimalsLimit={decimalsLimit}
          outputValue={outputValue}
          selected={selected}
        />
      </Grid>

      <Grid container className={classes.buttonContainer}>
        <Button className={classes.unstakeButton} onClick={onClick}>
          Button
        </Button>
      </Grid>
    </Grid>
  )
}

export default CalculatorSection
