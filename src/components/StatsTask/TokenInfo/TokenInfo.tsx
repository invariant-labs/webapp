import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import TokenDetails from '../TokenDetails/TokenDetails'
import TokenChart from '../TokenChart/TokenChart'
import useStyles from './style'

interface TokenInfoInterface {
  percentChart: number
  volumeChart: number
  positions: Array<{
    id: string
    data: Array<{
      x: string
      y: number
    }>
  }>
  currency: string
  valueAmount: number
  valueBalanceBefore: number
  valueBalanceAfter: number
}

const TokenInfo: React.FC<TokenInfoInterface> = ({
  percentChart,
  volumeChart,
  positions,
  currency,
  valueAmount,
  valueBalanceBefore,
  valueBalanceAfter
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction='column'>
      <Typography className={classes.volumeHeader}>Heading 2</Typography>
      <Grid container className={classes.tokenDetails}>
        <TokenDetails
          currency={currency}
          valueAmount={valueAmount}
          valueBalanceBefore={valueBalanceBefore}
          valueBalanceAfter={valueBalanceAfter}
        />
      </Grid>
      <Grid container className={classes.tokenChart}>
        <TokenChart percentChart={percentChart} volumeChart={volumeChart} positions={positions} />
      </Grid>
    </Grid>
  )
}

export default TokenInfo
