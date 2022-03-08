import { Button, Grid, Typography } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import React, { useRef, useState } from 'react'
import useStyles from './style'

interface CalculatorInterface {
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  style?: CSSProperties
  decimalsLimit: number
  outputValue?: string
  outputIconSrc?: string
}

export const Calculator: React.FC<CalculatorInterface> = ({
  currency,
  currencyIconSrc,
  value,
  placeholder,
  outputValue,
  outputIconSrc
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.calculatorContainer} container direction='row'>
      <Grid className={classes.calculator} container>
        <Typography className={classes.heading3}>
          {value} {currency}
        </Typography>
        <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
        <Typography className={classes.heading3}>{placeholder}</Typography>
      </Grid>
      <Grid container className={classes.greenPart}>
        <Typography className={classes.greenText}>{outputValue} USD</Typography>
        <img alt='' src={outputIconSrc} className={classes.currencyIcon} />
      </Grid>
    </Grid>
  )
}

export default Calculator
