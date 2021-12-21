import React from 'react'
import { Grid } from '@material-ui/core'
import IDO from '@components/IDO/IDO'
import useStyles from './styles'

export const IDOPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <Grid item>
        <IDO />
      </Grid>
    </Grid>
  )
}

export default IDOPage
