import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import TokenChart from '../TokenChart/TokenChart'
import TokenSummary from '../TokenSummary/TokenSummary'
import useStyles from './style'

interface TokenInfoInterface {
  valueAmount: number
  valueBalanceBefore: number
  valueBalanceAfter: number
  currency: String
  TokenPercent: number
  TokenVolume: number

  positions: Array<{
    id: string
    data: Array<{
      x: string
      y: number
    }>
  }>
}

const TokenSection: React.FC<TokenInfoInterface> = ({
  valueAmount,
  valueBalanceBefore,
  valueBalanceAfter,
  currency,
  TokenPercent,
  TokenVolume,
  positions
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.tokenInfoContainer}>
      <Typography className={classes.tokenHeader}>Heading 2</Typography>
      <Grid container className={classes.tokenSummary}>
        <TokenSummary
          valueAmount={valueAmount}
          valueBalanceBefore={valueBalanceBefore}
          valueBalanceAfter={valueBalanceAfter}
          currency={currency}></TokenSummary>
      </Grid>
      <Grid className={classes.tokenChart}>
        <TokenChart
          TokenPercent={TokenPercent}
          TokenVolume={TokenVolume}
          positions={positions}></TokenChart>
      </Grid>
    </Grid>
  )
}

export default TokenSection
