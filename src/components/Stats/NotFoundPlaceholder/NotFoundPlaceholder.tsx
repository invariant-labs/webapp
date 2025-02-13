import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@mui/material'
import icons from '@static/icons'
import classNames from 'classnames'

export interface INotFoundPlaceholder {
  title: string
  subtitle?: string
  isStats?: boolean
}

const NotFoundPlaceholder: React.FC<INotFoundPlaceholder> = ({ title, subtitle, isStats }) => {
  const { classes } = useStyles()

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      my={isStats ? 0 : 5}
      minHeight={isStats ? '690px' : '220px'}
      className={classNames({ [classes.container]: isStats })}>
      <img className={classes.img} src={icons.emptyIcon} alt='Not connected' />
      <Typography className={classes.title}>{title}</Typography>
      {subtitle && <Typography className={classes.subtitle}>{subtitle}</Typography>}
    </Grid>
  )
}

export default NotFoundPlaceholder
