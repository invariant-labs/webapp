import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import BondList from './BondList'

storiesOf('bonds/BondList', module)
  .addDecorator(withKnobs)
  .add('BondList', () => {
    const data = Array(4)
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
          roiPercent: 341313.34,
          supply: 100434444444.44,
          vesting: '10 days',
          onBondClick: () => {}
        }
      })
    return <BondList data={data} />
  })
