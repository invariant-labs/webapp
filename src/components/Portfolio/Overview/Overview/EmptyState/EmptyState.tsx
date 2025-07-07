import { Box, Typography } from '@mui/material'
import { liquidityEmptyIcon } from '@static/icons'
import { useStyles } from './styles'

export const EmptyState = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.emptyState}>
      <img src={liquidityEmptyIcon} alt='Empty portfolio' height={64} width={80} />
      <Typography className={classes.emptyStateText}>No liquidity found</Typography>
    </Box>
  )
}
