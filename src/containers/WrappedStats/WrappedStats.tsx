import React, { useEffect, useMemo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Liquidity from '@components/Stats/Liquidity/Liquidity'
import Volume from '@components/Stats/Volume/Volume'
import VolumeBar from '@components/Stats/volumeBar/volumeBar'
import TokensList from '@components/Stats/TokensList/TokensList'
import PoolList from '@components/Stats/PoolList/PoolList'
import { useDispatch, useSelector } from 'react-redux'
import {
  fees24,
  isLoading,
  liquidityPlot,
  poolsStatsWithTokensDetails,
  tokensStatsWithTokensDetails,
  tvl24,
  volume24,
  volumePlot
} from '@selectors/stats'
import { actions } from '@reducers/stats'
import loader from '@static/gif/loader.gif'
import useStyles from './styles'
import { farms } from '@selectors/farms'
import { actions as farmsActions } from '@reducers/farms'

export const WrappedStats: React.FC = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const tokensList = useSelector(tokensStatsWithTokensDetails)
  const volume24h = useSelector(volume24)
  const tvl24h = useSelector(tvl24)
  const fees24h = useSelector(fees24)
  const volumePlotData = useSelector(volumePlot)
  const liquidityPlotData = useSelector(liquidityPlot)
  const isLoadingStats = useSelector(isLoading)
  const allFarms = useSelector(farms)

  useEffect(() => {
    if (tokensList.length > 0 && Object.values(allFarms).length === 0) {
      dispatch(farmsActions.getFarms())
    }
  }, [tokensList.length])

  useEffect(() => {
    dispatch(actions.getCurrentStats())
  }, [])

  const accumulatedAverageAPY = useMemo(() => {
    const acc: Record<string, number> = {}
    const now = Date.now() / 1000

    Object.values(allFarms).forEach(farm => {
      if (!acc[farm.pool.toString()]) {
        acc[farm.pool.toString()] = 0
      }

      if (farm.endTime.v.toNumber() > now) {
        acc[farm.pool.toString()] += farm.averageApy ?? 0
      }
    })

    return acc
  }, [allFarms])

  const accumulatedSingleTickAPY = useMemo(() => {
    const acc: Record<string, number> = {}
    const now = Date.now() / 1000

    Object.values(allFarms).forEach(farm => {
      if (!acc[farm.pool.toString()]) {
        acc[farm.pool.toString()] = 0
      }

      if (farm.endTime.v.toNumber() > now) {
        acc[farm.pool.toString()] += farm.singleTickApy ?? 0
      }
    })

    return acc
  }, [allFarms])

  return (
    <Grid container className={classes.wrapper} direction='column'>
      {isLoadingStats ? (
        <img src={loader} className={classes.loading} />
      ) : (
        <>
          <Typography className={classes.subheader}>Overview</Typography>
          <Grid container className={classes.plotsRow} wrap='nowrap'>
            <Volume
              volume={volume24h.value}
              percentVolume={volume24h.change}
              data={volumePlotData}
              className={classes.plot}
            />
            <Liquidity
              liquidityVolume={tvl24h.value}
              liquidityPercent={tvl24h.change}
              data={liquidityPlotData}
              className={classes.plot}
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
            />
          </Grid>
          <Typography className={classes.subheader}>Top tokens</Typography>
          <Grid container className={classes.row}>
            <TokensList
              data={tokensList.map(tokenData => ({
                icon: tokenData.tokenDetails.logoURI,
                name: tokenData.tokenDetails.name,
                symbol: tokenData.tokenDetails.symbol,
                price: tokenData.price,
                priceChange: tokenData.priceChange,
                volume: tokenData.volume24,
                TVL: tokenData.tvl
              }))}
            />
          </Grid>
          <Typography className={classes.subheader}>Top pools</Typography>
          <PoolList
            data={poolsList.map(poolData => ({
              symbolFrom: poolData.tokenXDetails.symbol,
              symbolTo: poolData.tokenYDetails.symbol,
              iconFrom: poolData.tokenXDetails.logoURI,
              iconTo: poolData.tokenYDetails.logoURI,
              volume: poolData.volume24,
              TVL: poolData.tvl,
              fee: poolData.fee,
              apy:
                poolData.apy + (accumulatedSingleTickAPY?.[poolData.poolAddress.toString()] ?? 0),
              apyData: {
                fees: poolData.apy,
                accumulatedFarmsSingleTick:
                  accumulatedSingleTickAPY?.[poolData.poolAddress.toString()] ?? 0,
                accumulatedFarmsAvg: accumulatedAverageAPY?.[poolData.poolAddress.toString()] ?? 0
              }
            }))}
          />
        </>
      )}
    </Grid>
  )
}

export default WrappedStats
