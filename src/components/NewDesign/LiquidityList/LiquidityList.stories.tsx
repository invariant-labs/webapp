import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityList } from './LiquidityList'
import { Grid } from '@material-ui/core'
storiesOf('liquidityPosition/list', module).add('default', () => {
  return (
    <Grid style={{ backgroundColor: '#1C1B1E', justifyContent: 'center', display: 'flex' }}>
      <LiquidityList
        data={[
          {
            active: false,
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            active: true,
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            active: false,
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          },
          {
            active: true,
            nameToSwap: 'BTC',
            nameFromSwap: 'SNY',
            min: 2149.6,
            max: 149.6,
            fee: 0.05
          }
        ]}
      />
    </Grid>
  )
})
