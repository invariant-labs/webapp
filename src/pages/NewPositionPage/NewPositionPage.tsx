import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import { History } from 'history'
import React from 'react'
import useStyles from './styles'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  history: History<unknown>
}

export const NewPositionPage: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  history
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper
          initialTokenFrom={initialTokenFrom}
          initialTokenTo={initialTokenTo}
          initialFee={initialFee}
          history={history}
        />
      </Grid>
    </Grid>
  )
}
