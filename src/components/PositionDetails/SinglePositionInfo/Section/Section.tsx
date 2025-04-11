import { Box, Typography } from '@mui/material'
import { useStyles } from './style'

type Props = {
  title: string
  item?: React.ReactNode
  children: React.ReactNode
}

export const Section = ({ title, item, children }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.title}>{title}</Typography>
        {item}
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
