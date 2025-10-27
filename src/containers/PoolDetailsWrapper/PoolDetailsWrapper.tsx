import PoolDetails from '@components/PoolDetails/PoolDetails'
import {
  ALL_FEE_TIERS_DATA,
  disabledPools,
  StableCoinsMAIN,
  WRAPPED_SOL_ADDRESS
} from '@store/consts/static'
import { isLoadingLatestPoolsForTransaction, poolsArraySortedByFees } from '@store/selectors/pools'
import { network } from '@store/selectors/solanaConnection'
import { poolTokens, SwapToken } from '@store/selectors/solanaWallet'
import {
  addNewTokenToLocalStorage,
  addressToTicker,
  getNewTokenOrThrow,
  getTokenPrice,
  getTokenReserve,
  parseFeeToPathFee,
  parsePathFeeToFeeString,
  printBN,
  ROUTES,
  tickerToAddress
} from '@utils/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions as poolsActions, PoolWithAddress } from '@store/reducers/pools'
import {
  currentInterval,
  currentPoolData,
  isLoading,
  lastSnapTimestamp,
  poolsStatsWithTokensDetails
} from '@store/selectors/stats'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import { actions as navigationActions } from '@store/reducers/navigation'
import { address } from '@store/selectors/navigation'
import { actions } from '@store/reducers/stats'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { VariantType } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { getCurrentSolanaConnection } from '@utils/web3/connection'
import { Connection, PublicKey } from '@solana/web3.js'
import { TokenReserve } from '@store/consts/types'
import { Pair } from '@invariant-labs/sdk'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
}

