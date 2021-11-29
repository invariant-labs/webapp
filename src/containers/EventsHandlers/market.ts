import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools } from '@selectors/pools'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'
import { PAIRS } from '@consts/static'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const networkStatus = useSelector(status)
  const allPools = useSelector(pools)

  useEffect(() => {
    if (networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      dispatch(
        actions.getPoolsData(PAIRS)
      )
    }

    connectEvents()
  }, [dispatch, networkStatus])

  useEffect(() => {
    if (networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      allPools.forEach((pool) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        marketProgram.onPoolChange(pool.tokenX, pool.tokenY, FEE_TIERS[0], _poolStructure => {
          // TODO: update for specific
          dispatch(
            dispatch(
              actions.getPoolsData(PAIRS)
            )
          )
        })
      })
    }

    connectEvents()
  }, [dispatch, allPools, networkStatus])

  return null
}

export default MarketEvents
