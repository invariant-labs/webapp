import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { BoxInfo } from './BoxInfo'
import useStyles from './style'
export interface ILiquidityItem {
  tokenXName: string
  tokenXIcon: string
  tokenYName: string
  tokenYIcon: string
  tokenXDecimal: number
  tokenYDecimal: number
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem
  onClickClaimFee: () => void
  closePosition: () => void
  tokenXLiqValue: number
  tokenYLiqValue: number
  tokenXClaimValue: number
  tokenYClaimValue: number
}

const SinglePositionInfo: React.FC<IProp> = ({
  data,
  onClickClaimFee,
  closePosition,
  tokenYLiqValue,
  tokenXLiqValue,
  tokenYClaimValue,
  tokenXClaimValue
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={data.tokenXIcon} alt={data.tokenXName} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img
            className={classes.icon}
            src={data.tokenYIcon}
            alt={data.tokenYName}
          />
          <Grid className={classes.namesGrid}>
            <Typography className={classes.name}>{data.tokenXName}</Typography>
            <Typography id='pause' className={classes.name}>
              -
            </Typography>
            <Typography className={classes.name}>{data.tokenYName}</Typography>
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
          tokenXName={data.tokenXName}
          tokenXIcon={data.tokenXIcon}
          tokenXDecimal={data.tokenXDecimal}
          tokenYName={data.tokenYName}
          tokenYIcon={data.tokenYIcon}
          tokenYDecimal={data.tokenYDecimal}
          tokenXValue={tokenXLiqValue}
          tokenYValue={tokenYLiqValue}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          tokenXName={data.tokenXName}
          tokenXIcon={data.tokenXIcon}
          tokenXDecimal={data.tokenXDecimal}
          tokenYName={data.tokenYName}
          tokenYIcon={data.tokenYIcon}
          tokenYDecimal={data.tokenXDecimal}
          onClickButton={onClickClaimFee}
          tokenXValue={tokenXClaimValue}
          tokenYValue={tokenYClaimValue}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionInfo
