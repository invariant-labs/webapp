import React from 'react'
import { storiesOf } from '@storybook/react'
import { Grid } from '@material-ui/core'
import { MemoryRouter } from 'react-router'
import SelectedFarmList from './SelectedFarmList'
import icons from '@static/icons'

storiesOf('farmsList/selectedFarm', module)
    .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
    .add('list', () => {
        return (
            <Grid
                style={{
                    backgroundColor: '#1C1B1E',
                    justifyContent: 'center',
                    display: 'flex',
                    paddingInline: 20,
                    height: '100vh'
                }}>
                <SelectedFarmList
                    title={'xBTC - xUSD'}
                    rewards={'2 233.35 SNY'}
                    iconTokenX={icons.BTC}
                    iconTokenY={icons.USD}
                    iconSNY={icons.SNY}
                    data={[
                        {
                            value: 2345.34,
                            staked: 233345,
                            pair: 'xBTC - xUSD',
                            currency: 'SNY',
                            currencyPrice: 2,
                            apy: 1,
                            liquidity: 457,
                            stake: () => { },
                            unstake: () => { },
                            claimRewards: () => { }
                        },
                        {
                            value: 2345.34,
                            staked: 233345,
                            pair: 'xBTC - xUSD',
                            currency: 'SNY',
                            currencyPrice: 2,
                            apy: 1,
                            liquidity: 457,
                            stake: () => { },
                            unstake: () => { },
                            claimRewards: () => { }
                        },
                        {
                            value: 2345.34,
                            staked: 233345,
                            pair: 'xBTC - xUSD',
                            currency: 'SNY',
                            currencyPrice: 2,
                            apy: 1,
                            liquidity: 457,
                            stake: () => { },
                            unstake: () => { },
                            claimRewards: () => { }
                        }
                    ]}
                />
            </Grid>
        )
    })
