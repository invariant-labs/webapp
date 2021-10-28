import { Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import FailedIcon from '@material-ui/icons/HighlightOffOutlined'

import useStyles from './style'
import { BoxInfo } from './BoxInfo'
interface ILiquidityItem {
  active: boolean
  nameToSwap: string
  nameFromSwap: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem
  liquidity: number
  unclaimedFee: number
}

export const SinglePositionDetails: React.FC<IProp> = ({ data, liquidity, unclaimedFee }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={icons[`${data.nameToSwap}`]} alt={data.nameToSwap} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img
            className={classes.icon}
            src={icons[`${data.nameFromSwap}`]}
            alt={data.nameFromSwap}
          />
          <Grid className={classes.namesGrid}>
            <Typography className={classes.name}>{data.nameToSwap}</Typography>
            <Typography id='pause' className={classes.name}>
              -
            </Typography>
            <Typography className={classes.name}>{data.nameFromSwap}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.headerText}>
          <Grid className={classes.rangeGrid}>
            <Typography className={classNames(classes.text, classes.feeText)}>
              {data.fee}% fee
            </Typography>
          </Grid>
          <Grid className={classNames(classes.rangeGrid, classes.closedText)}>
            <Typography className={classes.text}>
              <FailedIcon />
              Closed
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          value={liquidity}
          nameToSwap={data.nameToSwap}
          nameFromSwap={data.nameFromSwap}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          value={unclaimedFee}
          nameToSwap={data.nameToSwap}
          nameFromSwap={data.nameFromSwap}
        />
      </Grid>
    </Grid>
  )
}
