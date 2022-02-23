import { Box, Grid, Typography } from '@material-ui/core'
import loadingAnimation from '@static/gif/loading.gif'
import React from 'react'
import useStyles from './style'

interface iProps {
  tokenFromSymbol: string
  tokenToSymbol: string
  amount: number
  tokenToDecimals: number
  loading: boolean
  onClick: () => void
}

const ExchangeRate: React.FC<iProps> = ({
  tokenFromSymbol,
  tokenToSymbol,
  amount,
  tokenToDecimals,
  loading,
  onClick
}) => {
  const classes = useStyles()
  const setLoading = () => {
    return loading ? (
      <Grid className={classes.loadingContainer}>
        <img src={loadingAnimation} className={classes.loading}></img>
      </Grid>
    ) : (
      <Typography className={classes.rateText} onClick={onClick}>
        1 {tokenFromSymbol} = {isNaN(amount) ? 0 : amount.toFixed(tokenToDecimals)} {tokenToSymbol}
      </Typography>
    )
  }

  return <Box className={classes.ableToHover}>{setLoading()}</Box>
}

export default ExchangeRate
