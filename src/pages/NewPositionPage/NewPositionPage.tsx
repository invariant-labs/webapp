import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import { History } from 'history'
import React from 'react'
import useStyles from './styles'

export interface IProps {
  initialTokenFrom: string
  initialTokenTo: string
  initialFee: string
  initialLeftRange: string
  initialRightRange: string
  history: History<unknown>
}

export const NewPositionPage: React.FC<IProps> = ({
  initialTokenFrom,
  initialTokenTo,
  initialFee,
  initialLeftRange,
  initialRightRange,
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
          initialLeftRange={initialLeftRange}
          initialRightRange={initialRightRange}
          history={history}
        />
      </Grid>
    </Grid>
  )
}
