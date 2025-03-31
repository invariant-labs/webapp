import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { network, rpcAddress, status } from '@store/selectors/solanaConnection'
import { actions } from '@store/reducers/pools'
import { poolsArraySortedByFees } from '@store/selectors/pools'
import { swap } from '@store/selectors/swap'
import { IWallet, Pair } from '@invariant-labs/sdk'
import { PublicKey } from '@solana/web3.js'
import { Status, actions as solanaConnectionActions } from '@store/reducers/solanaConnection'
import { getMarketProgramSync } from '@utils/web3/programs/amm'
import {
  findPairs,
  getFullNewTokensData,
  getNetworkTokensList,
  getPoolsVolumeRanges,
  ROUTES
} from '@utils/utils'
import { getCurrentSolanaConnection } from '@utils/web3/connection'
import { getSolanaWallet } from '@utils/web3/wallet'
import { currentPoolIndex } from '@store/selectors/positions'
import { useLocation } from 'react-router-dom'

const MarketEvents = () => {
  const dispatch = useDispatch()
  const networkType = useSelector(network)
  const rpc = useSelector(rpcAddress)
  const wallet = getSolanaWallet()
  const marketProgram = getMarketProgramSync(networkType, rpc, wallet as IWallet)
  const { tokenFrom, tokenTo } = useSelector(swap)
  const networkStatus = useSelector(status)
  const allPools = useSelector(poolsArraySortedByFees)
  const newPositionPoolIndex = useSelector(currentPoolIndex)
  const [subscribedSwapPools, _setSubscribedSwapPools] = useState<Set<string>>(new Set())
  const [newPositionSubscribedPool, setNewPositionSubscribedPool] = useState<PublicKey>(
    PublicKey.default
  )

  const location = useLocation()

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

  // New position pool subscription
  useEffect(() => {
    if (
      networkStatus !== Status.Initialized ||
      !marketProgram ||
      !location.pathname.startsWith(ROUTES.NEW_POSITION)
    ) {
      return
    }

    if (newPositionPoolIndex !== null && newPositionPoolIndex !== undefined) {
      const pool = allPools[newPositionPoolIndex]
      if (pool && !pool.address.equals(newPositionSubscribedPool)) {
        marketProgram.program.account.pool.unsubscribe(newPositionSubscribedPool)
        setNewPositionSubscribedPool(pool.address)
        marketProgram.onPoolChange(
          pool.tokenX,
          pool.tokenY,
          { fee: pool.fee.v, tickSpacing: pool.tickSpacing },
          poolStructure => {
            dispatch(
              actions.updatePool({
                address: pool.address,
                poolStructure
              })
            )
          }
        )
      }
    }
  }, [dispatch, networkStatus, newPositionPoolIndex])

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

      for (const subscribedPool of Array.from(subscribedSwapPools)) {
        if (pools.some(p => p.address.toString() === subscribedPool)) {
          continue
        } else {
          marketProgram.program.account.pool.unsubscribe(new PublicKey(subscribedPool))
          subscribedSwapPools.delete(subscribedPool)
        }
      }

      if (pools) {
        for (const pool of pools) {
          subscribedSwapPools.add(pool.address.toString())

          marketProgram.onPoolChange(
            pool.tokenX,
            pool.tokenY,
            { fee: pool.fee.v, tickSpacing: pool.tickSpacing },
            poolStructure => {
              dispatch(
                actions.updatePool({
                  address: pool.address,
                  poolStructure
                })
              )
            }
          )
        }
      }
    }
  }, [tokenFrom, tokenTo])

  useEffect(() => {
    window.addEventListener('unhandledrejection', e => {
      dispatch(solanaConnectionActions.handleRpcError(e))
    })

    return () => {}
  }, [])

  useEffect(() => {
    // Unsubscribe from swap pools on different pages than swap
    if (!location.pathname.startsWith(ROUTES.EXCHANGE)) {
      for (const pool of Array.from(subscribedSwapPools)) {
        marketProgram.program.account.pool.unsubscribe(new PublicKey(pool))
        subscribedSwapPools.delete(pool)
      }
    }

    // Unsubscribe from new position pool on different pages than new position
    if (
      !location.pathname.startsWith(ROUTES.NEW_POSITION) &&
      !newPositionSubscribedPool.equals(PublicKey.default)
    ) {
      marketProgram.program.account.pool.unsubscribe(newPositionSubscribedPool)
      setNewPositionSubscribedPool(PublicKey.default)
    }
  }, [location.pathname])

  return null
}

export default MarketEvents
