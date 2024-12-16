import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { linearGradientDef } from '@nivo/core'
import { Layer, ResponsiveLine } from '@nivo/line'
import loader from '@static/gif/loader.gif'
import ZoomInIcon from '@static/svg/zoom-in-icon.svg'
import ZoomOutIcon from '@static/svg/zoom-out-icon.svg'
import { colors, theme } from '@static/theme'
import { formatNumber, nearestTickIndex, TokenPriceData } from '@utils/utils'
import { PlotTickData } from '@store/reducers/positions'
import classNames from 'classnames'
import React, { useCallback, useMemo, useRef } from 'react'
import Brush from './Brush/Brush'
import useStyles from './style'
import { BN } from '@project-serum/anchor'

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
  data,
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
  loading,
  isXtoY,
  xDecimal,
  yDecimal,
  tickSpacing,
  coverOnLoading = false,
  hasError = false,
  reloadHandler,
  volumeRange,
  tokenAPriceData,
  tokenBPriceData
}) => {
  const { classes } = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const containerRef = useRef<HTMLDivElement>(null)

  const maxVal = useMemo(() => Math.max(...data.map(element => element.y)), [data])

  const pointsOmitter = useCallback(
    (data: Array<{ x: number; y: number }>) => {
      if (containerRef.current === null || data.length <= 1000) {
        return data
      }

      const minXDist = containerRef.current.offsetWidth / 100000
      const minYChange = containerRef.current.offsetHeight / 1000

      const dataAfterOmit: Array<{ x: number; y: number }> = []

      data.forEach((tick, index) => {
        if (
          index === 0 ||
          index === data.length - 1 ||
          (dataAfterOmit.length > 0 &&
            ((tick.x - dataAfterOmit[dataAfterOmit.length - 1].x) / (plotMax - plotMin) >=
              minXDist ||
              Math.abs(tick.y - dataAfterOmit[dataAfterOmit.length - 1].y) / maxVal >= minYChange))
        ) {
          dataAfterOmit.push(tick)
        }
      })

      return dataAfterOmit
    },
    [containerRef.current, plotMin, plotMax, maxVal]
  )

  const currentLessThanRange = useMemo(() => {
    if (disabled || leftRange.x < Math.max(plotMin, data[0].x)) {
      return []
    }

    let rangeData: Array<{ x: number; y: number }> = data.filter(tick => tick.x <= leftRange.x)
    const outData: Array<{ x: number; y: number }> = data.filter(
      tick => tick.x < Math.max(plotMin, data[0].x)
    )

    if (!rangeData.length) {
      return []
    }

    if (rangeData[rangeData.length - 1].x < leftRange.x) {
      rangeData.push({
        x: leftRange.x,
        y: rangeData[rangeData.length - 1].y
      })
    }

    rangeData = rangeData.slice(outData.length, rangeData.length)

    if (rangeData[0].x > Math.max(plotMin, data[0].x)) {
      rangeData.unshift({
        x: Math.max(plotMin, data[0].x),
        y: outData.length > 0 ? outData[outData.length - 1].y : 0
      })
    }

    return pointsOmitter(rangeData)
  }, [disabled, leftRange, data, plotMin, plotMax, pointsOmitter])

  const currentRange = useMemo(() => {
    if (disabled) {
      const outMinData: Array<{ x: number; y: number }> = data.filter(
        tick => tick.x < Math.max(plotMin, data[0].x)
      )
      const outMaxData: Array<{ x: number; y: number }> = data.filter(
        tick => tick.x > Math.min(plotMax, data[data.length - 1].x)
      )
      const rangeData: Array<{ x: number; y: number }> = data.slice(
        outMinData.length,
        data.length - outMaxData.length
      )

      if (!rangeData.length || rangeData[0].x > Math.max(plotMin, data[0].x)) {
        rangeData.unshift({
          x: Math.max(plotMin, data[0].x),
          y: outMinData.length > 0 ? outMinData[outMinData.length - 1].y : 0
        })
      }

      if (rangeData[rangeData.length - 1].x < Math.min(plotMax, data[data.length - 1].x)) {
        rangeData.push({
          x: Math.min(plotMax, data[data.length - 1].x),
          y: rangeData[rangeData.length - 1].y
        })
      }

      return pointsOmitter(rangeData)
    }

    if (leftRange.x > plotMax || rightRange.x < plotMin) {
      return []
    }

    const lessThan = data.filter(tick => tick.x <= leftRange.x).length
    let rangeData: Array<{ x: number; y: number }> = data.filter(
      tick => tick.x >= leftRange.x && tick.x <= rightRange.x
    )

    if (!rangeData.length) {
      rangeData.push({
        x: Math.max(leftRange.x, plotMin),
        y: data[lessThan - 1].y
      })

      rangeData.push({
        x: Math.min(rightRange.x, plotMax),
        y: data[lessThan - 1].y
      })
    } else {
      if (rangeData[0].x > leftRange.x) {
        rangeData.unshift({
          x: leftRange.x,
          y: rangeData[0].y
        })
      }

      if (rangeData[rangeData.length - 1].x < rightRange.x) {
        rangeData.push({
          x: rightRange.x,
          y: rangeData[rangeData.length - 1].y
        })
      }

      const outMinData: Array<{ x: number; y: number }> = rangeData.filter(
        tick => tick.x < Math.max(plotMin, data[0].x)
      )
      const outMaxData: Array<{ x: number; y: number }> = rangeData.filter(
        tick => tick.x > Math.min(plotMax, data[data.length - 1].x)
      )
      const newRangeData: Array<{ x: number; y: number }> = rangeData.slice(
        outMinData.length,
        rangeData.length - outMaxData.length
      )

      if (!newRangeData.length || newRangeData[0].x > Math.max(plotMin, rangeData[0].x)) {
        newRangeData.unshift({
          x: Math.max(plotMin, rangeData[0].x),
          y: outMinData.length > 0 ? outMinData[outMinData.length - 1].y : 0
        })
      }

      if (
        newRangeData[newRangeData.length - 1].x <
        Math.min(plotMax, rangeData[rangeData.length - 1].x)
      ) {
        newRangeData.push({
          x: Math.min(plotMax, rangeData[rangeData.length - 1].x),
          y: newRangeData[newRangeData.length - 1].y
        })
      }

      rangeData = newRangeData
    }

    return pointsOmitter(rangeData)
  }, [disabled, data, leftRange, rightRange, plotMin, plotMax, pointsOmitter])

  const currentGreaterThanRange = useMemo(() => {
    if (disabled || rightRange.x > plotMax) {
      return []
    }

    let rangeData: Array<{ x: number; y: number }> = data.filter(tick => tick.x >= rightRange.x)
    const outData: Array<{ x: number; y: number }> = data.filter(
      tick => tick.x > Math.min(plotMax, data[data.length - 1].x)
    )

    if (!rangeData.length) {
      return []
    }

    if (rangeData[0].x > rightRange.x) {
      rangeData.unshift({
        x: rightRange.x,
        y: rangeData[0].y
      })
    }

    rangeData = rangeData.slice(0, rangeData.length - outData.length)

    if (rangeData[rangeData.length - 1].x < Math.min(plotMax, data[data.length - 1].x)) {
      rangeData.push({
        x: Math.min(plotMax, data[data.length - 1].x),
        y: rangeData[rangeData.length - 1].y
      })
    }

    return pointsOmitter(rangeData)
  }, [disabled, data, rightRange, plotMin, plotMax, pointsOmitter])

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof midPrice === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
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
  }

  const globalPriceLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof globalPrice === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <svg x={(globalPrice - plotMin) * unitLen - 20} y={-20} width={40} height={innerHeight + 20}>
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
  }

  const buyPriceLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof tokenAPriceData === 'undefined' || typeof tokenBPriceData === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
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
        <rect x={19} y={20} width='3' height={innerHeight} fill={colors.white.main} />
      </svg>
    )
  }

  const sellPriceLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof tokenAPriceData === 'undefined' || typeof tokenBPriceData === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
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
        <rect x={19} y={20} width='3' height={innerHeight} fill={colors.white.main} />
      </svg>
    )
  }

  const lastBuyPriceLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (
      typeof tokenAPriceData === 'undefined' ||
      typeof tokenBPriceData === 'undefined' ||
      !tokenAPriceData.lastBuyPrice
    ) {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <svg
        x={(tokenAPriceData.lastBuyPrice / tokenBPriceData.price - plotMin) * unitLen - 20}
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
  }

  const lastSellPriceLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (
      typeof tokenAPriceData === 'undefined' ||
      typeof tokenBPriceData === 'undefined' ||
      !tokenAPriceData.lastSellPrice
    ) {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <svg
        x={(tokenAPriceData.lastSellPrice / tokenBPriceData.price - plotMin) * unitLen - 20}
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
  }

  const volumeRangeLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof volumeRange === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <>
        {volumeRange.min >= plotMin ? (
          <line
            x1={(volumeRange.min - plotMin) * unitLen}
            x2={(volumeRange.min - plotMin) * unitLen}
            y1={0}
            strokeWidth={1}
            y2={innerHeight}
            stroke={colors.invariant.text}
            strokeDasharray='16 4'
          />
        ) : null}
        {volumeRange.max <= plotMax ? (
          <line
            x1={(volumeRange.max - plotMin) * unitLen}
            x2={(volumeRange.max - plotMin) * unitLen}
            y1={0}
            strokeWidth={1}
            y2={innerHeight}
            stroke={colors.invariant.text}
            strokeDasharray='16 4'
          />
        ) : null}
      </>
    )
  }

  const bottomLineLayer: Layer = ({ innerWidth, innerHeight }) => {
    const bottomLine = innerHeight
    return <rect x={0} y={bottomLine} width={innerWidth} height={1} fill={colors.invariant.light} />
  }

  const lazyLoadingLayer: Layer = ({ innerWidth, innerHeight }) => {
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
  }

  const brushLayer = Brush(
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

  const isNoPositions = data.every(tick => !(tick.y > 0))

  return (
    <Grid
      container
      className={classNames(classes.container, className)}
      style={style}
      ref={containerRef}>
      {loading && coverOnLoading ? (
        <Grid container className={classes.cover}>
          <img src={loader} className={classes.loader} alt='Loader' />
        </Grid>
      ) : null}
      {!loading && hasError ? (
        <Grid container className={classes.cover}>
          <Grid className={classes.errorWrapper} container direction='column' alignItems='center'>
            <Typography className={classes.errorText}>Unable to load liquidity chart</Typography>
            <Button className={classes.reloadButton} onClick={reloadHandler}>
              Reload chart
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <Grid
        container
        item
        className={classNames(classes.zoomButtonsWrapper, 'zoomBtns')}
        justifyContent='space-between'>
        <Button className={classes.zoomButton} onClick={zoomPlus} disableRipple>
          <img src={ZoomInIcon} className={classes.zoomIcon} alt='Zoom in' />
        </Button>
        <Button className={classes.zoomButton} onClick={zoomMinus} disableRipple>
          <img src={ZoomOutIcon} className={classes.zoomIcon} alt='Zoom out' />
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
        data={[
          {
            id: 'less than range',
            data: currentLessThanRange.length ? currentLessThanRange : [{ x: plotMin, y: 0 }]
          },
          {
            id: 'range',
            data: currentRange
          },
          {
            id: 'greater than range',
            data: currentGreaterThanRange.length ? currentGreaterThanRange : [{ x: plotMax, y: 0 }]
          }
        ]}
        curve={isXtoY ? 'stepAfter' : 'stepBefore'}
        margin={{ top: isSmDown ? 55 : 25, bottom: 15 }}
        colors={[colors.invariant.pink, colors.invariant.green, colors.invariant.pink]}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          tickValues: 5,
          format: value => formatNumber(value.toString())
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
          lastBuyPriceLayer,
          lastSellPriceLayer,
          currentLayer,
          volumeRangeLayer,
          brushLayer,
          lazyLoadingLayer,
          'axes',
          'legends'
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
