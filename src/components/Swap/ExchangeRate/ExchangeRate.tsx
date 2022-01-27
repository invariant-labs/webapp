import { Grid, Typography } from '@material-ui/core'
import loadingAnimation from '@static/gif/loading.gif'
import React from 'react'
import useStyles from './style'

interface iProps {
  tokenFromSymbol: string
  tokenToSymbol: string
  amount: number
  tokenToDecimals: number
  loading: boolean
}

const ExchangeRate: React.FC<iProps> = ({
  tokenFromSymbol,
  tokenToSymbol,
  amount,
  tokenToDecimals,
  loading
}) => {
  const classes = useStyles()
  const setLoading = () => {
    return loading ? (
      <Grid className={classes.loadingContainer}>
        <img src={loadingAnimation} className={classes.loading}></img>
      </Grid>
    ) : (
      <Typography className={classes.rateText}>
        1 {tokenFromSymbol} = {amount.toFixed(tokenToDecimals)} {tokenToSymbol}
      </Typography>
    )
  }
  return (
    <Typography>
      <Typography className={classes.rateText}>{setLoading()}</Typography>
    </Typography>
  )
}

export default ExchangeRate
