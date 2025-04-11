import { Box } from '@mui/material'
import { useStyles } from './style'
import { Separator } from '@common/Separator/Separator'
import { TokenDetails } from '../TokenDetails/TokenDetails'
import { colors } from '@static/theme'

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

export const UnclaimedFees = ({ tokenA, tokenB, isLoading }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <TokenDetails
        icon={tokenA.icon}
        ticker={tokenA.ticker}
        amount={tokenA.amount}
        decimal={tokenA.decimal}
        price={tokenA.price}
        isLoading={isLoading}
      />
      <Separator size='100%' isHorizontal color={colors.invariant.component} />
      <TokenDetails
        icon={tokenB.icon}
        ticker={tokenB.ticker}
        amount={tokenB.amount}
        decimal={tokenB.decimal}
        price={tokenB.price}
        isLoading={isLoading}
      />
    </Box>
  )
}
