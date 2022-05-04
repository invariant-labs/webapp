import React from 'react'
import { BN } from '@project-serum/anchor'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import PositionsList from './PositionsList'
import { PublicKey } from '@solana/web3.js'

storiesOf('bonds/PositionsList', module)
  .addDecorator(withKnobs)
  .add('PositionsList', () => {
    const data = Array(2)
      .fill({})
      .map(() => {
        return {
          bondToken: {
            balance: new BN(100).mul(new BN(34786)),
            decimals: 6,
            symbol: 'SOL',
            assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
            name: 'Wrapped Solana',
            logoURI:
              'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
          },
          quoteToken: {
            balance: new BN(100).mul(new BN(126)),
            decimals: 6,
            symbol: 'BTC',
            assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
            name: 'BTC',
            logoURI:
              'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
          },
          bought: 2137,
          redeemable: 8553,
          vestingProgress: '30%',
          onRedeemClick: () => {}
        }
      })
    return <PositionsList data={data} />
  })
