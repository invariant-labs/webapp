import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import empty from '@static/svg/empty.svg'
import { useStyles } from './styles'

export interface IProps {
  desc: string
}

export const EmptyPlaceholder: React.FC<IProps> = ({ desc }) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' alignItems='center' className={classes.wrapper}>
      <img src={empty} className={classes.image} />
      <Typography className={classes.title}>It's empty here...</Typography>
      <Typography className={classes.desc}>{desc}</Typography>
    </Grid>
  )
}

export default EmptyPlaceholder
