import ClosePositionWarning from '@components/Modals/ClosePositionWarning/ClosePositionWarning'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'
import icons from '@static/icons'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BoxInfo } from './BoxInfo'
import { ILiquidityToken } from './consts'
import useStyles from './style'
import { TokenPriceData } from '@consts/utils'

interface IProp {
  fee: number
  onClickClaimFee: () => void
  closePosition: (claimFarmRewards?: boolean) => void
  tokenX: ILiquidityToken
  tokenXPriceData?: TokenPriceData
  tokenY: ILiquidityToken
  tokenYPriceData?: TokenPriceData
  xToY: boolean
  swapHandler: () => void
  showFeesLoader?: boolean
  isBalanceLoading?: boolean
  userHasStakes?: boolean
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
  isBalanceLoading = false,
  userHasStakes = false
}) => {
  const history = useHistory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <ClosePositionWarning
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          unblurContent()
        }}
        onClose={() => {
          closePosition()
          setIsModalOpen(false)
          unblurContent()
        }}
        onClaim={() => {
          closePosition(true)
          setIsModalOpen(false)
          unblurContent()
        }}
      />
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
          <Grid className={classes.rangeGrid}>
            <Typography className={classNames(classes.text, classes.feeText)}>
              {fee}% fee
            </Typography>
          </Grid>
        </Grid>

        <Grid className={classes.headerButtons}>
          <Button
            className={classes.closeButton}
            variant='contained'
            onClick={() => {
              if (!userHasStakes) {
                closePosition()
              } else {
                setIsModalOpen(true)
                blurContent()
              }
            }}>
            Close position
          </Button>
          <Hidden smUp>
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
            xToY
              ? { ...tokenX, value: tokenX.claimValue, price: tokenXPriceData?.price }
              : { ...tokenY, value: tokenY.claimValue, price: tokenYPriceData?.price }
          }
          tokenB={
            xToY
              ? { ...tokenY, value: tokenY.claimValue, price: tokenYPriceData?.price }
              : { ...tokenX, value: tokenX.claimValue, price: tokenXPriceData?.price }
          }
          onClickButton={onClickClaimFee}
          showLoader={showFeesLoader}
        />
      </Grid>
    </Grid>
  )
}

export default SinglePositionInfo
