import React, { useState } from 'react'
import { Grid, Typography, Card } from '@material-ui/core'
import PriceRangePlot from '@components/PriceRangePlot/PriceRangePlot'
import LiquidationRangeInfo from '@components/LiquidationRangeInfo/LiquidationRangeInfo'
import useStyles from './style'

export interface ISinglePositionPlot {
  data: Array<{ x: number; y: number }>
  style?: React.CSSProperties
  leftRangeIndex: number
  rightRangeIndex: number
  midPriceIndex: number
  currentPrice: number
  tokenY: string
  tokenX: string
  onZoomOutOfData: (min: number, max: number) => void
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  style,
  leftRangeIndex,
  rightRangeIndex,
  midPriceIndex,
  currentPrice,
  tokenY,
  tokenX,
  onZoomOutOfData
}) => {
  const classes = useStyles()

  const [plotMin, setPlotMin] = useState(Math.max(midPriceIndex - 15, 0))
  const [plotMax, setPlotMax] = useState(Math.min(midPriceIndex + 15, data.length - 1))

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - (diff / 4)
    const newMax = plotMax + (diff / 4)
    setPlotMin(newMin)
    setPlotMax(newMax)
    if (newMin < data[0].x || newMax > data[data.length - 1].x) {
      onZoomOutOfData(newMin, newMax)
    }
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    if (data.length >= 2 && diff >= data[1].x - data[0].x) {
      setPlotMin(plotMin + (diff / 6))
      setPlotMax(plotMax - (diff / 6))
    }
  }

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
          midPriceIndex={midPriceIndex}
          className={classes.zoom}/>
      </Grid>
      <Grid className={classes.minMaxInfo}>
        <LiquidationRangeInfo
          label='min'
          amount={leftRangeIndex}
          toToken={tokenX}
          fromToken={tokenY}/>
        <LiquidationRangeInfo
          label='max'
          amount={rightRangeIndex}
          toToken={tokenX}
          fromToken={tokenY}/>
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
            {tokenY} per {tokenX}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SinglePositionPlot
