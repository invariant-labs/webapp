import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityList } from './LiquidityList'
import { Grid } from '@material-ui/core'
storiesOf('liquidityPosition/list', module).add('default', () => {
  const handleClick = () => {
    console.log('actionButton add Position')
  }
  return (
    <Grid style={{ backgroundColor: '#1C1B1E', justifyContent: 'center', display: 'flex' }}>
      <LiquidityList
        data={[
          {
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            iconToSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            iconFromSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            iconToSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            iconFromSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            iconToSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            iconFromSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            iconToSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            iconFromSwap: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          }
        ]}
        onAddPositionClick={handleClick}
        noConnectedBlockerProps={{
          onConnect: () => {},
          onDisconnect: () => {}
        }}
      />
    </Grid>
  )
})
