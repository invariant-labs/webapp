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
          title={'xBTC - xUSD'}
          rewards={'2 233.35'}
          rewardsTokenSymbol={'SNY'}
          iconTokenX={
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          }
          iconTokenY={
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          }
          iconRewardToken={
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          }
          data={[
            {
              value: 2345.34,
              staked: 233345,
              pair: 'xBTC - xUSD',
              rewardsToken: 'SNY',
              currencyPrice: 2,
              apy: 1,
              liquidity: 457
            },
            {
              value: 2345.34,
              staked: 233345,
              pair: 'xBTC - xUSD',
              rewardsToken: 'SNY',
              currencyPrice: 2,
              apy: 1,
              liquidity: 457
            },
            {
              value: 2345.34,
              staked: 233345,
              pair: 'xBTC - xUSD',
              rewardsToken: 'SNY',
              currencyPrice: 2,
              apy: 1,
              liquidity: 457
            }
          ]}
        />
      </Grid>
    )
  })
