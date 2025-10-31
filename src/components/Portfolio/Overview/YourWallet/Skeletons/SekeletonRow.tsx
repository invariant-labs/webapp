import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material'
import { useStyles } from './styles'
import { theme } from '@static/theme'

export const SkeletonRow = () => {
  const { classes } = useStyles()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Grid>
      <Box className={classes.tokenContainer}>
        <Box className={classes.tokenInfo}>
          <Skeleton variant='circular' width={28} height={28} />
          {!isMd && (
            <Skeleton variant='rectangular' width={60} sx={{ borderRadius: '6px' }} height={24} />
          )}
        </Box>
      </Box>
      <Grid className={classes.tableCell}>
        <Skeleton variant='rectangular' height={28} className={classes.valueSkeleton} />
      </Grid>
      <Grid className={classes.tableCell}>
        <Skeleton variant='rectangular' width='100%' height={28} sx={{ borderRadius: '6px' }} />
      </Grid>
      <Grid
        className={`${classes.tableCell}`}
        sx={{
          display: 'flex',
          width: '110px',
          gap: '4px',
          paddingRight: '8px'
        }}>
        <Skeleton variant='rectangular' width={30} height={30} sx={{ borderRadius: '8px' }} />
        <Skeleton variant='rectangular' width={30} height={30} sx={{ borderRadius: '8px' }} />
        <Skeleton variant='rectangular' width={30} height={30} sx={{ borderRadius: '8px' }} />
      </Grid>
    </Grid>
  )
}
