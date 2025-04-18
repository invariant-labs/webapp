import { Box, Grid, Skeleton } from '@mui/material'
import { useMobileSkeletonStyles } from './mobileSkeleton'

const PositionCardsSkeletonMobile = () => {
  const { classes } = useMobileSkeletonStyles()
  const cards = [1, 2, 3]

  return (
    <>
      {cards.map(index => (
        <Grid key={index} container className={classes.card}>
          <Grid container item className={classes.headerCard}>
            <Box className={classes.mobileCardSkeletonHeader}>
              <Box className={classes.tokenIcons}>
                <Skeleton variant='circular' className={classes.circularSkeleton} />
                <Skeleton variant='circular' className={classes.circularSkeletonSmall} />
                <Skeleton variant='circular' className={classes.circularSkeleton} />
              </Box>
              <Skeleton variant='text' className={classes.skeletonText} />
            </Box>
            <Skeleton variant='rectangular' className={classes.skeleton36x36} />
          </Grid>

          <Grid container className={classes.wrapper}>
            <Grid item xs={5}>
              <Skeleton variant='rectangular' className={classes.skeleton36x100} />
            </Grid>
            <Grid item xs={7} sx={{ paddingLeft: '16px', paddingTop: '0 !important' }}>
              <Skeleton variant='rectangular' className={classes.skeleton36x100} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: '16px', marginBottom: '16px' }}>
            <Grid item xs={6} sx={{ paddingTop: '0 !important' }}>
              <Grid container justifyContent='center'>
                <Skeleton variant='rectangular' className={classes.skeleton36x100} />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ paddingTop: '0 !important' }}>
              <Grid container justifyContent='center'>
                <Skeleton variant='rectangular' className={classes.skeleton36x100} />
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={classes.chartContainer}>
            <Skeleton variant='rectangular' className={classes.skeleton40x100} />
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default PositionCardsSkeletonMobile
