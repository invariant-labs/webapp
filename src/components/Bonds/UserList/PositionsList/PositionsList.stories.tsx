import React from 'react'
import { BN } from '@project-serum/anchor'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import PositionsList from './PositionsList'

storiesOf('bonds/PositionsList', module)
  .addDecorator(withKnobs)
  .add('PositionsList', () => {
    const data = Array(2)
      .fill({})
      .map(() => {
        return {
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimals: 2,
          value: new BN(1354),
          symbol: 'xBTC',
          secondIcon:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          secondValue: new BN(1590),
          secondSymbol: 'xSOL',
          redeemable: new BN(8553),
          vestPeriod: '1/3'
        }
      })
    return <PositionsList data={data} />
  })
