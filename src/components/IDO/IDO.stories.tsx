import IDO, { IIDO } from './IDO'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { Status } from '@reducers/solanaWallet'

const idoProps: IIDO = {
  tokens: [
    {
      balance: new BN(100).mul(new BN(34786)),
      decimal: 6,
      symbol: 'SOL',
      assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
      name: 'Wrapped Solana',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(100).mul(new BN(126)),
      decimal: 6,
      symbol: 'BTC',
      assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      name: 'BTC',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(10).mul(new BN(5342)),
      decimal: 6,
      symbol: 'USDC',
      assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      name: 'USD coin',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    }
  ],
  totalDeposit: 46.643,
  totalSolContribute: 122124846,
  priceOfToken: 218.839,
  valueOfInvariantTokens: 20000000,
  walletStatus: Status.Initialized,
  withdrawable: false,
  claimable: false,
  currencyInfo: {
    bitcoin: {
      usd: 50793
    },
    ethereum: {
      usd: 4110.94
    },
    tether: {
      usd: 1
    },
    solana: {
      usd: 189.6
    }
  },
  saleEnd: {
    hours: 15,
    minutes: 30,
    seconds: 33
  },
  graceEnd: {
    hours: 32,
    minutes: 29,
    seconds: 27
  }
}

storiesOf('newUi/IDO', module)
  .addDecorator(withKnobs)
  .add('connect', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IDO {...idoProps} walletStatus={Status.Uninitialized} />
    </div>
  ))
  .add('deposit', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IDO {...idoProps} />
    </div>
  ))
  .add('claim', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IDO {...idoProps} claimable={true} />
    </div>
  ))
  .add('withdraw', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IDO {...idoProps} withdrawable={true} />
    </div>
  ))
