import { Grid } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { SinglePositionDetails } from './SinglePositionDetails'

storiesOf('singlePosition/leftComponent', module).add('closed', () => (
  <Grid style={{ background: '#1C1B1E', width: '520px' }}>
    <SinglePositionDetails
      data={{
        active: true,
        nameToSwap: 'BTC',
        nameFromSwap: 'SNY',
        min: 2149.6,
        max: 149.6,
        fee: 0.05
      }}
      liquidity={458302.48}
      unclaimedFee={44522.6789}
    />
  </Grid>
))
