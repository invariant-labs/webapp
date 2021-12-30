import { Grid, Typography, makeStyles, Button } from '@material-ui/core'
import React from 'react'
// prototype

const useStyles = makeStyles({
  idoTitle: {
    color: 'white'
  },
  idoWrapper: {
    // display: 'flex',
    // flexDirection: 'row',
    color: 'primary'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  leftGrid: {
    // marginRight: '3px',
    // width: '30vw',
    borderRadius: '10px',
    // display: 'flex',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
    // height: '50vh',
    background: '#222126'
  },
  idoLeft1: {
    // width: '100%',
    color: 'white'
  },
  idoLeft2: {
    // width: '100%',
    color: 'white'
  },
  idoLeft21: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-around'
  },
  idoLeft22: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-around'
  },
  idoLeft3: {
    // width: '100%',
    color: 'white'
  },
  idoLeft31: {
    color: 'white'
  },
  idoLeft32: {
    // display: 'flex',
    // flexDirection: 'row'
  },
  idoLeft33: {
    color: 'white'
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  idoLeft34: {
    // display: 'flex',
    // flexDirection: 'column'
  },
  idoLeft35: {
    color: 'white'
  },
  idoLeft36: {
    // display: 'flex',
    // flexDirection: 'row'
  },
  idoLeft4: {
    color: 'white'
  },
  rightGrid: {
    // marginLeft: '3px',
    // width: '15vw',
    borderRadius: '10px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // height: '50vh',
    background: '#222126'
  }
})

export const WrappedIdo = () => {
  const classes = useStyles()

  return (<>
    <Typography className={classes.idoTitle} >IDO</Typography>
    <Grid container className={classes.idoWrapper}>
      <Grid className={classes.leftGrid}>
        <Typography className={classes.idoLeft1}>Deposit your sol</Typography>
        <Grid className={classes.idoLeft2}>
          <Grid container className={classes.idoLeft21}>
            <Grid>Est.:56.0278$</Grid>
            <Grid>Balance: 1004.5 SOL</Grid>
          </Grid>
          <Grid container className={classes.idoLeft22}>
            <Button>SNY</Button>
            <Grid>0.00000</Grid>
            <Button>Max</Button>
          </Grid>
        </Grid>
        <Grid className={classes.idoLeft3}>
          <Grid className={classes.idoLeft31}>Deposited amount</Grid>
          <Grid container className={classes.idoLeft32}>
            <Grid className={classes.idoLeft33}>icon</Grid>
            <Grid className={classes.idoLeft34}>
              <Grid className={classes.idoLeft35}>46.63 xUSD</Grid>
              <Grid container className={classes.idoLeft36}>
                <Grid>0000 USD</Grid>
                <Grid>0000 SOL</Grid>
                <Grid>0000 xSOL</Grid>
                <Grid>0000 xBTC</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button className={classes.idoLeft4}>Connect a wallet</Button>
      </Grid>
      <Grid className={classes.rightGrid}>
        <Grid>1</Grid>
        <Grid>2</Grid>
        <Grid>3</Grid>
        <Grid>4</Grid>
        <Grid>5</Grid>
      </Grid>
    </Grid>
  </>)
}

export default WrappedIdo
