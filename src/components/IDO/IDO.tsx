import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'

import useStyle from './style'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import icons from '@static/icons'

interface IDOinterface {
  xBTC: string
  xETH: string
  SOL: string
  USD: string
  xUSD: string
  HEADER: string
  ButtonHeader: string
}

const IDO: React.FC<IDOinterface> = ({ HEADER, xUSD, USD, SOL, xETH, xBTC, ButtonHeader }) => {
  const classes = useStyle()

  return (
    <Grid className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.depositHeader}>
          <Typography component='h1'>{HEADER}</Typography>
        </Box>
        <Grid className={classes.AmountInputContainer}>
          <AmountInput
            disabled={true}
            onSelect={() => {}}
            tokens={[]}
            current={null}
            onMaxClick={() => {}}
            decimal={0}
            setValue={() => {}}
            value={`0.${'0'.repeat(6)}`}
          />
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
              <Typography component='p'>{xUSD}</Typography>
              <Box className={classes.amountData}>
                <Typography component='p'>{USD}</Typography>
                <Typography component='p'>{SOL}</Typography>
                <Typography component='p'>{xETH}</Typography>
                <Typography component='p'>{xBTC}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.IdoButtonContainer}>
          <AnimatedButton
            content={ButtonHeader}
            onClick={() => {}}
            progress={'none'}
            className={`${classes.IDOButton} ${classes.buttonDisabled}`}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDO
