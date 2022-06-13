import React from 'react'
import { storiesOf } from '@storybook/react'
import PositionDetails from './PositionDetails'
import { MemoryRouter } from 'react-router'
import { calcPrice } from '@consts/utils'
import { MIN_TICK, MAX_TICK } from '@invariant-labs/sdk'

export interface liqTokens {
  symbol: string
  logoURI: string
}

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

storiesOf('position wrapper/positionDetailsWrapper', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    return (
      <PositionDetails
        detailsData={data}
        leftRange={{
          x: calcPrice(100, true, 6, 6),
          index: 100
        }}
        rightRange={{
          x: calcPrice(200, true, 6, 6),
          index: 200
        }}
        midPrice={{
          x: calcPrice(140, true, 6, 6),
          index: 140
        }}
        currentPrice={300}
        tokenX={{
          name: 'BTC',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimal: 9,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
        tokenY={{
          name: 'SNY',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png',
          decimal: 9,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
        onClickClaimFee={() => console.log('thanks from claiming')}
        closePosition={() => console.log('close position')}
        ticksLoading={false}
        tickSpacing={1}
        min={2149.6}
        max={149.6}
        fee={0.01}
        initialIsDiscreteValue={false}
        onDiscreteChange={() => {}}
        reloadHandler={() => {}}
      />
    )
  })
