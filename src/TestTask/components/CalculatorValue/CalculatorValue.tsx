import React, { useRef, CSSProperties } from 'react'

import { formatNumbers, FormatNumberThreshold, getScaleFromString, showPrefix } from '@consts/utils'

import { Button, Grid, Input, Typography } from '@material-ui/core'

import useStyles from './style'

interface IProps {
  value?: string
  currency?: string
  currencyIconSrc?: string
  currencyRate: number
  toCurrency: string
}

export const CalculatorValue: React.FC<IProps> = ({
  value,
  currency,
  currencyIconSrc,
  toCurrency,
  currencyRate
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid container className={classes.container}>
        {/* INPUT VALUE */}
        <Typography variant='h3' className={`${classes.title} ${!value && classes.titleEmpty}`}>{`${
          value ? value : '0.0'
        } ${currency === 'AERGO' ? 'ARG' : currency}`}</Typography>

        {/* BIG ICON */}
        {currency !== null ? (
          currencyIconSrc ? (
            <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
          ) : (
            <div className={classes.currencyIconGradient} />
          )
        ) : null}

        {/* TRANSFERRED VALUE */}
        <Typography
          variant='h3'
          className={`${classes.subtitle} ${!value && classes.titleEmpty}`}>{`${
          value
            ? (parseFloat(value) * currencyRate).toString().split('.')[0] +
              '.' +
              (parseFloat(value) * currencyRate).toString().split('.')[1].slice(0, 4)
            : '0.0'
        } ${toCurrency}`}</Typography>

        {/* SMALL ICON */}
        {currency !== null ? (
          currencyIconSrc ? (
            <img alt='' src={currencyIconSrc} className={classes.currencyIconSmall} />
          ) : (
            <div className={classes.currencyIconGradientSmall} />
          )
        ) : null}
      </Grid>
    </Grid>
  )
}
export default CalculatorValue
