import { isLoading, lastInterval, poolsStatsWithTokensDetails } from '@store/selectors/stats'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VariantType } from 'notistack'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import { network } from '@store/selectors/solanaConnection'
import { actions as navigationActions } from '@store/reducers/navigation'
import { ISearchToken } from '@common/FilterSearch/FilterSearch'
import { unknownTokenIcon } from '@static/icons'
import {
  liquiditySearch,
  showFavourites as showFavouritesSelector
} from '@store/selectors/navigation'
import { Intervals, SortTypePoolList } from '@store/consts/static'
import PoolList from '@components/Stats/PoolList/PoolList'

export const WrappedPoolList: React.FC = () => {
  const dispatch = useDispatch()
  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const currentNetwork = useSelector(network)
  const searchParams = useSelector(liquiditySearch)
  const networkType = useSelector(network)
  const isLoadingStats = useSelector(isLoading)
  const [favouritePools, setFavouritePools] = useState<Set<string>>(
    new Set(
      JSON.parse(localStorage.getItem(`INVARIANT_FAVOURITE_POOLS_Solana_${networkType}`) || '[]')
    )
  )

  const showFavourites = useSelector(showFavouritesSelector)

  const setShowFavourites = (show: boolean) => {
    dispatch(navigationActions.setShowFavourites(show))
  }

  useEffect(() => {
    localStorage.setItem(
      `INVARIANT_FAVOURITE_POOLS_Solana_${networkType}`,
      JSON.stringify([...favouritePools])
    )
  }, [favouritePools])

  const switchFavouritePool = (poolAddress: string) => {
    if (favouritePools.has(poolAddress)) {
      const updatedFavouritePools = new Set(favouritePools)
      updatedFavouritePools.delete(poolAddress)
      setFavouritePools(updatedFavouritePools)
    } else {
      const updatedFavouritePools = new Set(favouritePools)
      updatedFavouritePools.add(poolAddress)
      setFavouritePools(updatedFavouritePools)
    }
  }

  const selectedFilters = searchParams.filteredTokens
  const setSelectedFilters = (tokens: ISearchToken[]) => {
    dispatch(
      navigationActions.setSearch({
        section: 'liquidityPool',
        type: 'filteredTokens',
        filteredTokens: tokens
      })
    )
    dispatch(
      navigationActions.setSearch({
        section: 'liquidityPool',
        type: 'pageNumber',
        pageNumber: 1
      })
    )
  }
  const lastFetchedInterval = useSelector(lastInterval)

  const filteredPoolsList = useMemo(() => {
    const poolsListWithFavourites = poolsList.map(poolData => ({
      ...poolData,
      isFavourite: favouritePools.has(poolData.poolAddress.toString())
    }))

    return poolsListWithFavourites.filter(poolData => {
      if (showFavourites) {
        if (!poolData.isFavourite) return false
      }
      const isTokenXSelected = selectedFilters.some(
        token => token.address.toString() === poolData.tokenX.toString()
      )
      const isTokenYSelected = selectedFilters.some(
        token => token.address.toString() === poolData.tokenY.toString()
      )

      if (selectedFilters.length === 1) {
        return isTokenXSelected || isTokenYSelected
      }

      if (selectedFilters.length === 2) {
        if (!(isTokenXSelected && isTokenYSelected)) return false
      }

      return true
    })
  }, [isLoadingStats, poolsList, selectedFilters, favouritePools, showFavourites, searchParams])

  const showAPY = useMemo(() => {
    return filteredPoolsList.some(pool => pool.apy !== 0)
  }, [filteredPoolsList])

  const copyAddressHandler = (message: string, variant: VariantType) => {
    dispatch(
      snackbarActions.add({
        message,
        variant,
        persist: false
      })
    )
  }

  const handleFavouritesClick = () => {
    setShowFavourites(!showFavourites)
    dispatch(
      navigationActions.setSearch({
        section: 'liquidityPool',
        type: 'pageNumber',
        pageNumber: 1
      })
    )
  }

  const handleChangePagination = (newPage: number) => {
    dispatch(
      navigationActions.setSearch({
        section: 'liquidityPool',
        type: 'pageNumber',
        pageNumber: newPage
      })
    )
  }

  const handlePoolsSortType = (sortType: SortTypePoolList) => {
    dispatch(navigationActions.setSearch({ section: 'liquidityPool', type: 'sortType', sortType }))
  }

  return (
    <PoolList
      initialLength={poolsList.length}
      interval={lastFetchedInterval || Intervals.Daily}
      data={filteredPoolsList.map(poolData => ({
        symbolFrom: poolData.tokenXDetails?.symbol ?? poolData.tokenX.toString(),
        symbolTo: poolData.tokenYDetails?.symbol ?? poolData.tokenY.toString(),
        iconFrom: poolData.tokenXDetails?.logoURI ?? unknownTokenIcon,
        iconTo: poolData.tokenYDetails?.logoURI ?? unknownTokenIcon,
        volume: poolData.volume24,
        TVL: poolData.tvl,
        fee: poolData.fee,
        addressFrom: poolData.tokenX.toString(),
        addressTo: poolData.tokenY.toString(),
        apy: poolData.apy,

        apyData: {
          fees: poolData.apy,
          accumulatedFarmsSingleTick: 0,
          accumulatedFarmsAvg: 0
        },

        isUnknownFrom: poolData.tokenXDetails?.isUnknown ?? false,
        isUnknownTo: poolData.tokenYDetails?.isUnknown ?? false,
        poolAddress: poolData.poolAddress.toString(),
        isFavourite: poolData.isFavourite
      }))}
      network={currentNetwork}
      copyAddressHandler={copyAddressHandler}
      isLoading={isLoadingStats}
      showAPY={showAPY}
      filteredTokens={selectedFilters}
      switchFavouritePool={switchFavouritePool}
      showFavourites={showFavourites}
      handleFavouritesClick={handleFavouritesClick}
      setSearchPoolsValue={setSelectedFilters}
      searchPoolsValue={selectedFilters}
      handleChangePagination={handleChangePagination}
      handleSortType={handlePoolsSortType}
      searchParams={searchParams}
    />
  )
}
