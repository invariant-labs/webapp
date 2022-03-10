import { Button, Grid, Typography } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import icons from '@static/icons'
import React, { useRef, useState } from 'react'
import useStyles from './style'

interface CalculatorInterface {
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  decimalsLimit: number
  selected?: string
  outputValue?: number
}

export const Calculator: React.FC<CalculatorInterface> = ({
  currency,
  currencyIconSrc,
  value,
  placeholder,
  outputValue,
  selected
}) => {
  const classes = useStyles()
  const selectedIcon = () => {
    switch (selected) {
      case 'USD': {
        return icons.USD
      }
      case 'ETH': {
        return icons.ETH
      }
      case 'BTC': {
        return icons.BTC
      }
      default: {
        return
      }
    }
  }
  return (
    <Grid className={classes.calculatorContainer} container direction='row'>
      <Grid className={classes.calculator} container>
        <Typography className={classes.heading3}>
          {value ? value : placeholder} {currency}
        </Typography>
        <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
      </Grid>
      <Grid container className={classes.greenPart}>
        <Typography className={classes.greenText}>
          {outputValue} {selected}
        </Typography>
        <img alt='' src={selectedIcon()} className={classes.outputIcon} />
      </Grid>
    </Grid>
  )
}

export default Calculator
