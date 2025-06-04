import React, { useMemo, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { TokenPositionEntry } from '@store/types/userOverview'
import { formatNumberWithoutSuffix } from '@utils/utils'
import MobileOverviewSkeleton from '../Overview/Skeletons/MobileOverviewSkeleton'
import SegmentFragmentTooltip from '../SegmentFragmentTooltip/SegmentFragmentTooltip'
import { useStyles } from './styles'
export interface ChartSegment {
  start: number
  width: number
  color: string
  token: string
  value: number
  logo: string | undefined
  percentage: string
}

interface MobileOverviewProps {
  positions: TokenPositionEntry[]
  totalAssets: number
  chartColors: string[]
  isLoadingList: boolean
}

const MobileOverview: React.FC<MobileOverviewProps> = ({
  positions,
  totalAssets,
  chartColors,
  isLoadingList
}) => {
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null)
  const { classes } = useStyles()

  const sortedPositions = useMemo(() => {
    return [...positions].sort((a, b) => b.value - a.value)
  }, [positions])

  const sortedChartColors = useMemo(() => {
    const colorMap = positions.reduce((map, position, index) => {
      map.set(position.token, chartColors[index])
      return map
    }, new Map<string, string>())

    return sortedPositions.map(position => colorMap.get(position.token) ?? '')
  }, [positions, sortedPositions, chartColors])

  const segments: ChartSegment[] = useMemo(() => {
    let currentPosition = 0
    return sortedPositions.map((position, index) => {
      const percentage = (position.value / totalAssets) * 100
      const segment = {
        start: currentPosition,
        width: percentage,
        color: sortedChartColors[index],
        token: position.token,
        value: position.value,
        logo: position.logo,
        percentage: percentage.toFixed(2)
      }
      currentPosition += percentage
      return segment
    })
  }, [sortedPositions, totalAssets, sortedChartColors])

  return (
    <Box className={classes.container}>
      {isLoadingList ? (
        <MobileOverviewSkeleton />
      ) : (
        <>
          <Box className={classes.chartContainer}>
            {segments.map((segment, index) => (
              <SegmentFragmentTooltip
                key={segment.token}
                tooltipClasses={{ tooltip: classes.tooltip }}
                segment={segment}
                selectedSegment={selectedSegment}
                setSelectedSegment={setSelectedSegment}
                index={index}
              />
            ))}
          </Box>
          {segments.length > 0 ? (
            <Box className={classes.tokenSection}>
              <Typography className={classes.tokenTitle}>Tokens</Typography>

              <Grid className={classes.tokenGrid}>
                {segments.map(segment => (
                  <Grid item container key={segment.token} className={classes.tokenGridItem}>
                    <Grid item xs={4} className={classes.tokenLogoContainer}>
                      <img src={segment.logo} alt={'Token logo'} className={classes.tokenLogo} />
                      <Typography className={classes.tokenSymbol} sx={{ color: segment.color }}>
                        {segment.token}:
                      </Typography>
                    </Grid>

                    <Grid item xs={7}>
                      <Typography className={classes.tokenValue}>
                        ${formatNumberWithoutSuffix(segment.value, { twoDecimals: true })}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : null}
        </>
      )}
    </Box>
  )
}

export default MobileOverview
