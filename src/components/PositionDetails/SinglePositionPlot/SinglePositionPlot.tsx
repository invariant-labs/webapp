import PriceRangePlot, { TickPlotPositionData } from '@common/PriceRangePlot/PriceRangePlot'
import { Box, Grid, Typography } from '@mui/material'
import {
  calcPriceByTickIndex,
  calcTicksAmountInRange,
  calculateConcentration,
  formatNumberWithoutSuffix,
  numberToString,
  spacingMultiplicityGte,
  TokenPriceData,
  truncateString
} from '@utils/utils'
import { PlotTickData } from '@store/reducers/positions'
import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { getMinTick } from '@invariant-labs/sdk/lib/utils'
import { ILiquidityToken } from '@store/consts/types'
import { RangeIndicator } from './RangeIndicator/RangeIndicator'
import { Stat } from './Stat/Stat'
import { colors } from '@static/theme'
import { activeLiquidityIcon, airdropRainbowIcon } from '@static/icons'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'

export interface ISinglePositionPlot {
  data: PlotTickData[]
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  midPrice: TickPlotPositionData
  globalPrice?: number
  currentPrice: number
  tokenY: Pick<ILiquidityToken, 'name' | 'decimal'>
  tokenX: Pick<ILiquidityToken, 'name' | 'decimal'>
  ticksLoading: boolean
  tickSpacing: number
  min: number
  max: number
  xToY: boolean
  hasTicksError?: boolean
  reloadHandler: () => void
  volumeRange?: {
    min: number
    max: number
  }
  tokenAPriceData: TokenPriceData | undefined
  tokenBPriceData: TokenPriceData | undefined
  isFullRange: boolean
}

