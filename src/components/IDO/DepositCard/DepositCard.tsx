import React, { CSSProperties } from 'react'
import useStyles from './style'
import classNames from 'classnames'
import { SwapToken } from '@components/Swap/Swap'
import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography } from '@material-ui/core'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import DepositAmount, { IDepositAmount } from '../DepositAmount/DepositAmount'

export enum IActionType {
  Withdraw = 'WITHDRAW',
  Claim = 'CLAIM',
  Deposit = 'DEPOSIT'
}

export interface IAmountInput {
  setValue: (value: string) => void
  value?: string
  error?: string | null
  className?: string
  decimal: number
  placeholder?: string
  style?: CSSProperties
  onMaxClick: () => void
  current: SwapToken | null
  tokens: Array<{ symbol: string; name: string; logoURI: string }>
}

export interface IDepositCard {
  className?: string
  currencyRates: IDepositAmount['currencyRates']
  walletConnected?: boolean
  onWalletConnect?: () => void
  onTokenChange: (name: string) => void
  actionType?: IActionType
  onActionType?: () => void
  amountInputData: IAmountInput
}

const DepositCard: React.FC<IDepositCard> = ({
  className,
  currencyRates,
  walletConnected,
  onWalletConnect,
  onTokenChange,
  actionType = IActionType.Deposit,
  onActionType,
  amountInputData
}) => {
  const classes = useStyles()

  const actionTypeTitle: Record<IActionType, string> = {
    [IActionType.Claim]: 'Claim',
    [IActionType.Deposit]: 'Deposit',
    [IActionType.Withdraw]: 'Withdraw'
  }

  console.log(amountInputData.current)

  return (
    <Grid container className={classNames(classes.card, className)} direction='column'>
      <Typography className={classes.title}>{`${
        walletConnected ? actionTypeTitle[actionType] : 'Deposit'
      } your SOL`}</Typography>
      <Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography className={classes.inputLabel}>Est.: {currencyRates[0].value}$ </Typography>
          <Typography className={classes.inputLabel}>
            Balance: {Number(amountInputData.current?.balance)} {amountInputData.current?.symbol}
          </Typography>
        </Grid>
        <AmountInput
          setValue={amountInputData.setValue}
          decimal={amountInputData.decimal}
          placeholder={amountInputData.placeholder}
          onMaxClick={amountInputData.onMaxClick}
          tokens={amountInputData.tokens}
          current={amountInputData.current}
          onSelect={onTokenChange}
        />
      </Grid>
      <DepositAmount currencyRates={currencyRates} />
      <OutlinedButton
        name={walletConnected ? actionTypeTitle[actionType] : 'Connect a wallet'}
        className={classes.button}
        onClick={walletConnected ? onActionType : onWalletConnect}
      />
    </Grid>
  )
}

export default DepositCard
