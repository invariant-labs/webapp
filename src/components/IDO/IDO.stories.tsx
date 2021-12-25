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
  },
  pools: [
    {
      tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
      tokenY: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      tokenXReserve: new PublicKey('So11111111111111111111111111111111111111112'),
      tokenYReserve: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      tickSpacing: 4,
      sqrtPrice: {
        v: new BN(2)
      },
      fee: {
        v: new BN(2)
      },
      liquidity: {
        v: new BN(23)
      },
      currentTickIndex: 5,
      tickmap: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      feeGrowthGlobalX: {
        v: new BN(2)
      },
      feeGrowthGlobalY: {
        v: new BN(2)
      },
      feeProtocolTokenX: {
        v: new BN(2)
      },
      feeProtocolTokenY: {
        v: new BN(2)
      },
      bump: 255,
      nonce: 254,
      authority: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E')
    },
    {
      tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
      tokenY: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      tokenXReserve: new PublicKey('So11111111111111111111111111111111111111112'),
      tokenYReserve: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      tickSpacing: 4,
      sqrtPrice: {
        v: new BN(4)
      },
      fee: {
        v: new BN(1)
      },
      liquidity: {
        v: new BN(21)
      },
      currentTickIndex: 5,
      tickmap: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      feeGrowthGlobalX: {
        v: new BN(2)
      },
      feeGrowthGlobalY: {
        v: new BN(2)
      },
      feeProtocolTokenX: {
        v: new BN(2)
      },
      feeProtocolTokenY: {
        v: new BN(2)
      },
      bump: 255,
      nonce: 254,
      authority: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E')
    }
  ],
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
    console.log(fromToken, toToken, amount)
  },
  slippTolerance: '1',
  tokenToIndex: 1
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
