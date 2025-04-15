import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import useStyles from './styles'

const SinglePositionPage: React.FC = () => {
  const { id } = useParams()
  const { classes } = useStyles()

  return (
    <Grid className={classes.container}>
      <SinglePositionWrapper id={id ?? ''} />
    </Grid>
  )
}

export default SinglePositionPage
