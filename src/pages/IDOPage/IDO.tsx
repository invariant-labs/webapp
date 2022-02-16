import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import WrappedIDO from '@containers/Wrappedido/WrappedIDO'

const IDO = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <WrappedIDO />
    </Grid>
  )
}

export default IDO
