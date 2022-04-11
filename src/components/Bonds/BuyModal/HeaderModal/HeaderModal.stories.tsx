import React from 'react'
import { BN } from '@project-serum/anchor'
import { storiesOf } from '@storybook/react'
import HeaderModal from './HeaderModal'

storiesOf('bonds/HeaderModal', module).add('HeaderModale', () => {
  return (
    <HeaderModal
      symbol='xBTC'
      icon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      secondSymbol='xSOL'
      decimals={3}
      price={new BN(13546)}
      pricePercent={4.14}
      purchased='123,325.345'
      vestingTerm='10'
      roi='13.24'
    />
  )
})
