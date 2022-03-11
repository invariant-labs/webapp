import { formatNumbers, FormatNumberThreshold, getScaleFromString, showPrefix } from '@consts/utils'
import { Button, Grid, Input, Typography } from '@material-ui/core'
import React from 'react'
import { useRef, CSSProperties } from 'react'
import useStyles from './style'

interface InputSectionInterface {
  setValue: (value: string) => void
  coin: string | null
  currencyIconSrc?: string
  value?: string
  placeholder?: string
  onMaxClick: () => void
  style?: CSSProperties
  decimalsLimit: number
  percentageChange?: number
  usdValue?: number
  balanceValue?: string
}

export const InputSection: React.FC<InputSectionInterface> = ({
  coin,
  currencyIconSrc,
  value,
  setValue,
  placeholder,
  onMaxClick,
  style,
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
    <Grid container className={classes.inputBox} style={style}>
      <Typography className={classes.inputHeader}>Heading</Typography>
      <div className={classes.main}>
        <div className={classes.inputSectionContainer}>
          <Grid
            className={classes.coin}
            container
            justifyContent='center'
            alignItems='center'
            wrap='nowrap'>
            {coin !== null ? (
              <>
                <img alt='' src={currencyIconSrc} className={classes.coinIcon} />
                <Typography className={classes.coinSymbol}>{coin}</Typography>
              </>
            ) : (
              <Typography className={classes.noCoinText}>Select</Typography>
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
          className={classes.result}
          container
          alignItems='center'
          wrap='nowrap'
          onClick={onMaxClick}>
          <>
            <Typography className={classes.balance}>
              Balance:{' '}
              {coin
                ? `${
                    balanceValue
                      ? formatNumbers(thresholds)(balanceValue.toString()) +
                        showPrefix(Number(balanceValue))
                      : '0'
                  } ${coin}`
                : '- -'}
              <Button
                className={
                  coin
                    ? classes.inputButton
                    : `${classes.inputButton} ${classes.inputButtonNotActive}`
                }
                onClick={onMaxClick}>
                Max
              </Button>
            </Typography>
          </>
        </Grid>
        <Grid className={classes.percent} container alignItems='center' wrap='nowrap'>
          <>
            {coin && usdValue ? (
              <>
                <Typography className={classes.percentage}>{percentageChange}%</Typography>
                <Typography className={classes.balance}>~ ${usdValue}</Typography>
              </>
            ) : (
              ''
            )}

            {!coin && !usdValue ? <Typography className={classes.balance}>-</Typography> : ''}
          </>
        </Grid>
      </div>
    </Grid>
  )
}

export default InputSection
