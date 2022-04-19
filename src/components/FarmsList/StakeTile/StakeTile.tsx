import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles'
import AnimatedNumber from '@components/AnimatedNumber'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

export interface IStakedTile {
  value: number
  staked: number
  pair: string
  currencyPrice: number
  rewardsToken: string
  apy: number
  liquidity: number
  onStake?: (id: string) => void
}

export const StakeTile: React.FC<IStakedTile> = ({
  value,
  staked,
  pair,
  rewardsToken,
  currencyPrice,
  apy,
  liquidity,
  onStake
}) => {
  const classes = useStyle()
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
      <OutlinedButton
        className={classes.buttonStake}
        name='Stake'
        onClick={() => {
          if (onStake !== undefined) {
            onStake('stake')
          }
        }}
      />
    </Grid>
  )
}

export default StakeTile
