import { Box, Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { theme } from '@static/theme'

export interface ISelectedFarm {
  value: number
  staked: number
  pair: string
  currencyPrice: number
  rewardsToken: string
  apy: number
  liquidity: number
  handleFarm?: (type: string) => void
}

export const SelectedFarm: React.FC<ISelectedFarm> = ({
  value,
  staked,
  pair,
  rewardsToken,
  currencyPrice,
  apy,
  liquidity,
  handleFarm
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
            <Typography display='inline' component='span' className={classes.spacing}>
              {rewardsToken}
            </Typography>
          </Typography>
        </Typography>
      </Grid>
      {activeValue === 'stake' ? (
        <>
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
                  <span className={classes.spacing}>{pair}</span>
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
                  <span className={classes.spacing}>{pair}</span>
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
                  <span className={classes.spacing}>{pair}</span>
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
                  <span className={classes.spacing}>{pair}</span>
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Button
            className={classes.buttonStake}
            type='button'
            onClick={() => {
              if (handleFarm !== undefined) {
                handleFarm('stake')
              }
            }}>
            Stake
          </Button>
        </>
      ) : (
        <>
          <Grid style={{ display: 'flex' }}>
            <Grid className={classes.tokenArea}>
              <Grid className={classes.token}>
                <Typography className={classes.tokenName}>{pair}</Typography>
              </Grid>
              <Typography className={classes.tokenValue}>
                <AnimatedNumber
                  value={value}
                  duration={300}
                  formatValue={(value: string) => Number(value).toFixed(2)}
                />
              </Typography>
            </Grid>
            <Button
              className={classes.claimRewards}
              onClick={() => {
                if (handleFarm !== undefined) {
                  handleFarm('claimRewards')
                }
              }}>
              Claim Rewards
            </Button>
          </Grid>
          <Grid justifyContent='space-between' direction='row'>
            <Box className={classes.labelGrid}>
              <Typography className={classes.labelText}>
                Staked:
                <span className={classes.stakedValue}>{staked}</span> {pair}
              </Typography>
              <Typography className={classes.labelText}>
                {isXsDown
                  ? `$ ${value * currencyPrice}`
                  : `${value} ${pair} = $ ${value * currencyPrice}`}
              </Typography>
            </Box>
          </Grid>
          <Button
            className={classes.buttonUnstake}
            type='button'
            onClick={() => {
              if (handleFarm !== undefined) {
                handleFarm('unstake')
              }
            }}>
            Unstake
          </Button>
        </>
      )}
    </Grid>
  )
}

export default SelectedFarm