export const PoolDetailsWrapper: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const locationHistory = useSelector(address)
  const connection = getCurrentSolanaConnection()
  const tokens = useSelector(poolTokens)

  const allPools = useSelector(poolsArraySortedByFees)
  const currentNetwork = useSelector(network)

  const statsPoolData = useSelector(currentPoolData)
  const lastStatsTimestamp = useSelector(lastSnapTimestamp)
  const isLoadingStats = useSelector(isLoading)

  const lastUsedInterval = useSelector(currentInterval)

  const poolsList = useSelector(poolsStatsWithTokensDetails)

  const isFetchingNewPool = useSelector(isLoadingLatestPoolsForTransaction)

  const [favouritePools, setFavouritePools] = useState<Set<string>>(
    new Set(
      JSON.parse(localStorage.getItem(`INVARIANT_FAVOURITE_POOLS_Solana_${currentNetwork}`) || '[]')
    )
  )

  const [triggerRefresh, setTriggerRefresh] = useState(false)

  const [tokenX, settokenX] = useState<SwapToken | null>(null)
  const [tokenY, settokenY] = useState<SwapToken | null>(null)

  const [tokenXReserve, settokenXReserve] = useState<TokenReserve | null>(null)
  const [tokenYReserve, settokenYReserve] = useState<TokenReserve | null>(null)

  const [prices, setPrices] = useState<{ tokenX: number; tokenY: number }>({
    tokenX: 0,
    tokenY: 0
  })

  const [poolData, setPoolData] = useState<PoolWithAddress | null>(null)

  const [sameTokensError, setSameTokensError] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      `INVARIANT_FAVOURITE_POOLS_Solana_${currentNetwork}`,
      JSON.stringify([...favouritePools])
    )
  }, [favouritePools])

  const switchFavouritePool = () => {
    if (!poolData) return
    if (favouritePools.has(poolData?.address.toString())) {
      const updatedFavouritePools = new Set(favouritePools)
      updatedFavouritePools.delete(poolData.address.toString())
      setFavouritePools(updatedFavouritePools)
    } else {
      const updatedFavouritePools = new Set(favouritePools)
      updatedFavouritePools.add(poolData.address.toString())
      setFavouritePools(updatedFavouritePools)
    }
  }

  const isFavourite = useMemo(() => {
    if (!poolData) return false
    return favouritePools.has(poolData.address.toString())
  }, [poolData?.address.toString(), favouritePools])

  const fetchTokensReserves = async (
    tokenX: PublicKey,
    tokenY: PublicKey,
    connection: Connection
  ) => {
    const [tokenXReserve, tokenYReserve] = await Promise.all([
      getTokenReserve(tokenX, connection),
      getTokenReserve(tokenY, connection)
    ])

    return { tokenXReserve, tokenYReserve }
  }

  useEffect(() => {
    dispatch(actions.setLoadingStats(true))
  }, [])

  useEffect(() => {
    const connection = getCurrentSolanaConnection()
    if (poolData && connection) {
      fetchTokensReserves(poolData.tokenXReserve, poolData.tokenYReserve, connection)
        .then(({ tokenXReserve, tokenYReserve }) => {
          settokenXReserve(tokenXReserve)
          settokenYReserve(tokenYReserve)
        })
        .catch(err => {
          console.error('Error fetching reserves:', err)
        })
    }
  }, [poolData])

  useEffect(() => {
    const loadPrices = async () => {
      if (!tokenX || !tokenY) return
      const priceResults = await Promise.all([
        await getTokenPrice(currentNetwork, tokenX?.assetAddress.toString()),
        await getTokenPrice(currentNetwork, tokenY?.assetAddress.toString())
      ])

      const tokenXPrice = priceResults[0]
      const tokenYPrice = priceResults[1]

      setPrices({
        tokenX: tokenXPrice.price ?? 0,
        tokenY: tokenYPrice.price ?? 0
      })
    }

    loadPrices()
  }, [tokenX, tokenY])

  const isPoolDataLoading = useMemo(() => {
    return isFetchingNewPool
  }, [isFetchingNewPool])

  const getTokenIndex = (ticker: string) => {
    const address = tickerToAddress(currentNetwork, ticker)
    if (!address) return { address: null, index: -1 }

    return address
  }

  useEffect(() => {
    if (!lastUsedInterval || !poolData?.address) return
    dispatch(
      actions.getCurrentIntervalPoolStats({
        interval: lastUsedInterval,
        poolAddress: poolData?.address.toString()
      })
    )
  }, [triggerRefresh, poolData?.address.toString()])

  useEffect(() => {
    if (lastUsedInterval || !poolData?.address) return
    dispatch(
      actions.getCurrentIntervalPoolStats({
        interval: IntervalsKeys.Daily,
        poolAddress: poolData?.address.toString()
      })
    )

    dispatch(actions.setCurrentInterval({ interval: IntervalsKeys.Daily }))
  }, [lastUsedInterval, poolData?.address])

  const updateInterval = (interval: IntervalsKeys) => {
    if (!poolData?.address) return
    dispatch(
      actions.getCurrentIntervalPoolStats({
        interval,
        poolAddress: poolData?.address.toString()
      })
    )
    dispatch(actions.setCurrentInterval({ interval }))
  }

  const copyAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  useEffect(() => {
    const tokenXAddress = getTokenIndex(initialTokenFrom)
    const tokenYAddress = getTokenIndex(initialTokenTo)

    let tokenX = tokens.find(token => token.address.toString() === tokenXAddress?.toString())
    let tokenY = tokens.find(token => token.address.toString() === tokenYAddress?.toString())

    if (!tokenX) {
      if (tokenY && tokenY.assetAddress.toString() !== WRAPPED_SOL_ADDRESS) {
        tokenX = tokens.find(token => token.address.toString() === WRAPPED_SOL_ADDRESS)
      } else {
        tokenX = tokens.find(token => token.address.toString() === StableCoinsMAIN.USDC)
      }
    }

    if (!tokenY) {
      if (tokenX && tokenX.assetAddress.toString() !== StableCoinsMAIN.USDC) {
        tokenY = tokens.find(token => token.address.toString() === StableCoinsMAIN.USDC)
      } else {
        tokenY = tokens.find(token => token.address.toString() === WRAPPED_SOL_ADDRESS)
      }
    }

    if (!tokenX || !tokenY) return

    const isXToY = tokenX.assetAddress.toString() < tokenY.assetAddress.toString()

    settokenX(isXToY ? tokenX : tokenY)
    settokenY(isXToY ? tokenY : tokenX)
  }, [tokens.length])

  const { fee, tickSpacing } = useMemo(() => {
    const parsedFee = parsePathFeeToFeeString(initialFee)
    const feeTierData = ALL_FEE_TIERS_DATA.find(
      feeTierData => feeTierData.tier.fee.toString() === parsedFee
    )

    return feeTierData
      ? { fee: feeTierData.tier.fee, tickSpacing: feeTierData.tier.tickSpacing }
      : { fee: undefined, tickSpacing: undefined }
  }, [initialFee])

  useEffect(() => {
    if (fee && tickSpacing && tokenX && tokenY) {
      if (tokenX.assetAddress.toString() === tokenY.assetAddress.toString()) {
        setSameTokensError(true)
        setPoolData(null)
        return
      } else {
        setSameTokensError(false)
        dispatch(
          poolsActions.getPoolData(
            new Pair(tokenX.assetAddress, tokenY.assetAddress, {
              fee,
              tickSpacing
            })
          )
        )
      }
    }
  }, [initialFee, tokenX?.assetAddress.toString(), tokenY?.assetAddress.toString()])

  useEffect(() => {
    if (!isPoolDataLoading && tokenX?.assetAddress && tokenY?.assetAddress && fee) {
      const index = allPools.findIndex(
        pool =>
          pool.fee.v.eq(fee) &&
          ((pool.tokenX.equals(tokenX.assetAddress) && pool.tokenY.equals(tokenY.assetAddress)) ||
            (pool.tokenX.equals(tokenY.assetAddress) && pool.tokenY.equals(tokenX.assetAddress)))
      )
      setPoolData(allPools[index])
    }
  }, [isPoolDataLoading, allPools.length, initialFee])

  const handleOpenSwap = () => {
    dispatch(navigationActions.setNavigation({ address: location.pathname }))
    navigate(ROUTES.getExchangeRoute(tokenX?.symbol, tokenY?.symbol), {
      state: { referer: 'stats' }
    })
  }

  const handleOpenPosition = () => {
    dispatch(navigationActions.setNavigation({ address: location.pathname }))
    navigate(ROUTES.getNewPositionRoute(tokenX?.symbol, tokenY?.symbol, parseFeeToPathFee(fee)), {
      state: { referer: 'stats' }
    })
  }

  useEffect(() => {
    dispatch(actions.getCurrentIntervalStats({ interval: lastUsedInterval ?? IntervalsKeys.Daily }))
  }, [initialFee, lastUsedInterval])

  const { feeTiersWithTvl, totalTvl, totalFees, totalVolume } = useMemo(() => {
    if (tokenX === null || tokenY === null) {
      return { feeTiersWithTvl: {}, totalTvl: 0, totalFees: 0, totalVolume: 0 }
    }
    const feeTiersWithTvl: Record<number, number> = {}
    let totalTvl = 0
    let totalFees = 0
    let totalVolume = 0

    poolsList.forEach(pool => {
      const xMatch =
        pool.tokenX.equals(tokenX.assetAddress) && pool.tokenY.equals(tokenY.assetAddress)
      const yMatch =
        pool.tokenX.equals(tokenY.assetAddress) && pool.tokenY.equals(tokenX.assetAddress)

      if (xMatch || yMatch) {
        feeTiersWithTvl[pool.fee] = pool.tvl
        totalTvl += pool.tvl
        totalFees += pool.fee * 0.01 * pool.volume24
        totalVolume += pool.volume24
      }
    })

    return { feeTiersWithTvl, totalTvl, totalFees, totalVolume }
  }, [poolsList, tokenX, tokenY, lastUsedInterval])

  const feeTiers = ALL_FEE_TIERS_DATA.map(tier => +printBN(tier.tier.fee, DECIMAL - 2))

  const selectFeeTier = (index: number) => {
    if (index === -1) return

    const fee = ALL_FEE_TIERS_DATA[index].tier.fee

    const tokenA = addressToTicker(currentNetwork, tokenX?.assetAddress.toString() ?? '')
    const tokenB = addressToTicker(currentNetwork, tokenY?.assetAddress.toString() ?? '')

    const parsedFee = parseFeeToPathFee(fee)

    navigate(ROUTES.getPoolDetailsRoute(tokenA, tokenB, parsedFee))
  }

  const handleBack = () => {
    const parsedLocation = locationHistory.slice(0, 12)
    const path = parsedLocation === ROUTES.POOL_DETAILS ? ROUTES.PORTFOLIO : locationHistory
    navigate(path)
  }

  const feeTierIndex = useMemo(() => {
    const parsedFee = parsePathFeeToFeeString(initialFee)

    const feeIndex = ALL_FEE_TIERS_DATA.findIndex(tier => tier.tier.fee.toNumber() === +parsedFee)

    return feeIndex !== -1 ? feeIndex : 0
  }, [initialFee, ALL_FEE_TIERS_DATA])

  const onRefresh = () => {
    setTriggerRefresh(prev => !prev)

    dispatch(actions.getCurrentIntervalStats({ interval: lastUsedInterval ?? IntervalsKeys.Daily }))

    if (fee && tickSpacing && tokenX && tokenY) {
      if (tokenX.assetAddress.toString() === tokenY.assetAddress.toString()) {
        setPoolData(null)
        setSameTokensError(true)
        return
      } else {
        setSameTokensError(false)

        dispatch(
          poolsActions.getPoolData(
            new Pair(tokenX.assetAddress, tokenY.assetAddress, {
              fee,
              tickSpacing
            })
          )
        )
      }
    }
  }

  const { isDisabled, disabledFeeTiers } = useMemo(() => {
    if (!tokenX?.assetAddress || !tokenY?.assetAddress) {
      return { isDisabled: false, disabledFeeTiers: [] }
    }

    const matchingPools = disabledPools.filter(
      pool =>
        (pool.tokenX.equals(tokenX.assetAddress) && pool.tokenY.equals(tokenY.assetAddress)) ||
        (pool.tokenX.equals(tokenY.assetAddress) && pool.tokenY.equals(tokenX.assetAddress))
    )

    const disabledFeeTiers = matchingPools.flatMap(p => p.feeTiers)
    const formattedFee = (+printBN(fee, DECIMAL - 2)).toString()
    const isDisabled = disabledFeeTiers.includes(formattedFee)

    return { isDisabled, disabledFeeTiers }
  }, [tokenX, tokenY, fee, disabledPools])

  const addTokenHandler = (address: string) => {
    if (
      connection !== null &&
      tokens.findIndex(token => token.address.toString() === address) === -1
    ) {
      getNewTokenOrThrow(address, connection)
        .then(data => {
          dispatch(poolsActions.addTokens(data))

          addNewTokenToLocalStorage(address, currentNetwork)
          dispatch(
            snackbarActions.add({
              message: 'Token added',
              variant: 'success',
              persist: false
            })
          )
        })
        .catch(() => {
          dispatch(
            snackbarActions.add({
              message: 'Token add failed',
              variant: 'error',
              persist: false
            })
          )
        })
    } else {
      dispatch(
        snackbarActions.add({
          message: 'Token already in list',
          variant: 'info',
          persist: false
        })
      )
    }
  }

  const setTokens = (tokenX: SwapToken, tokenY: SwapToken) => {
    settokenX(tokenX)
    settokenY(tokenY)

    const tokenA = addressToTicker(currentNetwork, tokenX?.assetAddress.toString() ?? '')
    const tokenB = addressToTicker(currentNetwork, tokenY?.assetAddress.toString() ?? '')
    const parsedFee = parseFeeToPathFee(fee)

    navigate(ROUTES.getPoolDetailsRoute(tokenA, tokenB, parsedFee))
  }

  const onCreateNewPool = () => {
    dispatch(navigationActions.setNavigation({ address: location.pathname }))

    const parsedFee = parseFeeToPathFee(fee)

    navigate(
      ROUTES.getNewPositionRoute(
        tokenX?.assetAddress.toString(),
        tokenY?.assetAddress.toString(),
        parsedFee
      ),
      {
        state: { referer: 'stats' }
      }
    )
  }

  useEffect(() => {
    return () => {
      dispatch(
        actions.setPoolStats({
          feesPlot: [],
          liquidityPlot: [],
          volumePlot: [],
          timestamp: 0,
          volume: 0,
          tvl: 0,
          fees: 0,
          apy: 0
        })
      )
    }
  }, [])

  return (
    <PoolDetails
      network={currentNetwork}
      statsPoolData={statsPoolData}
      tokenX={tokenX}
      tokenY={tokenY}
      handleOpenSwap={handleOpenSwap}
      handleOpenPosition={handleOpenPosition}
      poolData={poolData}
      isPoolDataLoading={isPoolDataLoading}
      interval={lastUsedInterval ?? IntervalsKeys.Daily}
      isLoadingStats={isLoadingStats}
      lastStatsTimestamp={lastStatsTimestamp}
      setChartType={e => dispatch(actions.setPoolDetailsChartType(e))}
      copyAddressHandler={copyAddressHandler}
      updateInterval={updateInterval}
      tokenXReserve={tokenXReserve}
      tokenYReserve={tokenYReserve}
      prices={prices}
      selectFeeTier={selectFeeTier}
      feeTiers={feeTiers}
      handleBack={handleBack}
      feeTiersWithTvl={feeTiersWithTvl}
      aggregatedStats={{ tvl: totalTvl, fees: totalFees, volume: totalVolume }}
      feeTierIndex={feeTierIndex}
      onRefresh={onRefresh}
      isFavourite={isFavourite}
      switchFavouritePool={switchFavouritePool}
      isDisabled={isDisabled}
      disabledFeeTiers={disabledFeeTiers}
      tokens={tokens}
      setTokens={setTokens}
      handleAddToken={addTokenHandler}
      onCreateNewPool={onCreateNewPool}
      sameTokensError={sameTokensError}
    />
  )
}

export default PoolDetailsWrapper
