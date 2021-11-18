import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import FailedIcon from '@material-ui/icons/HighlightOffOutlined'

import useStyles from './style'
import { BoxInfo } from './BoxInfo'
export interface ILiquidityItem {
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
  onClickClaimFee: () => void
  closePosition: () => void
  liqValueTokenToSwap: number
  liqValueTokenFromSwap: number
  unclaimValueTokenToSwap: number
  unclaimValueTokenFromSwap: number
}

const SinglePositionDetails: React.FC<IProp> = ({
  data,
  liquidity,
  unclaimedFee,
  onClickClaimFee,
  closePosition,
  liqValueTokenFromSwap,
  liqValueTokenToSwap,
  unclaimValueTokenFromSwap,
  unclaimValueTokenToSwap
}) => {
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
          {data.active ? (
            <Button className={classes.closeButton} variant='contained' onClick={closePosition}>
              Close position
            </Button>
          ) : (
            <Grid className={classNames(classes.rangeGrid, classes.closedText)}>
              <Typography className={classes.text}>
                <FailedIcon className={classes.iconText} />
                Closed
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          value={liquidity}
          nameToSwap={data.nameToSwap}
          nameFromSwap={data.nameFromSwap}
          valueTokenToSwap={liqValueTokenToSwap}
          valueTokenFromSwap={liqValueTokenFromSwap}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          value={unclaimedFee}
          nameToSwap={data.nameToSwap}
          nameFromSwap={data.nameFromSwap}
          onClickClaimFee={onClickClaimFee}
          valueTokenToSwap={unclaimValueTokenToSwap}
          valueTokenFromSwap={unclaimValueTokenFromSwap}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionDetails
