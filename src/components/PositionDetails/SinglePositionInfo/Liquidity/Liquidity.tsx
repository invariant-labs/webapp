import { Box } from '@mui/material'
import { useStyles } from './style'
import { TokenDetails } from '../TokenDetails/TokenDetails'

type Props = {
  tokenA: {
    icon: string
    ticker: string
    amount: number
    decimal: number
    price?: number
  }
  tokenB: {
    icon: string
    ticker: string
    amount: number
    decimal: number
    price?: number
  }
  isLoading: boolean
}

export const Liquidity = ({ tokenA, tokenB, isLoading }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.tokenContainer}>
        <TokenDetails
          icon={tokenA.icon}
          ticker={tokenA.ticker}
          amount={tokenA.amount}
          decimal={tokenA.decimal}
          price={tokenA.price}
          isLoading={isLoading}
        />
      </Box>
      <Box className={classes.tokenContainer}>
        <TokenDetails
          icon={tokenB.icon}
          ticker={tokenB.ticker}
          amount={tokenB.amount}
          decimal={tokenB.decimal}
          price={tokenB.price}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}
