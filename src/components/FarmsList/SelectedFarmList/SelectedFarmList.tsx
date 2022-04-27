import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import RewardsTile, { IRewardsTile } from '../RewardsTile/RewardsTile'
import StakeTile, { IStakedTile } from '../StakeTile/StakeTile'
import backIcon from '@static/svg/back-arrow.svg'
import { Link } from 'react-router-dom'
import loader from '@static/gif/loader.gif'
import useStyle from './style'
import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'

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
  stakesLoading?: boolean
  walletConnected?: boolean
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
  stakedPositions,
  stakesLoading = false,
  walletConnected = false
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.root}>
      <Link to='/farms' style={{ textDecoration: 'none' }}>
        <Grid className={classes.back} container item alignItems='center'>
          <img className={classes.backIcon} src={backIcon} />
          <Typography className={classes.backText}>Back to Farms List</Typography>
        </Grid>
      </Link>
      <Grid
        className={classes.header}
        container
        justifyContent='flex-start'
        alignItems='center'
        wrap='nowrap'>
        <img src={tokenXIcon} alt={'Token in pool'} className={classes.bigIcon} />
        <img
          src={tokenYIcon}
          alt={'Token in pool'}
          className={classNames(classes.bigIcon, classes.secondBig)}
        />
        <Typography className={classes.title}>
          {tokenXSymbol}-{tokenYSymbol}
        </Typography>
      </Grid>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Farm duration:</Typography>
            <Typography className={classes.value}>{duration}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total positions:</Typography>
            <Typography className={classes.value}>
              {toStake.length + stakedPositions.length}
            </Typography>
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
            <Typography className={classes.value}>
              {formatNumbers()(totalRewardPerDay.toString())}
              {showPrefix(totalRewardPerDay)} {rewardSymbol}/day
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total staked:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(totalStaked.toString())}
              {showPrefix(totalStaked)} {tokenXSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Your staked:</Typography>
            <Typography className={classes.value}>
              {formatNumbers()(userStaked.toString())}
              {showPrefix(userStaked)} {tokenXSymbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction='column' alignItems='center' className={classes.containers}>
        {walletConnected ? (
          stakesLoading ? (
            <img src={loader} style={{ width: 150, height: 150, margin: 'auto' }} />
          ) : (
            <>
              <Typography className={classes.listHeader}>Your staked positions</Typography>

              {stakedPositions.length ? (
                stakedPositions.map((element, index) => (
                  <div className={classes.tile}>
                    <RewardsTile key={index} {...element} />
                  </div>
                ))
              ) : (
                <EmptyPlaceholder desc='You have no positions staked on this farm' className={classes.empty} />
              )}

              <Typography className={classes.listHeader}>Positions to stake</Typography>

              {toStake.length ? (
                toStake.map((element, index) => (
                  <div className={classes.tile}>
                    <StakeTile key={index} {...element} />
                  </div>
                ))
              ) : (
                <EmptyPlaceholder desc='You have no more positions available to stake on this farm' className={classes.empty} />
              )}
            </>
          )
        ) : (
          <EmptyPlaceholder desc='Connect wallet to stake on this farm' />
        )}
      </Grid>
    </Grid>
  )
}

export default SelectedFarmList
