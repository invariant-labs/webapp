import React from 'react'
import { storiesOf } from '@storybook/react'
import { Grid } from '@material-ui/core'
import { MemoryRouter } from 'react-router'
import SelectedFarmList from './SelectedFarmList'

storiesOf('farmsList/selectedFarm', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('list', () => {
    return (
      <Grid
        style={{
          backgroundColor: '#1C1B1E',
          justifyContent: 'center',
          display: 'flex',
          paddingInline: 20,
          height: '100vh'
        }}>
        <SelectedFarmList
          tokenXIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          tokenYIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          rewardIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          tokenXSymbol='BTC'
          tokenYSymbol='SOL'
          rewardSymbol='SNY'
          duration='01.01.99 - 20.03.03'
          totalStakedInXToken={2000000}
          userStakedInXToken={5000}
          totalStakedInYToken={3000000}
          userStakedInYToken={7000}
          totalRewardPerDay={21.37}
          apy={9.11}
          toStake={[
            {
              tokenXSymbol: 'BTC',
              tokenYSymbol: 'SOL',
              minPrice: 2,
              maxPrice: 5.005,
              fee: 0.3,
              tokenXDeposit: 2137,
              tokenYDeposit: 911,
              valueX: 5184,
              valueY: 2137,
              onStake: () => {
                console.log('stake')
              }
            }
          ]}
          stakedPositions={[
            {
              tokenXSymbol: 'BTC',
              tokenYSymbol: 'SOL',
              minPrice: 2,
              maxPrice: 5.005,
              fee: 0.3,
              tokenXDeposit: 2137,
              tokenYDeposit: 911,
              valueX: 5184,
              valueY: 2137,
              rewardSymbol: 'SNY',
              onClaimReward: () => {
                console.log('reward')
              },
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
              rewardValue: 2137
            }
          ]}
          walletConnected
        />
      </Grid>
    )
  })
  .add('wallet not connected', () => {
    return (
      <Grid
        style={{
          backgroundColor: '#1C1B1E',
          justifyContent: 'center',
          display: 'flex',
          paddingInline: 20,
          height: '100vh'
        }}>
        <SelectedFarmList
          tokenXIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          tokenYIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          rewardIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          tokenXSymbol='BTC'
          tokenYSymbol='SOL'
          rewardSymbol='SNY'
          duration='01.01.99 - 20.03.03'
          totalStakedInXToken={2000000}
          userStakedInXToken={5000}
          totalStakedInYToken={3000000}
          userStakedInYToken={7000}
          totalRewardPerDay={21.37}
          apy={9.11}
          toStake={[]}
          stakedPositions={[]}
        />
      </Grid>
    )
  })
