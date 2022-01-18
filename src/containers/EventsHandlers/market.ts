import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { network, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools, initPool, poolTicks } from '@selectors/pools'
import { PAIRS } from '@consts/static'
import { getNetworkTokensList } from '@consts/utils'
import { getTokensAddresses } from '@selectors/swap'
import { Pair } from '@invariant-labs/sdk'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const allPools = useSelector(pools)
  const initPoolInfo = useSelector(initPool)
  const { fromToken, toToken } = useSelector(getTokensAddresses)
  const poolTicksArray = useSelector(poolTicks)

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
    if (networkStatus !== Status.Initialized || !marketProgram || !initPool) {
      return
    }
    poolTicksArray.map(tick => {
      marketProgram.onTickChange(new Pair(swapTokensAddress.fromToken, swapTokensAddress.toToken))
    })
  }, [initPoolInfo, networkStatus, marketProgram])

  return null
}

export default MarketEvents
