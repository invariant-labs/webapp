import React from 'react'
import WrappedIDO from '@containers/WrappedIDO/WrappedIDO'
import useStyles from './styles'
import { Grid } from '@material-ui/core'

export const IDOPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <WrappedIDO />
      </Grid>
    </Grid>
  )
}

export default IDOPage
