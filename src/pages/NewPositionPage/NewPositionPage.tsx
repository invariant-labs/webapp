import { Grid } from '@mui/material'
import React from 'react'
import useStyles from './styles'
import { useParams } from 'react-router-dom'
import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'

export interface IProps {}

const NewPositionPage: React.FC<IProps> = () => {
  const { classes } = useStyles()
  const { item1, item2, item3 } = useParams()

  let initialTokenFrom = ''
  let initialTokenTo = ''
  let initialFee = ''

  if (item3) {
    initialTokenFrom = item1 || ''
    initialTokenTo = item2 || ''
    initialFee = item3
  } else if (item2) {
    initialTokenFrom = item1 || ''
    initialFee = item2
  } else if (item1) {
    initialFee = item1
  }

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper
          initialTokenFrom={initialTokenFrom}
          initialTokenTo={initialTokenTo}
          initialFee={initialFee}
        />
      </Grid>
    </Grid>
  )
}
export default NewPositionPage