const SinglePositionPlot: React.FC<ISinglePositionPlot> = ({
  data,
  leftRange,
  rightRange,
  midPrice,
  globalPrice,
  currentPrice,
  tokenY,
  tokenX,
  ticksLoading,
  tickSpacing,
  min,
  max,
  xToY,
  hasTicksError,
  reloadHandler,
  volumeRange,
  tokenAPriceData,
  tokenBPriceData,
  isFullRange
}) => {
  const { classes } = useStyles()

  const [plotMin, setPlotMin] = useState(0)
  const [plotMax, setPlotMax] = useState(1)

  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [currentXtoY, setCurrentXtoY] = useState(xToY)

  const middle = (Math.abs(leftRange.x) + Math.abs(rightRange.x)) / 2

  const calcZoomScale = (newMaxPlot: number) => {
    const proportionLength = newMaxPlot - middle
    const scaleMultiplier = ((rightRange.x - middle) * 100) / proportionLength

    return scaleMultiplier
  }

  //Proportion between middle of price range and right range in ratio to middle of price range and plotMax
  const [zoomScale, setZoomScale] = useState(0.7)

  useEffect(() => {
    const initSideDist = Math.abs(
      leftRange.x -
        calcPriceByTickIndex(
          Math.max(
            spacingMultiplicityGte(getMinTick(tickSpacing), tickSpacing),
            leftRange.index - tickSpacing * 15
          ),
          xToY,
          tokenX.decimal,
          tokenY.decimal
        )
    )

    if (currentXtoY !== xToY) {
      const plotMax = ((rightRange.x - middle) * 100) / zoomScale + middle
      const plotMin = -(((middle - leftRange.x) * 100) / zoomScale - middle)

      setPlotMax(plotMax)
      setPlotMin(plotMin)
      setCurrentXtoY(xToY)
    }

    if (isInitialLoad) {
      setIsInitialLoad(false)
      setPlotMin(leftRange.x - initSideDist)
      setPlotMax(rightRange.x + initSideDist)

      setZoomScale(calcZoomScale(rightRange.x + initSideDist))
    }
  }, [ticksLoading, leftRange, rightRange, isInitialLoad])

  const zoomMinus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin - diff / 4
    const newMax = plotMax + diff / 4

    const zoomMultiplier = calcZoomScale(newMax)
    setZoomScale(zoomMultiplier)

    setPlotMin(newMin)
    setPlotMax(newMax)
  }

  const zoomPlus = () => {
    const diff = plotMax - plotMin
    const newMin = plotMin + diff / 6
    const newMax = plotMax - diff / 6

    const zoomMultiplier = calcZoomScale(newMax)
    setZoomScale(zoomMultiplier)

    if (
      calcTicksAmountInRange(
        Math.max(newMin, 0),
        newMax,
        Number(tickSpacing),
        xToY,
        Number(tokenX.decimal),
        Number(tokenY.decimal)
      ) >= 4
    ) {
      setPlotMin(newMin)
      setPlotMax(newMax)
    }
  }

  const minPercentage = (min / currentPrice - 1) * 100
  const maxPercentage = (max / currentPrice - 1) * 100
  const concentration = calculateConcentration(leftRange.index, rightRange.index)

  return (
    <Box className={classes.container}>
      <Box className={classes.headerContainer}>
        <Typography className={classes.header}>Price range</Typography>
        <Grid>
          <RangeIndicator
            isLoading={ticksLoading}
            inRange={min <= currentPrice && currentPrice <= max}
          />
          <Grid gap={'2px'} mt={1} display='flex' flexDirection='column' alignItems='flex-end'>
            <TooltipHover
              title={
                <>
                  <Typography className={classes.liquidityTitle}>Active liquidity</Typography>
                  <Typography className={classes.liquidityDesc} style={{ marginBottom: 12 }}>
                    While selecting the price range, note where active liquidity is located. Your
                    liquidity can be inactive and, as a consequence, not generate profits.
                  </Typography>
                  <Grid container className={classes.liqWrapper}>
                    <Typography className={classes.liquidityDesc}>
                      The active liquidity range is represented by white, dashed lines in the
                      liquidity chart. Active liquidity is determined by the maximum price range
                      resulting from the statistical volume of exchanges for the last 7 days.
                    </Typography>
                    <img
                      className={classes.liquidityImg}
                      src={activeLiquidityIcon}
                      alt='Liquidity'
                    />
                  </Grid>
                  <Typography className={classes.liquidityNote}>
                    Note: active liquidity borders are always aligned to the nearest initialized
                    ticks.
                  </Typography>
                </>
              }
              placement='bottom'
              increasePadding>
              <Typography className={classes.activeLiquidity}>
                Active liquidity <span className={classes.activeLiquidityIcon}>i</span>
              </Typography>
            </TooltipHover>
            <Typography className={classes.currentPrice}>Current price</Typography>
            <Typography className={classes.globalPrice}>Global price</Typography>
            <Typography className={classes.lastGlobalBuyPrice}>Last global buy price</Typography>
            <Typography className={classes.lastGlobalSellPrice}>Last global sell price</Typography>
          </Grid>
        </Grid>
      </Box>
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
        isXtoY={xToY}
        tickSpacing={tickSpacing}
        xDecimal={tokenX.decimal}
        yDecimal={tokenY.decimal}
        coverOnLoading
        hasError={hasTicksError}
        reloadHandler={reloadHandler}
        volumeRange={volumeRange}
        globalPrice={globalPrice}
        tokenAPriceData={tokenAPriceData}
        tokenBPriceData={tokenBPriceData}
      />

      <Box className={classes.statsWrapper}>
        <Box className={classes.statsContainer}>
          <Stat
            name='CURRENT PRICE'
            value={
              <Box>
                <Typography component='span' className={classes.value}>
                  {numberToString(currentPrice.toFixed(xToY ? tokenY.decimal : tokenX.decimal))}
                </Typography>{' '}
                {xToY ? truncateString(tokenY.name, 4) : truncateString(tokenX.name, 4)} {' / '}
                {xToY ? truncateString(tokenX.name, 4) : truncateString(tokenY.name, 4)}
              </Box>
            }
          />
          <Stat
            name={
              <Box className={classes.concentrationContainer}>
                <img className={classes.concentrationIcon} src={airdropRainbowIcon} />
                CONCENTRATION
              </Box>
            }
            value={
              <Typography className={classes.concentrationValue}>
                {concentration.toFixed(2)}x
              </Typography>
            }
          />
        </Box>
        <Box className={classes.statsContainer}>
          {isFullRange ? (
            <Stat
              value={
                <Box>
                  <Typography component='span' className={classes.value}>
                    FULL RANGE
                  </Typography>
                </Box>
              }
              isHorizontal
            />
          ) : (
            <>
              <Stat
                name='MIN'
                value={
                  <Box>
                    <Typography component='span' className={classes.value}>
                      {isFullRange ? 0 : formatNumberWithoutSuffix(min)}
                    </Typography>{' '}
                    {!isFullRange &&
                      (xToY
                        ? truncateString(tokenY.name, 4)
                        : truncateString(tokenX.name, 4) + ' / ' + xToY
                          ? truncateString(tokenX.name, 4)
                          : truncateString(tokenY.name, 4))}
                  </Box>
                }
                isHorizontal
              />
              <Stat
                name='MAX'
                value={
                  <Box>
                    <Typography component='span' className={classes.value}>
                      {isFullRange ? (
                        <span style={{ fontSize: '24px' }}>∞</span>
                      ) : (
                        formatNumberWithoutSuffix(max)
                      )}
                    </Typography>{' '}
                    {!isFullRange &&
                      (xToY
                        ? truncateString(tokenY.name, 4)
                        : truncateString(tokenX.name, 4) + ' / ' + xToY
                          ? truncateString(tokenX.name, 4)
                          : truncateString(tokenY.name, 4))}
                  </Box>
                }
                isHorizontal
              />
            </>
          )}
        </Box>
        <Box className={classes.statsContainer}>
          <Stat
            isLoading={ticksLoading}
            name='% MIN'
            value={
              <Box>
                <Typography
                  component='span'
                  className={classes.value}
                  style={{
                    color: minPercentage < 0 ? colors.invariant.Error : colors.invariant.green
                  }}>
                  {minPercentage > 0 && '+'}
                  {minPercentage.toFixed(2)}%
                </Typography>
              </Box>
            }
            isHorizontal
          />
          <Stat
            isLoading={ticksLoading}
            name='% MAX'
            value={
              <Box>
                <Typography
                  component='span'
                  className={classes.value}
                  style={{
                    color: maxPercentage < 0 ? colors.invariant.Error : colors.invariant.green
                  }}>
                  {maxPercentage > 0 && '+'}
                  {maxPercentage.toFixed(2)}%
                </Typography>
              </Box>
            }
            isHorizontal
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SinglePositionPlot
