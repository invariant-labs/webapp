import { Box } from '@mui/material'
import { useStyles } from './style'

type Props = {
  name?: React.ReactNode
  value: React.ReactNode
  isHorizontal?: boolean
}

export const Stat = ({ name, value, isHorizontal = false }: Props) => {
  const { classes } = useStyles({ isHorizontal })

  return (
    <Box className={classes.container}>
      {name && <Box className={classes.name}>{name}</Box>}
      <Box className={classes.value}>{value}</Box>
    </Box>
  )
}
