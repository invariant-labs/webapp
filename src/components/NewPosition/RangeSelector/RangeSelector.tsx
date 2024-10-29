import React, { useState, useEffect, useRef } from 'react'
import PriceRangePlot, { TickPlotPositionData } from '@components/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import activeLiquidity from '@static/svg/activeLiquidity.svg'
import { PlotTickData } from '@store/reducers/positions'

import ConcentrationSlider from '../ConcentrationSlider/ConcentrationSlider'

import loader from '@static/gif/loader.gif'
import useStyles from './style'
import { PositionOpeningMethod } from '@store/consts/types'
import {
  calcPriceByTickIndex,
  calcTicksAmountInRange,
  calculateConcentrationRange,
  findClosestIndexByValue,
  formatNumber,
  nearestTickIndex,
  toMaxNumericPlaces
} from '@utils/utils'
import { getMaxTick, getMinTick } from '@invariant-labs/sdk/lib/utils'
import { Button, Grid, Tooltip, Typography } from '@mui/material'
export interface IRangeSelector {
  data: PlotTickData[]
  midPrice: TickPlotPositionData
  globalPrice?: number
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
  positionOpeningMethod?: PositionOpeningMethod
  poolIndex: number | null
  hasTicksError?: boolean
  reloadHandler: () => void
  volumeRange?: {
    min: number
    max: number
  }
  concentrationArray: number[]
  minimumSliderIndex: number
  concentrationIndex: number
  setConcentrationIndex: (val: number) => void
  getTicksInsideRange: (
    left: number,
    right: number,
    isXtoY: boolean
  ) => {
    leftInRange: number
    rightInRange: number
  }
  shouldReversePlot: boolean
  setShouldReversePlot: (val: boolean) => void
  shouldNotUpdatePriceRange: boolean
  unblockUpdatePriceRange: () => void
  onlyUserPositions: boolean
  setOnlyUserPositions: (onlyUserPositions: boolean) => void
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  data,
  midPrice,
  globalPrice,
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
  positionOpeningMethod,
  poolIndex,
  hasTicksError,
  reloadHandler,
  volumeRange,
  concentrationArray,
  minimumSliderIndex,
  concentrationIndex,
  setConcentrationIndex,
  getTicksInsideRange,

