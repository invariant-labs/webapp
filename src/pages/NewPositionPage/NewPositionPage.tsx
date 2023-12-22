import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
}

export const NewPositionPage: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee
}) => {
  const classes = useStyles()

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
