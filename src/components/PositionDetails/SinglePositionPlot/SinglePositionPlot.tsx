import React, { useState, useEffect } from 'react'
import { Grid, Typography, Card } from '@material-ui/core'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import LiquidationRangeInfo from '@components/PositionDetails/LiquidationRangeInfo/LiquidationRangeInfo'
import { ILiquidityItem } from '../SinglePositionInfo/SinglePositionInfo'
import {
  calcPrice,
  spacingMultiplicityGreaterThan,
  nearestPriceIndex,
  calcTicksAmountInRange
} from '@consts/utils'
import useStyles from './style'
import { PlotTickData } from '@reducers/positions'
import { MIN_TICK } from '@invariant-labs/sdk'

export interface ISinglePositionPlot {
  data: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  currentPrice: number
  tokenY: string
  tokenX: string
  onZoomOutOfData: (min: number, max: number) => void
  positionData: ILiquidityItem
  ticksLoading: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  leftRange,
  rightRange,
  midPrice,
  currentPrice,
  tokenY,
  tokenX,
  onZoomOutOfData,
  positionData,
  ticksLoading,
  xDecimal,
  yDecimal,
  tickSpacing
}) => {
  const classes = useStyles()

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  useEffect(() => {
    const initSideDist = Math.abs(
      midPrice.x -
        calcPrice(
          Math.max(
            spacingMultiplicityGreaterThan(MIN_TICK, tickSpacing),
            midPrice.index - tickSpacing * 15
          ),
          true,
          xDecimal,
          yDecimal
        )
    )

    setPlotMin(midPrice.x - initSideDist)
    setPlotMax(midPrice.x + initSideDist)
  }, [ticksLoading, midPrice])

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - diff / 4
    const newMax = plotMax + diff / 4
    setPlotMin(newMin)
    setPlotMax(newMax)
    // if (newMin < data[1].x || newMax > data[data.length - 2].x) {
    //   onZoomOutOfData(newMin, newMax)
    // }
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin + diff / 6
    const newMax = plotMax - diff / 6

    if (
      calcTicksAmountInRange(Math.max(newMin, 0), newMax, tickSpacing, true, xDecimal, yDecimal) >=
      4
    ) {
      setPlotMin(newMin)
      setPlotMax(newMax)
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
          leftRange={leftRange}
          rightRange={rightRange}
          midPrice={midPrice}
          className={classes.plot}
          loading={ticksLoading}
          isXtoY
          tickSpacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
        />
      </Grid>
      <Grid className={classes.minMaxInfo}>
        <LiquidationRangeInfo
          label='min'
          amount={positionData.min}
          tokenX={tokenX}
          tokenY={tokenY}
        />
        <LiquidationRangeInfo
          label='max'
          amount={positionData.max}
          tokenX={tokenX}
          tokenY={tokenY}
        />
      </Grid>
      <Grid>
        <Card className={classes.currentPriceLabel}>
          <Typography component='p'>current price</Typography>
        </Card>
        <Card className={classes.currentPriceAmonut}>
          <Typography component='p'>
            <Typography component='span'>{currentPrice}</Typography>
            {tokenY} per {tokenX}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SinglePositionPlot
