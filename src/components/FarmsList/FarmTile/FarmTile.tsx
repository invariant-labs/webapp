import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Token } from '@consts/static'
import { Link } from 'react-router-dom'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import classNames from 'classnames'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

import useStyle from './style'

export interface IFarm {
  isActive?: boolean
  apyPercent: number
  totalStaked: number
  yourStaked: number
  tokenX: Token
  tokenY: Token
  farmId: string
  rewardSymbol: string
  rewardIcon: string
}

export const FarmTile: React.FC<IFarm> = ({
  isActive = false,
  apyPercent,
  totalStaked,
  yourStaked,
  tokenX,
  tokenY,
  farmId,
  rewardSymbol,
  rewardIcon
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid
        className={classes.top}
        container
        direction='row'
        justifyContent='space-between'
        wrap='nowrap'>
        <Grid className={classes.flexWrapper}>
          <Grid className={classes.icons}>
            <img src={tokenX.logoURI} className={classes.icon} />
            <img src={tokenY.logoURI} className={classes.icon} />
          </Grid>
          <Typography className={classes.names}>
            {tokenX.symbol}-{tokenY.symbol}
          </Typography>
        </Grid>
        <Grid className={classes.activityWrapper}>
          {isActive ? <Grid className={classes.pulseDot} /> : <DotIcon className={classes.dot} />}
          <Typography
            className={classNames(
              classes.activity,
              isActive ? classes.greenText : classes.greyText
            )}>
            {isActive ? 'Active' : 'Inactive'}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className={classes.rewardRow}
        container
        justifyContent='space-between'
        alignItems='center'>
        <Typography className={classes.rewardLabel}>Reward token:</Typography>
        <Grid className={classes.rewardTokenWrapper}>
          <img className={classes.rewardIcon} src={rewardIcon} />
          <Typography className={classes.rewardToken}>{rewardSymbol}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        wrap='nowrap'
        className={classNames(classes.mobileContainer, classes.spacer)}>
        <Typography className={classes.label}>APY:</Typography>
        <Typography className={classes.value}>{apyPercent}%</Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        wrap='nowrap'
        className={classes.mobileContainer}>
        <Typography className={classes.label}>Total staked:</Typography>
        <Typography className={classes.value}>
          {totalStaked} {tokenX.symbol}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        wrap='nowrap'
        className={classes.mobileContainer}>
        <Typography className={classes.label}>Your staked:</Typography>
        <Typography className={classes.value}>
          {yourStaked} {tokenX.symbol}
        </Typography>
      </Grid>
      <Link className={classes.link} to={`/farm/${farmId}`}>
        <OutlinedButton className={classes.button} disabled={!isActive} name='Details' />
      </Link>
    </Grid>
  )
}

export default FarmTile
