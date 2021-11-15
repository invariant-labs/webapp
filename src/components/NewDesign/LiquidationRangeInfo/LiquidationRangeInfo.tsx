import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

interface ILiquidationRangeInfo {
  label: string,
  amount: number,
  toToken: string,
  fromToken: string
}

const LiquidationRangeInfo: React.FC<ILiquidationRangeInfo> = ({
  label,
  amount,
  toToken,
  fromToken
}) => {
  const classes = useStyles()
  return (
    <Grid>
      <Grid className={classes.infoTypeSwap}>
        <Grid className={classes.infoType}>
          <Typography component='span' className={classes.infoTypeLabel}>{label}</Typography>
        </Grid>
        <Grid className={classes.infoSwap}>
          <Typography component='span' className={classes.infoAmount}>{amount}</Typography>
          <Typography component='p' className={classes.infoSwapToken}>{fromToken} per {toToken}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LiquidationRangeInfo
