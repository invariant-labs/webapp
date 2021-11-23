import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import icons from '@static/icons'
import SuccessIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import FailedIcon from '@material-ui/icons/HighlightOffOutlined'
import classNames from 'classnames'
import useStyle from './style'
interface ILiquidityItem {
  active: boolean
  nameToSwap: string
  nameFromSwap: string
  fee: number
  min: number
  max: number
}
export const LiquidityItem: React.FC<ILiquidityItem> = ({
  active,
  nameToSwap,
  nameFromSwap,
  fee,
  min,
  max
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.leftGrid}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={icons[`${nameToSwap}`]} alt={nameToSwap} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img className={classes.icon} src={icons[`${nameFromSwap}`]} alt={nameFromSwap} />
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
        <Grid
          className={
            active
              ? classNames(classes.activeText, classes.greenArea)
              : classNames(classes.rangeGrid, classes.closedText)
          }>
          {active ? (
            <>
              <SuccessIcon className={classes.iconText} />
              <Typography className={classes.greenTextArea}>Active</Typography>
            </>
          ) : (
            <Typography className={classes.text}>
              <FailedIcon className={classes.iconText} /> Closed
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
