import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import empty from '@static/svg/empty.svg'
import classNames from 'classnames'
import { useStyles } from './styles'

export interface IProps {
  desc: string
  className?: string
  style?: React.CSSProperties
}

export const EmptyPlaceholder: React.FC<IProps> = ({ desc, className, style }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classNames(classes.wrapper, className)}
      style={style}>
      <img src={empty} className={classes.image} />
      <Typography className={classes.title}>It's empty here...</Typography>
      <Typography className={classes.desc}>{desc}</Typography>
    </Grid>
  )
}

export default EmptyPlaceholder
