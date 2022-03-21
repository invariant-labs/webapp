import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import {
  calcPrice,
  calcTicksAmountInRange,
  nearestTickIndex,
  maxSpacingMultiplicity,
  minSpacingMultiplicity,
  toMaxNumericPlaces,
  calculateConcentrationRange
} from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import PlotTypeSwitch from '@components/PlotTypeSwitch/PlotTypeSwitch'
import useStyles from './style'
import ConcentrationSlider from '../ConcentrationSlider/ConcentrationSlider'
import { getConcentrationArray } from '@invariant-labs/sdk/lib/utils'

export interface IRangeSelector {
  data: PlotTickData[]
  midPrice: TickPlotPositionData
  tokenASymbol: string
  tokenBSymbol: string
  onChangeRange: (leftIndex: number, rightIndex: number) => void
  blocked?: boolean
  blockerInfo?: string
  ticksLoading: boolean
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
  currentPairReversed: boolean | null
  initialIsDiscreteValue: boolean
  onDiscreteChange: (val: boolean) => void
  isConcentrated?: boolean
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPrice,
  tokenASymbol,
  tokenBSymbol,
  onChangeRange,
  blocked = false,
  blockerInfo,
  ticksLoading,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing,
  currentPairReversed,
  initialIsDiscreteValue,
  onDiscreteChange,
  isConcentrated = false
}) => {
  const classes = useStyles()

  const [leftRange, setLeftRange] = useState(MIN_TICK)
  const [rightRange, setRightRange] = useState(MAX_TICK)

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const [leftInputRounded, setLeftInputRounded] = useState('')
  const [rightInputRounded, setRightInputRounded] = useState('')

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const [isPlotDiscrete, setIsPlotDiscrete] = useState(initialIsDiscreteValue)

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
        isXtoY,
        xDecimal,
        yDecimal
      ) >= 4
    ) {
      setPlotMin(newMin)
      setPlotMax(newMax)
    }
  }

  const setLeftInputValues = (val: string) => {
    setLeftInput(val)
    setLeftInputRounded(toMaxNumericPlaces(+val, 5))
  }

  const setRightInputValues = (val: string) => {
    setRightInput(val)
    setRightInputRounded(toMaxNumericPlaces(+val, 5))
  }

  const onLeftInputChange = (val: string) => {
    setLeftInput(val)
    setLeftInputRounded(val)
  }

  const onRightInputChange = (val: string) => {
    setRightInput(val)
    setRightInputRounded(val)
  }

  const changeRangeHandler = (left: number, right: number) => {
    setLeftRange(left)
    setRightRange(right)

    setLeftInputValues(calcPrice(left, isXtoY, xDecimal, yDecimal).toString())
    setRightInputValues(calcPrice(right, isXtoY, xDecimal, yDecimal).toString())

    onChangeRange(left, right)
  }

  const resetPlot = () => {
    const initSideDist = Math.abs(
      midPrice.x -
        calcPrice(
          Math.max(minSpacingMultiplicity(tickSpacing), midPrice.index - tickSpacing * 15),
          isXtoY,
          xDecimal,
          yDecimal
        )
    )

    changeRangeHandler(
      isXtoY
        ? Math.max(minSpacingMultiplicity(tickSpacing), midPrice.index - tickSpacing * 10)
        : Math.min(maxSpacingMultiplicity(tickSpacing), midPrice.index + tickSpacing * 10),
      isXtoY
        ? Math.min(maxSpacingMultiplicity(tickSpacing), midPrice.index + tickSpacing * 10)
        : Math.max(minSpacingMultiplicity(tickSpacing), midPrice.index - tickSpacing * 10)
    )
    setPlotMin(midPrice.x - initSideDist)
    setPlotMax(midPrice.x + initSideDist)
  }

  const reversePlot = () => {
    changeRangeHandler(rightRange, leftRange)
    if (plotMin > 0) {
      const pom = 1 / plotMin
      setPlotMin(1 / plotMax)
      setPlotMax(pom)
    } else {
      const initSideDist = Math.abs(
        midPrice.x -
          calcPrice(
            Math.max(minSpacingMultiplicity(tickSpacing), midPrice.index - tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )

      setPlotMin(midPrice.x - initSideDist)
      setPlotMax(midPrice.x + initSideDist)
    }
  }

  useEffect(() => {
    if (currentPairReversed !== null) {
      reversePlot()
    }
  }, [currentPairReversed])

  useEffect(() => {
    if (ticksLoading) {
      resetPlot()
    }
  }, [ticksLoading, midPrice])

  const autoZoomHandler = (left: number, right: number) => {
    const leftX = calcPrice(left, isXtoY, xDecimal, yDecimal)
    const rightX = calcPrice(right, isXtoY, xDecimal, yDecimal)

    if (leftX < plotMin || rightX > plotMax) {
      const leftDist = Math.abs(
        leftX -
          calcPrice(
            isXtoY
              ? Math.max(minSpacingMultiplicity(tickSpacing), left - tickSpacing * 15)
              : Math.min(maxSpacingMultiplicity(tickSpacing), left + tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )
      const rightDist = Math.abs(
        rightX -
          calcPrice(
            isXtoY
              ? Math.min(maxSpacingMultiplicity(tickSpacing), right + tickSpacing * 15)
              : Math.max(minSpacingMultiplicity(tickSpacing), right - tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )

      let dist

      if (leftX < plotMin && rightX > plotMax) {
        dist = Math.max(leftDist, rightDist)
      } else if (leftX < plotMin) {
        dist = leftDist
      } else {
        dist = rightDist
      }

      setPlotMin(leftX - dist)
      setPlotMax(rightX + dist)
    }
  }

  const concentrationArray = useMemo(() => getConcentrationArray(tickSpacing, 1, midPrice.index).sort((a, b) => a - b), [tickSpacing, midPrice.index])

  useEffect(() => {
    if (isConcentrated) {
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[0],
        1,
        midPrice.index,
        isXtoY
      )
      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange)
    }
  }, [isConcentrated])

  return (
    <Grid container className={classes.wrapper}>
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
          isDiscrete={isPlotDiscrete}
        />
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
          <RangeInput
            disabled={isConcentrated}
            className={classes.input}
            label='Min price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={leftInputRounded}
            setValue={onLeftInputChange}
            decreaseValue={() => {
              const newLeft = isXtoY
                ? Math.max(minSpacingMultiplicity(tickSpacing), leftRange - tickSpacing)
                : Math.min(maxSpacingMultiplicity(tickSpacing), leftRange + tickSpacing)
              changeRangeHandler(newLeft, rightRange)
              autoZoomHandler(newLeft, rightRange)
            }}
            increaseValue={() => {
              const newLeft = isXtoY
                ? Math.min(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.max(rightRange + tickSpacing, leftRange - tickSpacing)

              changeRangeHandler(newLeft, rightRange)
              autoZoomHandler(newLeft, rightRange)
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
              autoZoomHandler(newLeft, rightRange)
            }}
          />
          <RangeInput
            disabled={isConcentrated}
            className={classes.input}
            label='Max price'
            tokenFromSymbol={tokenASymbol}
            tokenToSymbol={tokenBSymbol}
            currentValue={rightInputRounded}
            setValue={onRightInputChange}
            decreaseValue={() => {
              const newRight = isXtoY
                ? Math.max(rightRange - tickSpacing, leftRange + tickSpacing)
                : Math.min(rightRange + tickSpacing, leftRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
              autoZoomHandler(leftRange, newRight)
            }}
            increaseValue={() => {
              const newRight = isXtoY
                ? Math.min(maxSpacingMultiplicity(tickSpacing), rightRange + tickSpacing)
                : Math.max(minSpacingMultiplicity(tickSpacing), rightRange - tickSpacing)
              changeRangeHandler(leftRange, newRight)
              autoZoomHandler(leftRange, newRight)
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
              autoZoomHandler(leftRange, newRight)
            }}
          />
        </Grid>
        {isConcentrated ? (
          <ConcentrationSlider
            defaultValueIndex={0}
            values={concentrationArray}
            valueChangeHandler={value => {
              const { leftRange, rightRange } = calculateConcentrationRange(
                tickSpacing,
                concentrationArray[value],
                1,
                midPrice.index,
                isXtoY
              )
              changeRangeHandler(leftRange, rightRange)
              autoZoomHandler(leftRange, rightRange)
            }}
          />
        ) : (
          <Grid container className={classes.buttons}>
            <Button className={classes.button} onClick={resetPlot}>
              Reset range
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                const left = isXtoY
                  ? minSpacingMultiplicity(tickSpacing)
                  : maxSpacingMultiplicity(tickSpacing)
                const right = isXtoY
                  ? maxSpacingMultiplicity(tickSpacing)
                  : minSpacingMultiplicity(tickSpacing)

                changeRangeHandler(left, right)
                autoZoomHandler(left, right)
              }}>
              Set full range
            </Button>
          </Grid>
        )}
      </Grid>

      {blocked && (
        <Grid className={classes.blocker}>
          <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default RangeSelector
