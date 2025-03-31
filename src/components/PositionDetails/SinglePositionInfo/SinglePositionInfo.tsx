import { Button, Grid, Hidden, Typography } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { BoxInfo } from './BoxInfo'
import { ILiquidityToken } from './consts'
import useStyles from './style'
import { useNavigate } from 'react-router-dom'
import { TokenPriceData } from '@store/consts/types'
import icons from '@static/icons'
import { addressToTicker, ROUTES } from '@utils/utils'
import { NetworkType } from '@store/consts/static'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import { TooltipInv } from '@components/TooltipHover/TooltipInv'

interface IProp {
  fee: number
  onClickClaimFee: () => void
  closePosition: (claimFarmRewards?: boolean) => void
  tokenX: ILiquidityToken
  tokenY: ILiquidityToken
  tokenXPriceData?: TokenPriceData
  tokenYPriceData?: TokenPriceData
  xToY: boolean
  swapHandler: () => void
  showFeesLoader?: boolean
  isBalanceLoading: boolean
  isActive: boolean
  network: NetworkType
}

const SinglePositionInfo: React.FC<IProp> = ({
  fee,
  onClickClaimFee,
  closePosition,
  tokenX,
  tokenY,
  tokenXPriceData,
  tokenYPriceData,
  xToY,
  swapHandler,
  showFeesLoader = false,
  isBalanceLoading,
  isActive,
  network
}) => {
  const navigate = useNavigate()

  const { classes } = useStyles()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Grid className={classes.iconsGrid}>
          <Grid className={classes.tickerContainer}>
            <img
              className={classes.icon}
              src={xToY ? tokenX.icon : tokenY.icon}
              alt={xToY ? tokenX.name : tokenY.name}
            />
            <TooltipHover title='Reverse tokens'>
              <img
                className={classes.arrowIcon}
                src={icons.swapListIcon}
                alt='Reverse tokens'
                onClick={swapHandler}
              />
            </TooltipHover>
            <img
              className={classes.icon}
              src={xToY ? tokenY.icon : tokenX.icon}
              alt={xToY ? tokenY.name : tokenX.name}
            />
            <Grid className={classes.namesGrid}>
              <Typography className={classes.name}>
                {xToY ? tokenX.name : tokenY.name} - {xToY ? tokenY.name : tokenX.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.rangeGrid} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <TooltipInv
              title={
                isActive ? (
                  <>
                    The position is <b>active</b> and currently <b>earning a fee</b> as long as the
                    current price is <b>within</b> the position's price range.
                  </>
                ) : (
                  <>
                    The position is <b>inactive</b> and <b>not earning a fee</b> as long as the
                    current price is <b>outside</b> the position's price range.
                  </>
                )
              }
              placement='top'
              top={1}>
              <Typography
                className={classNames(
                  classes.text,
                  classes.feeText,
                  isActive ? classes.active : null
                )}>
                {fee.toString()}% fee
              </Typography>
            </TooltipInv>
          </Grid>
        </Grid>

        <Grid className={classes.headerButtons}>
          <Grid className={classes.rangeGrid} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <TooltipInv
              title={
                isActive ? (
                  <>
                    The position is <b>active</b> and currently <b>earning a fee</b> as long as the
                    current price is <b>within</b> the position's price range.
                  </>
                ) : (
                  <>
                    The position is <b>inactive</b> and <b>not earning a fee</b> as long as the
                    current price is <b>outside</b> the position's price range.
                  </>
                )
              }
              placement='top'
              top={1}>
              <Typography
                className={classNames(
                  classes.text,
                  classes.feeText,
                  isActive ? classes.active : null
                )}>
                {fee.toString()}% fee
              </Typography>
            </TooltipInv>
          </Grid>
          <TooltipHover
            title={
              tokenX.claimValue > 0 || tokenY.claimValue > 0
                ? 'Unclaimed fees will be returned when closing the position'
                : ''
            }>
            <Button
              className={classes.closeButton}
              variant='contained'
              onClick={() => {
                closePosition()
              }}>
              Close position
            </Button>
          </TooltipHover>
          <Hidden smUp>
            <Button
              className={classes.button}
              variant='contained'
              onClick={() => {
                const address1 = addressToTicker(network, tokenX.name)
                const address2 = addressToTicker(network, tokenY.name)

                navigate(ROUTES.getNewPositionRoute(address1, address2, fee.toString()))
              }}>
              <span className={classes.buttonText}>+ Add Position</span>
            </Button>
          </Hidden>
        </Grid>
      </Grid>
      <Grid className={classes.bottomGrid}>
        <BoxInfo
          title={'Liquidity'}
          tokenA={
            xToY
              ? { ...tokenX, value: tokenX.liqValue, price: tokenXPriceData?.price }
              : { ...tokenY, value: tokenY.liqValue, price: tokenYPriceData?.price }
          }
          tokenB={
            xToY
              ? { ...tokenY, value: tokenY.liqValue, price: tokenYPriceData?.price }
              : { ...tokenX, value: tokenX.liqValue, price: tokenXPriceData?.price }
          }
          showBalance
          swapHandler={swapHandler}
          isBalanceLoading={isBalanceLoading}
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
          showLoader={showFeesLoader}
          isBalanceLoading={isBalanceLoading}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionInfo
