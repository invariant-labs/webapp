import { storiesOf } from '@storybook/react'
import ListModel from './ListModel'
import React from 'react'
import { IHeaderModal } from '../HeaderModal/HeaderModal'
import { ITokenInfo } from '../TokenInfo/TokenInfo'
import { BN } from '@project-serum/anchor'

storiesOf('Bonds/ListModel', module).add('TokenInfo', () => {
  const headerModalData: IHeaderModal = {
    symbol: 'xBTC',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    secondSymbol: 'xSOL',
    decimals: 3,
    price: new BN(13546),
    pricePercent: 4.14,
    purchased: '123,325.345',
    vestingTerm: '10',
    roi: '13.24'
  }
  const tokenInfoData: ITokenInfo = {
    first: {
      setValue: () => {},
      placeholder: '0.5',
      currency: 'xSOL',
      onMaxClick: () => {},
      currencyIconSrc:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      decimalsLimit: 3,
      percentageChange: 7.0,
      usdValue: 83.03,
      balanceValue: '1.045'
    },
    second: {
      setValue: () => {},
      placeholder: '0.004086',
      currency: 'xBTC',
      onMaxClick: () => {},
      currencyIconSrc:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      decimalsLimit: 4,
      percentageChange: -0.11,
      usdValue: 419.29,
      balanceValue: '0.1015'
    }
  }
  return <ListModel headerModalData={headerModalData} tokenInfoData={tokenInfoData} />
})
