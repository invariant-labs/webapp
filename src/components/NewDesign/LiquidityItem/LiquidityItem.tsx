import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import icons from '@static/icons'
import SuccessIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import FailedIcon from '@material-ui/icons/HighlightOffOutlined'
import useStyle from './style'
import classNames from 'classnames'

interface ILiquidityItem {
  active: boolean
  nameToSwap: string
  nameFromSwap: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem
  actionMin: () => void
  actionMax: () => void
}
export const LiquidityItem: React.FC<IProp> = ({ data, actionMax, actionMin }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.leftGrid}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={icons[`${data.nameToSwap}`]} alt={data.nameToSwap} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img
            className={classes.icon}
            src={icons[`${data.nameFromSwap}`]}
            alt={data.nameFromSwap}
          />
        </Grid>
        <Grid className={classes.namesGrid}>
          <Typography className={classes.name}>{data.nameToSwap}</Typography>
          <Typography id='pause' className={classes.name}>
            -
          </Typography>
          <Typography className={classes.name}>{data.nameFromSwap}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.rightGrid}>
        <Grid className={classes.rangeGrid}>
          <Typography className={classNames(classes.text, classes.feeText)}>
            {data.fee}% fee
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Button className={classes.button} variant='contained' onClick={actionMin}>
            MIN
          </Button>
          <Typography className={classNames(classes.text, classes.minText)}>
            {data.min} SNY per xUSD
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Button className={classes.button} variant='contained' onClick={actionMax}>
            MAX
          </Button>
          <Typography className={classNames(classes.text, classes.maxText)}>
            {data.max} SNY per xUSD
          </Typography>
        </Grid>
        <Button
          {...(data.active
            ? { className: classes.button, startIcon: <SuccessIcon /> }
            : {
                className: classes.closed,
                startIcon: <FailedIcon />
              })}
          variant='contained'>
          {data.active ? 'Active' : 'Closed'}
        </Button>
      </Grid>
    </Grid>
  )
}
