import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { Link } from 'react-router-dom'
import backIcon from '@static/svg/back-arrow.svg'
import useStyles from './styles'

export interface IProps {
  id: string
}

export const SinglePositionPage: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container} direction='column'>
      <Link to='/pool' style={{ textDecoration: 'none' }}>
        <Grid
          className={classes.back}
          container
          item
          alignItems='center'
        >
          <img className={classes.backIcon} src={backIcon} />
          <Typography className={classes.backText}>Back to Liquidity Positions List</Typography>
        </Grid>
      </Link>
      <SinglePositionWrapper id={id} />
    </Grid>
  )
}
