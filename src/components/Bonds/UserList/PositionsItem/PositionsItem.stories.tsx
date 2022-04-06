import { storiesOf } from '@storybook/react'
import { BN } from '@project-serum/anchor'
import React from 'react'
import PositionsItem from './PositionsItem'

storiesOf('bonds/PositionsItem', module).add('PositionsItem', () => {
  return (
    <PositionsItem
      icon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      decimals={2}
      value={new BN(1354)}
      symbol='xBTC'
      secondIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      secondValue={new BN(1590)}
      secondSymbol='xSOL'
      redeemable={new BN(8553)}
      vestPeriod='1/3'
    />
  )
})
