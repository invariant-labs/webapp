import { Box, Skeleton, TableCell, TableRow } from '@mui/material'
import { useStyles } from './styles'

export const SkeletonRow = () => {
  const { classes } = useStyles()
  return (
    <TableRow>
      <TableCell className={classes.tableCell}>
        <Box className={classes.tokenContainer}>
          <Box className={classes.tokenInfo}>
            <Skeleton variant='circular' width={28} height={28} />
            <Skeleton variant='rectangular' width={60} sx={{ borderRadius: '6px' }} height={24} />
          </Box>
        </Box>
      </TableCell>
      <TableCell className={classes.tableCell} align='right'>
        <Skeleton variant='rectangular' height={28} className={classes.valueSkeleton} />
      </TableCell>
      <TableCell className={classes.tableCell} align='right'>
        <Skeleton variant='rectangular' width='100%' height={28} sx={{ borderRadius: '6px' }} />
      </TableCell>
      <TableCell
        className={`${classes.tableCell} ${classes.desktopActionCell}`}
        align='right'
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center'
        }}>
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ borderRadius: '8px', margin: '4px 0px' }}
        />
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ borderRadius: '8px', margin: '4px 0px' }}
        />
        <Skeleton
          variant='rectangular'
          width={24}
          height={24}
          sx={{ borderRadius: '8px', margin: '4px 0px' }}
        />
      </TableCell>
    </TableRow>
  )
}
