import DepositAmountInput from '@components/Inputs/DepositAmountInput/DepositAmountInput'
import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

export interface ITokenInfo {
  first: ITokenInfoProps
  second: ITokenInfoProps
}
interface ITokenInfoProps {
  setValue: (value: string) => void
  placeholder?: string
  currency: string | null
  onMaxClick: () => void
  currencyIconSrc?: string
  decimalsLimit: number
  percentageChange?: number
  usdValue?: number
  balanceValue?: string
}
const TokenInfo: React.FC<ITokenInfo> = ({ first, second }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <DepositAmountInput {...first} />
      </Grid>
      <Grid item>
        <DepositAmountInput {...second} />
      </Grid>
    </Grid>
  )
}

export default TokenInfo
