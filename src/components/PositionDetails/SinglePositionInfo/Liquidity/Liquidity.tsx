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
  isLoadingBalance: boolean
}

export const Liquidity = ({ tokenA, tokenB, isLoadingBalance }: Props) => {
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
          isLoadingBalance={isLoadingBalance}
          isLoadingAmount={false}
        />
      </Box>
      <Box className={classes.tokenContainer}>
        <TokenDetails
          icon={tokenB.icon}
          ticker={tokenB.ticker}
          amount={tokenB.amount}
          decimal={tokenB.decimal}
          price={tokenB.price}
          isLoadingBalance={isLoadingBalance}
          isLoadingAmount={false}
        />
      </Box>
    </Box>
  )
}
