import React from 'react'
import { storiesOf } from '@storybook/react'
import NewPosition from './NewPosition'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { MemoryRouter } from 'react-router'
import { calcPrice } from '@consts/utils'
import { MAX_TICK, MIN_TICK } from '@invariant-labs/sdk'
import { colors } from '@static/theme'

const data = [
  {
    x: calcPrice(MIN_TICK, true, 6, 6),
    y: 10,
    index: MIN_TICK
  },
  {
    x: calcPrice(MAX_TICK, true, 6, 6),
    y: 10,
    index: MAX_TICK
  }
]

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
]

storiesOf('position/newPosition', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('new', () => (
    <div
      style={{ backgroundColor: colors.invariant.componentBcg, padding: 20, width: 'fit-content' }}>
      <NewPosition
        tokens={tokens}
        tokensB={tokens}
        data={data}
        midPrice={{
          x: calcPrice(140, true, 6, 6),
          index: 140
        }}
        addLiquidityHandler={() => {}}
        onChangePositionTokens={() => {}}
        isCurrentPoolExisting={true}
        calcAmount={() => new BN(1)}
        feeTiers={[0.02, 0.04, 0.1, 0.3, 1]}
        ticksLoading={false}
        noConnectedBlockerProps={{
          onConnect: () => {},
          onDisconnect: () => {}
        }}
        progress='none'
        xDecimal={6}
        yDecimal={6}
        tickSpacing={1}
        isXtoY={true}
      />
    </div>
  ))
  .add('noPool', () => (
    <div
      style={{ backgroundColor: colors.invariant.componentBcg, padding: 20, width: 'fit-content' }}>
      <NewPosition
        tokens={tokens}
        tokensB={tokens}
        data={data}
        midPrice={{
          x: calcPrice(140, true, 6, 6),
          index: 140
        }}
        addLiquidityHandler={() => {}}
        onChangePositionTokens={() => {}}
        isCurrentPoolExisting={false}
        calcAmount={() => new BN(1)}
        feeTiers={[0.02, 0.04, 0.1, 0.3, 1]}
        ticksLoading={false}
        noConnectedBlockerProps={{
          onConnect: () => {},
          onDisconnect: () => {}
        }}
        progress='none'
        xDecimal={6}
        yDecimal={6}
        tickSpacing={4}
        isXtoY={true}
      />
    </div>
  ))
