import { printBN } from '@consts/utils'
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

interface IPositionsItem {
  icon: string
  decimals: number
  value: BN
  symbol: string
  secondIcon: string
  secondValue: BN
  secondSymbol: string
  redeemable: BN
  vestPeriod: string
}

const PositionsItem: React.FC<IPositionsItem> = ({
  icon,
  decimals,
  value,
  symbol,
  secondIcon,
  secondValue,
  secondSymbol,
  redeemable,
  vestPeriod
}) => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container className={classes.container}>
      <Grid className={classes.bought}>
        {isExSmall ? null : (
          <Grid>
            <img src={icon} />
          </Grid>
        )}
        <Typography>
          {printBN(value, decimals)} {symbol}
        </Typography>
      </Grid>

      {isExSmall ? null : (
        <Grid>
          <Grid>
            <img src={secondIcon} />
          </Grid>
          <Typography>
            {printBN(secondValue, decimals)} {secondSymbol}
          </Typography>
        </Grid>
      )}

      <Grid className={classes.redeemable}>{printBN(redeemable, decimals)}</Grid>
      <Grid>{vestPeriod} days</Grid>
      <Button className={classes.redeemButton}>Redeem</Button>
    </Grid>
  )
}

export default PositionsItem
