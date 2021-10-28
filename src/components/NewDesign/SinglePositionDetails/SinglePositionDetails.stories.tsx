import { storiesOf } from '@storybook/react'
import React from 'react'
import { SinglePositionDetails } from './SinglePositionDetails'

storiesOf('singlePosition/leftComponent', module).add('closed', () => (
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
))
