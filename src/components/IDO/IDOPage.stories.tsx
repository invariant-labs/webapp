import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY, NetworkType } from '@consts/static'
import { Grid } from '@material-ui/core'
import Header from '../Header/Header'
import { WalletType } from '@web3/wallet'
import Footer from '@components/Footer/Footer'
import { ISaleDetails } from './SaleDetails/SaleDetails'
import { IDepositCard } from './DepositCard/DepositCard'
import IDO from './IDO'

const depositDetailsData: IDepositCard = {
  tokens: [
    {
      balance: new BN(100).mul(new BN(34786)),
      decimals: 6,
      symbol: 'SOL',
      assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
      name: 'Wrapped Solana',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(100).mul(new BN(126)),
      decimals: 6,
      symbol: 'BTC',
      assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      name: 'BTC',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      address: new PublicKey('So11111111111111111111111111111111111111112')
    },
    {
      balance: new BN(10).mul(new BN(5342)),
      decimals: 6,
      symbol: 'USDC',
      assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      name: 'USD coin',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    }
  ],
  currencyRates: [
    { currency: 'USD', value: '47.22' },
    { currency: 'SOL', value: '0.0323' },
    { currency: 'ETH', value: '0.324231' },
    { currency: 'BTC', value: '0.00022' }
  ],
  onTokenChange: (name: string) => console.log(name)
}

const saleDetailsData: ISaleDetails = {
  salePeriod: '15:30:33',
  gracePeriod: '32:13:45',
  token: {
    symbol: 'SOL',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    value: '122 443'
  },
  tokenPrice: '211.345',
  invariantPrice: '20 000 000'
}

storiesOf('IDO/IDODeposit', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('IDO', () => (
    <IDO
      saleDetails={saleDetailsData}
      depositDetails={depositDetailsData}
      walletConnected={false}
      onWalletConnect={action('connected')}
    />
  ))
  .add('IDOPage', () => {
    const [isConnected, setConnected] = useState<boolean>(false)

    const handleConnect = () => setConnected(true)
    return (
      <Grid
        container
        justifyContent='space-between'
        direction='column'
        alignItems='center'
        style={{
          background: '#0B090D',
          minHeight: '100vh',
          margin: '-16px'
        }}>
        <Header
          address={DEFAULT_PUBLICKEY}
          onNetworkSelect={(chosen: string) => {
            action(`network changed to: ${chosen}`)()
          }}
          onWalletSelect={(chosen: WalletType) => {
            action(`wallet changed to: ${chosen}`)()
            setConnected(true)
          }}
          walletConnected={isConnected}
          landing='staking'
          onDisconnectWallet={action('disconnect')}
          typeOfNetwork={NetworkType.MAINNET}
        />
        <IDO
          walletConnected={isConnected}
          saleDetails={saleDetailsData}
          depositDetails={depositDetailsData}
          onWalletConnect={handleConnect}
        />
        <Footer />
      </Grid>
    )
  })
