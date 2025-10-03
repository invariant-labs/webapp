import React, { useState, useEffect, useRef, useMemo } from 'react'
import PriceRangePlot, { TickPlotPositionData } from '@common/PriceRangePlot/PriceRangePlot'
import RangeInput from '@components/Inputs/RangeInput/RangeInput'
import { PlotTickData } from '@store/reducers/positions'
import ConcentrationSlider from '../ConcentrationSlider/ConcentrationSlider'
import loader from '@static/gif/loader.gif'
import useStyles from './style'
import { PositionOpeningMethod } from '@store/consts/types'
import {
  calcPriceByTickIndex,
  calcTicksAmountInRange,
  calculateConcentrationRange,
  formatNumberWithoutSuffix,
  nearestTickIndex,
  toMaxNumericPlaces,
  TokenPriceData,
  getConcentrationIndex,
  calculateConcentration
} from '@utils/utils'
import { getMaxTick, getMinTick } from '@invariant-labs/sdk/lib/utils'
import { Box, Button, Grid, Typography } from '@mui/material'
import { boostPointsIcon, warning3 } from '@static/icons'

export interface IRangeSelector {
  updatePath: (concIndex: number) => void
  initialConcentration: string
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
  shouldResetPlot: boolean
  setShouldResetPlot: (val: boolean) => void
  tokenAPriceData?: TokenPriceData
  tokenBPriceData?: TokenPriceData
  usdcPrice: {
    token: string
    price?: number
  } | null
}

