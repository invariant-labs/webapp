import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles'
import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'

export interface IProps {
  id: string
}

export const SinglePositionPage: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <SinglePositionWrapper id={id} />
    </Grid>
  )
}
