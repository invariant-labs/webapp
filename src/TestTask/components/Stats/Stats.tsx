import { Grid, Typography } from '@material-ui/core'
import { TimeData } from '@reducers/stats'
import React from 'react'
import Info from '../Info/Info'
import Plot from '../Plot/Plot'

import useStyles from './style'

interface IStats {
  liquidityPercent: number
  liquidityVolume: number
  data: TimeData[]
  rate?: number
  currencyType: string
}

export const Stats: React.FC<IStats> = ({
  rate,
  currencyType,
  data,
  liquidityPercent,
  liquidityVolume
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Typography variant='h2' className={`${classes.statsTitle} ${classes.infoTitle}`}>
        Your stats
      </Typography>

      <Grid container>
        <Info amount={'12.43'} currencyType={'SNY'} balance={'463.543'} />
      </Grid>
      <Typography variant='h2' className={classes.statsTitle}>
        Token chart
      </Typography>
      <Plot
        rate={rate}
        currencyType={currencyType}
        liquidityPercent={liquidityPercent}
        liquidityVolume={liquidityVolume}
        data={data}
      />
    </Grid>
  )
}

export default Stats
