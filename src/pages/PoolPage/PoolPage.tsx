import React from 'react'
import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

export const PoolPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper />
      </Grid>
    </Grid>
  )
}
