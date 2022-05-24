import React from 'react'
import SingleFarmWrapper from '@containers/SingleFarmWrapper/SingleFarmWrapper'
import { Grid } from '@material-ui/core'
import useStyles from './style'

interface IProps {
  id: string
}

const SingleFarmPage: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container} justifyContent='center'>
      <SingleFarmWrapper id={id} />
    </Grid>
  )
}

export default SingleFarmPage
