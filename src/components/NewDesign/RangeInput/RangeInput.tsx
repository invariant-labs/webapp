import { Button, Grid, Input, Typography } from '@material-ui/core'
import React from 'react'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import useStyles from './style'

export interface IRangeInput {
  label: string
  tokenFromSymbol: string
  tokenToSymbol: string
  currentValue: number
  decreaseValue: () => void
  increaseValue: () => void
  style?: React.CSSProperties
  className?: string
}

export const RangeInput: React.FC<IRangeInput> = ({
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
    <Grid className={className} style={style} container direction='column' alignItems='center'>
      <Grid className={classes.data} container direction='row' justifyContent='space-between' alignItems='center'>
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.tokens}>{tokenToSymbol} per {tokenFromSymbol}</Typography>
      </Grid>
      <Grid className={classes.controls} container direction='row' justifyContent='space-between' alignItems='center' wrap='nowrap'>
        <Button className={classes.button} onClick={decreaseValue} disableRipple>
          <Remove className={classes.buttonIcon} />
        </Button>
        <Input className={classes.value} value={currentValue} />
        <Button className={classes.button} onClick={increaseValue} disableRipple>
          <Add className={classes.buttonIcon} />
        </Button>
      </Grid>
    </Grid>
  )
}

export default RangeInput
