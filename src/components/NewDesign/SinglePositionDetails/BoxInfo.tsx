import React from 'react'
import AnimatedNumber from 'animated-number-react'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
export const BoxInfo: React.FC<{
  nameToSwap: string
  nameFromSwap: string
  title: string
  value: number
}> = ({ nameFromSwap, nameToSwap, title, value }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.boxInfo}>
      <Typography> {title}</Typography>
      <AnimatedNumber value={value} />
      <Grid className={classes.tokenGrid}>
        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={icons[nameToSwap]} alt={nameToSwap} />
            <Typography className={classes.tokenName}>{nameToSwap}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>2.19703</Typography>
        </Grid>

        <Grid className={classes.tokenArea}>
          <Grid className={classes.token}>
            <img className={classes.iconSmall} src={icons[nameFromSwap]} alt={nameFromSwap} />
            <Typography className={classes.tokenName}>{nameFromSwap}</Typography>
          </Grid>
          <Typography className={classes.tokenValue}>0</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
