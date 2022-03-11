import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import React, { CSSProperties } from 'react'
import useStyles from './style'

interface DisplaySectionInterface {
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  style?: CSSProperties
  decimalsLimit: number
  chosen?: string
  outputValue?: number
}

export const DisplaySection: React.FC<DisplaySectionInterface> = ({
  currency,
  currencyIconSrc,
  value,
  placeholder,
  style,
  outputValue,
  chosen
}) => {
  const classes = useStyles()
  const chosenIcon = () => {
    switch (chosen) {
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
    <Grid className={classes.displayContainer} container direction='row' style={style}>
      <Grid className={classes.displayCalculator} container>
        <Typography className={classes.displayChange}>
          {value ? value : placeholder} {currency}
        </Typography>
        <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
      </Grid>
      <Grid className={classes.displayAmount} container>
        <Typography className={classes.displayText}>
          {outputValue}  {chosen}
          <img alt='' src={chosenIcon()} className={classes.displayCurrencyIcon} />
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DisplaySection
