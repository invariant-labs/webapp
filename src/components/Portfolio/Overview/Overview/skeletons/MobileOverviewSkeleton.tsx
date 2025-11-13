import React from 'react'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { useMobileSkeletonStyle } from './styles'
const MobileOverviewSkeleton: React.FC = () => {
  const { classes } = useMobileSkeletonStyle()
  const segments = Array(3).fill(null)

  const getSegmentBorderRadius = (index: number) => {
    if (index === 0) return '6px 0 0 6px'
    if (index === segments.length - 1) return '0 6px 6px 0'
    return '0'
  }

  return (
    <Box className={classes.container} sx={{ height: 195 }}>
      <Box className={classes.chartContainer}>
        {segments.map((_, index) => (
          <Skeleton
            key={index}
            variant='rectangular'
            height={24}
            className={classes.skeletonSegment}
            sx={{
              width: `${100 / segments.length}%`,
              borderRadius: getSegmentBorderRadius(index)
            }}
          />
        ))}
      </Box>

      <Box className={classes.tokenLabelContainer}>
        <Typography className={classes.tokenTextSkeleton}>Tokens</Typography>

        <Grid container spacing={1} className={classes.gridContainer}>
          {segments.map((_, index) => (
            <Grid container key={index} className={classes.gridItem}>
              <Grid item xs={1} display='flex' alignItems='center'>
                <Skeleton variant='circular' className={classes.logoSkeleton} />
              </Grid>

              <Grid item xs={3}>
                <Skeleton variant='text' className={classes.tokenSymbolSkeleton} />
              </Grid>

              <Grid item xs={8}>
                <Skeleton variant='text' className={classes.valueSkeleton} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default MobileOverviewSkeleton
