import { Box, Skeleton } from '@mui/material'
import { useStyles } from './styles'

export const MobileSkeletonCard = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.mobileCard}>
      <Box className={classes.mobileCardHeader}>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Skeleton variant='circular' width={28} height={28} />
          <Skeleton variant='text' width={60} />
        </Box>
        <Box className={classes.mobileActionsContainer}>
          <Skeleton
            variant='rectangular'
            width={24}
            height={24}
            sx={{ margin: '4px', borderRadius: '8px' }}
          />
          <Skeleton
            variant='rectangular'
            width={24}
            height={24}
            sx={{ margin: '4px', borderRadius: '8px' }}
          />
          <Skeleton
            variant='rectangular'
            width={24}
            height={24}
            sx={{ margin: '4px', borderRadius: '8px' }}
          />
        </Box>
      </Box>
      <Box className={classes.mobileStatsContainer}>
        <Skeleton variant='rectangular' height={27} width={'50%'} sx={{ borderRadius: '8px' }} />
        <Skeleton variant='rectangular' height={27} width={'50%'} sx={{ borderRadius: '8px' }} />
      </Box>
    </Box>
  )
}
