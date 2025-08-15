import { Box, Typography, useMediaQuery } from '@mui/material'
import { isLoading, poolsStatsWithTokensDetails } from '@store/selectors/stats'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { VariantType } from 'notistack'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import { network } from '@store/selectors/solanaConnection'
import { actions as navigationActions } from '@store/reducers/navigation'
import LiquidityPoolList from '@components/LiquidityPoolList/LiquidityPoolList'
import { FilterSearch, ISearchToken } from '@common/FilterSearch/FilterSearch'
import { theme } from '@static/theme'
import { unknownTokenIcon } from '@static/icons'
import { liquiditySearch } from '@store/selectors/navigation'

export const WrappedPoolList: React.FC = () => {
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const { classes } = useStyles({ isXs })
  const dispatch = useDispatch()
  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const currentNetwork = useSelector(network)
  const searchParams = useSelector(liquiditySearch)
  const isLoadingStats = useSelector(isLoading)

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

  const filteredPoolsList = useMemo(() => {
    return poolsList.filter(poolData => {
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
  }, [isLoadingStats, poolsList, selectedFilters])

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
    <div className={classes.container}>
      <Box className={classes.rowContainer}>
        <Typography className={classes.subheader} mb={2}>
          All pools
        </Typography>

        <FilterSearch
          networkType={currentNetwork}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filtersAmount={2}
        />
      </Box>

      <LiquidityPoolList
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
        filteredTokens={selectedFilters}
      />
    </div>
  )
}
