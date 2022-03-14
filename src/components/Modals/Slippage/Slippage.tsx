import React from 'react'
import { Typography, Box, Grid, Button, Popover, Input } from '@material-ui/core'
import useStyles from './style'

interface Props {
  open: boolean
  setSlippage: (slippage: string) => void
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  defaultSlippage: string
  infoText?: string
  headerText?: string
}

const Slippage: React.FC<Props> = ({
  open,
  setSlippage,
  handleClose,
  anchorEl,
  defaultSlippage,
  infoText,
  headerText
}) => {
  const classes = useStyles()
  const [slippTolerance, setSlippTolerance] = React.useState<string>('1')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
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

      setSlippTolerance(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!regex.test(e.target.value)) {
      setSlippTolerance('')
    }
  }

  const checkSlippage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    if (Number(e.target.value) > 50) {
      setSlippTolerance('50.00')
    } else if (Number(e.target.value) < 0 || isNaN(Number(e.target.value))) {
      setSlippTolerance('00.00')
    } else {
      const onlyTwoDigits = '^\\d*\\.?\\d{0,2}$'
      const regex = new RegExp(onlyTwoDigits, 'g')
      if (regex.test(e.target.value)) {
        setSlippTolerance(e.target.value)
      } else {
        setSlippTolerance(Number(e.target.value).toFixed(2))
      }
    }
  }

  return (
    <Popover
      open={open}
      onClose={handleClose}
      classes={{ root: classes.root }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
      <Grid container className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
          <Typography component='h2'>{headerText ?? 'Swap Transaction Settings'}</Typography>
          <Button className={classes.selectTokenClose} onClick={handleClose} />
        </Grid>
        <Typography className={classes.label}>Slippage tolerance:</Typography>
        <Box>
          <Input
            disableUnderline
            placeholder='1%'
            className={classes.detailsInfoForm}
            type={'text'}
            value={slippTolerance}
            onChange={e => {
              allowOnlyDigitsAndTrimUnnecessaryZeros(e)
              checkSlippage(e)
            }}
            ref={inputRef}
            onBlur={() => {
              setSlippTolerance(Number(slippTolerance).toFixed(2))
              setSlippage(slippTolerance)
            }}
            endAdornment={
              <button
                className={classes.detailsInfoBtn}
                onClick={() => {
                  setSlippTolerance(defaultSlippage)
                  setSlippage(defaultSlippage)
                }}>
                Auto
              </button>
            }
            classes={{
              input: classes.innerInput
            }}
          />
        </Box>
        <Typography className={classes.info}>
          {infoText ??
            'Slippage tolerance is a pricing difference between the price at the confirmation time and the actual price of the transaction users are willing to accept when swapping.'}
        </Typography>
      </Grid>
    </Popover>
  )
}
export default Slippage
