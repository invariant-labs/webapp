import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import icons from '@static/icons'
import SuccessIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import FailedIcon from '@material-ui/icons/HighlightOffOutlined'
import useStyle from './style'

interface ILiquidityItem {
  active: boolean
  name1: string
  name2: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem
}
export const LiquidityItem: React.FC<IProp> = ({ data }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.leftGrid}>
        <Grid className={classes.iconsGrid}>
          <img className={classes.icon} src={icons[`${data.name1}`]} alt={data.name1} />
          <img className={classes.arrowIcon} src={icons.ArrowIcon} alt={'Arrow'} />
          <img className={classes.icon} src={icons[`${data.name2}`]} alt={data.name2} />
        </Grid>
        <Grid className={classes.namesGrid}>
          <Typography className={classes.name}>BTC</Typography>
          <Typography id='pause' className={classes.name}>
            -
          </Typography>
          <Typography className={classes.name}>SNY</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.rightGrid}>
        <Grid className={classes.rangeGrid}>
          <Typography id='fee' className={classes.text}>
            {data.fee}% fee
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Button className={classes.button} variant='contained'>
            Min
          </Button>
          <Typography id='min' className={classes.text}>
            {data.min} SNY per xUSD
          </Typography>
        </Grid>
        <Grid className={classes.rangeGrid}>
          <Button className={classes.button} variant='contained'>
            Max
          </Button>
          <Typography id='max' className={classes.text}>
            {data.max} SNY per xUSD
          </Typography>
        </Grid>
        {data.active ? (
          <Button
            id='active'
            className={classes.button}
            variant='contained'
            startIcon={<SuccessIcon />}>
            Active
          </Button>
        ) : (
          <Button
            id='closed'
            className={classes.button}
            variant='contained'
            disabled
            startIcon={<FailedIcon />}>
            Closed
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
