import React from 'react'
import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { useDesktopSkeleton } from './styles'

const LegendSkeleton: React.FC = () => {
  const { classes } = useDesktopSkeleton()

  return (
    <Box className={classes.container}>
      <Typography className={classes.tokenText}>Tokens</Typography>

      <Grid container className={classes.gridContainer}>
        {[1, 2, 3, 4, 5].map(item => (
          <Grid item container key={item} className={classes.gridItem}>
            <Grid item xs={5} alignContent={'center'} display={'flex'} alignItems={'center'}>
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton
                variant='text'
                width={50}
                height={32}
                sx={{ borderRadius: '6px', marginLeft: '30px' }}
                className={classes.textSkeleton}
              />
            </Grid>

            <Grid item xs={6} alignContent={'center'} className={classes.valueContainer}>
              <Skeleton
                variant='text'
                sx={{ borderRadius: '6px' }}
                width={80}
                height={32}
                className={classes.textSkeleton}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default LegendSkeleton
