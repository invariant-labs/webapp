import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import classNames from 'classnames'
import useStyles from './style'

export interface IPriceControl {
  label: string
  tokenFromSymbol: string
  tokenToSymbol: string
  currentValue: number
  decreaseValue: () => void
  increaseValue: () => void
  style?: React.CSSProperties
  className?: string
}

export const PriceControl: React.FC<IPriceControl> = ({
  label,
  tokenFromSymbol,
  tokenToSymbol,
  currentValue,
  decreaseValue,
  increaseValue,
  style,
  className
}) => {
  const classes = useStyles()

  return (
    <Grid className={classNames(classes.wrapper, className)} style={style} container direction='column' alignItems='center'>
      <Typography className={classes.label}>{label}</Typography>
      <Grid className={classes.controls} container direction='row' justifyContent='space-between' alignItems='center'>
        <Button className={classes.button} onClick={decreaseValue} disableRipple>-</Button>
        <Typography className={classes.value}>{currentValue}</Typography>
        <Button className={classes.button} onClick={increaseValue} disableRipple>+</Button>
      </Grid>
      <Typography className={classes.label}>{tokenToSymbol} per {tokenFromSymbol}</Typography>
    </Grid>
  )
}

export default PriceControl
