import React from 'react'
import { Grid } from '@material-ui/core'
import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import useStyles from './styles'

export interface IProps {
  id: string
}

export const SinglePositionPage: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container} justifyContent='center'>
      <Grid item>
        <SinglePositionWrapper id={id} />
      </Grid>
    </Grid>
  )
}
