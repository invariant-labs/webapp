import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Swap, { SwapToken } from './Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { toBlur } from '@consts/uiUtils'
import { Status } from '@reducers/solanaWallet'
import { DEFAULT_PUBLIC_KEY } from '@invariant-labs/sdk/lib/market'
import { PoolWithAddress } from '@reducers/pools'
import { Decimal } from '@invariant-labs/sdk/src/market'
import { fromFee } from '@invariant-labs/sdk/lib/utils'

const pools: PoolWithAddress[] = [
  {
    tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenY: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    tokenXReserve: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenYReserve: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    feeReceiver: DEFAULT_PUBLIC_KEY,
    positionIterator: new BN(0),
    tickSpacing: 4,
    sqrtPrice: {
      v: new BN(2)
    },
    fee: {
      v: new BN(2)
    },
    protocolFee: { v: new BN(0) },
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
    feeProtocolTokenX: new BN(2),
    feeProtocolTokenY: new BN(2),
    bump: 255,
    lastTimestamp: new BN(2),
    oracleAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    oracleInitialized: true,
    secondsPerLiquidityGlobal: {
      v: new BN(2)
    },
    startTimestamp: new BN(2),
    address: DEFAULT_PUBLIC_KEY
  },
  {
    tokenX: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenY: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    tokenXReserve: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenYReserve: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    feeReceiver: DEFAULT_PUBLIC_KEY,
    positionIterator: new BN(0),
    tickSpacing: 4,
    sqrtPrice: {
      v: new BN(4)
    },
    fee: {
      v: new BN(1)
    },
    protocolFee: { v: new BN(0) },
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
    feeProtocolTokenX: new BN(2),
    feeProtocolTokenY: new BN(2),
    bump: 255,
    lastTimestamp: new BN(2),
    oracleAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    oracleInitialized: true,
    secondsPerLiquidityGlobal: {
      v: new BN(2)
    },
    startTimestamp: new BN(2),
    address: DEFAULT_PUBLIC_KEY
  }
]

const onSwap = (
  slippage: Decimal,
  knownPrice: Decimal,
  tokenFrom: PublicKey,
  tokenTo: PublicKey,
  poolIndex: number,
  amount: BN
) => {
  console.log(tokenFrom, tokenTo, amount, slippage, knownPrice, poolIndex)
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

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Swap
        walletStatus={Status.Initialized}
        tokens={tokens}
        onSwap={onSwap}
        pools={pools}
        progress='none'
        poolInit={true}
        fullSolBalance={new BN(2137)}
        swapData={{
          slippage: { v: fromFee(new BN(1000)) },
          knownPrice: { v: new BN(0) },
          poolIndex: 0,
          tokenFrom: DEFAULT_PUBLIC_KEY,
          tokenTo: DEFAULT_PUBLIC_KEY,
          amount: new BN(0),
          byAmountIn: false
        }}
        onSetPair={() => {}}
        poolTicks={{
          [DEFAULT_PUBLIC_KEY.toString()]: []
        }}
      />
    </div>
  ))
