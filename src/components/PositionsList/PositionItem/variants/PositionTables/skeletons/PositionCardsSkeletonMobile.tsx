import { Box, Grid, Skeleton } from '@mui/material'
import { useMobileSkeletonStyles } from './styles/mobileSkeleton'

const PositionCardsSkeletonMobile = () => {
  const { classes } = useMobileSkeletonStyles()
  const cards = [1, 2, 3]

  return (
    <>
      {cards.map(index => (
        <Grid key={index} container direction='column' className={classes.card}>
          <Grid container item direction='row' alignItems='center' justifyContent='space-between'>
            <Box className={classes.mobileCardSkeletonHeader}>
              <Box className={classes.tokenIcons}>
                <Skeleton variant='circular' className={classes.circularSkeleton} />
                <Skeleton variant='circular' className={classes.circularSkeletonSmall} />
                <Skeleton variant='circular' className={classes.circularSkeleton} />
              </Box>
              <Skeleton variant='text' width={120} height={24} sx={{ marginLeft: '8px' }} />
            </Box>
            <Skeleton
              variant='rectangular'
              width={32}
              height={32}
              sx={{ marginLeft: '16px', borderRadius: '12px' }}
            />
          </Grid>

          <Grid container justifyContent='space-between' alignItems='center' marginTop='16px'>
            <Grid item xs={5}>
              <Skeleton
                variant='rectangular'
                width={'100%'}
                height={36}
                sx={{ borderRadius: '10px', margin: '0 auto' }}
              />
            </Grid>
            <Grid item xs={7} sx={{ paddingLeft: '16px', paddingTop: '0 !important' }}>
              <Skeleton
                variant='rectangular'
                width={'100%'}
                height={36}
                sx={{ borderRadius: '10px', margin: '0 auto' }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: '16px', marginBottom: '16px' }}>
            <Grid item xs={6} sx={{ paddingTop: '0 !important' }}>
              <Grid container justifyContent='center'>
                <Skeleton
                  variant='rectangular'
                  width={'100%'}
                  height={36}
                  sx={{ borderRadius: '10px', margin: '0 auto' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ paddingTop: '0 !important' }}>
              <Grid container justifyContent='center'>
                <Skeleton
                  variant='rectangular'
                  width={'100%'}
                  height={36}
                  sx={{ borderRadius: '10px', margin: '0 auto' }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent='center' className={classes.chartContainer}>
            <Skeleton
              variant='rectangular'
              width='100%'
              height={40}
              sx={{ borderRadius: '12px', marginTop: '18px' }}
            />
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default PositionCardsSkeletonMobile
