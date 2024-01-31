import React from 'react'
import { Typography, Box, Grid, Button, Popover, Input } from '@material-ui/core'
import useStyles from './style'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import TransactionPriorityButton from '@components/TransactionPriorityButton/TransactionPriorityButton'
import { IPriorityFeeOptions } from '@containers/HeaderWrapper/HeaderWrapper'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  recentPriorityFee: string
  priorityFeeOptions: IPriorityFeeOptions[]
}

const Priority: React.FC<Props> = ({
  open,
  handleClose,
  anchorEl,
  recentPriorityFee,
  priorityFeeOptions
}) => {
  const classes = useStyles()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const maxFee = 2
  const [_selectedFee, setSelectedFee] = React.useState<number>(0)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
  const [inputValue, setInputValue] = React.useState<string>('')

  React.useEffect(() => {
    const index = priorityFeeOptions.findIndex(option => option.value === +recentPriorityFee)
    setSelectedIndex(index)
    if (index !== -1) {
      setSelectedFee(priorityFeeOptions[index].value)
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
        JSON.stringify(priorityFeeOptions[selectedIndex].value)
      )
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
