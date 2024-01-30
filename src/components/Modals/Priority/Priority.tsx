import React from 'react'
import { Typography, Box, Grid, Button, Popover, Input } from '@material-ui/core'
import useStyles from './style'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import TransactionPriorityButton from '@components/TransactionPriorityButton/TransactionPriorityButton'

interface Props {
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
}

export interface IButtonParams {
  label: string
  value: number
  multiplier: number
}

const buttonsParams: IButtonParams[] = [
  { label: 'High', value: 0.05, multiplier: 5 },
  { label: 'Turbo', value: 0.1, multiplier: 10 }
]

const Priority: React.FC<Props> = ({ open, handleClose, anchorEl }) => {
  const classes = useStyles()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const maxFee = 2
  const [_selectedFee, setSelectedFee] = React.useState<number>(0)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
  const [inputValue, setInputValue] = React.useState<string>('0.0000')

  const handleClick = (index: number, value: number) => {
    setSelectedFee(value)
    setSelectedIndex(index)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) >= maxFee) {
      setInputValue('2.0000')
    } else {
      setInputValue(e.target.value)
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
          <Typography component='h2'>{'Transaction priority'}</Typography>
          <Button className={classes.selectTokenClose} onClick={handleClose} />
        </Grid>
        <Typography className={classes.text}>
          Short explanation what transaction priority is solana klaytn decred klaytn flow bitcoin
          amp. Ren EOS USD terra ethereum.{' '}
        </Typography>
        <Grid container justifyContent='center' style={{ marginBottom: 20 }}>
          {buttonsParams.map((params, index) => {
            return (
              <Grid item>
                <Box>
                  <TransactionPriorityButton
                    selected={selectedIndex === index}
                    index={index}
                    label={params.label}
                    value={params.value}
                    multiplier={params.multiplier}
                    onClick={handleClick}
                  />
                </Box>
              </Grid>
            )
          })}
        </Grid>
        <Box>
          <Grid container justifyContent='space-between' style={{ marginBottom: 6 }}>
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
          content='Save settings'
          progress={'none'}
          onClick={handleClose}></AnimatedButton>
      </Grid>
    </Popover>
  )
}
export default Priority
