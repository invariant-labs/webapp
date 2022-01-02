import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Grid, Typography, Box } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import React from 'react'
import { useStyles } from './style'
// prototype, raw layout, needs all responsives, dimensions fix, icons, interfaces, openings for data and missing functions...

export const WrappedIdo = () => {
  const classes = useStyles()

  // dummy
  const onSelect = () => {
    console.log('dummy select')
  }

  // dummy
  const onMaxClick = () => {
    console.log('dummy max value')
  }

  // dummy
  const setValue = () => {
    console.log('dummy set value')
  }

  // dummy
  const handleConnectWallet = () => {
    console.log('dummy connect wallet')
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Typography className={classes.idoTitle} >IDO</Typography>

      <Box className={classes.idoWrapper}>
        <Grid container direction='column' justifyContent="space-evenly" className={classes.leftGrid}>
          <Typography variant="h3" className={classes.idoLeft1}>Deposit your SOL</Typography>

          <Grid className={classes.idoLeft2}>

            <Grid container direction='row' justifyContent="space-between" className={classes.idoLeft21}>
              <Grid className={classes.idoLeft211}>Est.:56.0278$</Grid>
              <Grid className={classes.idoLeft212}>Balance: 1004.5 SOL</Grid>
            </Grid>

            <Grid container direction='row' alignItems="center" className={classes.idoLeft22}>
              <AmountInput className={classes.idoLeft221} decimal={4} onMaxClick={onMaxClick}
                current={null} tokens={[]} onSelect={onSelect} setValue={setValue} />

            </Grid>

          </Grid>

          <Grid className={classes.idoLeft3}>
            <Grid className={classes.idoLeft31}>Deposited amount</Grid>

            <Box className={classes.idoLeft32}>

              <Grid className={classes.idoLeft33}>icon</Grid>

              <Grid container direction='column' justifyContent="space-evenly" className={classes.idoLeft34}>

                <Typography variant="h4" className={classes.idoLeft35}>46.63 xUSD</Typography>

                <Grid container justifyContent="space-between" className={classes.idoLeft36}>
                  <Grid className={classes.idoLeft361}>0000 USD</Grid>
                  <Grid className={classes.idoLeft362}>0000 SOL</Grid>
                  <Grid className={classes.idoLeft363}>0000 xSOL</Grid>
                  <Grid className={classes.idoLeft364}>0000 xBTC</Grid>
                </Grid>

              </Grid>

            </Box>
          </Grid>
          <OutlinedButton className={classes.idoLeft4} name='Connect a wallet' color='primary' onClick={handleConnectWallet}/>
        </Grid>

        <Grid container direction='column' justifyContent="space-evenly" className={classes.rightGrid}>

          <Grid className={classes.rightGrid1}>
            <Typography className={classes.rightGrid11} variant="h4">Sale period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid12}>
              <AccessTimeIcon />
              <Typography variant="h4">00000000</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid2}>
            <Typography className={classes.rightGrid21} variant="h4" >Grace period ends in</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid22}>
              <AccessTimeIcon />
              <Typography variant="h4">00000000</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid3}>
            <Typography className={classes.rightGrid31} variant="h4">SOL contributed</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid32}>
              <AccessTimeIcon />
              <Typography variant="h4">00000000</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid4}>
            <Typography className={classes.rightGrid41} variant="h4">Estimated token price</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid42}>
              <AccessTimeIcon />
              <Typography variant="h4">00000000</Typography>
            </Grid>
          </Grid>

          <Grid className={classes.rightGrid5}>
            <Typography className={classes.rightGrid51} variant="h4">INVARIANT for sale</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.rightGrid52}>
              <AccessTimeIcon />
              <Typography variant="h4">00000000</Typography>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Grid>

  )
}

export default WrappedIdo
