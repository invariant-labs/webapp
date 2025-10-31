import React from 'react'
import { Grid } from '@mui/material'
import { PoolSnap } from '@store/reducers/stats'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import InfoItem from './InfoItem/InfoItem'
import { convertAPYValue, mapIntervalToString } from '@utils/uiUtils'
import { formatNumberWithoutSuffix } from '@utils/utils'

export interface IProps {
  statsPoolData: PoolSnap
  interval: IntervalsKeys
  isLoadingStats: boolean
  poolAddress: string
}

export const InfoUpperSection: React.FC<IProps> = ({
  statsPoolData,
  interval,
  isLoadingStats,
  poolAddress
}) => {
  const intervalSuffix = mapIntervalToString(interval)

  return (
    <Grid container gap={1} justifyContent='center' alignItems='stretch' wrap='wrap' width='100%'>
      <Grid
        item
        display='flex'
        flex={1}
        gap={1}
        justifyContent='space-around'
        alignItems='center'
        flexWrap='wrap'>
        <InfoItem
          name='Pool APY'
          value={convertAPYValue(statsPoolData.apy, 'APY')}
          isLoadingStats={isLoadingStats}
          poolUnavailable={!poolAddress}
        />
        <InfoItem
          name={`TVL (${intervalSuffix})`}
          value={`$${formatNumberWithoutSuffix(statsPoolData.tvl)}`}
          isLoadingStats={isLoadingStats}
          poolUnavailable={!poolAddress}
        />
      </Grid>
      <Grid
        item
        display='flex'
        gap={1}
        justifyContent='space-around'
        alignItems='center'
        flexWrap='wrap'
        flex={1}>
        <InfoItem
          name={`Volume (${intervalSuffix})`}
          value={`$${formatNumberWithoutSuffix(statsPoolData.volume)}`}
          isLoadingStats={isLoadingStats}
          poolUnavailable={!poolAddress}
        />

        <InfoItem
          name={`Fees (${intervalSuffix})`}
          value={`$${formatNumberWithoutSuffix(statsPoolData.fees)}`}
          isLoadingStats={isLoadingStats}
          poolUnavailable={!poolAddress}
        />
      </Grid>
    </Grid>
  )
}

export default InfoUpperSection
