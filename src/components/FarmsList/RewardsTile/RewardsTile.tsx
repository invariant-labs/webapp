import { formatNumbers, showPrefix, thresholdsWithTokenDecimal } from '@consts/utils'
import { Button, CardMedia, Grid, Typography } from '@material-ui/core'
import React from 'react'
import loadingAnimation from '@static/gif/loading.gif'
import useStyle from './styles'

export interface IRewardsTile {
  tokenXSymbol: string
  tokenYSymbol: string
  tokenXDecimals: number
  tokenYDecimals: number
  minPrice: number
  maxPrice: number
  tokenXDeposit: number
  tokenYDeposit: number
  valueX: number
  valueY: number
  rewardSymbol: string
  rewardDecimals: number
  onClaimReward: () => void
  rewardIcon: string
  rewardValue: number
  apy: number
  dailyReward: number
}

export interface IProps extends IRewardsTile {
  xToY: boolean
  showRewardsLoader: boolean
  isLoadingApy: boolean
}

export const RewardsTile: React.FC<IProps> = ({
  tokenXSymbol,
  tokenYSymbol,
  tokenXDecimals,
  tokenYDecimals,
  minPrice,
  maxPrice,
  tokenXDeposit,
  tokenYDeposit,
  valueX,
  valueY,
  rewardSymbol,
  rewardDecimals,
  onClaimReward,
  rewardIcon,
  rewardValue,
  xToY,
  showRewardsLoader,
  apy,
  isLoadingApy,
  dailyReward
}) => {
  const classes = useStyle()

  const data = xToY
    ? {
        firstSymbol: tokenXSymbol,
        secondSymbol: tokenYSymbol,
        max: maxPrice,
        min: minPrice,
        value: valueX,
        firstDecimals: tokenXDecimals,
        secondDecimals: tokenYDecimals
      }
    : {
        firstSymbol: tokenYSymbol,
        secondSymbol: tokenXSymbol,
        max: 1 / maxPrice,
        min: 1 / minPrice,
        value: valueY,
        firstDecimals: tokenYDecimals,
        secondDecimals: tokenXDecimals
      }

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.positionInfo} container>
        <Grid className={classes.leftSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Min price:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(data.secondDecimals))(data.min.toString())}
              {showPrefix(data.min)} {data.secondSymbol}/{data.firstSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Max price:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(data.secondDecimals))(data.max.toString())}
              {showPrefix(data.max)} {data.secondSymbol}/{data.firstSymbol}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>APY for position:</Typography>
            {isLoadingApy ? (
              <img src={loadingAnimation} className={classes.smallLoading} />
            ) : (
              <Typography className={classes.value}>
                {apy > 1000 ? '>1000' : apy.toFixed(2)}%
              </Typography>
            )}
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>{rewardSymbol} per day:</Typography>
            {isLoadingApy ? (
              <img src={loadingAnimation} className={classes.smallLoading} />
            ) : (
              <Typography className={classes.value}>
                {formatNumbers(thresholdsWithTokenDecimal(rewardDecimals))(dailyReward.toString())}
                {showPrefix(dailyReward)}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid className={classes.rightSide} container direction='column'>
          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>{tokenXSymbol} deposit:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenXDecimals))(tokenXDeposit.toString())}
              {showPrefix(tokenXDeposit)}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>{tokenYSymbol} deposit:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(tokenYDecimals))(tokenYDeposit.toString())}
              {showPrefix(tokenYDeposit)}
            </Typography>
          </Grid>

          <Grid className={classes.row} container wrap='nowrap'>
            <Typography className={classes.label}>Value:</Typography>
            <Typography className={classes.value}>
              {formatNumbers(thresholdsWithTokenDecimal(data.firstDecimals))(data.value.toString())}
              {showPrefix(data.value)} {data.firstSymbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Typography className={classes.profit}>Current profit</Typography>
      <Grid className={classes.tokenContainer}>
        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <Typography className={classes.tokenName}>
              <CardMedia image={rewardIcon} className={classes.tokenImg} />
              <Typography className={classes.tokenName}>{rewardSymbol}</Typography>
            </Typography>
          </Grid>
          {showRewardsLoader ? (
            <img src={loadingAnimation} className={classes.loading} />
          ) : (
            <Typography className={classes.tokenValue}>
              {formatNumbers(thresholdsWithTokenDecimal(rewardDecimals))(rewardValue.toString())}
              {showPrefix(rewardValue)}
            </Typography>
          )}
        </Grid>
        <Button className={classes.claimRewards} onClick={onClaimReward}>
          Claim rewards
        </Button>
      </Grid>
    </Grid>
  )
}

export default RewardsTile
