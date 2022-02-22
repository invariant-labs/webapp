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
  liquidity: number
  tokenX: Token
  tokenY: Token
  farmId: string
}

export const FarmTile: React.FC<IFarm> = ({
  isActive = false,
  apyPercent,
  totalStaked,
  liquidity,
  tokenX,
  tokenY,
  farmId
}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.top} container direction='row' justifyContent='space-between'>
        <Grid className={classes.flexWrapper}>
          <Grid className={classes.icons}>
            <img src={tokenX.logoURI} className={classes.icon} />
            <img src={tokenY.logoURI} className={classes.icon} />
          </Grid>
          <Typography className={classes.names}>
            {tokenX.symbol}-{tokenY.symbol}
          </Typography>
        </Grid>
        <Grid className={classes.flexWrapper}>
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
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.mobileContainer, classes.spacer)}>
        <Typography className={classes.label}>APY:</Typography>
        <Typography className={classes.value}>{apyPercent}%</Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classes.mobileContainer}>
        <Typography className={classes.label}>Total Staked:</Typography>
        <Typography className={classes.value}>
          {totalStaked.toLocaleString('fr-FR')} {tokenX.symbol}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classes.mobileContainer}>
        <Typography className={classes.label}>Liquidity:</Typography>
        <Typography className={classes.value}>
          {liquidity.toLocaleString('fr-FR')} {tokenX.symbol}
        </Typography>
      </Grid>
      <Link className={classes.link} to={`/farms/${farmId}`}>
        <OutlinedButton className={classes.button} disabled={!isActive} name='Stake' />
      </Link>
    </Grid>
  )
}

export default FarmTile
