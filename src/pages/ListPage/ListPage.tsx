import React from 'react'
import { Grid } from '@material-ui/core'
import WrappedPositionsList from '@containers/WrappedPositionsList/WrappedPositionsList'
import useStyles from './styles'

export const ListPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <WrappedPositionsList />
    </Grid>
  )
}
