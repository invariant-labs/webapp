import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import TransactionPriorityButton from '@components/TransactionPriorityButton/TransactionPriorityButton'
import { IPriorityFeeOptions } from '@containers/HeaderWrapper/HeaderWrapper'
import { Box, Button, Grid, Input, Popover, Typography } from '@material-ui/core'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import useStyles from './style'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  recentPriorityFee: string
  onPrioritySave: () => void
}

const Priority: React.FC<Props> = ({
  open,
  handleClose,
  anchorEl,
  recentPriorityFee,
  onPrioritySave
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFee, setSelectedFee] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [inputValue, setInputValue] = useState('')
  const [saveButtonContent, setSaveButtonContent] = useState('Save settings')
  const [timerId, setTimerId] = useState(0)

  const maxFee = 2

  useEffect(() => {
    const index = priorityFeeOptions.findIndex(option => option.saveValue === +recentPriorityFee)
    setSelectedIndex(index)

    if (index !== -1) {
      setSelectedFee(priorityFeeOptions[index].saveValue)
    } else {
      setInputValue(recentPriorityFee)
      setSelectedFee(+recentPriorityFee)
    }
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
      setSelectedFee(+inputValue)
      localStorage.setItem('INVARIANT_MAINNET_PRIORITY_FEE', inputValue)
    } else {
      setSelectedFee(priorityFeeOptions[selectedIndex].saveValue)
      localStorage.setItem(
        'INVARIANT_MAINNET_PRIORITY_FEE',
        priorityFeeOptions[selectedIndex].saveValue.toString()
      )
    }

    onPrioritySave()
  }

  const priorityFeeOptions: IPriorityFeeOptions[] = [
    { label: 'Normal', value: 0.000005, saveValue: 0, description: '1x Market fee' },
    {
      label: 'Market',
      value: 0.001,
      saveValue: 0.001,
      description: '85% percentile fees from last 20 blocks'
    },
    { label: 'High', value: 0.05, saveValue: 0.05, description: '5x Market fee' },
    { label: 'Turbo', value: 0.1, saveValue: 0.1, description: '10x Market fee' }
  ]

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
                    selected={selectedIndex === index}
                    index={index}
                    label={params.label}
                    value={params.value}
                    saveValue={params.saveValue}
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
          className={classes.detailsInfoForm}
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
