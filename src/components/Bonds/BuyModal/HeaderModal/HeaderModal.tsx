import { printBN } from '@consts/utils'
import { Button, Grid, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import React from 'react'
import useStyles from './style'

export interface IHeaderModal {
  symbol: string
  icon: string
  secondSymbol: string
  decimals: number
  price: BN
  pricePercent: number
  purchased: string
  vestingTerm: string
  roi: string
}

const HeaderModal: React.FC<IHeaderModal> = ({
  symbol,
  icon,
  secondSymbol,
  decimals,
  price,
  pricePercent,
  purchased,
  vestingTerm,
  roi
}) => {
  const classes = useStyles()

  return (
    <Grid container classes={{ container: classes.container }}>
      <Grid item className={classes.buy}>
        Buy {symbol}
      </Grid>
      <Typography className={classes.token}>You're paying with</Typography>
      <Grid item>
        <img className={classes.icon} src={icon} /> {secondSymbol}
      </Grid>
      <Typography className={classes.price}>Treasury sell price</Typography>
      <Grid item>
        ${printBN(price, decimals)}
        <Grid className={classes.pricePercent}> -{pricePercent}% </Grid>
      </Grid>
      <Typography className={classes.value}>Supply</Typography>
      <Grid item>
        {purchased} {symbol}
      </Grid>
      <Typography className={classes.slippage}>Slippage</Typography>
      <Grid className={classes.mainInput}>
        <input className={classes.input}></input>
        <Button className={classes.button}>Auto</Button>
      </Grid>
      <Grid className={classes.vesting}>
        <Typography>Vesting term</Typography>
        <Typography>ROI</Typography>
      </Grid>
      <Grid className={classes.roi}>
        <Grid>{vestingTerm} days</Grid>
        <Grid>+{roi}%</Grid>
      </Grid>
    </Grid>
  )
}

export default HeaderModal
