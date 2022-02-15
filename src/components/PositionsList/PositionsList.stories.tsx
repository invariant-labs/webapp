import React from 'react'
import { storiesOf } from '@storybook/react'
import { PositionsList } from './PositionsList'
import { Grid } from '@material-ui/core'
import { MemoryRouter } from 'react-router-dom'

const data = [
  {
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '1'
  },
  {
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '2'
  },
  {
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '3'
  },
  {
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '4'
  }
]

storiesOf('positionsList/list', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    const handleClick = () => {
      console.log('actionButton add Position')
    }
    return (
      <Grid
        style={{
          backgroundColor: '#1C1B1E',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingInline: 20
        }}>
        <PositionsList
          data={data}
          onAddPositionClick={handleClick}
          itemsPerPage={5}
          noConnectedBlockerProps={{
            onConnect: () => {},
            onDisconnect: () => {}
          }}
          searchValue={''}
          searchSetValue={() => {}}
        />
      </Grid>
    )
  })
