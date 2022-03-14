import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './styles'
import Liquidity from '@components/Stats/Liquidity/Liquidity'
import Volume from '@components/Stats/Volume/Volume'
import VolumeBar from '@components/Stats/volumeBar/volumeBar'
import TokensList from '@components/Stats/TokensList/TokensList'
import PoolList from '@components/Stats/PoolList/PoolList'
import { useSelector } from 'react-redux'
import { poolsStatsWithTokensDetails, tokensStatsWithTokensDetails } from '@selectors/stats'

export const WrappedStats: React.FC = () => {
  const classes = useStyles()

  const poolsList = useSelector(poolsStatsWithTokensDetails)
  const tokensList = useSelector(tokensStatsWithTokensDetails)

  return (
    <Grid container className={classes.wrapper}>
      <Typography className={classes.subheader}>Overview</Typography>
      <Grid>
        <Volume />
        <Liquidity />
      </Grid>
      <VolumeBar />
      <Typography className={classes.subheader}>Top tokens</Typography>
      <TokensList
        data={tokensList.map(
          (tokenData) => ({
            icon: tokenData.tokenDetails.logoURI,
            name: tokenData.tokenDetails.name,
            symbol: tokenData.tokenDetails.name,
            price: tokenData.price,
            priceChange: tokenData.priceChange,
            volume: tokenData.volume24,
            TVL: tokenData.tvl
          })
        )}
      />
      <Typography className={classes.subheader}>Top pools</Typography>
      <PoolList
        data={poolsList.map(
          (poolData) => ({
            symbolFrom: poolData.tokenXDetails.symbol,
            symbolTo: poolData.tokenYDetails.symbol,
            iconFrom: poolData.tokenXDetails.logoURI,
            iconTo: poolData.tokenYDetails.logoURI,
            volume: poolData.volume24,
            TVL: poolData.tvl,
            fee: poolData.fee
          })
        )}
      />
    </Grid>
  )
}

export default WrappedStats
