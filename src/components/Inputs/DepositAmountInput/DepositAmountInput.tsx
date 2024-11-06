import { Box, Button, Grid, Input, Tooltip, Typography } from '@mui/material'
import loadingAnimation from '@static/gif/loading.gif'
import { formatNumber, getScaleFromString } from '@utils/utils'
import React, { CSSProperties, useRef } from 'react'
import useStyles from './style'
import icons from '@static/icons'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  currencyIconSrc?: string
  currencyIsUnknown: boolean
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
  isBalanceLoading: boolean
  walletUninitialized: boolean
}

export const DepositAmountInput: React.FC<IProps> = ({
  currency,
  currencyIconSrc,
  currencyIsUnknown,
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
  priceLoading = false,
  isBalanceLoading,
  walletUninitialized
}) => {
  const { classes } = useStyles({ isSelected: !!currency && !walletUninitialized })

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

  const usdBalance = tokenPrice && value ? tokenPrice * +value : 0

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
                <Box className={classes.imageContainer}>
                  <img alt='currency icon' src={currencyIconSrc} className={classes.currencyIcon} />
                  {currencyIsUnknown && (
                    <img className={classes.warningIcon} src={icons.warningIcon} />
                  )}
                </Box>
                <Typography className={classes.currencySymbol}>{currency}</Typography>
              </>
            ) : (
              <Typography className={classes.noCurrencyText}>-</Typography>
            )}
          </Grid>
          <Input
            className={classes.input}
            classes={{ input: classes.innerInput }}
            inputRef={inputRef}
            value={value}
            disableUnderline={true}
            placeholder={placeholder}
            onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
            onBlur={onBlur}
            disabled={disabled}
            inputProps={{
              inputMode: 'decimal'
            }}
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
            onClick={walletUninitialized ? () => {} : onMaxClick}>
            <Typography className={classes.caption2}>
              Balance:{' '}
              {walletUninitialized ? (
                <>-</>
              ) : isBalanceLoading ? (
                <img src={loadingAnimation} className={classes.loadingBalance} alt='loading' />
              ) : (
                <>{formatNumber(balanceValue || 0)}</>
              )}{' '}
              {currency}
            </Typography>
            <Button
              className={
                currency && !walletUninitialized
                  ? classes.maxButton
                  : `${classes.maxButton} ${classes.maxButtonNotActive}`
              }>
              Max
            </Button>
          </Grid>
          <Grid className={classes.percentages} container alignItems='center' wrap='nowrap'>
            {currency ? (
              priceLoading ? (
                <img src={loadingAnimation} className={classes.loading} alt='loading' />
              ) : tokenPrice ? (
                <Tooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={Number.MAX_SAFE_INTEGER}
                  title='Estimated USD Value of the Entered Tokens'
                  placement='bottom'
                  classes={{
                    tooltip: classes.tooltip
                  }}>
                  <Typography className={classes.estimatedBalance}>
                    ~${formatNumber(usdBalance.toFixed(2))}
                  </Typography>
                </Tooltip>
              ) : (
                <Tooltip
                  enterTouchDelay={0}
                  leaveTouchDelay={Number.MAX_SAFE_INTEGER}
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
