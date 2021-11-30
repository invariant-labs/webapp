import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { BoxInfo } from './BoxInfo'
import useStyles from './style'
export interface ILiquidityItem {
  nameToSwap: string
  iconToSwap: string
  nameFromSwap: string
  iconFromSwap: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem
  onClickClaimFee: () => void
  closePosition: () => void
  liqValueTokenToSwap: number
  liqValueTokenFromSwap: number
  unclaimValueTokenToSwap: number
  unclaimValueTokenFromSwap: number
}

const SinglePositionInfo: React.FC<IProp> = ({
  data,
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
          <img className={classes.icon} src={data.iconToSwap} alt={data.nameToSwap} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img
            className={classes.icon}
            src={data.iconFromSwap}
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
          <Button className={classes.closeButton} variant='contained' onClick={closePosition}>
              Close position
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          nameToSwap={data.nameToSwap}
          iconToSwap={data.iconToSwap}
          nameFromSwap={data.nameFromSwap}
          iconFromSwap={data.iconFromSwap}
          valueTokenToSwap={liqValueTokenToSwap}
          valueTokenFromSwap={liqValueTokenFromSwap}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          nameToSwap={data.nameToSwap}
          iconToSwap={data.iconToSwap}
          nameFromSwap={data.nameFromSwap}
          iconFromSwap={data.iconFromSwap}
          onClickClaimFee={onClickClaimFee}
          valueTokenToSwap={unclaimValueTokenToSwap}
          valueTokenFromSwap={unclaimValueTokenFromSwap}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionInfo
