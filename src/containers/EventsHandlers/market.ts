import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as R from 'remeda'
import { network, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools, poolTicks } from '@selectors/pools'
import { PAIRS } from '@consts/static'
import { getNetworkTokensList } from '@consts/utils'
import { getTokensAddresses } from '@selectors/swap'
import { Pair } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { all } from 'redux-saga/effects'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const allPools = useSelector(pools)
  const { fromToken, toToken } = useSelector(getTokensAddresses)
  const poolTicksArray = useSelector(poolTicks)
  const [subscribedTick, _setSubscribeTick] = useState<
    Array<{ fromToken: string; toToken: string; indexPool: number }>
  >([])
  useEffect(() => {
    if (networkStatus !== Status.Initialized || !marketProgram) {
      return
    }
    const connectEvents = () => {
      dispatch(actions.setTokens(getNetworkTokensList(networkType)))
      dispatch(actions.getPoolsData(PAIRS[networkType]))
    }

    connectEvents()
  }, [dispatch, networkStatus, marketProgram])

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !marketProgram) {
      return
    }

    const connectEvents = () => {
      allPools.forEach((pool, index) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        marketProgram.onPoolChange(pool.tokenX, pool.tokenY, { fee: pool.fee.v }, poolStructure => {
          dispatch(
            actions.updatePool({
              index,
              poolStructure
            })
          )
        })
      })
    }

    connectEvents()
  }, [dispatch, allPools.length, networkStatus, marketProgram])

  useEffect(() => {
    console.log(Object.values(poolTicksArray).length)
    if (
      networkStatus !== Status.Initialized ||
      !marketProgram ||
      Object.values(allPools).length === 0
    ) {
      return
    }
    const connectEvents = async () => {
      console.log(allPools)
      console.log(poolTicksArray)
      allPools.map((pool, indexPool) => {
        console.log(subscribedTick)
        if (
          subscribedTick.findIndex(
            e =>
              ((e.fromToken === fromToken.toString() && e.toToken === toToken.toString()) ||
                (e.toToken === fromToken.toString() && e.fromToken === toToken.toString())) &&
              e.indexPool === indexPool
          ) !== -1
        ) {
          return
        }
        console.log('before sub')
        subscribedTick.push({
          fromToken: pool.tokenX.toString(),
          toToken: toToken.toString(),
          indexPool
        })
        // eslint-disable-next-line array-callback-return
        R.forEachObj(poolTicksArray, tick => {
          tick.map((singleTick, index) => {
            marketProgram.onTickChange(
              new Pair(pool.tokenX, pool.tokenY, FEE_TIERS[0]),
              singleTick.index,
              tickObject => {
                console.log('change!', singleTick.index, 'pool number: ', indexPool)
                dispatch(
                  actions.updateTicks({
                    poolIndex: indexPool.toString(),
                    index: singleTick.index,
                    tick: tickObject
                  })
                )
              }
            )
          })
        })
        console.log('after sub')
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [networkStatus, marketProgram, Object.values(allPools).length])

  return null
}

export default MarketEvents
