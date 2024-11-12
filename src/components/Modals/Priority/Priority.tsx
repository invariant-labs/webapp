import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import TransactionPriorityButton from '@components/TransactionPriorityButton/TransactionPriorityButton'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import useStyles from './style'
import { IPriorityFeeOptions } from '@store/consts/types'
import { Box, Button, Grid, Input, Popover, Typography } from '@mui/material'

export interface IPriority {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  recentPriorityFee: string
  recentIsDynamic: boolean
  onPrioritySave: () => void
}

const Priority: React.FC<IPriority> = ({
  open,
  handleClose,
  anchorEl,
  recentPriorityFee,
  recentIsDynamic,
  onPrioritySave
}) => {
  const { classes } = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFee, setSelectedFee] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')
  const [saveButtonContent, setSaveButtonContent] = useState('Save settings')
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [dynamicFee, setDynamicFee] = useState<number | null>(null)
  const [isDynamic, setIsDynamic] = useState(recentIsDynamic)

  const maxFee = 2

  const initialPriorityOptions = [
    { label: 'Normal', value: 0.000005, saveValue: 0, description: '1x Market fee' },
    {
      label: 'Market',
      value: 0.001,
      saveValue: 0.001,
      description: '85% percentile fees from last 20 blocks'
    },
    { label: 'High', value: 0.05, saveValue: 0.05, description: '5x Market fee' },
    { label: 'Turbo', value: 0.1, saveValue: 0.1, description: '10x Market fee' },
    {
      label: 'Dynamic',
      value: 'DYNAMIC',
      saveValue: 'DYNAMIC',
      description: 'Custom fee based on market demand'
    }
  ]

  const [priorityFeeOptions, setPriorityFeeOptions] =
    useState<IPriorityFeeOptions[]>(initialPriorityOptions)

  useEffect(() => {
    const updatePriorityOptions = () => {
      if (dynamicFee != null) {
        setPriorityFeeOptions([
          { label: 'Normal', value: 0.000005, saveValue: 0, description: '1x Market fee' },
          {
            label: 'Market',
            value: parseFloat((dynamicFee / 4).toFixed(9)),
            saveValue: parseFloat((dynamicFee / 4).toFixed(9)),
            description: '0.25x Dynamic fee'
          },
          {
            label: 'High',
            value: parseFloat((dynamicFee * 1.5).toFixed(9)),
            saveValue: parseFloat((dynamicFee * 1.5).toFixed(9)),
            description: '1.5x Dynamic fee'
          },
          {
            label: 'Turbo',
            value: parseFloat((dynamicFee * 3).toFixed(9)),
            saveValue: parseFloat((dynamicFee * 3).toFixed(9)),
            description: '3x Dynamic fee'
          },
          {
            label: 'Dynamic',
            value: 'DYNAMIC',
            saveValue: 'DYNAMIC',
            description: 'Custom fee based on market demand'
          }
        ])
      } else {
        setPriorityFeeOptions(initialPriorityOptions)
      }
    }

    updatePriorityOptions()
  }, [dynamicFee])

  useEffect(() => {
    const index = priorityFeeOptions.findIndex(option =>
      isDynamic ? option.saveValue === 'DYNAMIC' : option.saveValue === +recentPriorityFee
    )
    setSelectedIndex(index)

    if (index !== -1) {
      if (typeof priorityFeeOptions[index].saveValue === 'string') {
        setSelectedFee(dynamicFee ?? 0)
      } else {
        setSelectedFee(priorityFeeOptions[index].saveValue)
      }
    } else {
      setInputValue(recentPriorityFee)
      setSelectedFee(+recentPriorityFee)
    }

    localStorage.setItem('INVARIANT_PRIORITY_FEE', recentPriorityFee.toString())
    localStorage.setItem('INVARIANT_IS_DYNAMIC_FEE', recentIsDynamic.toString())
  }, [])

  useEffect(() => {
    if (saveButtonContent === 'Saved') {
      setTimerId(
        setTimeout(() => {
          setSaveButtonContent('Save settings')
        }, 3000)
      )
    }
  }, [saveButtonContent])

  useEffect(() => {
    clearTimeout(timerId)

    if (selectedIndex === -1 && inputValue !== selectedFee.toString()) {
      return setSaveButtonContent('Not saved!')
    }

    if (selectedIndex !== -1 && priorityFeeOptions[selectedIndex].saveValue !== selectedFee) {
      return setSaveButtonContent('Not saved!')
    }

    setSaveButtonContent('Save settings')
  }, [inputValue, selectedIndex])

  const handleClick = (index: number) => {
    setInputValue('')

    if (index === 4) {
      setIsDynamic(true)
    } else {
      setIsDynamic(false)
    }
    setSelectedIndex(index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(-1)

    if (+e.target.value >= maxFee) {
      setInputValue('2')
    } else {
      setInputValue(e.target.value)
    }
  }

  const onSave = () => {
    if (saveButtonContent === 'Saved') {
      return
    }

    if (+inputValue > 0) {
      setIsDynamic(false)
      setSelectedFee(+inputValue)
      localStorage.setItem('INVARIANT_PRIORITY_FEE', inputValue)
    } else {
      if (typeof priorityFeeOptions[selectedIndex].saveValue === 'string') {
        setIsDynamic(true)
        setSelectedFee(dynamicFee ?? 0)
        localStorage.setItem('INVARIANT_PRIORITY_FEE', (dynamicFee ?? 0).toString())
        localStorage.setItem('INVARIANT_IS_DYNAMIC_FEE', 'true')
      } else {
        setIsDynamic(false)
        setSelectedFee(priorityFeeOptions[selectedIndex].saveValue)
        localStorage.setItem(
          'INVARIANT_PRIORITY_FEE',
          priorityFeeOptions[selectedIndex].saveValue.toString()
        )
        localStorage.setItem('INVARIANT_IS_DYNAMIC_FEE', 'false')
      }
    }

    onPrioritySave()
    handleClose()
  }

  useEffect(() => {
    const loadDynamicFee = async () => {
      const dynamicFee = await getCurrentDynamicFee()
      const fee = +(dynamicFee / 10 ** 9).toFixed(9)
      setDynamicFee(fee)

      if (isDynamic) {
        localStorage.setItem('INVARIANT_PRIORITY_FEE', fee.toString())
      }
    }

    void loadDynamicFee()
    const interval = setInterval(() => {
      void loadDynamicFee()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [isDynamic])

  const getCurrentDynamicFee = async () => {
    const response = await fetch('https://solanacompass.com/api/fees')
    const data = await response.json()
    return data['15'].avg
  }

  return (
    <Popover
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between'>
          <Typography className={classes.header}>Transaction priority</Typography>
          <Button className={classes.closeButton} onClick={handleClose} />
        </Grid>
        <Typography className={classes.text}>
          Solana's fee priority system lets you add an extra fee to your transaction for higher
          priority in the network's queue. Bidding more increases the chances of quick confirmation.
        </Typography>
        <Grid container justifyContent='center' style={{ marginTop: 24 }}>
          {priorityFeeOptions.map((params, index) => {
            return (
              <Grid item key={index}>
                <Box>
                  <TransactionPriorityButton
                    areButtonsSelected={selectedIndex !== -1}
                    selected={
                      isDynamic && selectedIndex !== -1
                        ? params.saveValue === 'DYNAMIC'
                        : selectedIndex === index
                    }
                    index={index}
                    label={params.label}
                    value={typeof params.value === 'string' ? dynamicFee ?? 0 : params.value}
                    saveValue={typeof params.value === 'string' ? dynamicFee ?? 0 : params.value}
                    description={params.description}
                    onClick={handleClick}
                  />
                </Box>
              </Grid>
            )
          })}
        </Grid>
        <Grid container justifyContent='space-between' style={{ marginTop: 24 }}>
          <Typography
            className={classNames(classes.label, { [classes.labelWhite]: selectedIndex === -1 })}>
            Set custom priority
          </Typography>
          <Typography
            className={classNames(classes.label, { [classes.labelColor]: selectedIndex === -1 })}>
            Max: {maxFee} SOL
          </Typography>
        </Grid>
        <Input
          disableUnderline
          placeholder='0'
          className={classNames(
            classes.detailsInfoForm,
            selectedIndex === -1 && classes.activeInput
          )}
          type='number'
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setSelectedIndex(-1)
          }}
          ref={inputRef}
          classes={{
            input: classes.innerInput
          }}
        />
        <AnimatedButton
          content={saveButtonContent}
          progress='none'
          className={classNames(classes.saveButton, {
            [classes.saveButtonNotSaved]: saveButtonContent === 'Not saved!'
          })}
          onClick={() => {
            setSaveButtonContent('Saved')
            onSave()
          }}
        />
      </Grid>
    </Popover>
  )
}
export default Priority
