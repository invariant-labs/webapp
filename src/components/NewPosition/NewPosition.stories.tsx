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
import { useState } from '@storybook/addons'

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
  .add('new', () => {
    const [feeIndex, setFeeIndex] = useState(0)
    return (
      <div
        style={{
          backgroundColor: colors.invariant.componentBcg,
          padding: 20,
          width: 'fit-content'
        }}>
        <NewPosition
          tokens={tokens}
          data={data}
          midPrice={{
            x: calcPrice(140, true, 6, 6),
            index: 140
          }}
          setMidPrice={() => {}}
          addLiquidityHandler={() => {}}
          onChangePositionTokens={(_a, _b, fee) => {
            setFeeIndex(fee)
          }}
          isCurrentPoolExisting={true}
          calcAmount={() => new BN(1)}
          feeTiers={[
            {
              feeValue: 0.02
            },
            {
              feeValue: 0.04
            },
            {
              feeValue: 0.1
            },
            {
              feeValue: 0.3
            },
            {
              feeValue: 1
            }
          ]}
          ticksLoading={false}
          noConnectedBlockerProps={{
            onConnect: () => {}
          }}
          progress='none'
          xDecimal={6}
          yDecimal={6}
          tickSpacing={1}
          isXtoY={true}
          isWaitingForNewPool={false}
          poolIndex={0}
          currentPairReversed={null}
          bestTiers={[]}
          initialIsDiscreteValue={false}
          onDiscreteChange={() => {}}
          currentPriceSqrt={new BN(140000000)}
          canCreateNewPool
          canCreateNewPosition
          handleAddToken={() => {}}
          commonTokens={[
            new PublicKey('So11111111111111111111111111111111111111112'),
            new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
            new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
          ]}
          initialOpeningPositionMethod={'range'}
          onPositionOpeningMethodChange={() => {}}
          initialHideUnknownTokensValue={false}
          onHideUnknownTokensChange={() => {}}
          reloadHandler={() => {}}
          currentFeeIndex={feeIndex}
          onSlippageChange={() => {}}
          initialSlippage={'1'}
          calculatePoolAddress={async () => await new Promise(() => {})}
          copyPoolAddressHandler={() => {}}
          history={{
            length: 9,
            action: 'REPLACE',
            location: {
              pathname: '/newPosition/USDC/SOL/0_05',
              search: '',
              hash: '',
              state: undefined,
              key: 'r2l2vi'
            },
            createHref: () => '',
            push: () => {},
            replace: () => {},
            go: () => {},
            goBack: () => {},
            goForward: () => {},
            block: () => () => {},
            listen: () => () => ''
          }}
          initialFee='0_05'
          initialTokenFrom='USDC'
          initialTokenTo='SOL'
          poolAddress=''
        />
      </div>
    )
  })
  .add('noPool', () => {
    const [feeIndex, setFeeIndex] = useState(0)
    return (
      <div
        style={{
          backgroundColor: colors.invariant.componentBcg,
          padding: 20,
          width: 'fit-content'
        }}>
        <NewPosition
          tokens={tokens}
          data={data}
          midPrice={{
            x: calcPrice(140, true, 6, 6),
            index: 140
          }}
          setMidPrice={() => {}}
          addLiquidityHandler={() => {}}
          onChangePositionTokens={(_a, _b, fee) => {
            setFeeIndex(fee)
          }}
          isCurrentPoolExisting={false}
          calcAmount={() => new BN(1)}
          feeTiers={[
            {
              feeValue: 0.02
            },
            {
              feeValue: 0.04
            },
            {
              feeValue: 0.1
            },
            {
              feeValue: 0.3
            },
            {
              feeValue: 1
            }
          ]}
          ticksLoading={false}
          noConnectedBlockerProps={{
            onConnect: () => {}
          }}
          progress='none'
          xDecimal={6}
          yDecimal={6}
          tickSpacing={4}
          isXtoY={true}
          isWaitingForNewPool={false}
          poolIndex={0}
          currentPairReversed={null}
          bestTiers={[]}
          initialIsDiscreteValue={false}
          onDiscreteChange={() => {}}
          currentPriceSqrt={new BN(140000000)}
          canCreateNewPool
          canCreateNewPosition
          handleAddToken={() => {}}
          commonTokens={[
            new PublicKey('So11111111111111111111111111111111111111112'),
            new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
            new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
          ]}
          initialOpeningPositionMethod={'range'}
          onPositionOpeningMethodChange={() => {}}
          initialHideUnknownTokensValue={false}
          onHideUnknownTokensChange={() => {}}
          reloadHandler={() => {}}
          currentFeeIndex={feeIndex}
          onSlippageChange={() => {}}
          initialSlippage={'1'}
          calculatePoolAddress={async () => await new Promise(() => {})}
          copyPoolAddressHandler={() => {}}
          history={{
            length: 9,
            action: 'REPLACE',
            location: {
              pathname: '/newPosition/USDC/SOL/0_05',
              search: '',
              hash: '',
              state: undefined,
              key: 'r2l2vi'
            },
            createHref: () => '',
            push: () => {},
            replace: () => {},
            go: () => {},
            goBack: () => {},
            goForward: () => {},
            block: () => () => {},
            listen: () => () => ''
          }}
          initialFee='0_05'
          initialTokenFrom='USDC'
          initialTokenTo='SOL'
          poolAddress=''
        />
      </div>
    )
  })
