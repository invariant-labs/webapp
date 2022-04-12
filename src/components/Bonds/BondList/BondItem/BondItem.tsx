import React from 'react'
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { colors, theme } from '@static/theme'
import { SwapToken } from '@selectors/solanaWallet'
import { useStyles } from './style'

export interface IBondItem {
  bondToken: SwapToken
  quoteToken: SwapToken
  price: number
  roiPercent: number
  supply: number
  vesting: string
  onBondClick: () => void
}

const BondItem: React.FC<IBondItem> = ({
  bondToken,
  quoteToken,
  roiPercent,
  supply,
  vesting,
  onBondClick
}) => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container style={{ color: colors.white.main }} className={classes.container}>
      <Grid className={classes.itemList}>
        <Grid className={classes.iconItems}>
          {isExSmall ? null : (
            <>
              <img src={bondToken.logoURI} />
              <img className={classes.icon} src={quoteToken.logoURI} />
            </>
          )}
          <Typography className={classes.symbol}>
              {bondToken.symbol}/{quoteToken.symbol}
          </Typography>
        </Grid>
      </Grid>
      <Typography className={classes.roi}>+{roiPercent}%</Typography>
      {!isExSmall ? (
        <Typography className={classes.purchased}>
          {supply} {bondToken.symbol}
        </Typography>
      ) : null}

      {!isExSmall ? (
        <Typography className={classes.days}>
          {vesting}
        </Typography>
      ) : null}

      <Button className={classes.bondButton} onClick={onBondClick}>
        Bond
      </Button>
    </Grid>
  )
}
export default BondItem
