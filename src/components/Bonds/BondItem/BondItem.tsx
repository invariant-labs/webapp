import React from 'react'
import { printBN } from '@consts/utils'
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { colors, theme } from '@static/theme'
import { useStyles } from './style'

interface BondItem {
  icon: string
  secoundIcon: string
  symbol: string
  secoundSymbol: string
  decimals: number
  price: number
  roiPercent: string
  purchased: string
  vesting: string
}

const BondItem: React.FC<BondItem> = ({
  icon,
  secoundIcon,
  symbol,
  secoundSymbol,
  decimals,
  price,
  roiPercent,
  purchased,
  vesting
}) => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  {
    console.log(window.screen.width)
  }
  return (
    <Grid container style={{ color: colors.white.main }} className={classes.container}>
      <Grid className={classes.itemList}>
        <Grid className={classes.iconItems}>
          {isExSmall ? (
            ''
          ) : (
            <>
              <Grid item>
                <img src={icon} />
              </Grid>
              <Grid className={classes.icon} item>
                <img src={secoundIcon} />
              </Grid>
            </>
          )}
          <Grid className={classes.symbol}>
            <Typography>
              {symbol}/{secoundSymbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.price}>
        {printBN(new BN(price), decimals)} {symbol} per {secoundSymbol}
      </Grid>
      <Grid className={classes.roi}>+{roiPercent}%</Grid>
      {!isExSmall ? (
        <>
          <Typography className={classes.purchased}>${purchased}</Typography>
        </>
      ) : (
        <></>
      )}

      {!isSmall ? (
        <>
          <Grid className={classes.days}>{!isSmall && <span>{vesting} days</span>}</Grid>
        </>
      ) : (
        <></>
      )}

      <Button className={classes.bondButton}>Bond</Button>
    </Grid>
  )
}
export default BondItem
