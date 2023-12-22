import NewPositionWrapper from '@containers/NewPositionWrapper/NewPositionWrapper'
import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

export interface IProps {
  tokenFrom: string
  tokenTo: string
  feeTier: string
}

export const NewPositionPage: React.FC<IProps> = ({ tokenFrom, tokenTo, feeTier }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <NewPositionWrapper tokenFrom={tokenFrom} tokenTo={tokenTo} feeTier={feeTier} />
      </Grid>
    </Grid>
  )
}
