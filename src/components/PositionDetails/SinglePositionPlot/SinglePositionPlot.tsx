import React, { useState, useEffect, useMemo } from 'react'
import { Grid, Typography, Card } from '@material-ui/core'
import PriceRangePlot from '@components/PriceRangePlot/PriceRangePlot'
import LiquidationRangeInfo from '@components/PositionDetails/LiquidationRangeInfo/LiquidationRangeInfo'
import useStyles from './style'
import { ILiquidityItem } from '../SinglePositionInfo/SinglePositionInfo'

export interface ISinglePositionPlot {
  data: Array<{ x: number; y: number }>
  leftRangeIndex: number
  rightRangeIndex: number
  midPriceIndex: number
  currentPrice: number
  tokenY: string
  tokenX: string
  onZoomOutOfData: (min: number, max: number) => void
  loadingTicks: boolean
  positionData: ILiquidityItem
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  leftRangeIndex,
  rightRangeIndex,
  midPriceIndex,
  currentPrice,
  tokenY,
  tokenX,
  onZoomOutOfData,
  loadingTicks,
  positionData
}) => {
  const classes = useStyles()

  const initSideDist = useMemo(() => Math.min(
    data[midPriceIndex].x - data[Math.max(midPriceIndex - 15, 0)].x,
    data[Math.min(midPriceIndex + 15, data.length - 1)].x - data[midPriceIndex].x
  ), [data, midPriceIndex])

  const [plotMin, setPlotMin] = useState(data[midPriceIndex].x - initSideDist)
  const [plotMax, setPlotMax] = useState(data[midPriceIndex].x + initSideDist)

  useEffect(() => {
    if (!loadingTicks) {
      setPlotMin(data[midPriceIndex].x - initSideDist)
      setPlotMax(data[midPriceIndex].x + initSideDist)
    }
  }, [loadingTicks])

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
    <Grid item className={classes.root}>
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
          disabled
          leftRangeIndex={leftRangeIndex}
          rightRangeIndex={rightRangeIndex}
          midPriceIndex={midPriceIndex}
          className={classes.plot}/>
      </Grid>
      <Grid className={classes.minMaxInfo}>
        <LiquidationRangeInfo
          label='min'
          amount={positionData.min}
          tokenX={tokenX}
          tokenY={tokenY}/>
        <LiquidationRangeInfo
          label='max'
          amount={positionData.max}
          tokenX={tokenX}
          tokenY={tokenY}/>
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
            {tokenX} per {tokenY}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SinglePositionPlot
