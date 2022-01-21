import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Ido } from './Ido'
import { SwapToken } from '../Swap/Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { toBlur } from '@consts/uiUtils'
import { Status } from '@reducers/solanaWallet'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'

const pools: PoolStructure[] = [
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
    lastTimestamp: new BN(2),
    oracleAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    oracleInitialized: true,
    secondsPerLiquidityGlobal: {
      v: new BN(2)
    },
    startTimestamp: new BN(2)
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
    lastTimestamp: new BN(2),
    oracleAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    oracleInitialized: true,
    secondsPerLiquidityGlobal: {
      v: new BN(2)
    },
    startTimestamp: new BN(2)
  }
]

const onSwap = (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
  console.log(fromToken, toToken, amount)
}

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

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Ido
        walletStatus={Status.Initialized}
        tokens={tokens}
        onSwap={onSwap}
        pools={pools}
        progress='none'
      />
    </div>
  ))
