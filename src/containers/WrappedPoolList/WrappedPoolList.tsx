import { Grid, InputAdornment, InputBase, Typography } from '@mui/material'
import { isLoading, poolsStatsWithTokensDetails } from '@store/selectors/stats'
import { shortenAddress } from '@utils/uiUtils'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@static/svg/lupaDark.svg'
import useStyles from './styles'
import icons from '@static/icons'
import { VariantType } from 'notistack'
import { actions as snackbarActions } from '@store/reducers/snackbars'
import { network } from '@store/selectors/solanaConnection'
import { actions } from '@store/reducers/stats'
import LiquidityPoolList from '@components/LiquidityPoolList/LiquidityPoolList'

export const WrappedPoolList: React.FC = () => {
  const { classes } = useStyles()

  const dispatch = useDispatch()
  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const currentNetwork = useSelector(network)
  const [searchPoolsValue, setSearchPoolsValue] = useState<string>('')
  const deferredSearchPoolsValue = useDeferredValue(searchPoolsValue)
  const isLoadingStats = useSelector(isLoading)

  const filteredPoolsList = useMemo(() => {
    return poolsList.filter(poolData => {
      const symbolFrom = poolData.tokenXDetails?.symbol ?? poolData.tokenX.toString()
      const symbolTo = poolData.tokenYDetails?.symbol ?? poolData.tokenY.toString()

      const poolName = shortenAddress(symbolFrom ?? '') + '/' + shortenAddress(symbolTo ?? '')
      const reversedPoolName =
        shortenAddress(symbolTo ?? '') + '/' + shortenAddress(symbolFrom ?? '')
      return (
        poolName.toLowerCase().includes(deferredSearchPoolsValue.toLowerCase()) ||
        poolData.fee.toString().concat('%').includes(deferredSearchPoolsValue.toLowerCase()) ||
        reversedPoolName.toLowerCase().includes(deferredSearchPoolsValue.toLowerCase()) ||
        poolData.tokenX.toString().toLowerCase().includes(deferredSearchPoolsValue.toLowerCase()) ||
        poolData.tokenY.toString().toLowerCase().includes(deferredSearchPoolsValue.toLowerCase())
      )
    })
  }, [isLoadingStats, poolsList, deferredSearchPoolsValue])

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

  useEffect(() => {
    dispatch(actions.getCurrentStats())
  }, [])

  return (
    <div className={classes.container}>
      <Grid
        display='flex'
        alignItems='end'
        justifyContent='space-between'
        className={classes.rowContainer}>
        <Typography className={classes.subheader} mb={2}>
          All pools
        </Typography>
        <InputBase
          type={'text'}
          className={classes.searchBar}
          placeholder='Search pool'
          endAdornment={
            <InputAdornment position='end'>
              <img src={SearchIcon} className={classes.searchIcon} alt='Search' />
            </InputAdornment>
          }
          onChange={e => setSearchPoolsValue(e.target.value)}
          value={searchPoolsValue}
          disabled={poolsList.length === 0}
        />
      </Grid>
      <LiquidityPoolList
        data={filteredPoolsList.map(poolData => ({
          symbolFrom: poolData.tokenXDetails?.symbol ?? poolData.tokenX.toString(),
          symbolTo: poolData.tokenYDetails?.symbol ?? poolData.tokenY.toString(),
          iconFrom: poolData.tokenXDetails?.logoURI ?? icons.unknownToken,
          iconTo: poolData.tokenYDetails?.logoURI ?? icons.unknownToken,
          volume: poolData.volume24,
          TVL: poolData.tvl,
          fee: poolData.fee,
          addressFrom: poolData.tokenX.toString(),
          addressTo: poolData.tokenY.toString(),
          apy: poolData.apy,
          // lockedX: poolData.lockedX,
          // lockedY: poolData.lockedY,
          // liquidityX: poolData.liquidityX,
          // liquidityY: poolData.liquidityY,
          apyData: {
            fees: poolData.apy,
            accumulatedFarmsSingleTick: 0,
            accumulatedFarmsAvg: 0
          },
          // apy:
          //   poolData.apy + (accumulatedSingleTickAPY?.[poolData.poolAddress.toString()] ?? 0),
          // apyData: {
          //   fees: poolData.apy,
          //   accumulatedFarmsSingleTick:
          //     accumulatedSingleTickAPY?.[poolData.poolAddress.toString()] ?? 0,
          //   accumulatedFarmsAvg: accumulatedAverageAPY?.[poolData.poolAddress.toString()] ?? 0
          // }
          isUnknownFrom: poolData.tokenXDetails?.isUnknown ?? false,
          isUnknownTo: poolData.tokenYDetails?.isUnknown ?? false,
          poolAddress: poolData.poolAddress.toString()
        }))}
        network={currentNetwork}
        copyAddressHandler={copyAddressHandler}
        isLoading={isLoadingStats}
        showAPY={showAPY}
      />
    </div>
  )
}
