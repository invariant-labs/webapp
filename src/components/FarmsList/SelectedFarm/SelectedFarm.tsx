import { Box, Button, Grid, OutlinedInput, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { CallMissedSharp } from '@material-ui/icons'

interface ISelectedFarm {
  value: number
  staked: number
  pair: string
  currency: string
  currencyPrice: number
}

export const SelectedFarm: React.FC<ISelectedFarm> = ({
  value,
  staked,
  pair,
  currency,
  currencyPrice
}) => {
  const classes = useStyle()
  const [activeValue, SetActiveValue] = useState('stake')
  const handleButtonStake = (value: string) => {
    SetActiveValue(value)
    console.log(value)
  }
  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.top} container direction='row' justifyContent='space-between'>
        <Box>
          <Button
            onClick={() => handleButtonStake('stake')}
            className={activeValue === 'stake' ? classes.stakeButton : classes.disableButton}>
            Stake
          </Button>
          <Button
            onClick={() => handleButtonStake('unstake')}
            className={activeValue === 'unstake' ? classes.unstakeButton : classes.disableButton}>
            Unstake
          </Button>
        </Box>
        <Typography className={classes.greenText}>
          Unclaimed rewards:
          <Typography display='inline' component='span' className={classes.value}>
            {value} {currency}
          </Typography>
        </Typography>
      </Grid>
      {activeValue === 'stake' ? (
        <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography className={classes.stakeLabel}>Total Staked:</Typography>{' '}
          <Typography display='inline' component='span' className={classes.value}>
            {value} {currency}
          </Typography>
          <Typography className={classes.stakeLabel}>Total Staked: 233 345 xBTC - xUSD</Typography>
        </Grid>
      ) : (
        <>
          <Grid style={{ display: 'flex' }}>
            <Grid className={classes.tokenArea}>
              <Grid className={classes.token}>
                <Typography className={classes.tokenName}>{currency}</Typography>
              </Grid>
              <Typography className={classes.tokenValue}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
              </Typography>
            </Grid>
            <Button className={classes.claimRewards}>Claim Rewards</Button>
          </Grid>
          <Grid justifyContent='space-between' direction='row'>
            <Box className={classes.labelGrid}>
              <Typography className={classes.labelText}>
                Staked: {staked} {pair}{' '}
              </Typography>
              <Typography className={classes.labelText}>
                {value} {currency} = $ {value * currencyPrice}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
      {activeValue === 'stake' ? (
        <Button className={classes.buttonStake} type='button'>
          Stake
        </Button>
      ) : (
        <Button className={classes.buttonUnstake} type='button'>
          Unstake
        </Button>
      )}
    </Grid>
  )
}

export default SelectedFarm
