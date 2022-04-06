import { Button, Grid, Input, Typography } from '@material-ui/core'
import React, { useRef } from 'react'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import useStyles from './style'
import { colors } from '@static/theme'

export interface IRangeInput {
  label: string
  tokenFromSymbol: string
  tokenToSymbol: string
  currentValue: string
  decreaseValue: () => void
  increaseValue: () => void
  setValue: (value: string) => void
  onBlur: () => void
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  percentDiff: number
  diffLabel: string
}

export const RangeInput: React.FC<IRangeInput> = ({
  label,
  tokenFromSymbol,
  tokenToSymbol,
  currentValue,
  decreaseValue,
  increaseValue,
  setValue,
  onBlur,
  style,
  className,
  disabled = false,
  percentDiff,
  diffLabel
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
    <Grid className={className} style={style} container direction='column' alignItems='center'>
      <Grid
        className={classes.data}
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.tokens}>
          {tokenToSymbol} per {tokenFromSymbol}
        </Typography>
      </Grid>
      <Grid
        className={classes.controls}
        container
        direction='row'
        alignItems='center'
        wrap='nowrap'>
        {disabled ? null : (
          <Button className={classes.button} onClick={decreaseValue} disableRipple>
            <Remove className={classes.buttonIcon} />
          </Button>
        )}
        <Input
          className={classes.value}
          value={currentValue}
          ref={inputRef}
          onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
          onBlur={onBlur}
          disableUnderline={true}
          disabled={disabled}
        />
        {disabled ? null : (
          <Button className={classes.button} onClick={increaseValue} disableRipple>
            <Add className={classes.buttonIcon} />
          </Button>
        )}
      </Grid>
      <Grid container direction='row' alignItems='center' wrap='nowrap'>
        <Typography className={classes.diffLabel}>{diffLabel}</Typography>
        <Typography
          className={classes.diff}
          style={{
            color: percentDiff >= 0 ? colors.invariant.green : colors.invariant.Error,
            backgroundColor: percentDiff >= 0 ? 'rgba(46, 224, 149,0.2)' : 'rgba(251,85,95,0.2)'
          }}>
          {percentDiff >= 0 ? '+' : ''}
          {(percentDiff ?? 0).toFixed(2)}%
        </Typography>
      </Grid>
    </Grid>
  )
}

export default RangeInput
