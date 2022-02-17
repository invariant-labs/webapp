import React from 'react'
import { Grid, Typography, Box, CardMedia } from '@material-ui/core'

import useStyle from './style'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import AnimatedButton from '@components/AnimatedButton/AnimatedButton'
import icons from '@static/icons'
import classNames from 'classnames'

interface IDOinterface {
  Xbtc: string
  Xeth: string
  Sol: string
  Usd: string
  Xusd: string
  Header: string
  ButtonHeader: string
  Disabled: boolean
}

const IDO: React.FC<IDOinterface> = ({
  Header,
  Xusd,
  Usd,
  Sol,
  Xeth,
  Xbtc,
  ButtonHeader,
  Disabled
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.depositHeader}>
          <Typography component='h1'>{Header}</Typography>
        </Box>
        <Grid className={classes.AmountInputContainer}>
          <AmountInput
            disabled={Disabled}
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
              <Typography component='p'>{Xusd}</Typography>
              <Box className={classes.amountData}>
                <Typography component='p'>{Usd}</Typography>
                <Typography component='p'>{Sol}</Typography>
                <Typography component='p'>{Xeth}</Typography>
                <Typography component='p'>{Xbtc}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.IdoButtonContainer}>
          <AnimatedButton
            content={ButtonHeader}
            disabled={false}
            onClick={() => {}}
            progress={'none'}
            className={classNames(classes.IDOButton, classes.buttonDisabled)}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default IDO
