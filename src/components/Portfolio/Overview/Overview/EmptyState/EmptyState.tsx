import { Box, Typography } from '@mui/material'
import { useStyles } from './styles'
import { liquidityEmptyIcon } from '@static/icons'

export const EmptyState = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.emptyState}>
      <img src={liquidityEmptyIcon} alt='Empty portfolio' height={80} width={80} />
      <Typography className={classes.emptyStateText}>No liquidity found</Typography>
    </Box>
  )
}
