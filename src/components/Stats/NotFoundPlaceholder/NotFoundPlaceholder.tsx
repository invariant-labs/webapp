import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import icons from '@static/icons'

export interface INotFoundPlaceholder {
  title: string
  subtitle?: string
}

const NotFoundPlaceholder: React.FC<INotFoundPlaceholder> = ({ title, subtitle }) => {
  const { classes } = useStyles()

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      my={5}
      minHeight='220px'>
      <img className={classes.img} src={icons.emptyIcon} alt='Not connected' />
      <Typography className={classes.title}>{title}</Typography>
      {subtitle && <Typography className={classes.subtitle}>{subtitle}</Typography>}
    </Grid>
  )
}

export default NotFoundPlaceholder
