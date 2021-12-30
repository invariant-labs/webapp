import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Token } from '@consts/static'
import { Link } from 'react-router-dom'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import useStyle from './style'
import classNames from 'classnames'

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
    <Grid className={classes.root}>
      <Grid className={classes.top}>
        <Grid>
          <img src={tokenX.logoURI} className={classes.icon} />
          <img src={tokenY.logoURI} className={classes.icon} />
        </Grid>
        <Typography className={classes.names}>{tokenX.symbol}-{tokenY.symbol}</Typography>
        <Grid>
          <DotIcon className={classNames(classes.dot, isActive ? classes.greenDot : classes.greyDot)} />
          <Typography className={classNames(classes.activity, isActive ? classes.greenText : classes.greyText)}>{isActive ? 'Active' : 'Inactive'}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.infoRow}>
        <Typography className={classes.label}>APY:</Typography>
        <Typography className={classes.value}>{apyPercent}%</Typography>
      </Grid>
      <Grid className={classes.infoRow}>
        <Typography className={classes.label}>Total Staked:</Typography>
        <Typography className={classes.value}>{totalStaked}</Typography>
      </Grid>
      <Grid className={classes.infoRow}>
        <Typography className={classes.label}>Liquidity:</Typography>
        <Typography className={classes.value}>{liquidity}</Typography>
      </Grid>
      <Link className={classes.link} to={`/farms/${farmId}`}>
        <a>
          <Button
            className={classes.button}
            disabled={!isActive}
          >
            Stake
          </Button>
        </a>
      </Link>
    </Grid>
  )
}

export default FarmTile
