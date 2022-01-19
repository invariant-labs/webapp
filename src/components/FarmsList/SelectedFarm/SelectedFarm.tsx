import { Box, Button, Grid, OutlinedInput, Typography } from '@material-ui/core'
import React from 'react'
import { Token } from '@consts/static'
import { Link } from 'react-router-dom'
import useStyle from './style'
import AnimatedNumber from '@components/AnimatedNumber'

export const SelectedFarm: React.FC<any> = ({}) => {
  const classes = useStyle()

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid className={classes.top} container direction='row' justifyContent='space-between'>
        <Box>
          <Button className={classes.disableButton}>Stake</Button>
          <Button className={classes.unstakeButton}>Unstake</Button>
        </Box>
        <Typography className={classes.greenText}>
          Unclaimed rewards:
          <Typography display='inline' component='span' className={classes.value}>
            2 345.34 SNY
          </Typography>
        </Typography>
      </Grid>
      <Grid style={{ display: 'flex' }}>
        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <Typography className={classes.tokenName}>SNY</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>
            <AnimatedNumber
              value={2345.24}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(2)}
            />
          </Typography>
        </Grid>
        <Button className={classes.claimRewards}>Claim Rewards</Button>
      </Grid>
      <Grid justifyContent='space-between' direction='row'>
        <Box className={classes.labelGrid}>
          <Typography className={classes.labelText}>Staked: 233 345 xBTC - xUSD</Typography>
          <Typography className={classes.labelText}>2 345.34 SNY = $5 234.34</Typography>
        </Box>
      </Grid>
      <Button className={classes.button} type='button'>
        Unstake
      </Button>
    </Grid>
  )
}

export default SelectedFarm
