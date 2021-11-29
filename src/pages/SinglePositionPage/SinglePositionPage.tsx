import React from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@reducers/positions'
import useStyles from './styles'

export const ListPage: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Grid container className={classes.container}>
    </Grid>
  )
}
