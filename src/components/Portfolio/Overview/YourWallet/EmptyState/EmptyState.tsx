import { Box, Typography } from '@mui/material'
import { useStyles } from './styles'
import { assetsEmptyIcon } from '@static/icons'

export const EmptyState = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.emptyState}>
      <img src={assetsEmptyIcon} alt='Empty portfolio' height={80} width={80} />
      <Typography className={classes.emptyStateText}>No assets found</Typography>
    </Box>
  )
}
