import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { network, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools, initPool, poolTicks } from '@selectors/pools'
import { PAIRS } from '@consts/static'
import { getNetworkTokensList } from '@consts/utils'
import { getTokensAddresses } from '@selectors/swap'
import { Pair } from '@invariant-labs/sdk'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const allPools = useSelector(pools)
  const initPoolInfo = useSelector(initPool)
  const { fromToken, toToken } = useSelector(getTokensAddresses)
  const poolTicksArray = useSelector(poolTicks)
  const [subscribedTick, _setSubscribeTick] = useState<
    Array<{ fromToken: string; toToken: string }>
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
    if (
      networkStatus !== Status.Initialized ||
      !marketProgram ||
      !initPoolInfo ||
      poolTicksArray.length === 0
    ) {
      return
    }
    const connectEvents = async () => {
      if (
        subscribedTick.findIndex(
          e =>
            (e.fromToken === fromToken.toString() && e.toToken === toToken.toString()) ||
            (e.toToken === fromToken.toString() && e.fromToken === toToken.toString())
        ) !== -1
      ) {
        return
      }
      subscribedTick.push({ fromToken: fromToken.toString(), toToken: toToken.toString() })
      // eslint-disable-next-line array-callback-return
      poolTicksArray.map(tick => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        marketProgram.onTickChange(
          new Pair(fromToken, toToken, FEE_TIERS[0]),
          tick.index,
          tickObject => {
            dispatch(
              actions.updateTicks({
                index: tick.index,
                tick: tickObject
              })
            )
          }
        )
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [initPoolInfo, networkStatus, marketProgram, poolTicksArray.length])

  return null
}

export default MarketEvents
