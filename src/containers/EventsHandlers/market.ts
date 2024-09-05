import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { network, rpcAddress, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/pools'
import { getMarketProgramSync } from '@web3/programs/amm'
import { poolsArraySortedByFees, poolTicks, tickMaps } from '@selectors/pools'
import {
  getNetworkTokensList,
  findPairs,
  getFullNewTokensData,
  getPoolsVolumeRanges
} from '@consts/utils'
import { swap } from '@selectors/swap'
import { findTickmapChanges, Pair } from '@invariant-labs/sdk'
import { PublicKey } from '@solana/web3.js'
import { getCurrentSolanaConnection } from '@web3/connection'
import { Status, actions as solanaConnectionActions } from '@reducers/solanaConnection'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const networkType = useSelector(network)
  const rpc = useSelector(rpcAddress)
  const marketProgram = getMarketProgramSync(networkType, rpc)
  const { tokenFrom, tokenTo } = useSelector(swap)
  const networkStatus = useSelector(status)
  const tickmaps = useSelector(tickMaps)
  const allPools = useSelector(poolsArraySortedByFees)

  const poolTicksArray = useSelector(poolTicks)
  const [subscribedTick, _setSubscribeTick] = useState<Set<string>>(new Set())
  const [subscribedTickmap, _setSubscribedTickmap] = useState<Set<string>>(new Set())
  useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (networkStatus !== Status.Initialized || !connection) {
      return
    }
    const connectEvents = () => {
      let tokens = getNetworkTokensList(networkType)

      const currentListStr = localStorage.getItem(`CUSTOM_TOKENS_${networkType}`)
      const currentList: PublicKey[] =
        currentListStr !== null
          ? JSON.parse(currentListStr)
              .filter((address: string) => !tokens[address])
              .map((address: string) => new PublicKey(address))
          : []

      const lastTokenFrom = localStorage.getItem(`INVARIANT_LAST_TOKEN_FROM_${networkType}`)
      const lastTokenTo = localStorage.getItem(`INVARIANT_LAST_TOKEN_FROM_${networkType}`)

      if (
        lastTokenFrom !== null &&
        !tokens[lastTokenFrom] &&
        !currentList.find(addr => addr.toString() === lastTokenFrom)
      ) {
        currentList.push(new PublicKey(lastTokenFrom))
      }

      if (
        lastTokenTo !== null &&
        !tokens[lastTokenTo] &&
        !currentList.find(addr => addr.toString() === lastTokenTo)
      ) {
        currentList.push(new PublicKey(lastTokenTo))
      }

      getFullNewTokensData(currentList, connection)
        .then(data => {
          tokens = {
            ...tokens,
            ...data
          }
        })
        .finally(() => {
          dispatch(actions.addTokens(tokens))
        })
      getPoolsVolumeRanges(networkType.toLowerCase())
        .then(ranges => {
          dispatch(actions.setVolumeRanges(ranges))
        })
        .catch(error => {
          console.log(error)
        })
    }

    connectEvents()
  }, [dispatch, networkStatus])

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !marketProgram) {
      return
    }

    const connectEvents = () => {
      allPools.forEach(pool => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        marketProgram.onPoolChange(pool.tokenX, pool.tokenY, { fee: pool.fee.v }, poolStructure => {
          dispatch(
            actions.updatePool({
              address: pool.address,
              poolStructure
            })
          )
        })
      })
    }

    connectEvents()
  }, [dispatch, allPools.length, networkStatus, marketProgram])

  useEffect(() => {
    if (networkStatus !== Status.Initialized || !marketProgram || allPools.length === 0) {
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
                new Pair(pool.tokenX, pool.tokenY, {
                  fee: pool.fee.v,
                  tickSpacing: pool.tickSpacing
                }),
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
          void marketProgram.onTickmapChange(new PublicKey(address), tickmap => {
            const changes = findTickmapChanges(
              tickmaps[address].bitmap,
              tickmap.bitmap,
              pool.tickSpacing
            )

            for (const [index, info] of Object.entries(changes)) {
              if (info === 'added') {
                try {
                  // trunk-ignore(eslint/@typescript-eslint/no-floating-promises)
                  void marketProgram.onTickChange(
                    new Pair(pool.tokenX, pool.tokenY, {
                      fee: pool.fee.v,
                      tickSpacing: pool.tickSpacing
                    }),
                    +index,
                    tickObject => {
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
        void marketProgram
          .getTickmap(
            new Pair(pool.tokenX, pool.tokenY, { fee: pool.fee.v, tickSpacing: pool.tickSpacing })
          )
          .then(res => {
            dispatch(actions.setTickMaps({ index: pool.tickmap.toString(), tickMapStructure: res }))
          })
        void marketProgram
          .getAllTicks(
            new Pair(tokenFrom, tokenTo, { fee: pool.fee.v, tickSpacing: pool.tickSpacing })
          )
          .then(res => {
            dispatch(actions.setTicks({ index: pool.address.toString(), tickStructure: res }))
          })
      }
    }
  }, [tokenFrom, tokenTo])

  useEffect(() => {
    window.addEventListener('unhandledrejection', e => {
      dispatch(solanaConnectionActions.handleRpcError(e))
    })

    return () => {}
  }, [])

  return null
}

export default MarketEvents
