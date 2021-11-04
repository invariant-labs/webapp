import React from 'react'
import { Typography, Box, Grid, Button } from '@material-ui/core'
import useStyles from './style'

interface Props {
  open: boolean
  setSlippage: (slippage: string) => void
}

const Slippage: React.FC<Props> = ({ open, setSlippage }) => {
  const classes = useStyles()
  const [slippTolerance, setSlippTolerance] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

  return (
    <Grid container className={classes.detailsWrapper}>
      <Grid container>
        <Typography component='h2'>Swap Transaction Settings</Typography>
        <Button className={classes.selectTokenClose} ></Button>
      </Grid>
      <Typography component='p'>Slippage tolerance:</Typography>
      <Box>
        <input placeholder='0.50%' className={classes.detailsInfoForm} type={'text'} value={slippTolerance} onChange={(e) => {
          allowOnlyDigitsAndTrimUnnecessaryZeros(e)
        }}/>
        <button className={classes.detailsInfoBtn}>Auto</button>
      </Box>
    </Grid>
  )
}
export default Slippage
