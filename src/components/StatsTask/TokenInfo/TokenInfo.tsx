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
    <Grid className={classes.infoContainer}>
      <Typography className={classes.volumeHeader}>Heading 2</Typography>
      <TokenDetails
        currency={currency}
        valueAmount={valueAmount}
        valueBalanceBefore={valueBalanceBefore}
        valueBalanceAfter={valueBalanceAfter}></TokenDetails>
      <TokenChart
        percentChart={percentChart}
        volumeChart={volumeChart}
        positions={positions}></TokenChart>
    </Grid>
  )
}

export default TokenInfo
