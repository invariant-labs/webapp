import { Grid, Typography, useMediaQuery } from '@mui/material'
import { linearGradientDef } from '@nivo/core'
import { Layer, ResponsiveLine } from '@nivo/line'
import loader from '@static/gif/loader.gif'
import { colors, theme } from '@static/theme'
import { formatNumberWithSuffix, nearestTickIndex, TokenPriceData } from '@utils/utils'
import { PlotTickData } from '@store/reducers/positions'
import React, { useCallback, useMemo, useRef } from 'react'
import Brush from './Brush/Brush'
import useStyles from './style'
import { BN } from '@project-serum/anchor'
import { Button } from '@common/Button/Button'
import { centerToRangeIcon, zoomInIcon, zoomOutIcon } from '@static/icons'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter'

export type TickPlotPositionData = Omit<PlotTickData, 'y'>

export type InitMidPrice = TickPlotPositionData & { sqrtPrice: BN }

export interface IPriceRangePlot {
  data: PlotTickData[]
  midPrice?: TickPlotPositionData
  globalPrice?: number
  leftRange: TickPlotPositionData
  rightRange: TickPlotPositionData
  onChangeRange?: (left: number, right: number) => void
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  plotMin: number
  plotMax: number
  zoomMinus: () => void
  zoomPlus: () => void
  moveLeft: () => void
  moveRight: () => void
  centerChart: () => void
  centerToRange?: () => void
  loading?: boolean
  isXtoY: boolean
  xDecimal: number
  yDecimal: number
  tickSpacing: number
  coverOnLoading?: boolean
  hasError?: boolean
  reloadHandler: () => void
  volumeRange?: {
    min: number
    max: number
  }
  tokenAPriceData?: TokenPriceData
  tokenBPriceData?: TokenPriceData
}

