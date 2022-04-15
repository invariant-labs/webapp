import React, { useRef, CSSProperties } from 'react'

import { formatNumbers, FormatNumberThreshold, getScaleFromString, showPrefix } from '@consts/utils'

import { Button, Grid, Input, Typography } from '@material-ui/core'

import useStyles from './style'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  onMaxClick: () => void
  style?: CSSProperties
  blocked?: boolean
  blockerInfo?: string
  decimalsLimit: number
  onBlur?: () => void
  percentageChange?: number
  usdValue?: number
  balanceValue?: string
}

export const Amount: React.FC<IProps> = ({
  currency,
  currencyIconSrc,
  value,
  setValue,
  placeholder,
  onMaxClick,
  style,
  blocked = false,
  blockerInfo,
  onBlur,
  decimalsLimit,
  percentageChange,
  usdValue,
  balanceValue
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

  const allowOnlyDigitsAndTrimUnnecessaryZeros = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      if (!balanceValue) {
        setValue('--')
      } else if (parseFloat(balanceValue) < parseFloat(parsed)) {
        setValue(balanceValue.toString())
      } else {
        setValue(parsed)
      }

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
                {currencyIconSrc ? (
                  <img alt='' src={currencyIconSrc} className={classes.currencyIcon} />
                ) : (
                  <div className={classes.currencyIconGradient} />
                )}
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
            onBlur={onBlur}
          />
        </div>
        <Grid
          className={classes.balance}
          container
          alignItems='center'
          wrap='nowrap'
          onClick={onMaxClick}>
          {
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
          }
        </Grid>
        <Grid className={classes.percentages} container alignItems='center' wrap='nowrap'>
          {
            <>
              {/*
                TODO: temporarily commented; uncomment when fetching prices will be done
               {currency && !usdValue ? (
                <Typography className={classes.noData}>
                  <div className={classes.noDataIcon}>?</div>No data
                </Typography>
              ) : (
                ''
              )} */}

              {currency && usdValue ? (
                <div className={classes.percentageContainer}>
                  <Typography className={classes.percentage}>{percentageChange}%</Typography>
                  <Typography className={classes.caption2}>~ ${usdValue}</Typography>
                </div>
              ) : (
                ''
              )}

              {!currency && !usdValue ? (
                <Typography className={classes.caption2}>-</Typography>
              ) : (
                ''
              )}
            </>
          }
        </Grid>
      </div>
      {blocked && (
        <>
          <Grid container className={classes.blocker} />
          <Grid
            container
            className={classes.blockedInfoWrapper}
            justifyContent='center'
            alignItems='center'>
            <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  )
}
export default Amount
