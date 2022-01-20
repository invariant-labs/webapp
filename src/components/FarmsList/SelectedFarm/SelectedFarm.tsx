import { Box, Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { theme } from '@static/theme'

interface ISelectedFarm {
  value: number
  staked: number
  pair: string
  currency: string
  currencyPrice: number
  apy: number
  liquidity: number
  stake: () => void
  unstake: () => void
  claimRewards: () => void
}

export const SelectedFarm: React.FC<ISelectedFarm> = ({
  value,
  staked,
  pair,
  currency,
  currencyPrice,
  apy,
  liquidity,
  stake,
  unstake,
  claimRewards
}) => {
  const classes = useStyle()
  const [activeValue, SetActiveValue] = useState('stake')
  const handleButtonStake = (value: string) => {
    SetActiveValue(value)
  }
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.top}>
        <Box className={classes.buttonContainer}>
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
            <AnimatedNumber
              value={value}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(2)}
            />
            {currency}
          </Typography>
        </Typography>
      </Grid>
      {activeValue === 'stake' ? (
        <Grid className={classes.infoContainer}>
          <Box className={classes.boxLeft}>
            <Typography className={classes.infoText}>
              Total Staked:
              <Typography display='inline' component='span' className={classes.value}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
                {currency}
              </Typography>
            </Typography>
            <Typography className={classes.infoText}>
              APY:
              <Typography display='inline' component='span' className={classes.value}>
                <AnimatedNumber
                  value={apy}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(1)}
                />
                %
              </Typography>
            </Typography>
            <Typography className={classes.infoText}>
              Liquidity:
              <Typography display='inline' component='span' className={classes.value}>
                $
                <AnimatedNumber
                  value={liquidity}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(0)}
                />
              </Typography>
            </Typography>
          </Box>
          <Box className={classes.boxRight}>
            <Typography className={classes.infoText}>
              Total Staked:
              <Typography display='inline' component='span' className={classes.value}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
                {currency}
              </Typography>
            </Typography>
            <Typography className={classes.infoText}>
              Total Staked:
              <Typography display='inline' component='span' className={classes.value}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
                {currency}
              </Typography>
            </Typography>
            <Typography className={classes.infoText}>
              Total Staked:
              <Typography display='inline' component='span' className={classes.value}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
                {currency}
              </Typography>
            </Typography>
          </Box>
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
            <Button className={classes.claimRewards} onClick={claimRewards}>Claim Rewards</Button>
          </Grid>
          <Grid justifyContent='space-between' direction='row'>
            <Box className={classes.labelGrid}>
              <Typography className={classes.labelText}>
                Staked:
                {staked} {pair}
              </Typography>
              <Typography className={classes.labelText}>
                {isXsDown
                  ? `$ ${value * currencyPrice}`
                  : `${value} ${currency} = $ ${value * currencyPrice}`}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
      {activeValue === 'stake' ? (
        <Button className={classes.buttonStake} type='button' onClick={stake}>
          Stake
        </Button>
      ) : (
        <Button className={classes.buttonUnstake} type='button' onClick={unstake}>
          Unstake
        </Button>
      )}
    </Grid>
  )
}

export default SelectedFarm
