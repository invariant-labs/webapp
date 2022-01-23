import React from 'react'
import useStyles from './styles'
import { Grid } from '@material-ui/core'
import { IDOContainer } from '@containers/IDO/IDOContainer'
import { IDOLabelsFull } from '@components/Labels/IDOLabels/IDOLabelsFull'

export const IDOPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <IDOContainer />
      </Grid>
      <Grid item>
        <IDOLabelsFull />
      </Grid>
    </Grid>
  )
}

export default IDOPage
