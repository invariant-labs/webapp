import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Swap, { SwapToken, Pools } from './Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { toBlur } from '@consts/uiUtils'
import { Status } from '@reducers/solanaWallet'

const pools: Pools[] = [
  {
    tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenY: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    sqrtPrice: {
      v: new BN(2),
      scale: 0
    },
    fee: {
      val: new BN(2),
      scale: 3
    },
    exchangeRate: {
      val: new BN(1),
      scale: 6
    }
  },
  {
    tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenY: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    sqrtPrice: {
      v: new BN(4),
      scale: 0
    },
    fee: {
      val: new BN(1),
      scale: 2
    },
    exchangeRate: {
      val: new BN(1),
      scale: 6
    }
  }
]

const onSwap = (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
  console.log(fromToken, toToken, amount)
}

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimal: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'SOL',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/mai…mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimal: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimal: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USDC',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/mai…ainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
]

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Swap
        walletStatus={Status.Initialized}
        tokens={tokens}
        onSwap={onSwap}
        pools={pools}
      />
    </div>
  ))
