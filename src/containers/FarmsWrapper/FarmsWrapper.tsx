import React, { useEffect } from 'react'
import FarmList from '@components/FarmsList/FarmList'
import { status } from '@selectors/solanaWallet'
import { Grid } from '@material-ui/core'
import { Status, actions as walletActions } from '@reducers/solanaWallet'
import { useSelector, useDispatch } from 'react-redux'
import { farmsWithUserStakedValues } from '@selectors/farms'
import { pools, tokens } from '@selectors/pools'
import { calcYPerXPrice } from '@consts/utils'
import { actions } from '@reducers/farms'

export const FarmsWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const walletStatus = useSelector(status)
  const allFarms = useSelector(farmsWithUserStakedValues)
  const allPools = useSelector(pools)
  const allTokens = useSelector(tokens)

  useEffect(() => {
    if (Object.values(allTokens).length > 0 && Object.values(allFarms).length === 0) {
      dispatch(actions.getFarms())
    }
  }, [allTokens])

  useEffect(() => {
    if (walletStatus === Status.Initialized && Object.values(allFarms).length > 0) {
      dispatch(actions.getUserStakes())
    }
  }, [walletStatus, allFarms])

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
            dispatch(walletActions.connect(type))
          },
          onDisconnect: () => {
            dispatch(walletActions.disconnect())
          },
          descCustomText: 'You have no farms.'
        }}
        showNoConnected={walletStatus !== Status.Initialized}
        title={'Active farms'}
        data={Object.values(allFarms).map(farm => {
          const now = Date.now() / 1000

          const poolData = allPools[farm.pool.toString()]

          const currentPrice = calcYPerXPrice(
            poolData.sqrtPrice.v,
            allTokens[poolData.tokenX.toString()].decimals,
            allTokens[poolData.tokenY.toString()].decimals
          )

          return {
            apyPercent: 0,
            totalStaked: (farm.totalStakedX ?? 0) + (farm.totalStakedY ?? 0) / currentPrice,
            yourStaked: (farm.userStakedX ?? 0) + (farm.userStakedY ?? 0) / currentPrice,
            tokenX: allTokens[allPools[farm.pool.toString()].tokenX.toString()],
            tokenY: allTokens[allPools[farm.pool.toString()].tokenY.toString()],
            farmId: farm.address.toString(),
            rewardSymbol: allTokens[farm.rewardToken.toString()].symbol,
            rewardIcon: allTokens[farm.rewardToken.toString()].logoURI,
            isActive: now >= farm.startTime.v.toNumber() && now <= farm.endTime.v.toNumber()
          }
        })}
      />
    </Grid>
  )
}
