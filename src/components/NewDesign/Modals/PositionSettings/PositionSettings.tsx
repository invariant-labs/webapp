import { Button, Grid, Input, Popover, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import useStyles from './style'

export interface IPositionSettings {
  open: boolean
  anchorEl: Element | null
  handleClose: () => void
  slippageTolerance: number
  onChangeSlippageTolerance: (tolerance: number) => void
  autoSetSlippageTolerance: () => void
}

export const PositionSettings: React.FC<IPositionSettings> = ({
  open,
  anchorEl,
  handleClose,
  slippageTolerance,
  onChangeSlippageTolerance,
  autoSetSlippageTolerance
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState(`${slippageTolerance}%`)
  const onChangeToleranceInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const regex = /^\d*\.?\d*\%?$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*\%?$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const dotRegex = /^\.\d*\%?$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      const percentRegex = /\%$/
      if (!percentRegex.test(parsed)) {
        parsed = `${parsed}%`
      }

      const diff = startValue.length - parsed.length

      setInputValue(parsed)
      onChangeSlippageTolerance(+(parsed.slice(0, parsed.length - 1)))
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!regex.test(e.target.value)) {
      setInputValue(`${slippageTolerance}%`)
    }
  }

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Grid className={classes.root}>
        <Typography className={classes.header}>Liquidity Position Settings</Typography>

        <Typography className={classes.label}>Slippage tolerance</Typography>
        <Input
          ref={inputRef}
          type={'text'}
          disableUnderline={true}
          className={classes.valueInput}
          value={inputValue}
          onChange={onChangeToleranceInput}
          endAdornment={(
            <Button
              className={classes.autoButton}
              onClick={autoSetSlippageTolerance}
              disableRipple
            >
              Auto
            </Button>
          )}
        />
      </Grid>
    </Popover>
  )
}

export default PositionSettings
