import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { BoxInfo } from './BoxInfo'
import { ILiquidityToken } from './consts'
import useStyles from './style'

interface IProp {
  fee: number
  onClickClaimFee: () => void
  closePosition: () => void
  tokenX: ILiquidityToken
  tokenY: ILiquidityToken
  xToY: boolean
  swapHandler: () => void
}

const SinglePositionInfo: React.FC<IProp> = ({
  fee,
  onClickClaimFee,
  closePosition,
  tokenX,
  tokenY,
  xToY,
  swapHandler
}) => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Grid className={classes.iconsGrid}>
          <img
            className={classes.icon}
            src={xToY ? tokenX.icon : tokenY.icon}
            alt={xToY ? tokenX.name : tokenY.name}
          />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img
            className={classes.icon}
            src={xToY ? tokenY.icon : tokenX.icon}
            alt={xToY ? tokenY.name : tokenX.name}
          />
          <Grid className={classes.namesGrid}>
            <Typography className={classes.name}>{xToY ? tokenX.name : tokenY.name}</Typography>
            <Typography id='pause' className={classes.name}>
              -
            </Typography>
            <Typography className={classes.name}>{xToY ? tokenY.name : tokenX.name}</Typography>
          </Grid>
        </Grid>

        <Grid className={classes.headerText}>
          <Grid className={classes.rangeGrid}>
            <Typography className={classNames(classes.text, classes.feeText)}>
              {fee}% fee
            </Typography>
          </Grid>
          <Button className={classes.closeButton} variant='contained' onClick={closePosition}>
            Close position
          </Button>
          <Hidden mdUp>
            {' '}
            <Button
              className={classes.button}
              variant='contained'
              onClick={() => {
                history.push('/newPosition')
              }}>
              <span className={classes.buttonText}>+ Add Liquidity</span>
            </Button>
          </Hidden>
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          tokenA={
            xToY ? { ...tokenX, value: tokenX.liqValue } : { ...tokenY, value: tokenY.liqValue }
          }
          tokenB={
            xToY ? { ...tokenY, value: tokenY.liqValue } : { ...tokenX, value: tokenX.liqValue }
          }
          showBalance
          swapHandler={swapHandler}
        />
        <BoxInfo
          title={'Unclaimed fees'}
          tokenA={
            xToY ? { ...tokenX, value: tokenX.claimValue } : { ...tokenY, value: tokenY.claimValue }
          }
          tokenB={
            xToY ? { ...tokenY, value: tokenY.claimValue } : { ...tokenX, value: tokenX.claimValue }
          }
          onClickButton={onClickClaimFee}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionInfo
