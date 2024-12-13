import { Grid, Typography } from '@mui/material'
import { useStyles } from './style'

export interface IStatsLabel {
  title: string
  value: string
}

const StatsLabel: React.FC<IStatsLabel> = ({ title, value }) => {
  const { classes } = useStyles()

  return (
    <Grid container className={classes.container}>
      <Typography className={classes.title}>{title} </Typography>
      <Typography className={classes.value}>{value} </Typography>
    </Grid>
  )
}

export default StatsLabel
