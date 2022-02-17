import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'

import useStyle from './style'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import icons from '@static/icons'
import classNames from 'classnames'

interface Idointerface {
  xBtc: string
  xEth: string
  sol: string
  usd: string
  xUsd: string
  header: string
  buttonHeader: string
}

const Ido: React.FC<Idointerface> = ({ header, xUsd, usd, sol, xEth, xBtc, buttonHeader }) => {
  const classes = useStyle()

  return (
    <Grid className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.depositHeader}>
          <Typography component='h1'>{header}</Typography>
        </Box>
        <Grid className={classes.AmountInputContainer}>
          <AmountInput value={`0.${'0'.repeat(6)}`} />
        </Grid>
        <Grid className={classes.DepositContainer}>
          <Typography component='p'>Deposited Amount</Typography>
        </Grid>
        <Grid className={classes.AmountContainer}>
          <Box>
            <CardMedia className={classes.logo} image={icons.LogoShort} />
          </Box>
          <Grid className={classes.amountCollection}>
            <Box className={classes.amountBox}>
              <Typography component='p'>{xUsd}</Typography>
              <Box className={classes.amountData}>
                <Typography component='p'>{usd}</Typography>
                <Typography component='p'>{sol}</Typography>
                <Typography component='p'>{xEth}</Typography>
                <Typography component='p'>{xBtc}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.IdoButtonContainer}>
          <AnimatedButton
            content={buttonHeader}
            progress={'none'}
            className={classNames(classes.IDOButton, classes.buttonDisabled)}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Ido
