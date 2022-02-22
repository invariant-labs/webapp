import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'
import { SwapToken } from '@components/Swap/Swap'
import useStyle from './style'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import icons from '@static/icons'
import classNames from 'classnames'
import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'

interface IdoInterface {
  xBtc: string
  xEth: string
  sol: string
  usd: string
  xUsd: string
  header: string
  buttonHeader: string
  token: SwapToken
  balance: string
  decimal: number
}

const Ido: React.FC<IdoInterface> = ({
  header,
  xUsd,
  usd,
  sol,
  xEth,
  xBtc,
  buttonHeader,
  token,
  balance,
  decimal
}) => {
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
          <DepositAmountInput
            balanceValue={balance}
            currency={token.symbol}
            currencyIconSrc={token.logoURI}
            placeholder={`0.${'0'.repeat(6)}`}
            setValue={() => {}}
            onMaxClick={() => {}}
            decimalsLimit={decimal}
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
            onClick={() => {}}
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
