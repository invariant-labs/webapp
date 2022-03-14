import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

export const WrappedStats: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper}>
    </Grid>
  )
}

export default WrappedStats
