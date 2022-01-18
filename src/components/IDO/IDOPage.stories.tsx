import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { MemoryRouter } from 'react-router'
import { IDO } from './IDO'
import { Grid } from '@material-ui/core'
import Header from '../Header/Header'
import { DEFAULT_PUBLICKEY, NetworkType } from '@consts/static'
import { action } from '@storybook/addon-actions'
import { WalletType } from '@web3/wallet'
import Footer from '@components/Footer/Footer'

storiesOf('idoDeposit/ido', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div
        style={{
          background: '#0B090D',
          height: '100vh'
        }}>
        <Header
          address={DEFAULT_PUBLICKEY}
          onNetworkSelect={(chosen: string) => {
            action(`network changed to: ${chosen}`)()
          }}
          onWalletSelect={(chosen: WalletType) => {
            action(`wallet changed to: ${chosen}`)()
          }}
          walletConnected={false}
          landing='staking'
          onDisconnectWallet={action('disconnect')}
          typeOfNetwork={NetworkType.MAINNET}
        />
        <Grid container justifyContent='center'>
          <IDO />
        </Grid>
        <Footer />
      </div>
    )
  })
