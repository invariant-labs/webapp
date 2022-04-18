import React, { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Wallet from './components/Wallet/Wallet'
import Stats from './components/Stats/Stats'

import { Grid } from '@material-ui/core'

import { WalletType } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from '@consts/static'

import useStyles from './style'
import { toBlur } from '@consts/uiUtils'
import { TimeData } from '@reducers/stats'

export interface IApp {
  address: PublicKey
  onNetworkSelect: (chosen: NetworkType) => void
  onWalletSelect: (chosen: WalletType) => void
  walletConnected: boolean
  landing: string
  typeOfWallet?: WalletType
  typeOfNetwork: NetworkType
  onFaucet?: () => void
  onDisconnectWallet: () => void
  data: TimeData[]
  balance: string
}

export const App: React.FC<IApp> = ({
  address,
  onNetworkSelect,
  onWalletSelect,
  walletConnected,
  landing,
  typeOfWallet = WalletType.PHANTOM,
  typeOfNetwork,
  onFaucet,
  onDisconnectWallet,
  data,
  balance
}) => {
  const classes = useStyles()
  const toCurrency = [
    {
      name: 'USD',
      rate: 0.448797
    },

    {
      name: 'ETH',
      rate: 0.003
    },

    {
      name: 'BTC',
      rate: 0.00001119
    }
  ]

  const [value, setValue] = React.useState<string>('')
  const [balanceUSD, setBalanceUSD] = React.useState<string>(
    (parseFloat(balance) * toCurrency[0].rate).toString().split('.')[0] +
      '.' +
      (parseFloat(balance) * toCurrency[0].rate).toString().split('.')[1].slice(0, 4)
  )
  const [currencyType, setCurrencyType] = React.useState<string>('SNY')
  const [currentCurrency, setCurrentCurrency] = React.useState<number>(0)

  const changeCurrencyType = (currentCurrencyType: string) => {
    if (currentCurrencyType === 'SNY') {
      setCurrencyType('AERGO')
    } else {
      setCurrencyType('SNY')
    }
  }
  return (
    <Grid container className={classes.rootBackground}>
      <div className={classes.root} id={toBlur}>
        <Grid container className={classes.mainWrapper}>
          <Header
            address={address}
            onNetworkSelect={onNetworkSelect}
            onWalletSelect={onWalletSelect}
            walletConnected={walletConnected}
            landing={landing}
            onDisconnectWallet={onDisconnectWallet}
            typeOfNetwork={typeOfNetwork}
            onFaucet={onFaucet}
          />
          <Grid container className={classes.mainContainer}>
            <Grid container className={classes.walletContainer}>
              <Wallet
                balance={balance}
                balanceUSD={balanceUSD}
                value={value}
                setValue={setValue}
                currencyType={currencyType}
                currentCurrency={currentCurrency}
                setCurrentCurrency={setCurrentCurrency}
                toCurrency={toCurrency}
                changeCurrencyType={changeCurrencyType}
                percentageChange={currencyType === 'SNY' ? 0.1 : -4.15}
              />
            </Grid>
            <Grid container className={classes.statsContainer}>
              <Stats
                currencyType={currencyType}
                liquidityPercent={currencyType === 'SNY' ? 0.1 : -4.15}
                liquidityVolume={balance ? parseFloat(balanceUSD) : 0}
                data={data}
                value={value}
                balance={balance}
                rate={currencyType === 'SNY' ? 0.1 : -4.15}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

export default App
