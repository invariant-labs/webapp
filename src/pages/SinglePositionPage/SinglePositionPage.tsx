import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { SinglePositionWrapper } from '@containers/SinglePositionWrapper/SinglePositionWrapper'
import { Link, useHistory } from 'react-router-dom'
import backIcon from '@static/svg/back-arrow.svg'
import AddIcon from '@material-ui/icons/AddOutlined'
import useStyles from './styles'

export interface IProps {
  id: string
}

export const SinglePositionPage: React.FC<IProps> = ({ id }) => {
  const classes = useStyles()

  const history = useHistory()

  return (
    <Grid container className={classes.container} direction='column'>
      <Grid className={classes.top} container justifyContent='space-between' alignItems='center'>
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

        <Button
          className={classes.button}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => { history.push('/newPosition') }}>
          <span className={classes.buttonText}>Add Liquidity</span>
        </Button>
      </Grid>
      <SinglePositionWrapper id={id} />
    </Grid>
  )
}
