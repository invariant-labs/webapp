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
          noConnectedBlockerProps={{
            onConnect: () => {},
            onDisconnect: () => {}
          }}
          title={'Active farms'}
          data={[
            {
              isActive: true,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 100,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][0],
              tokenY: tokens[NetworkType.DEVNET][1]
            },
            {
              isActive: true,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 200,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][2],
              tokenY: tokens[NetworkType.DEVNET][0]
            },
            {
              isActive: true,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 300,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][1],
              tokenY: tokens[NetworkType.DEVNET][2]
            }
          ]}
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
          noConnectedBlockerProps={{
            onConnect: () => {},
            onDisconnect: () => {}
          }}
          title={'Inactive farms'}
          data={[
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 100,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][0],
              tokenY: tokens[NetworkType.DEVNET][1]
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 200,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][2],
              tokenY: tokens[NetworkType.DEVNET][0]
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 300,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][1],
              tokenY: tokens[NetworkType.DEVNET][2]
            }
          ]}
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
        <FarmList
          noConnectedBlockerProps={{
            onConnect: () => {},
            onDisconnect: () => {}
          }}
          showNoConnected={true}
          title={'Active farms'}
          data={[
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 100,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][0],
              tokenY: tokens[NetworkType.DEVNET][1]
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 200,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][2],
              tokenY: tokens[NetworkType.DEVNET][0]
            },
            {
              isActive: false,
              apyPercent: 1,
              totalStaked: 10000,
              liquidity: 300,
              farmId: 'qwerty',
              tokenX: tokens[NetworkType.DEVNET][1],
              tokenY: tokens[NetworkType.DEVNET][2]
            }
          ]}
        />
      </Grid>
    )
  })

// <NoConnected onConnect={() => {}} onDisconnect={() => {}} />
