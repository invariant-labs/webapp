import { storiesOf } from '@storybook/react'
import React from 'react'
import BondItem from './BondItem'

storiesOf('bonds/BondItem', module).add('BondItem', () => {
  return (
    <BondItem
      icon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      secondIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      symbol='xSOL'
      secondSymbol='xBTC'
      decimals={2}
      price={12235}
      roiPercent='341313.34'
      purchased='100,434,444,444.44'
      vesting='10'
    />
  )
})
