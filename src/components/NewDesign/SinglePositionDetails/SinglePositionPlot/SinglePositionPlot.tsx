import React from 'react'
import { Grid, Typography, Card } from '@material-ui/core'
import PriceRangePlot from '@components/NewDesign/PriceRangePlot/PriceRangePlot'
import LiquidationRangeInfo from '@components/NewDesign/LiquidationRangeInfo/LiquidationRangeInfo'
import useStyles from './style'

export interface ISinglePositionPlot {
  data: Array<{ x: number; y: number }>
  plotMin: number
  plotMax: number
  zoomMinus: () => void
  zoomPlus: () => void
  disabled?: boolean
  style?: React.CSSProperties
  leftRangeIndex: number,
  rightRangeIndex: number,
  currentPrice: number,
  fromToken: string,
  toToken: string,
  className?: string
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  plotMin,
  plotMax,
  zoomMinus,
  zoomPlus,
  style,
  leftRangeIndex,
  rightRangeIndex,
  currentPrice,
  fromToken,
  toToken,
  className
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <Typography component='h1' className={classes.header}>
        Price range
      </Typography>
      <Grid className={classes.plotWrapper}>
        <PriceRangePlot
          data={data}
          plotMin={plotMin}
          plotMax={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
          style={style}
          disabled
          leftRangeIndex={leftRangeIndex}
          rightRangeIndex={rightRangeIndex}
          className={className}/>
      </Grid>
      <Grid className={classes.minMaxInfo}>
        <LiquidationRangeInfo
          label='min'
          amount={leftRangeIndex}
          toToken={toToken}
          fromToken={fromToken}/>
        <LiquidationRangeInfo
          label='max'
          amount={rightRangeIndex}
          toToken={toToken}
          fromToken={fromToken}/>
      </Grid>
      <Grid>
        <Card className={classes.currentPriceLabel}>
          <Typography component='p'>current price</Typography>
        </Card>
        <Card className={classes.currentPriceAmonut}>
          <Typography component='p'>
            <Typography component='span'>
              {currentPrice}
            </Typography>
            {fromToken} per {toToken}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SinglePositionPlot
