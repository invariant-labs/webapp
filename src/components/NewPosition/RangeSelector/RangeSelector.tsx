import { Button, Grid, Tooltip, Typography } from '@material-ui/core'
import React, { useState, useEffect, useMemo } from 'react'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import {
  calcPrice,
  calcTicksAmountInRange,
  nearestTickIndex,
  toMaxNumericPlaces,
  calculateConcentrationRange
} from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import { MIN_TICK } from '@invariant-labs/sdk'
import { MAX_TICK } from '@invariant-labs/sdk/src'
import PlotTypeSwitch from '@components/PlotTypeSwitch/PlotTypeSwitch'
import ConcentrationSlider from '../ConcentrationSlider/ConcentrationSlider'
import { maxSafeConcentrationsForTiers, minimumRangesForTiers } from '@consts/static'
import { getConcentrationArray, getMaxTick, getMinTick } from '@invariant-labs/sdk/lib/utils'
import questionMark from '@static/svg/questionMark.svg'
import loader from '@static/gif/loader.gif'
import useStyles from './style'
import activeLiquidity from '@static/svg/activeLiquidity.svg'

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
  feeTierIndex: number
  poolIndex: number | null
  bestTierIndex?: number
  hasTicksError?: boolean
  reloadHandler: () => void
  volumeRange?: {
    min: number
    max: number
  }
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
  isConcentrated = false,
  feeTierIndex,
  poolIndex,
  bestTierIndex,
  hasTicksError,
  reloadHandler,
  volumeRange
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

  const [concentrationIndex, setConcentrationIndex] = useState(0)

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
    if (!isConcentrated) {
      const initSideDist = Math.abs(
        midPrice.x -
          calcPrice(
            Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )

      changeRangeHandler(
        isXtoY
          ? Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 10)
          : Math.min(getMaxTick(tickSpacing), midPrice.index + tickSpacing * 10),
        isXtoY
          ? Math.min(getMaxTick(tickSpacing), midPrice.index + tickSpacing * 10)
          : Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 10)
      )
      setPlotMin(midPrice.x - initSideDist)
      setPlotMax(midPrice.x + initSideDist)
    } else {
      setConcentrationIndex(0)
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[0],
        minimumRangesForTiers[feeTierIndex],
        midPrice.index,
        isXtoY
      )
      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange, true)
    }
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
            Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 15),
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

  const autoZoomHandler = (left: number, right: number, canZoomCloser: boolean = false) => {
    const leftX = calcPrice(left, isXtoY, xDecimal, yDecimal)
    const rightX = calcPrice(right, isXtoY, xDecimal, yDecimal)

    if (leftX < plotMin || rightX > plotMax || canZoomCloser) {
      const leftDist = Math.abs(
        leftX -
          calcPrice(
            isXtoY
              ? Math.max(getMinTick(tickSpacing), left - tickSpacing * 15)
              : Math.min(getMaxTick(tickSpacing), left + tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )
      const rightDist = Math.abs(
        rightX -
          calcPrice(
            isXtoY
              ? Math.min(getMaxTick(tickSpacing), right + tickSpacing * 15)
              : Math.max(getMinTick(tickSpacing), right - tickSpacing * 15),
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

  const concentrationArray = useMemo(
    () =>
      getConcentrationArray(tickSpacing, minimumRangesForTiers[feeTierIndex], midPrice.index).sort(
        (a, b) => a - b
      ),
    [tickSpacing, midPrice.index, feeTierIndex]
  )

  useEffect(() => {
    if (isConcentrated) {
      setConcentrationIndex(0)

      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[0],
        minimumRangesForTiers[feeTierIndex],
        midPrice.index,
        isXtoY
      )
      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange, true)
    }
  }, [isConcentrated])

  useEffect(() => {
    if (isConcentrated && !ticksLoading) {
      const index =
        concentrationIndex > concentrationArray.length - 1
          ? concentrationArray.length - 1
          : concentrationIndex
      setConcentrationIndex(index)

      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[index],
        minimumRangesForTiers[feeTierIndex],
        midPrice.index,
        isXtoY
      )
      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange, true)
    }
  }, [midPrice.index, concentrationArray])

  const unsafeIndex = useMemo(
    () =>
      typeof bestTierIndex === 'undefined'
        ? concentrationArray.findIndex(val => val >= maxSafeConcentrationsForTiers[feeTierIndex])
        : concentrationArray.findIndex(val => val >= maxSafeConcentrationsForTiers[bestTierIndex]),
    [concentrationArray, feeTierIndex, bestTierIndex]
  )

  const unsafePercent = useMemo(
    () => (unsafeIndex === -1 ? 101 : (unsafeIndex / concentrationArray.length) * 100),
    [concentrationArray, unsafeIndex]
  )

  return (
    <Grid container className={classes.wrapper} direction='column'>
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
      <Grid className={classes.infoRow} container justifyContent='flex-end'>
        <Tooltip
          title={
            <>
              <Typography className={classes.liquidityTitle}>Active liquidity</Typography>
              <Grid container direction='row' wrap='nowrap'>
                <Typography className={classes.liquidityDesc}>
                  While selecting the price range, note where active liquidity is located. Your
                  liquidity can be inactive and, as a consequence, not generate profits. The active
                  liquidity range is represented by white, dashed lines in the liquidity chart.
                  Active liquidity is determined by the maximum price range resulting from the
                  statistical volume of swaps for the last 7 days. Note: active liquidity borders
                  are always aligned to the nearest initialized ticks.
                </Typography>
                <img className={classes.liquidityImg} src={activeLiquidity} />
              </Grid>
            </>
          }
          placement='bottom'
          classes={{
            tooltip: classes.liquidityTooltip
          }}>
          <Typography className={classes.activeLiquidity}>
            Active liquidity <div className={classes.activeLiquidityIcon}>i</div>
          </Typography>
        </Tooltip>
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
          disabled={isConcentrated}
          hasError={hasTicksError}
          reloadHandler={reloadHandler}
          volumeRange={volumeRange}
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
                ? Math.max(getMinTick(tickSpacing), leftRange - tickSpacing)
                : Math.min(getMaxTick(tickSpacing), leftRange + tickSpacing)
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
            diffLabel='Min/Current price difference:'
            percentDiff={((+leftInput - midPrice.x) / midPrice.x) * 100}
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
                ? Math.min(getMaxTick(tickSpacing), rightRange + tickSpacing)
                : Math.max(getMinTick(tickSpacing), rightRange - tickSpacing)
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
            diffLabel='Max/Current price difference:'
            percentDiff={((+rightInput - midPrice.x) / midPrice.x) * 100}
          />
        </Grid>
        {isConcentrated ? (
          <Grid container className={classes.sliderWrapper}>
            <ConcentrationSlider
              key={poolIndex ?? -1}
              valueIndex={concentrationIndex}
              values={concentrationArray}
              valueChangeHandler={value => {
                setConcentrationIndex(value)
                const { leftRange, rightRange } = calculateConcentrationRange(
                  tickSpacing,
                  concentrationArray[value],
                  minimumRangesForTiers[feeTierIndex],
                  midPrice.index,
                  isXtoY
                )
                changeRangeHandler(leftRange, rightRange)
                autoZoomHandler(leftRange, rightRange, true)
              }}
              dragHandler={value => {
                setConcentrationIndex(value)
              }}
              unsafePercent={unsafePercent}
            />
            {unsafeIndex !== -1 && concentrationIndex >= unsafeIndex ? (
              <Grid
                className={classes.warningWrapper}
                container
                item
                direction='row'
                wrap='nowrap'
                alignItems='center'>
                <Typography className={classes.unsafeWarning}>
                  Extremely high concentration
                </Typography>
                <Tooltip
                  title={
                    <Typography className={classes.tooltipText}>
                      High concentration enforces that your liquidity is provided within a tight
                      price range. Higher concentration will allow you to earn more, but it has
                      additional risk. Choosing high concentration is appropriate if you assume low
                      price volatility.
                      <br />
                      <br />
                      Make sure you want to open a position in the selected price range. Remember
                      that the position only makes a profit if the price is within range.
                    </Typography>
                  }
                  placement='bottom'
                  classes={{
                    tooltip: classes.tooltip
                  }}>
                  <img src={questionMark} className={classes.questionMark} />
                </Tooltip>
              </Grid>
            ) : null}
          </Grid>
        ) : (
          <Grid container className={classes.buttons}>
            <Button className={classes.button} onClick={resetPlot}>
              Reset range
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                const left = isXtoY ? getMinTick(tickSpacing) : getMaxTick(tickSpacing)
                const right = isXtoY ? getMaxTick(tickSpacing) : getMinTick(tickSpacing)

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
          {blockerInfo === 'Loading pool info...' ? (
            <Grid container style={{ height: '100%' }}>
              <img src={loader} className={classes.loader} />
            </Grid>
          ) : (
            <Typography className={classes.blockedInfo}>{blockerInfo}</Typography>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default RangeSelector
