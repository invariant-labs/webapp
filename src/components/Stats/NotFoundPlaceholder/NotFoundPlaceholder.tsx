import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import { emptyIcon } from '@static/icons'

export interface INotFoundPlaceholder {
  title: string
  subtitle?: string
  isStats?: boolean
}

const NotFoundPlaceholder: React.FC<INotFoundPlaceholder> = ({
  title,
  subtitle,
  isStats = false
}) => {
  const { classes } = useStyles({ isStats })

  return (
    <Grid container className={classes.container}>
      <img className={classes.img} src={emptyIcon} alt='Not connected' />
      <Typography className={classes.title}>{title}</Typography>
      {subtitle && <Typography className={classes.subtitle}>{subtitle}</Typography>}
    </Grid>
  )
}

export default NotFoundPlaceholder
