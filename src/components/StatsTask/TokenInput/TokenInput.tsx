import React, { useRef, useState } from 'react'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { Button, Grid, Input, Typography } from '@material-ui/core'
import useStyles from './style'
import { formatNumbers, FormatNumberThreshold, getScaleFromString, showPrefix } from '@consts/utils'

interface TokenInputInterface {
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
}

export const TokenInput: React.FC<TokenInputInterface> = ({
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
  onMaxClick
}) => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)
  const thresholds: FormatNumberThreshold[] = [
    {
      value: 10,
      decimals: decimalsLimit
    },
    {
      value: 100,
      decimals: 4
    },
    {
      value: 1000,
      decimals: 2
    },
    {
      value: 10000,
      decimals: 1
    },
    {
      value: 1000000,
      decimals: 2,
      divider: 1000
    },
    {
      value: 1000000000,
      decimals: 2,
      divider: 1000000
    },
    {
      value: Infinity,
      decimals: 2,
      divider: 1000000000
    }
  ]
  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = e => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const dotRegex = /^\.\d*$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      if (getScaleFromString(parsed) > decimalsLimit) {
        const parts = parsed.split('.')

        parsed = parts[0] + '.' + parts[1].slice(0, decimalsLimit)
      }

      const diff = startValue.length - parsed.length

      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!regex.test(e.target.value)) {
      setValue('')
    }
  }

  return (
    <Grid container className={classes.wrapper} style={style}>
      <Typography className={classes.volumeHeader}>Heading</Typography>
      <div className={classes.root}>
        <div className={classes.inputContainer}>
          <Grid
            className={classes.currency}
            container
            justifyContent='center'
            alignItems='center'
            wrap='nowrap'>
            {currency !== null ? (
              <>
                <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
                <Typography className={classes.currencySymbol}>{currency}</Typography>
              </>
            ) : (
              <Typography className={classes.noCurrencyText}>Select</Typography>
            )}
          </Grid>
          <Input
            inputRef={inputRef}
            type={'text'}
            value={value}
            disableUnderline={true}
            placeholder={placeholder}
            onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
          />
        </div>
        <Grid
          className={classes.balance}
          container
          alignItems='center'
          wrap='nowrap'
          onClick={onMaxClick}>
          <>
            <Typography className={classes.caption2}>
              Balance:{' '}
              {currency
                ? `${
                    balanceValue
                      ? formatNumbers(thresholds)(balanceValue.toString()) +
                        showPrefix(Number(balanceValue))
                      : '0'
                  } ${currency}`
                : '- -'}
              <Button
                className={
                  currency
                    ? classes.maxButton
                    : `${classes.maxButton} ${classes.maxButtonNotActive}`
                }
                onClick={onMaxClick}>
                Max
              </Button>
            </Typography>
          </>
        </Grid>
        <Grid className={classes.percentages} container alignItems='center' wrap='nowrap'>
          <>
            {currency && usdValue ? (
              <>
                <Typography className={classes.percentage}>{percentageChange}%</Typography>
                <Typography className={classes.caption2}>~ ${usdValue}</Typography>
              </>
            ) : (
              ''
            )}

            {!currency && !usdValue ? <Typography className={classes.caption2}>-</Typography> : ''}
          </>
        </Grid>
      </div>
    </Grid>
  )
}

export default TokenInput
