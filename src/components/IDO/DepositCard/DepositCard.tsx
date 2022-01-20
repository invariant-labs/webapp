import React from 'react'
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

export interface IDepositCard {
  className?: string
  tokens: SwapToken[]
  currencyRates: IDepositAmount['currencyRates']
  walletConnected?: boolean
  onWalletConnect?: () => void
  onTokenChange: (name: string) => void
  actionType?: IActionType
  onActionType?: () => void
}

const DepositCard: React.FC<IDepositCard> = ({
  className,
  tokens,
  currencyRates,
  walletConnected,
  onWalletConnect,
  onTokenChange,
  actionType = IActionType.Deposit,
  onActionType
}) => {
  const classes = useStyles()

  const actionTypeTitle: Record<IActionType, string> = {
    [IActionType.Claim]: 'Claim',
    [IActionType.Deposit]: 'Deposit',
    [IActionType.Withdraw]: 'Withdraw'
  }

  return (
    <Grid container className={classNames(classes.card, className)} direction='column'>
      <Typography className={classes.title}>{`${
        walletConnected ? actionTypeTitle[actionType] : 'Deposit'
      } your SOL`}</Typography>
      <Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography className={classes.inputLabel}>Est.:56.0278</Typography>
          <Typography className={classes.inputLabel}>Balance: 100.54 SOL</Typography>
        </Grid>
        <AmountInput
          setValue={() => {}}
          decimal={6}
          placeholder={'0.0'}
          onMaxClick={() => {}}
          tokens={tokens}
          current={tokens[0]}
          onSelect={onTokenChange}
        />
      </Grid>
      <DepositAmount currencyRates={currencyRates} />
      {walletConnected ? (
        <OutlinedButton
          name={actionTypeTitle[actionType]}
          className={classes.button}
          onClick={onActionType}
        />
      ) : (
        <OutlinedButton
          name='Connect a wallet'
          className={classes.button}
          onClick={onWalletConnect}
        />
      )}
    </Grid>
  )
}

export default DepositCard
