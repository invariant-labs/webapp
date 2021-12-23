import React from 'react'
import { storiesOf } from '@storybook/react'
import PositionDetails from './PositionDetails'
import { MemoryRouter } from 'react-router'

export interface liqTokens {
  symbol: string,
  logoURI: string
}

const ticksToData = () => {
  const ticks = [
    { index: 90, delta: 10 },
    { index: 110, delta: 30 },
    { index: 160, delta: 60 },
    { index: 170, delta: 20 },
    { index: 210, delta: -20 },
    { index: 220, delta: -10 },
    { index: 230, delta: -30 },
    { index: 260, delta: -20 },
    { index: 280, delta: -40 }
  ]
  const fields: Array<{ x: number; y: number }> = []

  let currentLiquidity = 10
  for (let i = 0; i < 10000; i += 1) {
    if (ticks.length > 0 && i > ticks[0].index) {
      currentLiquidity += ticks[0].delta
      ticks.shift()
    }

    fields.push({ x: i, y: currentLiquidity })
  }

  return fields
}

const data = ticksToData()

storiesOf('position wrapper/positionDetailsWrapper', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    const tokens: liqTokens[] = [
      {
        symbol: 'BTC',
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      },
      {
        symbol: 'SNY',
        logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png'
      }
    ]
    return (
      <PositionDetails
        detailsData={data}
        leftRangeIndex={100}
        midPriceIndex={150}
        rightRangeIndex={200}
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
        onZoomOutOfData={() => {}}
      />
    )
  })
