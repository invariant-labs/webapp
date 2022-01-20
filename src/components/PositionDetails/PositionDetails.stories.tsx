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
    const tokens: liqTokens[] = [
      {
        symbol: 'BTC',
        logoURI:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      },
      {
        symbol: 'SNY',
        logoURI:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png'
      }
    ]
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
        tokenY={'SNY'}
        tokenX={'BTC'}
        positionData={{
          tokenXName: 'BTC',
          tokenXIcon: tokens[0].logoURI,
          tokenYName: 'SNY',
          tokenYIcon: tokens[1].logoURI,
          tokenXDecimal: 6,
          tokenYDecimal: 6,
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        onClickClaimFee={() => console.log('thanks from claiming')}
        tokenXLiqValue={2.19703}
        tokenYLiqValue={20.99703}
        tokenXClaimValue={2.19703}
        tokenYClaimValue={9.19703}
        closePosition={() => console.log('close position')}
        ticksLoading={false}
        xDecimal={6}
        yDecimal={6}
        tickSpacing={1}
      />
    )
  })
