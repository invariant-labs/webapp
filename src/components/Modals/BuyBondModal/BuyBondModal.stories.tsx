import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { storiesOf } from '@storybook/react'
import React from 'react'
import BuyBondModal from './BuyBondModal'

storiesOf('modals/buyBond', module).add('modal', () => {
  return (
    <BuyBondModal
      open
      handleClose={() => {}}
      price={new BN(2000000)}
      supply={2137}
      roi={5}
      vestingTerm='10 days'
      onBuy={() => {}}
      bondToken={{
        balance: new BN(100).mul(new BN(34786)),
        decimals: 6,
        symbol: 'SOL',
        assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
        name: 'Wrapped Solana',
        logoURI:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      }}
      quoteToken={{
        balance: new BN(100).mul(new BN(126)),
        decimals: 6,
        symbol: 'BTC',
        assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
        name: 'BTC',
        logoURI:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      }}
      onBondAmountChange={() => {}}
    />
  )
})
