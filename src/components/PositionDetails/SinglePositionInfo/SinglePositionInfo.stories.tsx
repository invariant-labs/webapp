import { Grid } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SinglePositionInfo from './SinglePositionInfo'
import { liqTokens } from '@components/PositionDetails/PositionDetails.stories'

const tokens: liqTokens[] = [
  {
    symbol: 'BTC',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  {
    symbol: 'SNY',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png'
  }
]

storiesOf('singlePosition/leftComponent', module)
  .add('closed', () => (
    <Grid style={{ background: '#1C1B1E', width: '540px', height: '500px', padding: '20px' }}>
      <SinglePositionInfo
        data={{
          tokenXName: 'BTC',
          tokenXIcon: tokens[0].logoURI,
          tokenYIcon: tokens[1].logoURI,
          tokenYName: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        onClickClaimFee={() => console.log('thanks from claiming')}
        tokenXLiqValue={2.19703}
        tokenYLiqValue={20.99703}
        tokenXClaimValue={2.19703}
        tokenYClaimValue={9.19703}
        closePosition={() => console.log('close position')}
      />
    </Grid>
  ))
  .add('active', () => (
    <Grid style={{ background: '#1C1B1E', width: '540px', height: '500px', padding: '20px' }}>
      <SinglePositionInfo
        data={{
          tokenXName: 'BTC',
          tokenXIcon: tokens[0].logoURI,
          tokenYIcon: tokens[1].logoURI,
          tokenYName: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        onClickClaimFee={() => console.log('thanks from claiming')}
        tokenXLiqValue={2.19703}
        tokenYLiqValue={20.99703}
        tokenXClaimValue={2.19703}
        tokenYClaimValue={9.19703}
        closePosition={() => console.log('close position')}
      />
    </Grid>
  ))
