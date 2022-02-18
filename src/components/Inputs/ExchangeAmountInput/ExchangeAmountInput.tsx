import { Input, Box, Typography, Grid } from '@material-ui/core'
import React, { CSSProperties, useRef } from 'react'
import classNames from 'classnames'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import Select from '@components/Inputs/Select/Select'
import useStyles from './style'
import { SwapToken } from '@components/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { formatNumbers, FormatNumberThreshold, showPrefix } from '@consts/utils'

interface IProps {
  setValue?: (value: string) => void
  value?: string
  error?: string | null
  className?: string
  decimal?: number
  placeholder?: string
  style?: CSSProperties
  onMaxClick?: () => void
  current?: SwapToken | null
  tokens?: Array<{ symbol: string; name: string; logoURI: string; balance: BN; decimals: number }>
  onSelect?: (name: string) => void
  disabled?: boolean
  balance?: string | undefined
}

export const AmountInput: React.FC<IProps> = ({
  value,
  setValue = () => {},
  error,
  className,
  decimal = 0,
  placeholder,
  style,
  onMaxClick = () => {},
  current = null,
  tokens = [],
  onSelect = () => {},
  disabled = false,
  balance
}) => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)

  const thresholds: FormatNumberThreshold[] = [
    {
      value: 10,
      decimals: decimal || 0
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
    const onlyNumbersRegex = /^\d*\.?\d*$/
    const trimDecimal = `^\\d*\\.?\\d{0,${decimal || 0}}$`
    const regex = new RegExp(trimDecimal, 'g')
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value

      const dotRegex = /^\.\d*$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      const diff = startValue.length - parsed.length

      setValue?.(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!onlyNumbersRegex.test(e.target.value)) {
      setValue?.('')
    } else if (!regex.test(e.target.value)) {
      setValue?.(e.target.value.slice(0, e.target.value.length - 1))
    }
  }

  const tokenIcon = !current ? null : current.symbol ?? current.symbol

  return (
    <>
      <Grid container alignItems='center' wrap='nowrap' className={classes.exchangeContainer}>
        <Select
          centered={true}
          tokens={tokens || []}
          onSelect={onSelect}
          current={current || null}
          className={classes.select}
        />
        <Input
          inputRef={inputRef}
          error={!!error}
          className={classNames(classes.amountInput, className)}
          classes={{ input: classes.input }}
          style={style}
          type={'text'}
          value={value}
          disableUnderline={true}
          placeholder={placeholder}
          onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
        />
      </Grid>
      <Box className={classes.container}>
        <Grid className={classes.BalanceContainer}>
          <Typography className={classes.BalanceTypography}>
            Balance: {balance ? formatNumbers(thresholds)(balance.toString()) : 0}
            {showPrefix(Number(balance))} {tokenIcon}
          </Typography>
          <OutlinedButton
            name='Max'
            color='primary'
            onClick={onMaxClick}
            className={classes.maxButton}
            labelClassName={classes.label}
            disabled={disabled && isNaN(Number(balance)) ? disabled : isNaN(Number(balance))}
          />
        </Grid>
        <Typography className={classes.noData}>
          <div className={classes.noDataIcon}>?</div>No data
        </Typography>
      </Box>
    </>
  )
}
export default AmountInput
