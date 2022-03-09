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
import { findTickmapChanges, Pair } from '@invariant-labs/sdk'
import { PublicKey } from '@solana/web3.js'

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
          if (subscribedTickmap.has(address)) {
            return
          }
          subscribedTickmap.add(address)
          const pool = allPools.find(pool => {
            return pool.tickmap.toString() === address
          })
          if (typeof pool === 'undefined') {
            return
          }
          // trunk-ignore(eslint/@typescript-eslint/no-floating-promises)
          marketProgram.onTickmapChange(new PublicKey(address), tickmap => {
            const changes = findTickmapChanges(
              tickmaps[address].bitmap,
              tickmap.bitmap,
              pool.tickSpacing
            )
            console.log(changes)
            for (const [index, info] of Object.entries(changes)) {
              if (info === 'added') {
                try {
                  console.log('sub')
                  // trunk-ignore(eslint/@typescript-eslint/no-floating-promises)
                  marketProgram.onTickChange(
                    new Pair(pool.tokenX, pool.tokenY, { fee: pool.fee.v }),
                    +index,
                    tickObject => {
                      console.log('subscribe new tick!', index)
                      dispatch(
                        actions.updateTicks({
                          address: pool.address.toString(),
                          index: +index,
                          tick: tickObject
                        })
                      )
                    }
                  )
                } catch (err) {
                  console.log(err)
                }
              }
            }
            dispatch(
              actions.updateTickmap({
                address: address,
                bitmap: tickmap.bitmap
              })
            )
          })
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectEvents()
  }, [networkStatus, marketProgram, Object.values(tickmaps).length])

  useEffect(() => {
    if (tokenFrom && tokenTo) {
      const pools = findPairs(tokenFrom, tokenTo, allPools)
      for (const pool of pools) {
        marketProgram
          .getTickmap(new Pair(pool.tokenX, pool.tokenY, { fee: pool.fee.v }))
          .then(res => {
            dispatch(actions.setTickMaps({ index: pool.tickmap.toString(), tickMapStructure: res }))
          })
          .catch(err => {
            console.log(err)
          })
        marketProgram
          .getAllTicks(new Pair(tokenFrom, tokenTo, { fee: pool.fee.v }))
          .then(res => {
            dispatch(actions.setTicks({ index: pool.address.toString(), tickStructure: res }))
          })
          .catch(err => console.log(err))
      }
    }
  }, [tokenFrom, tokenTo])

  return null
}

export default MarketEvents
