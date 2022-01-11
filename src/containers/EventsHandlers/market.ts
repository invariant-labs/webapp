import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { network, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools } from '@selectors/pools'
import { PAIRS } from '@consts/static'
import { getNetworkTokensList } from '@consts/utils'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const networkStatus = useSelector(status)
  const networkType = useSelector(network)
  const allPools = useSelector(pools)

  useEffect(() => {
    if (networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      dispatch(actions.setTokens(getNetworkTokensList(networkType)))
      dispatch(actions.getPoolsData(PAIRS[networkType]))
    }

    connectEvents()
  }, [dispatch, networkStatus])

  useEffect(() => {
    if (networkStatus !== Status.Initialized) {
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
  }, [dispatch, allPools.length, networkStatus])

  return null
}

export default MarketEvents
