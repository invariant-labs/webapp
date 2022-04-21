import React from 'react'
import FarmList from '@components/FarmsList/FarmList'
import { NetworkType, tokens } from '@consts/static'
import { status } from '@selectors/solanaWallet'
import { Grid } from '@material-ui/core'
import { Status, actions } from '@reducers/solanaWallet'
import { useSelector, useDispatch } from 'react-redux'

export const FarmsWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  return (
    <Grid
      style={{
        justifyContent: 'center',
        display: 'flex',
        paddingInline: 20
      }}>
      <FarmList
        noConnectedBlockerProps={{
          onConnect: type => {
            dispatch(actions.connect(type))
          },
          onDisconnect: () => {
            dispatch(actions.disconnect())
          },
          descCustomText: 'You have no farms.'
        }}
        showNoConnected={walletStatus !== Status.Initialized}
        title={'Active farms'}
        data={[
          {
            isActive: true,
            apyPercent: 1,
            totalStaked: 10000,
            yourStaked: 100,
            farmId: 'qwerty',
            tokenX: tokens[NetworkType.DEVNET][0],
            tokenY: tokens[NetworkType.DEVNET][1]
          },
          {
            isActive: true,
            apyPercent: 1,
            totalStaked: 10000,
            yourStaked: 200,
            farmId: 'qwerty',
            tokenX: tokens[NetworkType.DEVNET][2],
            tokenY: tokens[NetworkType.DEVNET][0]
          },
          {
            isActive: true,
            apyPercent: 1,
            totalStaked: 10000,
            yourStaked: 300,
            farmId: 'qwerty',
            tokenX: tokens[NetworkType.DEVNET][1],
            tokenY: tokens[NetworkType.DEVNET][2]
          }
        ]}
      />
    </Grid>
  )
}
