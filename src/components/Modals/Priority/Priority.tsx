import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import TransactionPriorityButton from '@components/TransactionPriorityButton/TransactionPriorityButton'
import { IPriorityFeeOptions } from '@containers/HeaderWrapper/HeaderWrapper'
import { Box, Button, Grid, Input, Popover, Typography } from '@material-ui/core'
import { actions as snackbarsActions } from '@reducers/snackbars'
import React from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './style'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  recentPriorityFee: string
}

const Priority: React.FC<Props> = ({ open, handleClose, anchorEl, recentPriorityFee }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const maxFee = 2
  const [_selectedFee, setSelectedFee] = React.useState<number>(0)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
  const [inputValue, setInputValue] = React.useState<string>('')

  React.useEffect(() => {
    const index = priorityFeeOptions.findIndex(option => option.saveValue === +recentPriorityFee)
    setSelectedIndex(index)
    if (index !== -1) {
      setSelectedFee(priorityFeeOptions[index].saveValue)
    } else {
      setInputValue(recentPriorityFee)
      setSelectedFee(+recentPriorityFee)
    }
  }, [recentPriorityFee])

  const handleClick = (index: number, value: number) => {
    setSelectedFee(value)
    setSelectedIndex(index)
    setInputValue('')
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= maxFee) {
      setInputValue('2.0000')
    } else {
      setInputValue(e.target.value)
    }
  }

  const onSave = () => {
    if (+inputValue > 0) {
      setSelectedFee(+inputValue)
      setSelectedIndex(-1)
      localStorage.setItem('INVARIANT_MAINNET_PRIORITY_FEE', inputValue)
    } else {
      localStorage.setItem(
        'INVARIANT_MAINNET_PRIORITY_FEE',
        JSON.stringify(priorityFeeOptions[selectedIndex].saveValue)
      )
    }

    dispatch(
      snackbarsActions.add({
        message: 'Priority fee updated',
        variant: 'success',
        persist: false
      })
    )
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
      classes={{ root: classes.root }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid container className={classes.detailsWrapper}>
        <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
          <Typography className={classes.header}>{'Transaction priority'}</Typography>
          <Button className={classes.selectTokenClose} onClick={handleClose} />
        </Grid>
        <Typography className={classes.text}>
          Solana's fee priority system lets you add an extra fee to your transaction for higher
          priority in the network's queue. Bidding more increases the chances of quick confirmation.{' '}
        </Typography>
        <Grid container justifyContent='center' style={{ marginBottom: 20 }}>
          {priorityFeeOptions.map((params, index) => {
            return (
              <Grid item key={index}>
                <Box>
                  <TransactionPriorityButton
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
        <Box>
          <Grid container justifyContent='space-between'>
            <Typography className={classes.label}>Set custom priority</Typography>
            <Typography className={classes.label}>MAX: {maxFee} SOL</Typography>
          </Grid>
          <Input
            disableUnderline
            placeholder='0.0000'
            className={classes.detailsInfoForm}
            type={'number'}
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
            onBlur={() => {}}
            classes={{
              input: classes.innerInput
            }}
          />
        </Box>
        <br />
        <AnimatedButton
          content='Save'
          progress={'none'}
          className={classes.saveButton}
          onClick={() => {
            onSave()
            handleClose()
          }}></AnimatedButton>
      </Grid>
    </Popover>
  )
}
export default Priority
