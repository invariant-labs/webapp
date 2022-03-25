import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './styles'
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

  useEffect(() => {
    dispatch(actions.getCurrentStats())
  }, [])

  return (
    <Grid container className={classes.wrapper} direction='column'>
      {isLoadingStats ? (
        <Typography className={classes.loading}>Loading...</Typography>
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
              data={tokensList
                .map(tokenData => ({
                  icon: tokenData.tokenDetails.logoURI,
                  name: tokenData.tokenDetails.name,
                  symbol: tokenData.tokenDetails.symbol,
                  price: tokenData.price,
                  priceChange: tokenData.priceChange,
                  volume: tokenData.volume24,
                  TVL: tokenData.tvl
                }))
                .sort((a, b) => b.volume - a.volume)}
            />
          </Grid>
          <Typography className={classes.subheader}>Top pools</Typography>
          <PoolList
            data={poolsList
              .map(poolData => ({
                symbolFrom: poolData.tokenXDetails.symbol,
                symbolTo: poolData.tokenYDetails.symbol,
                iconFrom: poolData.tokenXDetails.logoURI,
                iconTo: poolData.tokenYDetails.logoURI,
                volume: poolData.volume24,
                TVL: poolData.tvl,
                fee: poolData.fee
              }))
              .sort((a, b) => b.volume - a.volume)}
          />
        </>
      )}
    </Grid>
  )
}

export default WrappedStats
