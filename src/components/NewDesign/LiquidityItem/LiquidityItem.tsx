import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyle from './style'
interface ILiquidityItem {
  nameToSwap: string
  nameFromSwap: string
  iconToSwap: string
  iconFromSwap: string
  fee: number
  min: number
  max: number
}
export const LiquidityItem: React.FC<ILiquidityItem> = ({
  nameToSwap,
  nameFromSwap,
  iconToSwap,
  iconFromSwap,
  fee,
  min,
  max
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.leftGrid}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={iconToSwap} alt={nameToSwap} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img className={classes.icon} src={iconFromSwap} alt={nameFromSwap} />
        </Grid>
        <Grid className={classes.namesGrid}>
          <Typography className={classes.name}>{nameToSwap}</Typography>
          <Typography id='pause' className={classes.name}>
            -
          </Typography>
          <Typography className={classes.name}>{nameFromSwap}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.rightGrid}>
        <Grid className={classes.rangeGrid}>
          <Typography className={classNames(classes.text, classes.feeText)}>{fee}% fee</Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Grid className={classes.greenArea}>
            <Typography className={classes.greenTextArea}>MIN</Typography>
          </Grid>

          <Typography className={classNames(classes.text, classes.minText)}>
            {min} {nameToSwap} per {nameFromSwap}
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Grid className={classes.greenArea}>
            <Typography className={classes.greenTextArea}>MAX</Typography>
          </Grid>
          <Typography className={classNames(classes.text, classes.maxText)}>
            {max} {nameToSwap} per {nameFromSwap}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
