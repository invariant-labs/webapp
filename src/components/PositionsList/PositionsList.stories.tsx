import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { ILiquidityItem, PositionsList } from './PositionsList'
import { Grid } from '@material-ui/core'
import { MemoryRouter } from 'react-router-dom'
import { PaginationList } from './Pagination/Pagination'

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
    value: 10000.45,
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
    value: 10000.45,
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
    value: 10000.45,
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
    value: 10000.45,
    id: '4'
  }
]

storiesOf('positionsList/list', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => {
    const [page, setPage] = useState(1)
    const itemsPerPage = 2
    const handleClick = () => {
      console.log('actionButton add Position')
    }
    const handleChangePagination = (page: number): void => {
      setPage(page)
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
          itemsPerPage={2}
          noConnectedBlockerProps={{
            onConnect: () => {},
            onDisconnect: () => {}
          }}
        />
      </Grid>
    )
  })
