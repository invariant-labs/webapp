import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { withKnobs } from '@storybook/addon-knobs'
import { SwapToken } from '@components/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import DepositCard, { IActionType, IAmountInput } from './DepositCard'
import { IDepositAmount } from '../DepositAmount/DepositAmount'
import { action } from '@storybook/addon-actions'

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  }
]

const amountInputData: IAmountInput = {
  setValue: () => console.log('value was set'),
  decimal: 6,
  placeholder: '0.0',
  onMaxClick: () => console.log('Max button clicked'),
  tokens: tokens,
  current: tokens[0]
}

const currencyData: IDepositAmount['currencyRates'] = [
  { currency: 'USD', value: '47.22' },
  { currency: 'SOL', value: '0.0323' },
  { currency: 'ETH', value: '0.324231' },
  { currency: 'BTC', value: '0.00022' }
]

storiesOf('IDO/IDOComponents/depositCard', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('depositCard', () => (
    <DepositCard
      currencyRates={currencyData}
      onTokenChange={(name: string) => action(name)()}
      amountInputData={amountInputData}
    />
  ))
  .add('withdrawCard', () => (
    <DepositCard
      currencyRates={currencyData}
      actionType={IActionType.Withdraw}
      onActionType={action(`Successful ${IActionType.Withdraw}`)}
      onTokenChange={(name: string) => action(name)()}
      walletConnected
      amountInputData={amountInputData}
    />
  ))
  .add('claimCard', () => (
    <DepositCard
      currencyRates={currencyData}
      actionType={IActionType.Claim}
      onActionType={action(`Successful ${IActionType.Claim}`)}
      onTokenChange={(name: string) => action(name)()}
      walletConnected
      amountInputData={amountInputData}
    />
  ))
  .add('depositCardInContainer', () => (
    <div style={{ maxWidth: 500, background: '#1C1B1E', padding: 20, borderRadius: 10 }}>
      <DepositCard
        currencyRates={currencyData}
        onTokenChange={(name: string) => action(name)()}
        walletConnected
        onActionType={action(`Successful ${IActionType.Deposit}`)}
        amountInputData={amountInputData}
      />
    </div>
  ))
