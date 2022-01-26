import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import SelectedFarm, { ISelectedFarm } from '../SelectedFarm/SelectedFarm'
import useStyle from './style'

export interface ISelectedFarmList {
  title: string
  rewards: string
  iconTokenX: string
  iconTokenY: string
  iconRewardToken: string
  rewardsTokenSymbol: string
  data: ISelectedFarm[]
  stakeHandler: (id: string) => void
  unstakeHandler: (id: string) => void
  claimRewardHandler: (id: string) => void
}
export const SelectedFarmList: React.FC<ISelectedFarmList> = ({
  title,
  data,
  rewards,
  iconTokenX,
  iconTokenY,
  iconRewardToken,
  rewardsTokenSymbol,
  stakeHandler,
  unstakeHandler,
  claimRewardHandler
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'>
        <img src={iconTokenX} alt={'Token in pool'} className={classes.bigIcon} />
        <img src={iconTokenY} alt={'Token in pool'} className={classes.bigIcon} />
        <Typography className={classes.header}>{title}</Typography>
      </Grid>
      <Grid
        className={classes.header}
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography className={classes.postionsInfo}>
          Total Positions:
          <Typography display='inline' component='span' className={classes.value}>
            {data.length}
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
            <img src={iconRewardToken} alt={'Reward token icon'} className={classes.smallIcon} />{' '}
            {rewards} {rewardsTokenSymbol} / day
          </Typography>
        </Typography>
      </Grid>
      <Grid className={classes.containers}>
        {data.map((element, index) => (
          <div className={classes.tile}>
            <SelectedFarm
              key={index}
              value={element.value}
              staked={element.staked}
              pair={element.pair}
              rewardsToken={element.rewardsToken}
              currencyPrice={element.currencyPrice}
              apy={element.apy}
              liquidity={element.liquidity}
              action={'stake'}
              onStake={stakeHandler}
              onUnstake={unstakeHandler}
              onClaimReward={claimRewardHandler}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default SelectedFarmList
