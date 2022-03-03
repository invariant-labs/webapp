import React, { useState, useEffect } from 'react'
import { Grid, Typography, Card } from '@material-ui/core'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import LiquidationRangeInfo from '@components/PositionDetails/LiquidationRangeInfo/LiquidationRangeInfo'
import { calcPrice, spacingMultiplicityGte, calcTicksAmountInRange } from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import { MIN_TICK } from '@invariant-labs/sdk'
import { ILiquidityToken } from '../SinglePositionInfo/consts'
import PlotTypeSwitch from '@components/PlotTypeSwitch/PlotTypeSwitch'
import useStyles from './style'

export interface ISinglePositionPlot {
  data: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  currentPrice: number
  tokenY: Pick<ILiquidityToken, 'name' | 'decimal'>
  tokenX: Pick<ILiquidityToken, 'name' | 'decimal'>
  ticksLoading: boolean
  tickSpacing: number
  min: number
  max: number
  xToY: boolean
  initialIsDiscreteValue: boolean
  onDiscreteChange: (val: boolean) => void
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  leftRange,
  rightRange,
  midPrice,
  currentPrice,
  tokenY,
  tokenX,
  ticksLoading,
  tickSpacing,
  min,
  max,
  xToY,
  initialIsDiscreteValue,
  onDiscreteChange
}) => {
  const classes = useStyles()

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const [isPlotDiscrete, setIsPlotDiscrete] = useState(initialIsDiscreteValue)

  useEffect(() => {
    const initSideDist = Math.abs(
      leftRange.x -
        calcPrice(
          Math.max(
            spacingMultiplicityGte(MIN_TICK, tickSpacing),
            leftRange.index - tickSpacing * 15
          ),
          xToY,
          tokenX.decimal,
          tokenY.decimal
        )
    )

    setPlotMin(leftRange.x - initSideDist)
    setPlotMax(rightRange.x + initSideDist)
  }, [ticksLoading, leftRange, rightRange])

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - diff / 4
    const newMax = plotMax + diff / 4
    setPlotMin(newMin)
    setPlotMax(newMax)
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin + diff / 6
    const newMax = plotMax - diff / 6

    if (
      calcTicksAmountInRange(
        Math.max(newMin, 0),
        newMax,
        tickSpacing,
        xToY,
        tokenX.decimal,
        tokenY.decimal
      ) >= 4
    ) {
      setPlotMin(newMin)
      setPlotMax(newMax)
    }
  }

  return (
    <Grid item className={classes.root}>
      <Grid className={classes.headerContainer} container justifyContent='space-between'>
        <Typography className={classes.header}>Price range</Typography>
        <PlotTypeSwitch
          onSwitch={val => {
            setIsPlotDiscrete(val)
            onDiscreteChange(val)
          }}
          initialValue={isPlotDiscrete ? 1 : 0}
        />
      </Grid>
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
          xDecimal={tokenX.decimal}
          yDecimal={tokenY.decimal}
          isDiscrete={isPlotDiscrete}
        />
      </Grid>
      <Grid className={classes.minMaxInfo}>
        <LiquidationRangeInfo
          label='min'
          amount={min}
          tokenX={xToY ? tokenX.name : tokenY.name}
          tokenY={xToY ? tokenY.name : tokenX.name}
        />
        <LiquidationRangeInfo
          label='max'
          amount={max}
          tokenX={xToY ? tokenX.name : tokenY.name}
          tokenY={xToY ? tokenY.name : tokenX.name}
        />
      </Grid>
      <Grid className={classes.currentPriceContainer}>
        <Card className={classes.currentPriceLabel}>
          <Typography component='p'>current price</Typography>
        </Card>
        <Card className={classes.currentPriceAmonut}>
          <Typography component='p'>
            <Typography component='span'>{currentPrice}</Typography>
            {xToY ? tokenY.name : tokenX.name} per {xToY ? tokenX.name : tokenY.name}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SinglePositionPlot
