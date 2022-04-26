import React from 'react'
import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core'
import { colors, theme } from '@static/theme'
import { SwapToken } from '@selectors/solanaWallet'
import { formatNumbers, FormatNumberThreshold, showPrefix, trimLeadingZeros } from '@consts/utils'
import { useStyles } from './style'

export interface IBondItem {
  bondToken: SwapToken
  quoteToken: SwapToken
  remaining: number
  supply: number
  vesting: string
  onBondClick: () => void
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

const BondItem: React.FC<IBondItem> = ({
  bondToken,
  quoteToken,
  remaining,
  supply,
  vesting,
  onBondClick
}) => {
  const classes = useStyles()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container style={{ color: colors.white.main }} className={classes.container}>
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
      <Grid className={classes.purchased}>
        <Typography>
          {trimLeadingZeros(formatNumbers(thresholds)(remaining.toString()))}
          {showPrefix(remaining)} {bondToken.symbol}
        </Typography>
      </Grid>
      {!isSmall ? (
        <Grid className={classes.purchased}>
          <Typography>
            {trimLeadingZeros(formatNumbers(thresholds)(supply.toString()))}
            {showPrefix(supply)} {bondToken.symbol}
          </Typography>
        </Grid>
      ) : null}

      {!isExSmall ? (
        <Grid className={classes.purchased}>
          <Typography>{vesting}</Typography>
        </Grid>
      ) : null}

      <Button className={classes.bondButton} onClick={onBondClick}>
        Bond
      </Button>
    </Grid>
  )
}
export default BondItem
