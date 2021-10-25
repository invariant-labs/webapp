import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import React from 'react'
import useStyles from './style'
export const NoConnected: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.blur}>
      <Grid className={classes.root}>
        <img src={icons.NoConnected} />
        <Typography className={classes.desc}>Wallet is not connected.</Typography>
        <Typography className={classes.desc}>You cannot add new liquidity position.</Typography>
        <Button className={classes.button} variant='contained'>
          Connect a wallet
        </Button>
      </Grid>
    </Grid>
  )
}
