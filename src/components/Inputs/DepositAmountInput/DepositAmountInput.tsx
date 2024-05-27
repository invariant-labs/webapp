import { formatNumbers, FormatNumberThreshold, getScaleFromString, showPrefix } from '@consts/utils'
import { Button, Grid, Input, Tooltip, Typography } from '@material-ui/core'
import React, { useRef, CSSProperties } from 'react'
import loadingAnimation from '@static/gif/loading.gif'
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
  tokenPrice?: number
  balanceValue?: string
  disabled?: boolean
  priceLoading?: boolean
}

export const DepositAmountInput: React.FC<IProps> = ({
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
  tokenPrice,
  balanceValue,
  disabled = false,
  priceLoading = false
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

  const usdThresholds: FormatNumberThreshold[] = [
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

  const usdBalance = tokenPrice && balanceValue ? tokenPrice * +balanceValue : 0

  return (
    <Grid container className={classes.wrapper} style={style}>
      <div className={classes.root}>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          direction='row'
          wrap='nowrap'
          className={classes.inputContainer}>
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
            className={classes.input}
            classes={{ input: classes.innerInput }}
            inputRef={inputRef}
            type={'text'}
            value={value}
            disableUnderline={true}
            placeholder={placeholder}
            onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
            onBlur={onBlur}
            disabled={disabled}
          />
        </Grid>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          direction='row'
          wrap='nowrap'>
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
                          ? formatNumbers(thresholds)(balanceValue) +
                            showPrefix(Number(balanceValue))
                          : '0'
                      } ${currency}`
                    : '- -'}
                </Typography>
                <Button
                  className={
                    currency
                      ? classes.maxButton
                      : `${classes.maxButton} ${classes.maxButtonNotActive}`
                  }
                  onClick={onMaxClick}>
                  Max
                </Button>
              </>
            }
          </Grid>
          <Grid className={classes.percentages} container alignItems='center' wrap='nowrap'>
            {currency ? (
              priceLoading ? (
                <img src={loadingAnimation} className={classes.loading} />
              ) : tokenPrice ? (
                <Typography className={classes.caption2}>
                  ~${formatNumbers(usdThresholds)(usdBalance.toString()) + showPrefix(usdBalance)}
                </Typography>
              ) : (
                <Tooltip
                  title='Cannot fetch price of token'
                  placement='bottom'
                  classes={{
                    tooltip: classes.tooltip
                  }}>
                  <Typography className={classes.noData}>
                    <span className={classes.noDataIcon}>?</span>No data
                  </Typography>
                </Tooltip>
              )
            ) : null}
          </Grid>
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

export default DepositAmountInput
