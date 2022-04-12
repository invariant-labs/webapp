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
  price,
  roiPercent,
  supply,
  vesting,
  onBondClick
}) => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container style={{ color: colors.white.main }} className={classes.container}>
      <Grid className={classes.itemList}>
        <Grid className={classes.iconItems}>
          {isExSmall ? null : (
            <>
              <Grid item>
                <img src={bondToken.logoURI} />
              </Grid>
              <Grid className={classes.icon} item>
                <img src={quoteToken.logoURI} />
              </Grid>
            </>
          )}
          <Grid className={classes.symbol}>
            <Typography className={classes.secondSymbol}>
              {bondToken.symbol}/{quoteToken.symbol}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.price}>
        {price} {bondToken.symbol}/{quoteToken.symbol}
      </Grid>
      {!isExSmall ? <Grid className={classes.roi}>+{roiPercent}%</Grid> : null}
      {!isExSmall ? (
        <Typography className={classes.purchased}>
          {supply} {bondToken.symbol}
        </Typography>
      ) : null}

      {!isSmall ? (
        <Grid className={classes.days}>{!isSmall && <span>{vesting}</span>}</Grid>
      ) : null}

      <Button className={classes.bondButton} onClick={onBondClick}>
        Bond
      </Button>
    </Grid>
  )
}
export default BondItem
