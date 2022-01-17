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
        <div
          id={toBlur}
          style={{
            background:
              'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
            height: '100%'
          }}>
          <Grid>
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
            <IDO />
            <Footer />
          </Grid>
        </div>
      </div>
    )
  })
