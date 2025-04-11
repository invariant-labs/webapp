import { Box, Typography } from '@mui/material'
import { useStyles } from './style'

type Props = {
  icon: string
  ticker: string
}

export const TokenBadge = ({ icon, ticker }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <img className={classes.icon} src={icon} />
      <Typography className={classes.ticker}>{ticker}</Typography>
    </Box>
  )
}
