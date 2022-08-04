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
import loadingAnimation from '@static/gif/loading.gif'
import useStyle from './style'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'

export interface ISelectedFarmList {
  tokenX: Token
  tokenY: Token
  rewardToken: Token
  duration: string
  totalStakedInXToken: number
  totalStakedInYToken: number
  userStakedInXToken: number
  userStakedInYToken: number
  averageApy: number
  singleTickApy: number
  toStake: IStakedTile[]
  stakedPositions: IRewardsTile[]
  stakesLoading?: boolean
  walletConnected?: boolean
  isLoadingTotals?: boolean
  totalPositions: number
  noConnectedBlockerProps: INoConnected
  isLoadingRangeTicks?: boolean
  isLoadingFarmApy?: boolean
  isLoadingStakesApy?: boolean
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
  averageApy,
  singleTickApy,
  toStake,
  stakedPositions,
  stakesLoading = false,
  walletConnected = false,
  isLoadingTotals = false,
  totalPositions,
  noConnectedBlockerProps,
  isLoadingRangeTicks = false,
  isLoadingFarmApy = false,
  isLoadingStakesApy = false
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
            <Typography className={classes.value}>{totalPositions}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Average APY:</Typography>
            {isLoadingFarmApy ? (
              <img src={loadingAnimation} className={classes.loading} />
            ) : (
              <Typography className={classes.value}>{averageApy.toFixed(2)}%</Typography>
            )}
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Single tick APY:</Typography>
            {isLoadingFarmApy ? (
              <img src={loadingAnimation} className={classes.loading} />
            ) : (
              <Typography className={classes.value}>{singleTickApy.toFixed(2)}%</Typography>
            )}
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Reward token:</Typography>
            <img src={rewardToken.logoURI} className={classes.smallIcon} />
            <Typography className={classes.value}>{rewardToken.symbol}</Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Total staked:</Typography>
            {isLoadingTotals ? (
              <img src={loadingAnimation} className={classes.loading} />
            ) : (
              <Typography className={classes.value}>
                {formatNumbers(thresholdsWithTokenDecimal(totalsData.totalDecimals))(
                  totalsData.totalStaked.toString()
                )}
                {showPrefix(totalsData.totalStaked)} {totalsData.totalSymbol}
              </Typography>
            )}
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
          ) : totalPositions > 0 ? (
            <>
              {stakedPositions.length ? (
                <>
                  <Typography className={classes.listHeader}>Your staked positions</Typography>
                  {stakedPositions.map((element, index) => (
                    <div className={classes.tile}>
                      <RewardsTile
                        key={index}
                        {...element}
                        xToY={xToY}
                        showRewardsLoader={isLoadingRangeTicks}
                        isLoadingApy={isLoadingStakesApy}
                      />
                    </div>
                  ))}
                </>
              ) : null}

              {toStake.length ? (
                <>
                  <Typography className={classes.listHeader}>Positions to stake</Typography>
                  {toStake.map((element, index) => (
                    <div className={classes.tile}>
                      <StakeTile key={index} {...element} xToY={xToY} />
                    </div>
                  ))}
                </>
              ) : null}
            </>
          ) : (
            <EmptyPlaceholder
              desc='You have no positions for this farm'
              className={classes.noWalletEmpty}
            />
          )
        ) : (
          <NoConnected
            {...noConnectedBlockerProps}
            descCustomText='You are unable to stake positions.'
          />
        )}
      </Grid>
    </Grid>
  )
}

export default SelectedFarmList
