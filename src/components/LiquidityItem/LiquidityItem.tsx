import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyle from './style'
interface ILiquidityItem {
  tokenXName: string
  tokenYName: string
  tokenXIcon: string
  tokenYIcon: string
  fee: number
  min: number
  max: number
}
export const LiquidityItem: React.FC<ILiquidityItem> = ({
  tokenXName,
  tokenYName,
  tokenXIcon,
  tokenYIcon,
  fee,
  min,
  max
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.leftGrid}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={tokenXIcon} alt={tokenXName} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img className={classes.icon} src={tokenYIcon} alt={tokenYName} />
        </Grid>
        <Grid className={classes.namesGrid}>
          <Typography className={classes.name}>{tokenXName}</Typography>
          <Typography id='pause' className={classes.name}>
            -
          </Typography>
          <Typography className={classes.name}>{tokenYName}</Typography>
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
            {min} {tokenYName} per {tokenXName}
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Grid className={classes.greenArea}>
            <Typography className={classes.greenTextArea}>MAX</Typography>
          </Grid>
          <Typography className={classNames(classes.text, classes.maxText)}>
            {max} {tokenYName} per {tokenXName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
