import React, { CSSProperties, useRef } from 'react'
import useStyles from './style'
import { Input } from '@mui/material'
import { Button } from '@common/Button/Button'

interface IProps {
  setValue: (value: string) => void
  value?: string
  error?: string | null
  className?: string
  decimal: number
  placeholder?: string
  style?: CSSProperties
  globalPrice?: number
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  formatterFunction: (value: string) => string
}

export const SimpleInput: React.FC<IProps> = ({
  value,
  setValue,
  error,
  className,
  decimal,
  placeholder,
  style,
  globalPrice,
  onBlur,
  formatterFunction
}) => {
  const { classes, cx } = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = e => {
    const inputValue = e.target.value.replace(/,/g, '.')
    const onlyNumbersRegex = /^\d*\.?\d*$/
    const test = `^\\d*\\.?\\d{0,${decimal}}$`
    const regex = new RegExp(test, 'g')
    if (inputValue === '' || regex.test(inputValue)) {
      const startValue = inputValue
      const caretPosition = e.target.selectionStart

      let parsed = inputValue
      const zerosRegex = /^0+\d*\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+(?!$)/, '')
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
    } else if (!onlyNumbersRegex.test(inputValue)) {
      return
    } else if (!regex.test(inputValue)) {
      setValue(inputValue.slice(0, inputValue.length - 1))
    }
  }
  return (
    <Input
      inputRef={inputRef}
      error={!!error}
      className={cx(classes.amountInput, className)}
      classes={{ input: classes.input }}
      style={style}
      value={value}
      disableUnderline={true}
      placeholder={placeholder}
      onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
      onBlur={onBlur}
      inputProps={{
        inputMode: 'decimal'
      }}
      endAdornment={
        globalPrice ? (
          <Button
            scheme='green'
            height={40}
            onClick={() => {
              setValue(formatterFunction(globalPrice.toString()))
            }}>
            <p className={classes.suggestedPriceText}>Suggested price</p>
          </Button>
        ) : null
      }
    />
  )
}
export default SimpleInput
