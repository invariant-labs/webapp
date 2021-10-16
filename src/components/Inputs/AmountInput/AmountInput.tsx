import { Divider, Input, InputAdornment, Typography } from '@material-ui/core'
import React, { CSSProperties, useRef } from 'react'
import classNames from 'classnames'
import icons from '@static/icons'
import useStyles from './style'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  value?: string
  error?: string | null
  className?: string
  placeholder?: string
  style?: CSSProperties
}

export const AmountInput: React.FC<IProps> = ({
  currency,
  value,
  setValue,
  error,
  className,
  placeholder,
  style
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const currencyAdornment = (
    <InputAdornment
      position='end'
      className={classes.currency}
    >
      <Divider orientation='vertical' className={classes.divider} />
      <img alt='' src={icons[currency ?? 'SNY']} className={classes.avatarIcon}/>
      <Typography className={classes.currencyText}>{currency}</Typography>
    </InputAdornment>
  )

  return (
    <Input
      inputRef={inputRef}
      error={!!error}
      className={classNames(classes.amountInput, className)}
      classes={{
        input: classes.input
      }}
      style={style}
      type={'text'}
      value={value}
      disableUnderline={true}
      placeholder={placeholder}
      endAdornment={!currency ? null : currencyAdornment}
      onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
    />
  )
}
export default AmountInput
