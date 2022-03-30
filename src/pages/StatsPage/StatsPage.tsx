import React from 'react'
import WrappedStats from '@containers/WrappedStats/WrappedStats'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

export const StatsPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <WrappedStats />
    </Grid>
  )
}

export default StatsPage
