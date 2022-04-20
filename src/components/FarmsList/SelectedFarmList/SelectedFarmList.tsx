import { Grid, Typography } from '@material-ui/core'
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
      <Grid className={classes.header} container justifyContent='flex-start'>
        <img src={tokenXIcon} alt={'Token in pool'} className={classes.bigIcon} />
        <img src={tokenYIcon} alt={'Token in pool'} className={classes.bigIcon} />
        <Typography className={classes.title}>{tokenXSymbol}-{tokenYSymbol}</Typography>
      </Grid>
      <Grid className={classes.header} container direction='row' justifyContent='space-between'>
        <Typography className={classes.postionsInfo}>
          Total Positions:
          <Typography display='inline' component='span' className={classes.value}>
            {toStake.length + stakedPositions.length}
          </Typography>
        </Typography>
        <Typography
          className={classes.postionsInfo}
          style={{ display: 'flex', alignItems: 'center' }}>
          Reward:
          <Typography
            component='span'
            className={classes.value}
            style={{ display: 'flex', alignItems: 'center' }}>
            <img src={rewardIcon} alt={'Reward token icon'} className={classes.smallIcon} />{' '}
            {totalRewardPerDay} {rewardSymbol} / day
          </Typography>
        </Typography>
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
