import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { SwapToken } from '@selectors/solanaWallet'
import { theme } from '@static/theme'
import React from 'react'
import { formatNumbers, FormatNumberThreshold, showPrefix, trimLeadingZeros } from '@consts/utils'
import { useStyles } from './style'

export interface IPositionsItem {
  bondToken: SwapToken
  quoteToken: SwapToken
  bought: number
  redeemable: number
  vestingProgress: string
  onRedeemClick: () => void
}

const thresholds: FormatNumberThreshold[] = [
  {
    value: 10,
    decimals: 6
  },
  {
    value: 100,
    decimals: 4
  },
  {
    value: 1000,
    decimals: 2
  },
  {
    value: 10000,
    decimals: 1
  },
  {
    value: 1000000,
    decimals: 2,
    divider: 1000
  },
  {
    value: 1000000000,
    decimals: 2,
    divider: 1000000
  },
  {
    value: Infinity,
    decimals: 2,
    divider: 1000000000
  }
]

const PositionsItem: React.FC<IPositionsItem> = ({
  bondToken,
  quoteToken,
  bought,
  redeemable,
  vestingProgress,
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
        {isExSmall ? null : <img src={bondToken.logoURI} />}
        <Typography>
          {trimLeadingZeros(formatNumbers(thresholds)(bought.toString()))}
          {showPrefix(bought)} {bondToken.symbol}
        </Typography>
      </Grid>

      <Typography className={classes.redeemable}>
        {trimLeadingZeros(formatNumbers(thresholds)(redeemable.toString()))}
        {showPrefix(redeemable)}
      </Typography>
      <Typography>{vestingProgress}</Typography>
      <Button className={classes.redeemButton} onClick={onRedeemClick}>
        Redeem
      </Button>
    </Grid>
  )
}

export default PositionsItem
