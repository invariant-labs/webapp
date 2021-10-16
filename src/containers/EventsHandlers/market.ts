import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { status } from '@selectors/solanaConnection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/pools'
import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgramSync } from '@web3/programs/amm'
import { pools } from '@selectors/pools'

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
        actions.getPoolsData([
          {
            tokenX: new PublicKey(MOCK_TOKENS.USDC),
            tokenY: new PublicKey(MOCK_TOKENS.USDT)
          },
          {
            tokenX: new PublicKey(MOCK_TOKENS.USDC),
            tokenY: new PublicKey(MOCK_TOKENS.SOL)
          }
        ])
      )
    }

    connectEvents()
  }, [dispatch, networkStatus])

  useEffect(() => {
    if (networkStatus !== Status.Initialized) {
      return
    }

    const connectEvents = () => {
      allPools.forEach(pool => {
        marketProgram.onPoolChange(pool.tokenX, pool.tokenY, poolStructure => {
          // TODO: update for specific
          dispatch(
            actions.getPoolsData([
              {
                tokenX: new PublicKey(MOCK_TOKENS.USDC),
                tokenY: new PublicKey(MOCK_TOKENS.USDT)
              },
              {
                tokenX: new PublicKey(MOCK_TOKENS.USDC),
                tokenY: new PublicKey(MOCK_TOKENS.SOL)
              }
            ])
          )
        })
      })
    }

    connectEvents()
  }, [dispatch, allPools, networkStatus])

  return null
}

export default MarketEvents
