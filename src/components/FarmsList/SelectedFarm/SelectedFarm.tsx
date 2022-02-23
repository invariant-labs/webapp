import { Box, Button, CardMedia, Grid, Typography, useMediaQuery } from '@material-ui/core'
import React, { useState } from 'react'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'
import { theme } from '@static/theme'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
export interface ISelectedFarm {
  value: number
  staked: number
  pair: string
  currencyPrice: number
  rewardsToken: string
  apy: number
  liquidity: number
  action?: string
  onStake?: (id: string) => void
  onUnstake?: (id: string) => void
  onClaimReward?: (id: string) => void
  iconTokenX: string
}

export const SelectedFarm: React.FC<ISelectedFarm> = ({
  value,
  staked,
  pair,
  rewardsToken,
  currencyPrice,
  apy,
  liquidity,
  action,
  onStake,
  onUnstake,
  onClaimReward,
  iconTokenX
}) => {
  const classes = useStyle()
  const [activeValue, SetActiveValue] = useState(action)
  const handleButtonStake = (value: string) => {
    SetActiveValue(value)
  }
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.top}>
        <Box className={classes.buttonContainer}>
          <OutlinedButton
            onClick={() => handleButtonStake('stake')}
            className={activeValue === 'stake' ? classes.stakeButton : classes.disabledStake}
            name='Stake'
          />
          <OutlinedButton
            name='Unstake'
            onClick={() => handleButtonStake('unstake')}
            className={activeValue === 'unstake' ? classes.unstakeButton : classes.disableButton}
          />
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
              <Typography className={classes.infoHeader}>
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

              <Typography className={classes.infoHeader}>
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
              <Typography className={classes.infoHeader}>
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
            </Box>
            <Box className={classes.boxRight}>
              <Typography className={classes.infoHeader}>
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
              <Typography className={classes.infoHeader}>
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
              <Typography className={classes.infoHeader}>
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
          <OutlinedButton
            className={classes.buttonStake}
            name='Stake'
            onClick={() => {
              if (onStake !== undefined) {
                onStake('stake')
              }
            }}
          />
        </>
      ) : (
        <>
          <Grid className={classes.tokenContainer}>
            <Grid className={classes.tokenArea}>
              <Grid className={classes.token}>
                <Typography className={classes.tokenName}>
                  <CardMedia image={iconTokenX} className={classes.tokenImg} />
                  <Typography className={classes.tokenName}>{rewardsToken}</Typography>
                </Typography>
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
                if (onClaimReward !== undefined) {
                  onClaimReward('id')
                }
              }}>
              Claim Rewards
            </Button>
          </Grid>
          <Grid justifyContent='space-between' direction='row'>
            <Box className={classes.labelGrid}>
              <Typography className={classes.infoText}>
                <span className={classes.labelText}>
                  Staked: {staked.toLocaleString('pl-PL')} {pair}
                </span>
              </Typography>
              <Typography className={classes.labelText}>
                {isXsDown
                  ? `${Number(value).toFixed(2)} ${rewardsToken} = $${value * currencyPrice}`
                  : `${value} ${rewardsToken} = $${value * currencyPrice}`}
              </Typography>
            </Box>
          </Grid>
          <Button
            className={classes.buttonUnstake}
            onClick={() => {
              if (onUnstake !== undefined) {
                onUnstake('unstake')
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
