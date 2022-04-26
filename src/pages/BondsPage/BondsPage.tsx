import React from 'react'
import WrappedBonds from '@containers/WrappedBonds/WrappedBonds'
import { Grid } from '@material-ui/core'
import useStyles from './styles'

export const BondsPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <WrappedBonds />
    </Grid>
  )
}

export default BondsPage