export const RangeSelector: React.FC<IRangeSelector> = ({
  updatePath,
  initialConcentration,
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
  concentrationArray,
  minimumSliderIndex,
  concentrationIndex,
  setConcentrationIndex,
  getTicksInsideRange,
  shouldReversePlot,
  setShouldReversePlot,
  shouldNotUpdatePriceRange,
  unblockUpdatePriceRange,
  shouldResetPlot,
  setShouldResetPlot,
  tokenAPriceData,
  tokenBPriceData,
  usdcPrice
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

  const isMountedRef = useRef(false)

  const handleUpdateConcentrationFromURL = (concentrationValue: number) => {
    const mappedIndex = getConcentrationIndex(concentrationArray, concentrationValue)

    const validIndex = Math.max(
      minimumSliderIndex,
      Math.min(mappedIndex, concentrationArray.length - 1)
    )

    setConcentrationIndex(validIndex)
    const { leftRange, rightRange } = calculateConcentrationRange(
      tickSpacing,
      concentrationArray[validIndex],
      2,
      midPrice.index,
      isXtoY
    )

    changeRangeHandler(leftRange, rightRange)
    autoZoomHandler(leftRange, rightRange, true)
  }

  useEffect(() => {
    if (tokenASymbol !== 'ABC' && tokenBSymbol !== 'XYZ') {
      const concentrationValue = +initialConcentration

      handleUpdateConcentrationFromURL(concentrationValue)
    }
  }, [])

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

  const moveLeft = () => {
    const diff = plotMax - plotMin

    const minPrice = isXtoY
      ? calcPriceByTickIndex(getMinTick(tickSpacing), isXtoY, xDecimal, yDecimal)
      : calcPriceByTickIndex(getMaxTick(tickSpacing), isXtoY, xDecimal, yDecimal)

    const newLeft = plotMin - diff / 6
    const newRight = plotMax - diff / 6

    if (newLeft < minPrice - diff / 2) {
      setPlotMin(minPrice - diff / 2)
      setPlotMax(minPrice + diff / 2)
    } else {
      setPlotMin(newLeft)
      setPlotMax(newRight)
    }
  }

  const moveRight = () => {
    const diff = plotMax - plotMin

    const maxPrice = isXtoY
      ? calcPriceByTickIndex(getMaxTick(tickSpacing), isXtoY, xDecimal, yDecimal)
      : calcPriceByTickIndex(getMinTick(tickSpacing), isXtoY, xDecimal, yDecimal)

    const newLeft = plotMin + diff / 6
    const newRight = plotMax + diff / 6

    if (newRight > maxPrice + diff / 2) {
      setPlotMin(maxPrice - diff / 2)
      setPlotMax(maxPrice + diff / 2)
    } else {
      setPlotMin(newLeft)
      setPlotMax(newRight)
    }
  }

  const centerChart = () => {
    const diff = plotMax - plotMin

    setPlotMin(midPrice.x - diff / 2)
    setPlotMax(midPrice.x + diff / 2)
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
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[concentrationIndex],
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

  const [lastPoolIndex, setLastPoolIndex] = useState(poolIndex)
  const [initReset, setInitReset] = useState(true)
  useEffect(() => {
    if (
      !ticksLoading &&
      isMountedRef.current &&
      poolIndex !== null &&
      currentMidPrice !== midPrice &&
      !shouldReversePlot &&
      shouldResetPlot
    ) {
      if (!shouldNotUpdatePriceRange) {
        setCurrentMidPrice(midPrice)

        if (poolIndex !== lastPoolIndex || initReset) {
          resetPlot()
          setInitReset(false)
          setShouldResetPlot(false)
        }
      }
    }

    setLastPoolIndex(poolIndex)
  }, [triggerReset, initReset])

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

  //Fix in case of reset chart not triggered correctly
  useEffect(() => {
    if (initReset === false) {
      const timeoutId = setTimeout(() => {
        if (
          isXtoY
            ? leftRange > midPrice.index || rightRange < midPrice.index
            : leftRange < midPrice.index || rightRange > midPrice.index
        ) {
          resetPlot()
        }
      }, 100)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [initReset])

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
      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[concentrationIndex],
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
        concentrationIndex > concentrationArray.length - 1
          ? concentrationArray.length - 1
          : concentrationIndex

      setConcentrationIndex(index)

      const { leftRange, rightRange } = calculateConcentrationRange(
        tickSpacing,
        concentrationArray[index],
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

    const { leftRange, rightRange } = calculateConcentrationRange(
      tickSpacing,
      concentrationArray[concentrationIndex],
      2,
      midPrice.index,
      isXtoY
    )

    changeRangeHandler(leftRange, rightRange)
    autoZoomHandler(leftRange, rightRange, true)
  }, [tokenASymbol, tokenBSymbol])

  const showPriceWarning = useMemo(() => {
    const lowerBound = midPrice.x * 0.9
    const upperBound = midPrice.x * 1.1
    return (globalPrice ?? 0) < lowerBound || (globalPrice ?? 0) > upperBound
  }, [globalPrice, midPrice.x])

  return (
    <Grid container className={classes.wrapper}>
      <Grid className={classes.topInnerWrapper}>
        <Grid className={classes.headerContainer} container>
          <Grid className={classes.priceRangeContainer}>
            <Typography className={classes.header}>Price range</Typography>
            {poolIndex !== null && (
              <Typography className={classes.currentPrice} mt={0.5}>
                {formatNumberWithoutSuffix(midPrice.x)} {tokenBSymbol} per {tokenASymbol}
              </Typography>
            )}
            {poolIndex !== null && usdcPrice !== null && usdcPrice.price && (
              <Typography className={classes.usdcCurrentPrice}>
                {usdcPrice.token} ${formatNumberWithoutSuffix(usdcPrice.price)}
              </Typography>
            )}
            {showPriceWarning && !blocked && !ticksLoading && (
              <Box className={classes.priceWarningContainer}>
                <img className={classes.priceWarningIcon} src={warning3} alt='warning icon' />
                <Typography className={classes.priceWarning}>
                  The pool price may differ from the actual price
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid
            display={'flex'}
            flexDirection='column'
            alignItems={'flex-end'}
            flexShrink={0}
            mt={1.5}>
            <Typography className={classes.currentPrice}>Current price</Typography>
            <Typography className={classes.globalPrice}>Global price</Typography>
            {/* <Typography className={classes.lastGlobalBuyPrice}>Last global buy price</Typography>
            <Typography className={classes.lastGlobalSellPrice}>Last global sell price</Typography> */}
          </Grid>
        </Grid>
        <PriceRangePlot
          className={classes.plot}
          plotData={data}
          onChangeRange={changeRangeHandler}
          leftRangeData={{
            index: leftRange,
            x: calcPriceByTickIndex(leftRange, isXtoY, xDecimal, yDecimal)
          }}
          rightRangeData={{
            index: rightRange,
            x: calcPriceByTickIndex(rightRange, isXtoY, xDecimal, yDecimal)
          }}
          midPriceData={midPrice}
          globalPrice={globalPrice}
          plotMinData={plotMin}
          plotMaxData={plotMax}
          zoomMinus={zoomMinus}
          zoomPlus={zoomPlus}
          loading={ticksLoading && !blocked}
          isXtoY={isXtoY}
          spacing={tickSpacing}
          xDecimal={xDecimal}
          yDecimal={yDecimal}
          disabled={positionOpeningMethod === 'concentration'}
          hasError={hasTicksError}
          reloadHandler={reloadHandler}
          tokenAPriceData={tokenAPriceData}
          tokenBPriceData={tokenBPriceData}
          moveLeft={moveLeft}
          moveRight={moveRight}
          centerChart={centerChart}
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
        <Grid container className={classes.subheaderWrapper}>
          <Typography className={classes.subheader}>Set price range</Typography>
          {positionOpeningMethod === 'range' && (
            <Grid className={classes.rangeConcentration}>
              <img src={boostPointsIcon} alt='Concentration' width='14px' />
              <Typography>Concentration </Typography>
              <Typography>{calculateConcentration(leftRange, rightRange).toFixed(2)}x</Typography>
            </Grid>
          )}
        </Grid>
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
              values={concentrationArray}
              valueChangeHandler={value => {
                setConcentrationIndex(value)

                updatePath(value)

                const { leftRange, rightRange } = calculateConcentrationRange(
                  tickSpacing,
                  concentrationArray[value],
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
