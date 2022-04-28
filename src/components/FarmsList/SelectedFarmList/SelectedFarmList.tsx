import { formatNumbers, showPrefix, thresholdsWithTokenDecimal } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import RewardsTile, { IRewardsTile } from '../RewardsTile/RewardsTile'
import StakeTile, { IStakedTile } from '../StakeTile/StakeTile'
import backIcon from '@static/svg/back-arrow.svg'
import { Link } from 'react-router-dom'
import loader from '@static/gif/loader.gif'
import SwapList from '@static/svg/swap-list.svg'
import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'
import { Token } from '@consts/static'
import useStyle from './style'

export interface ISelectedFarmList {
  tokenX: Token
  tokenY: Token
  rewardToken: Token
  duration: string
  totalStakedInXToken: number
  totalStakedInYToken: number
  userStakedInXToken: number
  userStakedInYToken: number
  totalRewardPerDay: number
  apy: number
  toStake: IStakedTile[]
  stakedPositions: IRewardsTile[]
  stakesLoading?: boolean
  walletConnected?: boolean
}

export const SelectedFarmList: React.FC<ISelectedFarmList> = ({
  tokenX,
  tokenY,
  rewardToken,
  duration,
  totalStakedInXToken,
  totalStakedInYToken,
  userStakedInXToken,
  userStakedInYToken,
  totalRewardPerDay,
  apy,
  toStake,
  stakedPositions,
  stakesLoading = false,
  walletConnected = false
}) => {
  const classes = useStyle()

  const [xToY, setXtoY] = useState(true)

  const totalsData = xToY
    ? {
        totalStaked: totalStakedInXToken,
        userStaked: userStakedInXToken,
        totalSymbol: tokenX.symbol,
        totalDecimals: tokenX.decimals
      }
    : {
        totalStaked: totalStakedInYToken,
        userStaked: userStakedInYToken,
        totalSymbol: tokenY.symbol,
        totalDecimals: tokenY.decimals
      }

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
        <img
          src={xToY ? tokenX.logoURI : tokenY.logoURI}
          alt={'Token in pool'}
          className={classes.bigIcon}
        />
        <img
          className={classes.arrows}
          src={SwapList}
          alt='Arrow'
          onClick={() => {
            setXtoY(!xToY)
          }}
        />
        <img
          src={xToY ? tokenY.logoURI : tokenX.logoURI}
          alt={'Token in pool'}
          className={classes.bigIcon}
        />
        <Typography className={classes.title}>
          {xToY ? tokenX.symbol : tokenY.symbol}-{xToY ? tokenY.symbol : tokenX.symbol}
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
            <img src={rewardToken.logoURI} className={classes.smallIcon} />
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(rewardToken.decimals))(totalRewardPerDay.toString())}
              {showPrefix(totalRewardPerDay)} {rewardToken.symbol}/day
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total staked:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(totalsData.totalDecimals))(
                totalsData.totalStaked.toString()
              )}
              {showPrefix(totalsData.totalStaked)} {totalsData.totalSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Your staked:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(totalsData.totalDecimals))(
                totalsData.userStaked.toString()
              )}
              {showPrefix(totalsData.userStaked)} {totalsData.totalSymbol}
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
                    <RewardsTile key={index} {...element} xToY={xToY} />
                  </div>
                ))
              ) : (
                <EmptyPlaceholder
                  desc='You have no positions staked on this farm'
                  className={classes.empty}
                />
              )}

              <Typography className={classes.listHeader}>Positions to stake</Typography>

              {toStake.length ? (
                toStake.map((element, index) => (
                  <div className={classes.tile}>
                    <StakeTile key={index} {...element} xToY={xToY} />
                  </div>
                ))
              ) : (
                <EmptyPlaceholder
                  desc='You have no more positions available to stake on this farm'
                  className={classes.empty}
                />
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
