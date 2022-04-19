import { Box, Button, CardMedia, Grid, Typography, useMediaQuery } from '@material-ui/core'
import React from 'react'
import useStyle from './styles'
import AnimatedNumber from '@components/AnimatedNumber'
import { theme } from '@static/theme'

export interface IRewardsTile {
  value: number
  staked: number
  pair: string
  currencyPrice: number
  rewardsToken: string
  apy: number
  liquidity: number
  onClaimReward?: (id: string) => void
  iconTokenX: string
}

export const RewardsTile: React.FC<IRewardsTile> = ({
  value,
  staked,
  pair,
  rewardsToken,
  currencyPrice,
  apy,
  liquidity,
  onClaimReward,
  iconTokenX
}) => {
  const classes = useStyle()
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid className={classes.root} container direction='column'>
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
    </Grid>
  )
}

export default RewardsTile
