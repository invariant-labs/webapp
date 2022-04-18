import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import App from './App'
import { NetworkType } from '@consts/static'
import { WalletType } from '@web3/wallet'
import { MemoryRouter } from 'react-router'
import { PublicKey } from '@solana/web3.js'
import { useAddonState } from '@storybook/store'

import { BN } from '@project-serum/anchor'
import { printBN } from '@consts/utils'

storiesOf('test/App', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    const balance = printBN(new BN(100).mul(new BN(4603445)), 6)
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []
      for (let i = 2; i < 26; i++) {
        data.push({
          timestamp: i * 60 * 60 * 1000 + 1000 * 60 * 60 * 24 + 1,
          value: Math.random()
        })
      }
      setData(data)
    }, [])

    return (
      <App
        address={new PublicKey(42)}
        onNetworkSelect={(chosen: string) => {
          action(`network changed to: ${chosen}`)()
        }}
        onWalletSelect={(chosen: WalletType) => {
          action(`wallet changed to: ${chosen}`)()
        }}
        walletConnected={true}
        landing='staking'
        onDisconnectWallet={action('disconnect')}
        typeOfNetwork={NetworkType.MAINNET}
        data={data}
        balance={balance}
      />
    )
  })
