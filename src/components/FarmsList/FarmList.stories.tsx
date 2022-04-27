import React from 'react'
import { storiesOf } from '@storybook/react'
import FarmList from './FarmList'
import { NetworkType, tokens } from '@consts/static'
import { Grid } from '@material-ui/core'
import { MemoryRouter } from 'react-router'

storiesOf('farmsList/list', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('active', () => {
    return (
      <Grid
        style={{
          backgroundColor: '#1C1B1E',
          justifyContent: 'center',
          display: 'flex',
          paddingInline: 20
        }}>
        <FarmList
          title={'Active farms'}
          data={[
            {
              isActive: true,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][0],
              tokenY: tokens[NetworkType.DEVNET][1],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            },
            {
              isActive: true,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][2],
              tokenY: tokens[NetworkType.DEVNET][0],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            },
            {
              isActive: true,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][1],
              tokenY: tokens[NetworkType.DEVNET][2],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            }
          ]}
          emptyDesc='List is empty'
        />
      </Grid>
    )
  })
  .add('inactive', () => {
    return (
      <Grid
        style={{
          backgroundColor: '#1C1B1E',
          justifyContent: 'center',
          display: 'flex',
          paddingInline: 20
        }}>
        <FarmList
          title={'Inactive farms'}
          data={[
            {
              isActive: false,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][0],
              tokenY: tokens[NetworkType.DEVNET][1],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][2],
              tokenY: tokens[NetworkType.DEVNET][0],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStakedInXToken: 10000,
              yourStakedInXToken: 300,
              totalStakedInYToken: 20000,
              yourStakedInYToken: 500,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][1],
              tokenY: tokens[NetworkType.DEVNET][2],
              rewardIcon:
                'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU/logo.png',
              rewardSymbol: 'DOGE',
              feeTier: 0.01
            }
          ]}
          emptyDesc='List is empty'
        />
      </Grid>
    )
  })
