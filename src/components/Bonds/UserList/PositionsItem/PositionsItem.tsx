import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { SwapToken } from '@selectors/solanaWallet'
import { theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

export interface IPositionsItem {
  bondToken: SwapToken
  quoteToken: SwapToken
  bought: number
  redeemable: number
  vestPeriod: string
  onRedeemClick: () => void
}

const PositionsItem: React.FC<IPositionsItem> = ({
  bondToken,
  quoteToken,
  bought,
  redeemable,
  vestPeriod,
  onRedeemClick
}) => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container className={classes.container}>
      {isExSmall ? null : (
        <Grid className={classes.iconItems}>
          <img src={bondToken.logoURI} />
          <img className={classes.icon} src={quoteToken.logoURI} />
          <Typography>
            {bondToken.symbol}/{quoteToken.symbol}
          </Typography>
        </Grid>
      )}

      <Grid>
        {isExSmall ? null : (
            <img src={bondToken.logoURI} />
        )}
        <Typography>
          {bought} {bondToken.symbol}
        </Typography>
      </Grid>

      <Typography className={classes.redeemable}>{redeemable}</Typography>
      <Typography>{vestPeriod}</Typography>
      <Button className={classes.redeemButton} onClick={onRedeemClick}>
        Redeem
      </Button>
    </Grid>
  )
}

export default PositionsItem
