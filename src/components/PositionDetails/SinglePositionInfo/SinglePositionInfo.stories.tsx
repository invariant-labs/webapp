import { Grid } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SinglePositionInfo from './SinglePositionInfo'

storiesOf('singlePosition/leftComponent', module)
  .add('active', () => (
    <Grid style={{ background: '#1C1B1E', width: '540px', height: '500px', padding: '20px' }}>
      <SinglePositionInfo
        onClickClaimFee={() => console.log('thanks from claiming')}
        closePosition={() => console.log('close position')}
        swapHandler={() => {}}
        xToY
        fee={0.01}
        tokenX={{
          name: 'BTC',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimal: 9,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
        tokenY={{
          name: 'SNY',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png',
          decimal: 9,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
      />
    </Grid>
  ))
