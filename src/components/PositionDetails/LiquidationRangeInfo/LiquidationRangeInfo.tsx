import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

interface ILiquidationRangeInfo {
  label: string,
  amount: number,
  tokenX: string,
  tokenY: string
}

const LiquidationRangeInfo: React.FC<ILiquidationRangeInfo> = ({
  label,
  amount,
  tokenX,
  tokenY
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
          <Typography component='p' className={classes.infoSwapToken}>{tokenX} per {tokenY}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LiquidationRangeInfo