  shouldReversePlot,
  setShouldReversePlot,
  shouldNotUpdatePriceRange,
  unblockUpdatePriceRange
  // onlyUserPositions,
  // setOnlyUserPositions
}) => {
  const { classes } = useStyles()

  const [leftRange, setLeftRange] = useState(getMinTick(tickSpacing))
  const [rightRange, setRightRange] = useState(getMaxTick(tickSpacing))

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')

  const [leftInputRounded, setLeftInputRounded] = useState('')
  const [rightInputRounded, setRightInputRounded] = useState('')

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const [currentMidPrice, setCurrentMidPrice] = useState(midPrice)
  const [triggerReset, setTriggerReset] = useState(false)

  const [previousConcentration, setPreviousConcentration] = useState(0)

  const [cachedConcentrationArray, setCachedConcentrationArray] = useState(concentrationArray)

  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

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
    const { leftInRange, rightInRange } = getTicksInsideRange(left, right, isXtoY)

    setLeftRange(leftInRange)
    setRightRange(rightInRange)
    setLeftInputValues(calcPriceByTickIndex(leftInRange, isXtoY, xDecimal, yDecimal).toString())
    setRightInputValues(calcPriceByTickIndex(rightInRange, isXtoY, xDecimal, yDecimal).toString())
    onChangeRange(leftInRange, rightInRange)
  }

  const resetPlot = () => {
    if (positionOpeningMethod === 'range') {
      const initSideDist = Math.abs(
        midPrice.x -
          calcPriceByTickIndex(
            Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 15),
            isXtoY,
            xDecimal,
            yDecimal
          )
      )
      const higherTick = Math.max(getMinTick(tickSpacing), midPrice.index - tickSpacing * 10)
      const lowerTick = Math.min(getMaxTick(tickSpacing), midPrice.index + tickSpacing * 10)
      changeRangeHandler(isXtoY ? higherTick : lowerTick, isXtoY ? lowerTick : higherTick)
      setPlotMin(midPrice.x - initSideDist)
      setPlotMax(midPrice.x + initSideDist)
    } else {
      const newConcentrationIndex = findClosestIndexByValue(
        cachedConcentrationArray,
        previousConcentration
      )

      setConcentrationIndex(newConcentrationIndex)
      setPreviousConcentration(cachedConcentrationArray[newConcentrationIndex])
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        cachedConcentrationArray[newConcentrationIndex],
        2,
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
          calcPriceByTickIndex(
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
    if (currentPairReversed !== null && isMountedRef.current) {
      reversePlot()
    }
  }, [currentPairReversed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldReversePlot(false)
    }, 600)

    return () => {
      clearTimeout(timer)
    }
  }, [shouldReversePlot])

  useEffect(() => {
    if (
      !ticksLoading &&
      isMountedRef.current &&
      poolIndex !== null &&
      currentMidPrice !== midPrice &&
      !shouldReversePlot
    ) {
      if (!shouldNotUpdatePriceRange) {
        resetPlot()
        setCurrentMidPrice(midPrice)
      }
    }
  }, [triggerReset])

  useEffect(() => {
    if (
      !ticksLoading &&
      isMountedRef.current &&
      poolIndex !== null &&
      currentMidPrice !== midPrice &&
      !shouldReversePlot
    ) {
      if (!shouldNotUpdatePriceRange) {
        setTriggerReset(prev => !prev)
      }

      unblockUpdatePriceRange()
    }
  }, [ticksLoading, isMountedRef, midPrice.index, poolIndex])

  useEffect(() => {
    setCachedConcentrationArray(concentrationArray)

    const newConcentrationIndex = findClosestIndexByValue(concentrationArray, previousConcentration)

    setConcentrationIndex(newConcentrationIndex)
    setPreviousConcentration(concentrationArray[newConcentrationIndex])
  }, [concentrationArray])

  const autoZoomHandler = (left: number, right: number, canZoomCloser: boolean = false) => {
    const { leftInRange, rightInRange } = getTicksInsideRange(left, right, isXtoY)

    const leftX = calcPriceByTickIndex(leftInRange, isXtoY, xDecimal, yDecimal)
    const rightX = calcPriceByTickIndex(rightInRange, isXtoY, xDecimal, yDecimal)

    const higherLeftIndex = Math.max(getMinTick(tickSpacing), leftInRange - tickSpacing * 15)

    const lowerLeftIndex = Math.min(getMaxTick(tickSpacing), leftInRange + tickSpacing * 15)

    const lowerRightIndex = Math.min(getMaxTick(tickSpacing), rightInRange + tickSpacing * 15)

    const higherRightIndex = Math.max(getMinTick(tickSpacing), rightInRange - tickSpacing * 15)

    if (leftX < plotMin || rightX > plotMax || canZoomCloser) {
      const leftDist = Math.abs(
        leftX -
          calcPriceByTickIndex(
            isXtoY ? higherLeftIndex : lowerLeftIndex,
            isXtoY,
            xDecimal,
            yDecimal
          )
      )
      const rightDist = Math.abs(
        rightX -
          calcPriceByTickIndex(
            isXtoY ? lowerRightIndex : higherRightIndex,
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

  useEffect(() => {
    if (positionOpeningMethod === 'concentration' && isMountedRef.current && !ticksLoading) {
      setConcentrationIndex(0)
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        cachedConcentrationArray[0],
        2,
        midPrice.index,
        isXtoY
      )

      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange, true)
    } else {
      changeRangeHandler(leftRange, rightRange)
    }
  }, [positionOpeningMethod])

  useEffect(() => {
    if (positionOpeningMethod === 'concentration' && !ticksLoading && isMountedRef.current) {
      const index =
        concentrationIndex > cachedConcentrationArray.length - 1
          ? cachedConcentrationArray.length - 1
          : concentrationIndex
      setConcentrationIndex(index)

      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        cachedConcentrationArray[index],
        2,
        midPrice.index,
        isXtoY
      )

      changeRangeHandler(leftRange, rightRange)
      autoZoomHandler(leftRange, rightRange, true)
    }
  }, [midPrice.index])

  useEffect(() => {
    if (shouldReversePlot) {
      return
    }

    setConcentrationIndex(0)
    const { leftRange, rightRange } = calculateConcentrationRange(
      tickSpacing,
      cachedConcentrationArray[0],
      2,
      midPrice.index,
      isXtoY
    )

    changeRangeHandler(leftRange, rightRange)
    autoZoomHandler(leftRange, rightRange, true)
  }, [tokenASymbol, tokenBSymbol])

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Grid className={classes.topInnerWrapper}>
        <Grid className={classes.headerContainer} container justifyContent='space-between'>
          <Grid>
            <Typography className={classes.header}>Price range</Typography>
            {poolIndex !== null && (
              <Typography className={classes.currentPrice}>
                {formatNumber(midPrice.x, false, 4)} {tokenBSymbol} per {tokenASymbol}
              </Typography>
            )}
          </Grid>
          <Grid className={classes.activeLiquidityContainer} container direction='column'>
            <Tooltip
              enterTouchDelay={0}
              leaveTouchDelay={Number.MAX_SAFE_INTEGER}
              title={
                <>
                  <Typography className={classes.liquidityTitle}>Active liquidity</Typography>
                  <Typography className={classes.liquidityDesc} style={{ marginBottom: 12 }}>
                    While selecting the price range, note where active liquidity is located. Your
                    liquidity can be inactive and, as a consequence, not generate profits.
                  </Typography>
                  <Grid
                    container
                    direction='row'
                    wrap='nowrap'
                    alignItems='center'
                    style={{ marginBottom: 12 }}>
                    <Typography className={classes.liquidityDesc}>
                      The active liquidity range is represented by white, dashed lines in the
                      liquidity chart. Active liquidity is determined by the maximum price range
                      resulting from the statistical volume of exchanges for the last 7 days.
                    </Typography>
                    <img className={classes.liquidityImg} src={activeLiquidity} alt='Liquidity' />
                  </Grid>
                  <Typography className={classes.liquidityNote}>
                    Note: active liquidity borders are always aligned to the nearest initialized
                    ticks.
                  </Typography>
                </>
              }
              placement='bottom'
              classes={{
                tooltip: classes.liquidityTooltip
              }}>
              <Typography className={classes.activeLiquidity}>
                Active liquidity <span className={classes.activeLiquidityIcon}>i</span>
              </Typography>
            </Tooltip>
            <Grid>
              <Typography className={classes.currentPrice}>Current price ━━━</Typography>
              <Typography className={classes.globalPrice}>Global price</Typography>
            </Grid>
          </Grid>
        </Grid>
        <PriceRangePlot
          className={classes.plot}
          data={data}
          onChangeRange={changeRangeHandler}
          leftRange={{
            index: leftRange,
            x: calcPriceByTickIndex(leftRange, isXtoY, xDecimal, yDecimal)
          }}
          rightRange={{
            index: rightRange,
            x: calcPriceByTickIndex(rightRange, isXtoY, xDecimal, yDecimal)
          }}
          midPrice={midPrice}
          globalPrice={globalPrice}
          plotMin={plotMin}
          plotMax={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
          loading={ticksLoading}
          isXtoY={isXtoY}
          tickSpacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
          disabled={positionOpeningMethod === 'concentration'}
          hasError={hasTicksError}
          reloadHandler={reloadHandler}
          volumeRange={volumeRange}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={onlyUserPositions}
              onChange={() => {
                setOnlyUserPositions(!onlyUserPositions)
              }}
              name='onlyUserPositions'
              color='secondary'
            />
          }
          label='Show only your positions'
          classes={{ label: classes.checkboxLabel }}
        /> */}
      </Grid>
      <Grid container className={classes.innerWrapper}>
        <Typography className={classes.subheader}>Set price range</Typography>
        <Grid container className={classes.inputs}>
          <RangeInput
            disabled={positionOpeningMethod === 'concentration'}
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
            diffLabel='Min - Current'
            percentDiff={((+leftInput - midPrice.x) / midPrice.x) * 100}
          />
          <RangeInput
            disabled={positionOpeningMethod === 'concentration'}
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
            diffLabel='Max - Current'
            percentDiff={((+rightInput - midPrice.x) / midPrice.x) * 100}
          />
        </Grid>
        {positionOpeningMethod === 'concentration' ? (
          <Grid container className={classes.sliderWrapper}>
            <ConcentrationSlider
              valueIndex={concentrationIndex}
              values={cachedConcentrationArray}
              valueChangeHandler={value => {
                setPreviousConcentration(cachedConcentrationArray[value])
                setConcentrationIndex(value)
                const { leftRange, rightRange } = calculateConcentrationRange(
                  tickSpacing,
                  cachedConcentrationArray[value],
                  2,
                  midPrice.index,
                  isXtoY
                )

                changeRangeHandler(leftRange, rightRange)
                autoZoomHandler(leftRange, rightRange, true)
              }}
              dragHandler={value => {
                setConcentrationIndex(value)
              }}
              minimumSliderIndex={minimumSliderIndex}
            />
          </Grid>
        ) : (
          <Grid container className={classes.buttons} justifyContent='center' alignItems='center'>
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
              <img src={loader} className={classes.loader} alt='Loader' />
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
