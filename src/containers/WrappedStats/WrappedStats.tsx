import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { Grid, Typography } from '@mui/material'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import {
  fees24,
  isLoading,
  liquidityPlot,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails,
  tvl24,
  volume24,
  volumePlot
} from '@store/selectors/stats'
import { network } from '@store/selectors/solanaConnection'
import { actions } from '@store/reducers/stats'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import Volume from '@components/Stats/Volume/Volume'
import Liquidity from '@components/Stats/Liquidity/Liquidity'
import VolumeBar from '@components/Stats/volumeBar/VolumeBar'
import TokensList from '@components/Stats/TokensList/TokensList'
import PoolList from '@components/Stats/PoolList/PoolList'
import { VariantType } from 'notistack'
import { FilterSearch, ISearchToken } from '@common/FilterSearch/FilterSearch'
import { unknownTokenIcon } from '@static/icons'

export const WrappedStats: React.FC = () => {
  const { classes } = useStyles()

  const dispatch = useDispatch()

  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const tokensList = useSelector(tokensStatsWithTokensDetails)
  const volume24h = useSelector(volume24)
  const tvl24h = useSelector(tvl24)
  const fees24h = useSelector(fees24)
  const volumePlotData = useSelector(volumePlot)
  const liquidityPlotData = useSelector(liquidityPlot)
  const isLoadingStats = useSelector(isLoading)
  const currentNetwork = useSelector(network)

  const [searchTokensValue, setSearchTokensValue] = useState<ISearchToken[]>([])
  const [searchPoolsValue, setSearchPoolsValue] = useState<ISearchToken[]>([])

  useEffect(() => {
    dispatch(actions.getCurrentStats())
  }, [])

  const filteredTokenList = useMemo(() => {
    if (searchTokensValue.length === 0) {
      return tokensList
    }

    return tokensList.filter(tokenData => {
      const tokenAddress = tokenData.address.toString().toLowerCase()
      const tokenSymbol = tokenData.tokenDetails?.symbol?.toLowerCase() || ''
      const tokenName = tokenData.tokenDetails?.name?.toLowerCase() || ''

      return searchTokensValue.some(filterToken => {
        const filterAddress = filterToken.address?.toLowerCase()
        const filterSymbol = filterToken.symbol.toLowerCase()
        const filterName = filterToken.name.toLowerCase()

        if (filterAddress) {
          return tokenAddress === filterAddress
        }
        return tokenSymbol.includes(filterSymbol) || tokenName.includes(filterName)
      })
    })
  }, [tokensList, searchTokensValue])

  const filteredPoolsList = useMemo(() => {
    return poolsList.filter(poolData => {
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
  }, [isLoadingStats, poolsList, searchPoolsValue])

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
          <Typography className={classes.subheader}>Overview</Typography>
          <Grid container className={classes.plotsRow} wrap='nowrap'>
            <Volume
              volume={volume24h.value}
              percentVolume={volume24h.change}
              data={volumePlotData}
              className={classes.plot}
              isLoading={isLoadingStats}
            />
            <Liquidity
              liquidityVolume={tvl24h.value}
              liquidityPercent={tvl24h.change}
              data={liquidityPlotData}
              className={classes.plot}
              isLoading={isLoadingStats}
            />
          </Grid>
          <Grid className={classes.row}>
            <VolumeBar
              volume={volume24h.value}
              percentVolume={volume24h.change}
              tvlVolume={tvl24h.value}
              percentTvl={tvl24h.change}
              feesVolume={fees24h.value}
              percentFees={fees24h.change}
              isLoading={isLoadingStats}
            />
          </Grid>
          <Grid className={classes.rowContainer}>
            <Typography className={classes.subheader} mb={2}>
              Top pools
            </Typography>
            <FilterSearch
              networkType={currentNetwork}
              selectedFilters={searchPoolsValue}
              setSelectedFilters={setSearchPoolsValue}
              filtersAmount={2}
              closeOnSelect={true}
            />
          </Grid>
          <Grid container className={classes.row}>
            <PoolList
              initialLength={poolsList.length}
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
                poolAddress: poolData.poolAddress.toString()
              }))}
              network={currentNetwork}
              copyAddressHandler={copyAddressHandler}
              isLoading={isLoadingStats}
              showAPY={showAPY}
            />
          </Grid>
          <Grid className={classes.rowContainer}>
            <Typography className={classes.subheader} mb={2}>
              Top tokens
            </Typography>

            <FilterSearch
              networkType={currentNetwork}
              setSelectedFilters={setSearchTokensValue}
              selectedFilters={searchTokensValue}
              filtersAmount={2}
            />
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
              isUnknown: tokenData.tokenDetails?.isUnknown ?? false
            }))}
            network={currentNetwork}
            copyAddressHandler={copyAddressHandler}
            isLoading={isLoadingStats}
          />
        </>
      )}
    </Grid>
  )
}

export default WrappedStats
