import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import infoIcon from '@static/svg/infoBlack.svg'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { useSelector } from 'react-redux'
import useStyles from './styles'
import axios from 'axios'
import { getCurrentNetworkUrl } from '@web3/connection'

export const PerformanceWarning: React.FC = () => {
  const classes = useStyles()

  const [showWarning, setShowWarning] = useState(false)

  const networkStatus = useSelector(status)

  useEffect(() => {
    if (networkStatus === Status.Initialized) {
      axios
        .post<{ result: Array<{ numTransactions: number; samplePeriodSecs: number }> }>(
          getCurrentNetworkUrl(),
          {
            jsonrpc: '2.0',
            id: 1,
            method: 'getRecentPerformanceSamples',
            params: [5]
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then(({ data: { result } }) => {
          let tpsSum: number = 0

          result.forEach(sample => {
            tpsSum += sample.numTransactions / sample.samplePeriodSecs
          })

          if (tpsSum / result.length < 2000) {
            setShowWarning(true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [networkStatus])
  return showWarning ? (
    <Grid container direction='row' justifyContent='center' className={classes.banner}>
      <Typography className={classes.text}>
        <img src={infoIcon} className={classes.icon} />
        Solana network is experiencing degraded performance. Transactions may fail to send or
        confirm.
      </Typography>
    </Grid>
  ) : null
}

export default PerformanceWarning
