import { Box, Typography } from '@mui/material'
import icons from '@static/icons'
import { useStyles } from './styles'

export const EmptyState = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.emptyState}>
      <img src={icons.assetsEmpty} alt='Empty portfolio' height={80} width={80} />
      <Typography className={classes.emptyStateText}>No assets found</Typography>
    </Box>
  )
}
