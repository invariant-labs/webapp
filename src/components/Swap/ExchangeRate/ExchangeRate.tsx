import { Box, Typography } from '@mui/material'
import loadingAnimation from '@static/gif/loading.gif'
import { formatNumberWithoutSuffix } from '@utils/utils'
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
  const { classes } = useStyles()
  const setLoading = () => {
    return loading ? (
      <Box className={classes.loadingContainer}>
        <img src={loadingAnimation} className={classes.loading} alt='Loading'></img>
      </Box>
    ) : (
      <Typography className={classes.rateText}>
        1 {tokenFromSymbol} ={' '}
        {isNaN(amount)
          ? 0
          : formatNumberWithoutSuffix(amount.toFixed(tokenToDecimals)) === '0'
            ? '~0'
            : formatNumberWithoutSuffix(amount.toFixed(tokenToDecimals))}{' '}
        {tokenToSymbol}
      </Typography>
    )
  }

  return (
    <Box className={classes.ableToHover} onClick={onClick}>
      {setLoading()}
    </Box>
  )
}

export default ExchangeRate
