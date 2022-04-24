import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import RewardsTile, { IRewardsTile } from '../RewardsTile/RewardsTile'
import StakeTile, { IStakedTile } from '../StakeTile/StakeTile'
import useStyle from './style'

export interface ISelectedFarmList {
  tokenXIcon: string
  tokenYIcon: string
  tokenXSymbol: string
  tokenYSymbol: string
  rewardIcon: string
  rewardSymbol: string
  duration: string
  totalStaked: number
  userStaked: number
  totalRewardPerDay: number
  apy: number
  toStake: IStakedTile[]
  stakedPositions: IRewardsTile[]
}

export const SelectedFarmList: React.FC<ISelectedFarmList> = ({
  tokenXIcon,
  tokenYIcon,
  tokenXSymbol,
  tokenYSymbol,
  rewardIcon,
  rewardSymbol,
  duration,
  totalStaked,
  userStaked,
  totalRewardPerDay,
  apy,
  toStake,
  stakedPositions
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.header} container justifyContent='flex-start' alignItems='center' wrap='nowrap'>
        <img src={tokenXIcon} alt={'Token in pool'} className={classes.bigIcon} />
        <img src={tokenYIcon} alt={'Token in pool'} className={classNames(classes.bigIcon, classes.secondBig)} />
        <Typography className={classes.title}>{tokenXSymbol}-{tokenYSymbol}</Typography>
      </Grid>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Farm duration:</Typography>
            <Typography className={classes.value}>{duration}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total positions:</Typography>
            <Typography className={classes.value}>{toStake.length + stakedPositions.length}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>APY:</Typography>
            <Typography className={classes.value}>{apy}%</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
        <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Reward:</Typography>
            <img src={rewardIcon} className={classes.smallIcon} />
            <Typography className={classes.value}>{totalRewardPerDay} {rewardSymbol}/day</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total staked:</Typography>
            <Typography className={classes.value}>{totalStaked} {tokenXSymbol}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Your staked:</Typography>
            <Typography className={classes.value}>{userStaked} {tokenXSymbol}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.containers}>
        {toStake.map((element, index) => (
          <div className={classes.tile}>
            <StakeTile
              key={index}
              {...element}
            />
          </div>
        ))}
        {stakedPositions.map((element, index) => (
          <div className={classes.tile}>
            <RewardsTile
              key={index}
              {...element}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default SelectedFarmList