export const PriceRangePlot: React.FC<IPriceRangePlot> = ({
  data = [],
  leftRange,
  rightRange,
  midPrice,
  globalPrice,
  onChangeRange,
  style,
  className,
  disabled = false,
  plotMin,
  plotMax,
  zoomMinus,
  zoomPlus,
  moveLeft,
  moveRight,
  centerChart,
  centerToRange,
  loading,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing,
  coverOnLoading = false,
  hasError = false,
  reloadHandler,
  tokenAPriceData,
  tokenBPriceData
}) => {
  const { classes, cx } = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const containerRef = useRef<HTMLDivElement>(null)

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const maxVal = useMemo(() => {
    if (!safeData.length) return 1
    const validYValues = safeData.map(element => element?.y ?? 0).filter(y => !isNaN(y))
    return validYValues.length ? Math.max(...validYValues) : 1
  }, [safeData])

  const pointsOmitter = useCallback(
    (points: Array<{ x: number; y: number }>) => {
      if (!Array.isArray(points) || points.length === 0) {
        return []
      }

      if (containerRef.current === null || points.length <= 1000) {
        return points
      }

      const minXDist = containerRef.current.offsetWidth / 100000
      const minYChange = containerRef.current.offsetHeight / 1000

      const dataAfterOmit: Array<{ x: number; y: number }> = []

      points.forEach((tick, index) => {
        if (
          index === 0 ||
          index === points.length - 1 ||
          (dataAfterOmit.length > 0 &&
            ((tick.x - dataAfterOmit[dataAfterOmit.length - 1].x) / (plotMax - plotMin) >=
              minXDist ||
              Math.abs((tick?.y ?? 0) - (dataAfterOmit[dataAfterOmit.length - 1]?.y ?? 0)) /
                maxVal >=
                minYChange))
        ) {
          dataAfterOmit.push(tick)
        }
      })

      return dataAfterOmit
    },
    [containerRef, plotMin, plotMax, maxVal]
  )

  const currentLessThanRange = useMemo(() => {
    let rangeData: Array<{ x: number; y: number }> = safeData.filter(tick => tick.x <= leftRange.x)
    const outData: Array<{ x: number; y: number }> = safeData.filter(
      tick => tick.x < Math.max(plotMin, safeData[0]?.x ?? plotMin)
    )

    if (!rangeData.length) {
      return []
    }

    if (rangeData[rangeData.length - 1]?.x < leftRange.x) {
      rangeData.push({
        x: leftRange.x,
        y: rangeData[rangeData.length - 1]?.y ?? 0
      })
    }

    rangeData = rangeData.slice(outData.length, rangeData.length)

    if (rangeData[0]?.x > Math.max(plotMin, safeData[0]?.x ?? plotMin)) {
      rangeData.unshift({
        x: Math.max(plotMin, safeData[0]?.x ?? plotMin),
        y: outData.length > 0 ? (outData[outData.length - 1]?.y ?? 0) : 0
      })
    }

    return pointsOmitter(rangeData)
  }, [disabled, leftRange, safeData, plotMin, plotMax, pointsOmitter])

  const currentRange = useMemo(() => {
    if (!safeData.length) {
      return []
    }

    if (
      leftRange?.x == null ||
      rightRange?.x == null ||
      leftRange.x > plotMax ||
      rightRange.x < plotMin
    ) {
      return []
    }

    const lessThan = safeData.filter(tick => tick.x <= leftRange.x).length

    let rangeData: Array<{ x: number; y: number }> = safeData.filter(
      tick => tick.x >= leftRange.x && tick.x <= rightRange.x
    )

    if (!rangeData.length) {
      rangeData.push({
        x: Math.max(leftRange.x, plotMin),
        y: safeData[lessThan - 1]?.y ?? 0
      })

      rangeData.push({
        x: Math.min(rightRange.x, plotMax),
        y: safeData[lessThan - 1]?.y ?? 0
      })
    } else {
      if ((rangeData[0]?.x ?? Infinity) > leftRange.x) {
        rangeData.unshift({
          x: leftRange.x,
          y: rangeData[0]?.y ?? 0
        })
      }

      if ((rangeData[rangeData.length - 1]?.x ?? -Infinity) < rightRange.x) {
        rangeData.push({
          x: rightRange.x,
          y: rangeData[rangeData.length - 1]?.y ?? 0
        })
      }

      const outMinData: Array<{ x: number; y: number }> = rangeData.filter(
        tick => tick.x < Math.max(plotMin, safeData[0]?.x ?? plotMin)
      )
      const outMaxData: Array<{ x: number; y: number }> = rangeData.filter(
        tick => tick.x > Math.min(plotMax, safeData[safeData.length - 1]?.x ?? plotMax)
      )
      const newRangeData: Array<{ x: number; y: number }> = rangeData.slice(
        outMinData.length,
        rangeData.length - outMaxData.length
      )

      if (
        !newRangeData.length ||
        (newRangeData[0]?.x ?? 0) > Math.max(plotMin, rangeData[0]?.x ?? plotMin)
      ) {
        newRangeData.unshift({
          x: Math.max(plotMin, rangeData[0]?.x ?? plotMin),
          y: outMinData.length > 0 ? (outMinData[outMinData.length - 1]?.y ?? 0) : 0
        })
      }

      if (
        (newRangeData[newRangeData.length - 1]?.x ?? 0) <
        Math.min(plotMax, rangeData[rangeData.length - 1]?.x ?? plotMax)
      ) {
        newRangeData.push({
          x: Math.min(plotMax, rangeData[rangeData.length - 1]?.x ?? plotMax),
          y: newRangeData[newRangeData.length - 1]?.y ?? 0
        })
      }

      rangeData = newRangeData
    }

    return pointsOmitter(rangeData)
  }, [disabled, safeData, leftRange, rightRange, plotMin, plotMax, pointsOmitter])

  const currentGreaterThanRange = useMemo(() => {
    let rangeData: Array<{ x: number; y: number }> = safeData.filter(tick => tick.x >= rightRange.x)
    const outData: Array<{ x: number; y: number }> = safeData.filter(
      tick => tick.x > Math.min(plotMax, safeData[safeData.length - 1]?.x ?? plotMax)
    )

    if (!rangeData.length) {
      return []
    }

    if ((rangeData[0]?.x ?? 0) > rightRange.x) {
      rangeData.unshift({
        x: rightRange.x,
        y: rangeData[0]?.y ?? 0
      })
    }

    rangeData = rangeData.slice(0, rangeData.length - outData.length)

    if (
      (rangeData[rangeData.length - 1]?.x ?? 0) <
      Math.min(plotMax, safeData[safeData.length - 1]?.x ?? plotMax)
    ) {
      rangeData.push({
        x: Math.min(plotMax, safeData[safeData.length - 1]?.x ?? plotMax),
        y: rangeData[rangeData.length - 1]?.y ?? 0
      })
    }

    return pointsOmitter(rangeData)
  }, [disabled, safeData, rightRange, plotMin, plotMax, pointsOmitter])

  const currentLayer: Layer = useCallback(
    ({ innerWidth, innerHeight }) => {
      if (typeof midPrice === 'undefined' || midPrice?.x == null) {
        return null
      }

      const unitLen = plotMax !== plotMin ? innerWidth / (plotMax - plotMin) : 0
      return (
        <svg x={(midPrice.x - plotMin) * unitLen - 20} y={0} width={60} height={innerHeight}>
          <defs>
            <filter id='shadow' x='-10' y='-9' width='20' height={innerHeight}>
              <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
            </filter>
          </defs>
          <rect x={14} y={20} width='16' height={innerHeight} filter='url(#shadow)' opacity='0.3' />
          <rect x={19} y={20} width='3' height={innerHeight} fill={colors.invariant.yellow} />
        </svg>
      )
    },
    [midPrice, plotMin, plotMax]
  )

  const globalPriceLayer = useCallback(
    ({ innerWidth, innerHeight }: { innerWidth: number; innerHeight: number }) => {
      if (typeof globalPrice === 'undefined' || globalPrice == null) {
        return null
      }

      const unitLen = plotMax !== plotMin ? innerWidth / (plotMax - plotMin) : 0
      return (
        <svg
          x={(globalPrice - plotMin) * unitLen - 20}
          y={-20}
          width={40}
          height={innerHeight + 20}>
          <defs>
            <filter id='shadow-global-price' x='-10' y='-9' width='20' height={innerHeight}>
              <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
            </filter>
          </defs>
          <rect
            x={14}
            y={20}
            width='16'
            height={innerHeight}
            filter='url(#shadow-global-price)'
            opacity='0.3'
          />
          <rect x={19} y={20} width='3' height={innerHeight} fill={colors.invariant.blue} />
        </svg>
      )
    },
    [globalPrice, plotMin, plotMax]
  )

  const buyPriceLayer = useCallback(
    ({ innerWidth, innerHeight }: { innerWidth: number; innerHeight: number }) => {
      if (
        typeof tokenAPriceData === 'undefined' ||
        typeof tokenBPriceData === 'undefined' ||
        !tokenAPriceData?.buyPrice ||
        !tokenBPriceData?.price
      ) {
        return null
      }

      const unitLen = plotMax !== plotMin ? innerWidth / (plotMax - plotMin) : 0
      return (
        <svg
          x={(tokenAPriceData.buyPrice / tokenBPriceData.price - plotMin) * unitLen - 20}
          y={0}
          width={60}
          height={innerHeight}>
          <defs>
            <filter id='shadow' x='-10' y='-9' width='20' height={innerHeight}>
              <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
            </filter>
          </defs>
          <rect x={14} y={20} width='16' height={innerHeight} filter='url(#shadow)' opacity='0.3' />
          <rect x={19} y={20} width='3' height={innerHeight} fill={colors.invariant.plotGreen} />
        </svg>
      )
    },
    [tokenAPriceData, tokenBPriceData, plotMin, plotMax]
  )

  const sellPriceLayer = useCallback(
    ({ innerWidth, innerHeight }: { innerWidth: number; innerHeight: number }) => {
      if (
        typeof tokenAPriceData === 'undefined' ||
        typeof tokenBPriceData === 'undefined' ||
        !tokenAPriceData?.sellPrice ||
        !tokenBPriceData?.price
      ) {
        return null
      }

      const unitLen = plotMax !== plotMin ? innerWidth / (plotMax - plotMin) : 0
      return (
        <svg
          x={(tokenAPriceData.sellPrice / tokenBPriceData.price - plotMin) * unitLen - 20}
          y={0}
          width={60}
          height={innerHeight}>
          <defs>
            <filter id='shadow' x='-10' y='-9' width='20' height={innerHeight}>
              <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
            </filter>
          </defs>
          <rect x={14} y={20} width='16' height={innerHeight} filter='url(#shadow)' opacity='0.3' />
          <rect x={19} y={20} width='3' height={innerHeight} fill={colors.invariant.plotRed} />
        </svg>
      )
    },
    [tokenAPriceData, tokenBPriceData, plotMin, plotMax]
  )

  const bottomLineLayer = useCallback(
    ({ innerWidth, innerHeight }: { innerWidth: number; innerHeight: number }) => {
      const bottomLine = innerHeight
      return (
        <rect x={0} y={bottomLine} width={innerWidth} height={1} fill={colors.invariant.light} />
      )
    },
    []
  )

  const lazyLoadingLayer: Layer = useCallback(
    ({ innerWidth, innerHeight }) => {
      if (!loading || coverOnLoading) {
        return null
      }

      return (
        <svg
          width={innerWidth}
          height={innerHeight + 5}
          viewBox={`0 0 ${innerWidth} ${innerHeight + 5}`}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          x={0}
          y={-5}>
          <rect x={0} y={0} width='100%' height='100%' fill={`${colors.white.main}10`} />
          <text
            x='50%'
            y='50%'
            dominantBaseline='middle'
            textAnchor='middle'
            className={classes.loadingText}>
            Loading liquidity data...
          </text>
        </svg>
      )
    },
    [loading, coverOnLoading, classes.loadingText]
  )

  const brushLayer = useMemo(() => {
    if (!leftRange?.x || !rightRange?.x || !leftRange.index || !rightRange.index) {
      return () => null
    }

    return Brush(
      leftRange.x,
      rightRange.x,
      position => {
        const nearest = nearestTickIndex(
          plotMin + position * (plotMax - plotMin),
          tickSpacing,
          isXtoY,
          xDecimal,
          yDecimal
        )
        onChangeRange?.(
          isXtoY
            ? Math.min(rightRange.index - tickSpacing, nearest)
            : Math.max(rightRange.index + tickSpacing, nearest),
          rightRange.index
        )
      },
      position => {
        const nearest = nearestTickIndex(
          plotMin + position * (plotMax - plotMin),
          tickSpacing,
          isXtoY,
          xDecimal,
          yDecimal
        )
        onChangeRange?.(
          leftRange.index,
          isXtoY
            ? Math.max(leftRange.index + tickSpacing, nearest)
            : Math.min(leftRange.index - tickSpacing, nearest)
        )
      },
      plotMin,
      plotMax,
      disabled
    )
  }, [
    leftRange,
    rightRange,
    plotMin,
    plotMax,
    tickSpacing,
    isXtoY,
    xDecimal,
    yDecimal,
    onChangeRange,
    disabled
  ])

  const highlightLayer = ({ innerWidth, innerHeight }) => {
    const unitLen = innerWidth / (plotMax - plotMin)

    return (
      <svg width='100%' height='100%' pointerEvents={'none'}>
        <defs>
          <linearGradient id='gradient1' x1='0%' y1='20%' x2='0%' y2='100%'>
            <stop offset='0%' style={{ stopColor: `rgba(46, 224, 154, 0)` }} />
            <stop offset='100%' style={{ stopColor: 'rgba(46, 224, 154, 0.4)' }} />
          </linearGradient>
        </defs>
        <rect
          x={(leftRange.x - plotMin) * unitLen}
          y={0}
          width={(rightRange.x - leftRange.x) * unitLen}
          height={innerHeight}
          fill='url(#gradient1)'
        />
      </svg>
    )
  }

  const isNoPositions = !safeData.length || safeData.every(tick => !(tick?.y > 0))

  const chartData = useMemo(() => {
    return [
      {
        id: 'less than range',
        data: currentLessThanRange?.length ? currentLessThanRange : [{ x: plotMin, y: 0 }]
      },
      {
        id: 'range',
        data: currentRange?.length ? currentRange : [{ x: (plotMin + plotMax) / 2, y: 0 }]
      },
      {
        id: 'greater than range',
        data: currentGreaterThanRange?.length ? currentGreaterThanRange : [{ x: plotMax, y: 0 }]
      }
    ]
  }, [currentLessThanRange, currentRange, currentGreaterThanRange, plotMin, plotMax])

  return (
    <Grid container className={cx(classes.container, className)} style={style} ref={containerRef}>
      {loading && coverOnLoading ? (
        <Grid container className={classes.cover}>
          <img src={loader} className={classes.loader} alt='Loader' />
        </Grid>
      ) : null}
      {!loading && hasError ? (
        <Grid container className={classes.cover}>
          <Grid className={classes.errorWrapper} container>
            <Typography className={classes.errorText}>Unable to load liquidity chart</Typography>
            <Button scheme='pink' onClick={reloadHandler}>
              Reload chart
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <Grid className={classes.zoomButtonsWrapper}>
        <Button
          scheme='green'
          width={isMd ? 28 : 36}
          height={isMd ? 28 : 36}
          borderRadius={10}
          padding={0}
          onClick={zoomPlus}>
          <img src={zoomInIcon} className={classes.zoomIcon} alt='Zoom in' />
        </Button>
        <Button
          scheme='green'
          width={isMd ? 28 : 36}
          height={isMd ? 28 : 36}
          borderRadius={10}
          padding={0}
          onClick={zoomMinus}>
          <img src={zoomOutIcon} className={classes.zoomIcon} alt='Zoom out' />
        </Button>
        <Button
          scheme='pink'
          width={isMd ? 28 : 36}
          height={isMd ? 28 : 36}
          borderRadius={10}
          padding={0}
          onClick={centerChart}>
          <VerticalAlignCenterIcon
            sx={{
              width: isMd ? 28 : 32,
              height: isMd ? 28 : 32,
              transform: 'rotate(90deg)'
            }}
          />
        </Button>
        {centerToRange && (
          <Button
            scheme='pink'
            width={isMd ? 28 : 36}
            height={isMd ? 28 : 36}
            borderRadius={10}
            padding={0}
            onClick={centerToRange}>
            <img
              src={centerToRangeIcon}
              alt='Center to range'
              width={isMd ? 24 : 30}
              height={isMd ? 24 : 30}
            />
          </Button>
        )}
      </Grid>

      <Grid className={classes.leftArrow}>
        <Button
          scheme='pink'
          width={isMd ? 28 : 36}
          height={isMd ? 28 : 36}
          borderRadius={10}
          padding={0}
          onClick={moveLeft}>
          <ArrowLeftIcon
            sx={{
              width: isMd ? 28 : 32,
              height: isMd ? 28 : 32
            }}
          />
        </Button>
      </Grid>
      <Grid className={classes.rightArrow}>
        <Button
          scheme='pink'
          width={isMd ? 28 : 36}
          height={isMd ? 28 : 36}
          borderRadius={10}
          padding={0}
          onClick={moveRight}>
          <ArrowRightIcon
            sx={{
              width: isMd ? 28 : 32,
              height: isMd ? 28 : 32
            }}
          />
        </Button>
      </Grid>
      <ResponsiveLine
        sliceTooltip={() => <></>}
        tooltip={() => <></>}
        useMesh={false}
        enableCrosshair={false}
        enablePointLabel={false}
        debugSlices={false}
        enableSlices={false}
        debugMesh={false}
        areaBaselineValue={0}
        pointBorderWidth={0}
        areaBlendMode='normal'
        crosshairType='x'
        pointLabel=''
        pointBorderColor=''
        pointColor=''
        lineWidth={2}
        pointSize={2}
        areaOpacity={0.2}
        data={chartData}
        curve={isXtoY ? 'stepAfter' : 'stepBefore'}
        margin={{ top: isSmDown ? 55 : 25, bottom: 15 }}
        colors={[
          colors.invariant.chartDisabled,
          colors.invariant.green,
          colors.invariant.chartDisabled
        ]}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          tickValues: 5,
          format: value => (value < 0 ? '' : formatNumberWithSuffix(value.toString()))
        }}
        xScale={{
          type: 'linear',
          min: plotMin,
          max: plotMax
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: isNoPositions ? 1 : maxVal
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        enableArea={true}
        legends={[]}
        isInteractive={false}
        animate={false}
        role='application'
        layers={[
          bottomLineLayer,
          'grid',
          'markers',
          'areas',
          'lines',
          globalPriceLayer,
          buyPriceLayer,
          sellPriceLayer,
          currentLayer,
          lazyLoadingLayer,
          currentLayer,
          brushLayer,
          'axes',
          'legends',
          highlightLayer
        ]}
        defs={[
          linearGradientDef('gradient', [
            { offset: 0, color: 'inherit' },
            { offset: 50, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 }
          ])
        ]}
        fill={[
          {
            match: '*',
            id: 'gradient'
          }
        ]}
      />
    </Grid>
  )
}

export default PriceRangePlot
