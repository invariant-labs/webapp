import { getScaleFromString } from '@consts/utils'
import { Button, Grid, Input, Typography } from '@material-ui/core'
import React, { useRef, CSSProperties } from 'react'
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
  percentageChange: number
  usdValue: number
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
  percentageChange = 4.15,
  usdValue = 205341.43
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

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
      <div className={classes.root}>
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

        <Grid
          className={classes.balance}
          container
          alignItems='center'
          wrap='nowrap'>
          {
            <>
              <Typography className={classes.caption2}>
                Balance: {currency ? `102 460.3445 ${currency}` : '- -'}
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
        <Grid
          className={classes.percentages}
          container
          // justifyContent='center'
          alignItems='center'
          wrap='nowrap'>
          {
            <>
              {currency ? (
                <>
                  <Typography className={classes.percentage}>{percentageChange}%</Typography>
                  <Typography className={classes.caption2}>~ ${usdValue}</Typography>
                </>
              ) : (
                <Typography className={classes.noData}>No data</Typography>
              )}
            </>
          }
        </Grid>

        <Input
          inputRef={inputRef}
          // className={classes.root}
          type={'text'}
          value={value}
          disableUnderline={true}
          placeholder={placeholder}
          onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
          onBlur={onBlur}
        />
      </div>
      {/*
      <Input
        inputRef={inputRef}
        className={classes.root}
        type={'text'}
        value={value}
        disableUnderline={true}
        placeholder={placeholder}
        onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
        startAdornment={<>
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
          <Grid
            className={classes.balance}
            container
            // justifyContent='center'
            alignItems='center'
            wrap='nowrap'
          >
            {
              <>
              <Typography className={classes.caption2}>Balance:  102 460.3445 SNY</Typography>
              <Button className={classes.maxButton} onClick={onMaxClick}>
                      Max
              </Button>
              </>
            }
          </Grid>
          </>
        }
        endAdornment={<>
          <Grid
            className={classes.percentages}
            container
            // justifyContent='center'
            alignItems='center'
            wrap='nowrap'
          >
            {
              <>
          <Typography className={classes.percentage}>- 4.14%</Typography>
          <Typography className={classes.caption2}>~ $205 341.4361</Typography>
              </>
            }
          </Grid>
          </>}
        onBlur={onBlur}
      /> */}
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
