import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import SelectedFarm, { ISelectedFarm } from '../SelectedFarm/SelectedFarm'
import useStyle from './style'

export interface ISelectedFarmList {
  title: string
  rewards: string
  iconTokenX: string
  iconTokenY: string
  iconSNY: string
  data: ISelectedFarm[]
}
export const SelectedFarmList: React.FC<ISelectedFarmList> = ({
  title,
  data,
  rewards,
  iconTokenX,
  iconTokenY,
  iconSNY
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
            <img src={iconSNY} alt={'SNY token icon'} className={classes.smallIcon} /> {rewards} /
            day
          </Typography>
        </Typography>
      </Grid>
      <Grid>
        {data.map(element => (
          <div className={classes.tile}>
            <SelectedFarm
              value={element.value}
              staked={element.staked}
              pair={element.pair}
              currency={element.currency}
              currencyPrice={element.currencyPrice}
              apy={element.apy}
              liquidity={element.liquidity}
              stake={element.stake}
              unstake={element.unstake}
              claimRewards={element.claimRewards}
            />
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default SelectedFarmList
