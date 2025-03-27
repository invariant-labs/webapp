import React, { useState, useEffect } from 'react'
import { status, network } from '@store/selectors/solanaConnection'
import { Status } from '@store/reducers/solanaConnection'
import { useSelector } from 'react-redux'
import useStyles from './styles'
import axios from 'axios'
import { NetworkType, RPC } from '@store/consts/static'
import { Grid, Typography } from '@mui/material'
import icons from '@static/icons'

export const PerformanceWarning: React.FC = () => {
  const { classes } = useStyles()

  const [showWarning, setShowWarning] = useState(false)

  const networkStatus = useSelector(status)
  const networkType = useSelector(network)

  useEffect(() => {
    if (networkStatus === Status.Initialized) {
      axios
        .post<{ result: Array<{ numTransactions: number; samplePeriodSecs: number }> }>(
          networkType === NetworkType.Mainnet ? RPC.MAIN_ALCHEMY : RPC.DEV,
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
    <Grid container className={classes.banner}>
      <Typography className={classes.text}>
        <img src={icons.infoIcon} className={classes.icon} />
        Solana network is experiencing degraded performance. Transactions may fail to send or
        confirm.
      </Typography>
    </Grid>
  ) : null
}

export default PerformanceWarning
