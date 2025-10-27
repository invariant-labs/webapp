import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import {
  cumulativeFees,
  cumulativeVolume,
  currentInterval,
  fees,
  isLoading,
  lastInterval,
  lastSnapTimestamp,
  liquidityPlot,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails,
  tvl,
  volume,
  volumePlot
} from '@store/selectors/stats'
import { network } from '@store/selectors/solanaConnection'
import { actions } from '@store/reducers/stats'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import { actions as navigationActions } from '@store/reducers/navigation'
import TokensList from '@components/Stats/TokensList/TokensList'
import PoolList from '@components/Stats/PoolList/PoolList'
import { VariantType } from 'notistack'
import { FilterSearch, ISearchToken } from '@common/FilterSearch/FilterSearch'
import { star, starFill, unknownTokenIcon } from '@static/icons'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import Overview from '@components/Stats/Overview/Overview'
import {
  poolSearch,
  tokenSearch,
  showFavourites as showFavouritesSelector,
  showFavouritesTokens as showFavouritesTokensSelector
} from '@store/selectors/navigation'
import { theme } from '@static/theme'

export const WrappedStats: React.FC = () => {
  const { classes } = useStyles()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useDispatch()

  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const tokensList = useSelector(tokensStatsWithTokensDetails)
  const volumeInterval = useSelector(volume)
  const tvlInterval = useSelector(tvl)
  const feesInterval = useSelector(fees)
  const volumePlotData = useSelector(volumePlot)
  const lastStatsTimestamp = useSelector(lastSnapTimestamp)
  const liquidityPlotData = useSelector(liquidityPlot)
  const isLoadingStats = useSelector(isLoading)
  const currentNetwork = useSelector(network)
  const cumulativeVolumeData = useSelector(cumulativeVolume)
  const cumulativeFeesData = useSelector(cumulativeFees)
  const searchParamsPool = useSelector(poolSearch)
  const searchParamsToken = useSelector(tokenSearch)

  const lastUsedInterval = useSelector(currentInterval)
  const lastFetchedInterval = useSelector(lastInterval)
  const [favouriteTokens, setFavouriteTokens] = useState<Set<string>>(
    new Set(
      JSON.parse(
        localStorage.getItem(`INVARIANT_FAVOURITE_TOKENS_Eclipse_${currentNetwork}`) || '[]'
      )
    )
  )
  const setShowFavouritesTokens = (show: boolean) => {
    dispatch(navigationActions.setShowFavouritesTokens(show))
  }
  useEffect(() => {
    localStorage.setItem(
      `INVARIANT_FAVOURITE_TOKENS_Eclipse_${currentNetwork}`,
      JSON.stringify([...favouriteTokens])
    )
  }, [favouriteTokens])
  const searchTokensValue = searchParamsToken.filteredTokens
  const [favouritePools, setFavouritePools] = useState<Set<string>>(
    new Set(
      JSON.parse(
        localStorage.getItem(`INVARIANT_FAVOURITE_POOLS_Eclipse_${currentNetwork}`) || '[]'
      )
    )
  )
  const showFavourites = useSelector(showFavouritesSelector)
  const showFavouritesTokens = useSelector(showFavouritesTokensSelector)
  const switchFavouriteToken = (tokenAddress: string) => {
    if (favouriteTokens.has(tokenAddress)) {
      const updatedFavouriteTokens = new Set(favouriteTokens)
      updatedFavouriteTokens.delete(tokenAddress)
      setFavouriteTokens(updatedFavouriteTokens)
    } else {
      const updatedFavouriteTokens = new Set(favouriteTokens)
      updatedFavouriteTokens.add(tokenAddress)
      setFavouriteTokens(updatedFavouriteTokens)
    }
  }
  const setShowFavourites = (show: boolean) => {
    dispatch(navigationActions.setShowFavourites(show))
  }

  useEffect(() => {
    localStorage.setItem(
      `INVARIANT_FAVOURITE_POOLS_Eclipse_${currentNetwork}`,
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
  const setSearchTokensValue = (tokens: ISearchToken[]) => {
    dispatch(
      navigationActions.setSearch({
        section: 'statsTokens',
        type: 'filteredTokens',
        filteredTokens: tokens
      })
    )
    dispatch(
      navigationActions.setSearch({
        section: 'statsTokens',
        type: 'pageNumber',
        pageNumber: 1
      })
    )
  }

  const searchPoolsValue = searchParamsPool.filteredTokens
  const setSearchPoolsValue = (tokens: ISearchToken[]) => {
    dispatch(
      navigationActions.setSearch({
        section: 'statsPool',
        type: 'filteredTokens',
        filteredTokens: tokens
      })
    )
    dispatch(
      navigationActions.setSearch({
        section: 'statsPool',
        type: 'pageNumber',
        pageNumber: 1
      })
    )
  }

  useEffect(() => {
    if (lastFetchedInterval === lastUsedInterval || !lastUsedInterval) return
    dispatch(actions.getCurrentIntervalStats({ interval: lastUsedInterval }))
  }, [lastUsedInterval, lastFetchedInterval])

  useEffect(() => {
    if (lastUsedInterval) return
    dispatch(actions.getCurrentIntervalStats({ interval: IntervalsKeys.Daily }))
    dispatch(actions.setCurrentInterval({ interval: IntervalsKeys.Daily }))
  }, [lastUsedInterval])

  const updateInterval = (interval: IntervalsKeys) => {
    dispatch(actions.getCurrentIntervalStats({ interval }))
    dispatch(actions.setCurrentInterval({ interval }))
  }

  const filteredTokenList = useMemo(() => {
    const tokensListWithFavourites = tokensList.map(tokenData => ({
      ...tokenData,
      isFavourite: favouriteTokens.has(tokenData.address.toString())
    }))

    return tokensListWithFavourites.filter(tokenData => {
      if (showFavouritesTokens && !tokenData.isFavourite) {
        return false
      }

      if (searchTokensValue.length === 0) {
        return true
      }
      const tokenAddress = tokenData.address.toString().toLowerCase()
      const tokenSymbol = tokenData.tokenDetails?.symbol?.toLowerCase() || ''
      const tokenName = tokenData.tokenDetails?.name?.toLowerCase() || ''

      return searchTokensValue.some(filterToken => {
        const filterAddress = filterToken.address?.toLowerCase() || ''
        const filterSymbol = filterToken.symbol.toLowerCase()
        const filterName = filterToken.name.toLowerCase()

        if (filterAddress) {
          return tokenAddress === filterAddress
        }
        return tokenSymbol.includes(filterSymbol) || tokenName.includes(filterName)
      })
    })
  }, [tokensList, searchTokensValue, favouriteTokens, showFavouritesTokens])

  const filteredPoolsList = useMemo(() => {
    const poolsListWithFavourites = poolsList.map(poolData => ({
      ...poolData,
      isFavourite: favouritePools.has(poolData.poolAddress.toString())
    }))

    return poolsListWithFavourites.filter(poolData => {
      if (showFavourites) {
        if (!poolData.isFavourite) return false
      }
      const isTokenXSelected = searchPoolsValue.some(
        token => token.address.toString() === poolData.tokenX.toString()
      )
      const isTokenYSelected = searchPoolsValue.some(
        token => token.address.toString() === poolData.tokenY.toString()
      )

      if (searchPoolsValue.length === 1) {
        return isTokenXSelected || isTokenYSelected
      }

      if (searchPoolsValue.length === 2) {
        if (!(isTokenXSelected && isTokenYSelected)) return false
      }

      return true
    })
  }, [isLoadingStats, poolsList, searchPoolsValue, favouritePools, showFavourites])

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

  return (
    <Grid container className={classes.wrapper}>
      {liquidityPlotData.length === 0 && !isLoadingStats ? (
        <Grid container className={classes.emptyWrapper}>
          <EmptyPlaceholder desc={'We have not started collecting statistics yet'} />
        </Grid>
      ) : (
        <>
          <Overview
            feesInterval={feesInterval}
            isLoadingStats={isLoadingStats}
            lastStatsTimestamp={lastStatsTimestamp}
            lastUsedInterval={lastUsedInterval}
            updateInterval={updateInterval}
            volumeInterval={volumeInterval}
            volumePlotData={volumePlotData}
            liquidityPlotData={liquidityPlotData}
            tvlInterval={tvlInterval}
            cumulativeVolume={cumulativeVolumeData}
            cumulativeFees={cumulativeFeesData}
          />
          <Grid className={classes.rowContainer}>
            <Typography className={classes.subheader} mb={2}>
              Top pools
            </Typography>
            <Box className={classes.headerContainer}>
              <Button
                className={classes.showFavouritesButton}
                onClick={() => {
                  setShowFavourites(!showFavourites)
                  dispatch(
                    navigationActions.setSearch({
                      section: 'statsPool',
                      type: 'pageNumber',
                      pageNumber: 1
                    })
                  )
                }}>
                <img src={showFavourites ? starFill : star} />
                {!isMd && (
                  <Typography className={classes.showFavouritesText}>Show favourites</Typography>
                )}
              </Button>
              <FilterSearch
                networkType={currentNetwork}
                setSelectedFilters={setSearchPoolsValue}
                selectedFilters={searchPoolsValue}
                filtersAmount={2}
              />
            </Box>
          </Grid>
          <Grid container className={classes.row}>
            <PoolList
              initialLength={poolsList.length}
              interval={lastUsedInterval ?? IntervalsKeys.Daily}
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
                  fees: poolData.apy
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
              filteredTokens={searchPoolsValue}
              switchFavouritePool={switchFavouritePool}
              showFavourites={showFavourites}
            />
          </Grid>
          <Grid className={classes.rowContainer}>
            <Typography className={classes.subheader} mb={2}>
              Top tokens
            </Typography>

            <Box className={classes.headerContainer}>
              <Button
                className={classes.showFavouritesButton}
                onClick={() => {
                  setShowFavouritesTokens(!showFavouritesTokens)
                  dispatch(
                    navigationActions.setSearch({
                      section: 'statsTokens',
                      type: 'pageNumber',
                      pageNumber: 1
                    })
                  )
                }}>
                <img src={showFavouritesTokens ? starFill : star} />
                {!isMd && (
                  <Typography className={classes.showFavouritesText}>
                    {' '}
                    {!showFavouritesTokens ? 'Show' : 'Hide'} favourites
                  </Typography>
                )}
              </Button>
              <FilterSearch
                networkType={currentNetwork}
                setSelectedFilters={setSearchTokensValue}
                selectedFilters={searchTokensValue}
                filtersAmount={2}
                closeOnSelect={true}
              />
            </Box>
          </Grid>
          <TokensList
            initialLength={tokensList.length}
            data={filteredTokenList.map(tokenData => ({
              icon: tokenData.tokenDetails?.logoURI ?? unknownTokenIcon,
              name: tokenData.tokenDetails?.name ?? tokenData.address.toString(),
              symbol: tokenData.tokenDetails?.symbol ?? tokenData.address.toString(),
              price: tokenData.price,
              // priceChange: tokenData.priceChange,
              volume: tokenData.volume24,
              TVL: tokenData.tvl,
              address: tokenData.address.toString(),
              isUnknown: tokenData.tokenDetails?.isUnknown ?? false,
              isFavourite: tokenData.isFavourite
            }))}
            network={currentNetwork}
            copyAddressHandler={copyAddressHandler}
            isLoading={isLoadingStats}
            interval={lastUsedInterval ?? IntervalsKeys.Daily}
            switchFavouriteTokens={switchFavouriteToken}
          />
        </>
      )}
    </Grid>
  )
}

export default WrappedStats
