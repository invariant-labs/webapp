import { Input } from '@material-ui/core'
import React, { CSSProperties, useRef } from 'react'
import classNames from 'classnames'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import Select from '@components/Inputs/Select/Select'
import useStyles from './style'
import { SwapToken } from '@components/Swap/Swap'

interface IProps {
  setValue: (value: string) => void
  value?: string
  error?: string | null
  className?: string
  decimal: number
  placeholder?: string
  style?: CSSProperties,
  onMaxClick: () => void,
  current: SwapToken | null
  tokens: Array<{ symbol: string, name: string, logoURI: string }>
  onSelect: (name: string) => void
}

export const AmountInput: React.FC<IProps> = ({
  value,
  setValue,
  error,
  className,
  decimal,
  placeholder,
  style,
  onMaxClick,
  current,
  tokens,
  onSelect
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onlyNumbersRegex = /^\d*\.?\d*$/
    const test = `^\\d*\\.?\\d{0,${decimal}}$`
    const regex = new RegExp(test, 'g')
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
    } else if (!onlyNumbersRegex.test(e.target.value)) {
      setValue('')
    } else if (!regex.test(e.target.value)) {
      setValue(e.target.value.slice(0, e.target.value.length - 1))
    }
  }

  return (
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
      endAdornment={(
        <OutlinedButton
          name='Max'
          color='primary'
          onClick={onMaxClick}
          className={classes.maxButton}
          labelClassName={classes.label}
        />
      )}
      startAdornment={(
        <Select
          centered={true}
          tokens={tokens}
          onSelect={onSelect}
          current={current}
          className={classes.select}
        />
      )}
    />
  )
}
export default AmountInput
