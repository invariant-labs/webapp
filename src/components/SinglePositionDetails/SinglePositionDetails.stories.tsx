import { Grid } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SinglePositionDetails from './SinglePositionDetails'
import { liqTokens } from '@components/PositionDetalisWrapper/positionDetailsWrapper.stories'

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
      <SinglePositionDetails
        data={{
          active: false,
          nameToSwap: 'BTC',
          iconToSwap: tokens[0].logoURI,
          iconFromSwap: tokens[1].logoURI,
          nameFromSwap: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        liquidity={458302.48}
        unclaimedFee={44522.6789}
        onClickClaimFee={() => console.log('thanks from claiming')}
        liqValueTokenToSwap={2.19703}
        liqValueTokenFromSwap={20.99703}
        unclaimValueTokenToSwap={2.19703}
        unclaimValueTokenFromSwap={9.19703}
        closePosition={() => console.log('close position')}
      />
    </Grid>
  ))
  .add('active', () => (
    <Grid style={{ background: '#1C1B1E', width: '540px', height: '500px', padding: '20px' }}>
      <SinglePositionDetails
        data={{
          active: true,
          nameToSwap: 'BTC',
          iconToSwap: tokens[0].logoURI,
          iconFromSwap: tokens[1].logoURI,
          nameFromSwap: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }}
        liquidity={458302.48}
        unclaimedFee={44522.6789}
        onClickClaimFee={() => console.log('thanks from claiming')}
        liqValueTokenToSwap={2.19703}
        liqValueTokenFromSwap={20.99703}
        unclaimValueTokenToSwap={2.19703}
        unclaimValueTokenFromSwap={9.19703}
        closePosition={() => console.log('close position')}
      />
    </Grid>
  ))
