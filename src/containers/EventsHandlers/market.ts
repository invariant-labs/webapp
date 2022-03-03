import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { network, status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools, poolTicks, tickMaps } from '@selectors/pools'
import { PAIRS } from '@consts/static'
import { getNetworkTokensList, findPairs } from '@consts/utils'
import { swap } from '@selectors/swap'
import { Pair } from '@invariant-labs/sdk'
import { PublicKey } from '@solana/web3.js'
import { add } from 'lodash'
import { ContactsOutlined } from '@material-ui/icons'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const marketProgram = getMarketProgramSync()
  const { tokenFrom, tokenTo } = useSelector(swap)
  const networkStatus = useSelector(status)
  const tickmaps = useSelector(tickMaps)
  const networkType = useSelector(network)
  const allPools = useSelector(pools)
  const poolTicksArray = useSelector(poolTicks)
  const [subscribedTick, _setSubscribeTick] = useState<Set<string>>(new Set())
  const [subscribedTickmap, _setSubscribedTickmap] = useState<Set<string>>(new Set())
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
      Object.values(allPools).length === 0
    ) {
      return
    }
    const connectEvents = async () => {
      if (tokenFrom && tokenTo) {
        Object.keys(poolTicksArray).forEach(address => {
          if (subscribedTick.has(address)) {
            return
          }
          subscribedTick.add(address)
          const pool = allPools.find(pool => {
            return pool.address.toString() === address
          })
          if (typeof pool === 'undefined') {
            return
          }
          poolTicksArray[address].forEach(singleTick => {
            marketProgram
              .onTickChange(
                new Pair(pool.tokenX, pool.tokenY, { fee: pool.fee.v }),
                singleTick.index,
                tickObject => {
                  dispatch(
                    actions.updateTicks({
                      address: address,
                      index: singleTick.index,
                      tick: tickObject
                    })
                  )
                }
              )
              .then(() => {})
              .catch(() => {})
          })
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [networkStatus, marketProgram, Object.values(poolTicksArray).length])

  useEffect(() => {
    if (
      networkStatus !== Status.Initialized ||
      !marketProgram ||
      Object.values(allPools).length === 0
    ) {
      return
    }
    const connectEvents = async () => {
      if (tokenFrom && tokenTo) {
        Object.keys(tickmaps).forEach(address => {
          console.log(address)
          if (subscribedTickmap.has(address)) {
            return
          }
          subscribedTickmap.add(address)
          const pool = allPools.find(pool => {
            return pool.tickmap.toString() === address
          })
          console.log(allPools)
          console.log(pool)
          if (typeof pool === 'undefined') {
            return
          }
          console.log(123)
          marketProgram
            .onTickmapChange(new PublicKey(address), tickmap => {
              console.log(tickmap)
              dispatch(
                actions.updateTickmap({
                  address: address,
                  bitmap: tickmap.bitmap
                })
              )
            })
            .then(() => {})
            .catch(() => {})
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [networkStatus, marketProgram, Object.values(tickmaps).length])

  useEffect(() => {
    if (tokenFrom && tokenTo) {
      const pools = findPairs(tokenFrom, tokenTo, allPools)

      if (pools.length !== 0) {
        marketProgram
          .getTickmap(new Pair(pools[0].tokenX, pools[0].tokenY, { fee: pools[0].fee.v }))
          .then(res => {
            dispatch(
              actions.setTickMaps({ index: pools[0].tickmap.toString(), tickMapStructure: res })
            )
          })
        marketProgram
          .getAllTicks(new Pair(tokenFrom, tokenTo, { fee: pools[0].fee.v }))
          .then(res => {
            dispatch(actions.setTicks({ index: pools[0].address.toString(), tickStructure: res }))
          })
      }

      // pools.forEach(pool => {
      //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
      //   marketProgram.getAllTicks(new Pair(tokenFrom, tokenTo, { fee: pool.fee.v })).then(res => {
      //     dispatch(actions.setTicks({ index: pool.address.toString(), tickStructure: res }))
      //   })
      // }) code for set ticks for all fee tiers
    }
  }, [tokenFrom, tokenTo])

  return null
}

export default MarketEvents
