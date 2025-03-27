import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import useStyles from './styles'

const SinglePositionPage: React.FC = () => {
  const { id } = useParams()
  const { classes } = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <SinglePositionWrapper id={id ?? ''} />
      </Grid>
    </Grid>
  )
}

export default SinglePositionPage
