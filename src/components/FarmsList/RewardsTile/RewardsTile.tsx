import { Button, CardMedia, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './styles'
import AnimatedNumber from '@components/AnimatedNumber'

export interface IRewardsTile {
  tokenXSymbol: string
  tokenYSymbol: string
  minPrice: number
  maxPrice: number
  fee: number
  tokenXDeposit: number
  tokenYDeposit: number
  value: number
  rewardsToken: string
  onClaimReward?: () => void
  iconTokenX: string
}

export const RewardsTile: React.FC<IRewardsTile> = ({
  tokenXSymbol,
  tokenYSymbol,
  minPrice,
  maxPrice,
  fee,
  tokenXDeposit,
  tokenYDeposit,
  value,
  rewardsToken,
  onClaimReward,
  iconTokenX
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root} container direction='column'>
      <Typography className={classes.header}>Your staked</Typography>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container>
            <Typography className={classes.label}>Min price:</Typography>
            <Typography className={classes.value}>{minPrice} {tokenXSymbol}/{tokenYSymbol}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Max price:</Typography>
            <Typography className={classes.value}>{maxPrice} {tokenXSymbol}/{tokenYSymbol}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Fee:</Typography>
            <Typography className={classes.value}>{fee}%</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
          <Grid className={classes.row} container>
            <Typography className={classes.label}>{tokenXSymbol} deposit:</Typography>
            <Typography className={classes.value}>{tokenXDeposit}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>{tokenYSymbol} deposit:</Typography>
            <Typography className={classes.value}>{tokenYDeposit}</Typography>
          </Grid>

          <Grid className={classes.row} container>
            <Typography className={classes.label}>Value:</Typography>
            <Typography className={classes.value}>{value} {tokenXSymbol}</Typography>
          </Grid>
        </Grid>
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
          onClick={onClaimReward}>
          Claim Rewards
        </Button>
      </Grid>
    </Grid>
  )
}

export default RewardsTile
