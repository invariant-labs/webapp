import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import {
  calcPrice,
  calcTicksAmountInRange,
  spacingMultiplicityGte,
  spacingMultiplicityLte,
  nearestTickIndex
} from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import useStyles from './style'

export interface IRangeSelector {
  data: PlotTickData[]
  midPrice: TickPlotPositionData
  tokenASymbol: string
  tokenBSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  blocked?: boolean
  blockerInfo?: string
  onZoomOut: (min: number, max: number) => void
  ticksLoading: boolean
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPrice,
  tokenASymbol,
  tokenBSymbol,
  onChangeRange,
  blocked = false,
  blockerInfo,
  onZoomOut,
  ticksLoading,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - diff / 4
    const newMax = plotMax + diff / 4
    setPlotMin(newMin)
    setPlotMax(newMax)
    onZoomOut(newMin, newMax)
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
        isXtoY,
        xDecimal,
        yDecimal
      ) >= 4
    ) {
      setPlotMin(newMin)
      setPlotMax(newMax)
    }
  }

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInput(calcPrice(left, isXtoY, xDecimal, yDecimal).toString())
    setRightInput(calcPrice(right, isXtoY, xDecimal, yDecimal).toString())

    onChangeRange(left, right)
  }

  const resetPlot = () => {
    const initSideDist = Math.abs(
      midPrice.x -
        calcPrice(
          Math.max(
            spacingMultiplicityGte(MIN_TICK, tickSpacing),
            midPrice.index - tickSpacing * 15
          ),
          isXtoY,
          xDecimal,
          yDecimal
        )
    )

    changeRangeHandler(
      isXtoY
        ? Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), midPrice.index - tickSpacing * 10)
        : Math.min(
            spacingMultiplicityLte(MAX_TICK, tickSpacing),
            midPrice.index + tickSpacing * 10
          ),
      isXtoY
        ? Math.min(spacingMultiplicityLte(MAX_TICK, tickSpacing), midPrice.index + tickSpacing * 10)
        : Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), midPrice.index - tickSpacing * 10)
    )
    setPlotMin(midPrice.x - initSideDist)
    setPlotMax(midPrice.x + initSideDist)
  }

  useEffect(() => {
    if (ticksLoading) {
      resetPlot()
    }
  }, [ticksLoading])

  return (
    <Grid container className={classes.wrapper}>
      <Typography className={classes.header}>Price range</Typography>
      <Grid container className={classes.innerWrapper}>
        <PriceRangePlot
          className={classes.plot}
          data={data}
          onChangeRange={changeRangeHandler}
          leftRange={{
            index: leftRange,
            x: calcPrice(leftRange, isXtoY, xDecimal, yDecimal)
          }}
          rightRange={{
            index: rightRange,
            x: calcPrice(rightRange, isXtoY, xDecimal, yDecimal)
          }}
          midPrice={midPrice}
          plotMin={plotMin}
          plotMax={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
          loading={ticksLoading}
          isXtoY={isXtoY}
          tickSpacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
        />
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
          <RangeInput
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={leftInput}
            setValue={setLeftInput}
            decreaseValue={() => {
              const newLeft = isXtoY
                ? Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), leftRange - tickSpacing)
                : Math.min(spacingMultiplicityLte(MAX_TICK, tickSpacing), leftRange + tickSpacing)
              changeRangeHandler(newLeft, rightRange)
            }}
            increaseValue={() => {
              const newLeft = isXtoY
                ? Math.min(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.max(rightRange + tickSpacing, leftRange - tickSpacing)

              changeRangeHandler(newLeft, rightRange)
            }}
            onBlur={() => {
              const newLeft = isXtoY
                ? Math.min(
                    rightRange - tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.max(
                    rightRange + tickSpacing,
                    nearestTickIndex(+leftInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )

              changeRangeHandler(newLeft, rightRange)
            }}
          />
          <RangeInput
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={rightInput}
            setValue={setRightInput}
            decreaseValue={() => {
              const newRight = isXtoY
                ? Math.max(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.min(rightRange + tickSpacing, leftRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            increaseValue={() => {
              const newRight = isXtoY
                ? Math.min(spacingMultiplicityLte(MAX_TICK, tickSpacing), rightRange + tickSpacing)
                : Math.max(spacingMultiplicityGte(MIN_TICK, tickSpacing), rightRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
            }}
            onBlur={() => {
              const newRight = isXtoY
                ? Math.max(
                    leftRange + tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
                : Math.min(
                    leftRange - tickSpacing,
                    nearestTickIndex(+rightInput, tickSpacing, isXtoY, xDecimal, yDecimal)
                  )
              changeRangeHandler(leftRange, newRight)
            }}
          />
        </Grid>
        <Grid container className={classes.buttons}>
          <Button className={classes.button} onClick={resetPlot}>
            Reset range
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              changeRangeHandler(
                isXtoY
                  ? spacingMultiplicityGte(MIN_TICK, tickSpacing)
                  : spacingMultiplicityLte(MAX_TICK, tickSpacing),
                isXtoY
                  ? spacingMultiplicityLte(MAX_TICK, tickSpacing)
                  : spacingMultiplicityGte(MIN_TICK, tickSpacing)
              )
            }}>
            Set full range
          </Button>
        </Grid>

        {blocked && (
          <>
            <Grid className={classes.blocker} />
            <Grid
              container
              className={classes.blockedInfoWrapper}
              justifyContent='center'
              alignItems='center'>
              <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default RangeSelector
