import React from 'react'
import WrappedIdo from '@containers/WrappedIdo/WrappedIdo'
import useStyles from './styles'
import { Grid } from '@material-ui/core'

export const IdoPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <WrappedIdo />
      </Grid>
    </Grid>
  )
}

export default IdoPage
