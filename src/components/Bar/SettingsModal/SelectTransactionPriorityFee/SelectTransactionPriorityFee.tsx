import { Box, Button, Input, Typography } from '@mui/material'
import { useStyles } from './style'
import { useEffect, useState } from 'react'
import { PriorityMode } from '@store/consts/types'
import { calculatePriorityFee, stringToFixed } from '@utils/utils'
import { MAX_PRIORITY_FEE } from '@store/consts/static'

type Props = {
  dynamicFee: number
  handleClose: () => void
}

export const SelectTransactionPriorityFee = ({ dynamicFee, handleClose }: Props) => {
  const { classes, cx } = useStyles()

  const currentPriorityMode = localStorage.getItem('INVARIANT_PRIORITY_MODE') as PriorityMode
  const currentPriorityFee = localStorage.getItem('INVARIANT_PRIORITY_FEE')
  const [priorityMode, setPriorityMode] = useState<PriorityMode>(
    (localStorage.getItem('INVARIANT_PRIORITY_MODE') as PriorityMode) || PriorityMode.Market
  )
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [customPriorityFee, setCustomPriorityFee] = useState(
    priorityMode === PriorityMode.Custom ? localStorage.getItem('INVARIANT_PRIORITY_FEE') : ''
  )
  const [isSavable, setIsSavable] = useState(false)

  const FEES = [
    {
      title: PriorityMode.Normal,
      amount: 0.000005,
      description: 'Minimal fee'
    },
    {
      title: PriorityMode.Economic,
      amount: calculatePriorityFee(dynamicFee, PriorityMode.Economic),
      description: '0.25x Market fee'
    },
    {
      title: PriorityMode.Market,
      amount: calculatePriorityFee(dynamicFee, PriorityMode.Market),
      description: 'Custom fee based on market demand'
    },
    {
      title: PriorityMode.High,
      amount: calculatePriorityFee(dynamicFee, PriorityMode.High),
      description: '1.5x Market fee'
    },
    {
      title: PriorityMode.Turbo,
      amount: calculatePriorityFee(dynamicFee, PriorityMode.Turbo),
      description: '3x Market fee'
    }
  ]

  const handleInputChange = (value: string) => {
    if (!isFinite(+value) || isNaN(+value)) {
      return
    }

    if (+value > MAX_PRIORITY_FEE) {
      setCustomPriorityFee(MAX_PRIORITY_FEE.toString())
    } else {
      setCustomPriorityFee(stringToFixed(value, 9))
    }
  }

  useEffect(() => {
    setIsSavable(
      currentPriorityMode !== priorityMode ||
        (!!customPriorityFee && currentPriorityFee !== customPriorityFee)
    )
  }, [currentPriorityMode, currentPriorityFee, priorityMode, customPriorityFee])

  useEffect(() => {
    if (priorityMode !== PriorityMode.Custom) {
      const fee = FEES.find(fee => fee.title === priorityMode)

      setCustomPriorityFee(fee?.amount.toString() || '0')
    }
  }, [])

  return (
    <Box className={classes.container}>
      <Box className={classes.section}>
        <Typography className={classes.title}>Transaction priority</Typography>
        <Typography className={classes.description}>
          Solana's fee priority system lets you add an extra fee to your transaction for higher
          priority in the network's queue. Bidding more increases the chances of quick confirmation.
        </Typography>
      </Box>
      <Box className={classes.feeContainer}>
        {FEES.map(({ title, amount, description }) => (
          <Box
            className={cx(classes.fee, {
              [classes.feeSelected]:
                title === priorityMode && !isInputFocused && priorityMode !== PriorityMode.Custom
            })}
            key={title}
            onClick={() => {
              setPriorityMode(title)

              setCustomPriorityFee(amount.toString())
            }}>
            <Box className={classes.feeHeader}>
              <Typography
                className={cx(classes.feeTitle, {
                  [classes.feeTitleSelected]:
                    title === priorityMode &&
                    !isInputFocused &&
                    priorityMode !== PriorityMode.Custom
                })}>
                {title}
              </Typography>
              <Typography className={classes.feeAmount}>Max {amount} SOL</Typography>
            </Box>
            <Box
              className={cx(classes.feeDescription, {
                [classes.feeDescriptionSelected]:
                  title === priorityMode && !isInputFocused && priorityMode !== PriorityMode.Custom
              })}>
              {description}
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={classes.section}>
        <Box className={classes.customFeeContainer}>
          <Typography className={classes.customFeeText}>Set custom priority</Typography>
          <Typography className={classes.customFeeText}>MAX: {MAX_PRIORITY_FEE} SOL</Typography>
        </Box>
        <Input
          className={cx(classes.input, {
            [classes.inputSelected]: priorityMode === PriorityMode.Custom
          })}
          placeholder='Custom priority fee'
          disableUnderline
          value={customPriorityFee}
          onFocus={() => {
            setIsInputFocused(true)
            setPriorityMode(PriorityMode.Custom)
          }}
          onBlur={() => setIsInputFocused(false)}
          onChange={e => handleInputChange(e.target.value)}
        />
      </Box>
      <Button
        className={classes.button}
        onClick={() => {
          if (isSavable) {
            if (priorityMode === PriorityMode.Custom) {
              if (customPriorityFee) {
                localStorage.setItem('INVARIANT_PRIORITY_MODE', PriorityMode.Custom)
                localStorage.setItem('INVARIANT_PRIORITY_FEE', customPriorityFee)
              } else {
                setPriorityMode(PriorityMode.Market)
                localStorage.setItem('INVARIANT_PRIORITY_MODE', PriorityMode.Market)
                localStorage.setItem(
                  'INVARIANT_PRIORITY_FEE',
                  calculatePriorityFee(dynamicFee, PriorityMode.Market).toString()
                )
              }
            } else {
              localStorage.setItem('INVARIANT_PRIORITY_MODE', priorityMode)
              localStorage.setItem(
                'INVARIANT_PRIORITY_FEE',
                calculatePriorityFee(dynamicFee, priorityMode).toString()
              )
            }

            setIsSavable(false)
            handleClose()
          } else {
            handleClose()
          }
        }}>
        {isSavable ? 'Save' : 'Saved'}
      </Button>
    </Box>
  )
}
