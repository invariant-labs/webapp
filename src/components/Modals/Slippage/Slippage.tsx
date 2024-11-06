import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { Box, Button, Grid, Input, Popover, Typography } from '@mui/material'
import classNames from 'classnames'

interface Props {
  open: boolean
  setSlippage: (slippage: string) => void
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  initialSlippage: string
  infoText?: string
  headerText?: string
}

const Slippage: React.FC<Props> = ({
  open,
  setSlippage,
  handleClose,
  anchorEl,
  initialSlippage,
  infoText,
  headerText
}) => {
  const { classes } = useStyles()
  const [slippTolerance, setSlippTolerance] = React.useState<string>(initialSlippage)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    const value = e.target.value

    const regex = /^\d*\.?\d*$/
    if (value === '' || regex.test(value)) {
      const startValue = value
      const caretPosition = e.target.selectionStart

      let parsed = value
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
    } else if (!regex.test(value)) {
      setSlippTolerance('')
    }
  }

  const checkSlippage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
    const value = e.target.value

    if (Number(value) > 50) {
      setSlippTolerance('50.00')
    } else if (Number(value) < 0 || isNaN(Number(value))) {
      setSlippTolerance('00.00')
    } else {
      const onlyTwoDigits = '^\\d*\\.?\\d{0,2}$'
      const regex = new RegExp(onlyTwoDigits, 'g')
      if (regex.test(value)) {
        setSlippTolerance(value)
      } else {
        setSlippTolerance(Number(value).toFixed(2))
      }
    }
  }

  const slippageTiers = ['0.3', '0.5', '1']
  const initialTierIndex = slippageTiers.findIndex(tier => tier === slippTolerance)

  const [tierIndex, setTierIndex] = useState(initialTierIndex)

  const setTieredSlippage = (tierIndex: number) => {
    setTierIndex(tierIndex)
    setSlippage(String(Number(slippageTiers[tierIndex]).toFixed(2)))
    setSlippTolerance('')
  }

  useEffect(() => {
    const tierIndex = slippageTiers.findIndex(
      tier => String(Number(tier).toFixed(2)) === slippTolerance
    )
    setTierIndex(tierIndex)

    if (tierIndex !== -1) {
      setSlippTolerance('')
    }
  }, [])

  return (
    <>
      <Popover
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.paper }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}>
        <Grid container className={classes.detailsWrapper}>
          <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
            <Typography component='h2'>{headerText ?? 'Exchange Settings'}</Typography>
            <Button className={classes.selectTokenClose} onClick={handleClose} aria-label='Close' />
          </Grid>
          <Typography className={classes.label}>Slippage tolerance</Typography>
          <Grid container gap='9px'>
            {slippageTiers.map((tier, index) => (
              <Button
                key={tier}
                className={classNames(classes.slippagePercentageButton, {
                  [classes.slippagePercentageButtonActive]: index === tierIndex
                })}
                onClick={() => {
                  setTieredSlippage(index)
                  handleClose()
                }}>
                {tier}%
              </Button>
            ))}
          </Grid>
          <Box marginTop='6px'>
            <Input
              disableUnderline
              placeholder='0.00'
              className={classNames(
                classes.detailsInfoForm,
                tierIndex === -1 && classes.activeForm
              )}
              type={'text'}
              value={slippTolerance}
              onChange={e => {
                allowOnlyDigitsAndTrimUnnecessaryZeros(e)
                checkSlippage(e)
              }}
              ref={inputRef}
              startAdornment='Custom'
              endAdornment={
                <>
                  %
                  <button
                    className={classes.detailsInfoBtn}
                    onClick={() => {
                      setSlippTolerance(Number(slippTolerance).toFixed(2))
                      setSlippage(String(Number(slippTolerance).toFixed(2)))
                      setTierIndex(-1)
                      handleClose()
                    }}>
                    Save
                  </button>
                </>
              }
              classes={{
                input: classes.innerInput,
                inputAdornedEnd: classes.inputAdornedEnd
              }}
            />
          </Box>
          <Typography className={classes.info}>
            {infoText ??
              'Slippage tolerance is a pricing difference between the price at the confirmation time and the actual price of the transaction users are willing to accept when exchanging tokens.'}
          </Typography>
        </Grid>
      </Popover>
    </>
  )
}
export default Slippage
