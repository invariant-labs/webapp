import React, { useCallback, useMemo, useRef } from 'react'
import { Layer, ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { colors, theme } from '@static/theme'
import { Button, Grid, Tooltip, Typography, useMediaQuery } from '@material-ui/core'
import classNames from 'classnames'
import ZoomInIcon from '@static/svg/zoom-in-icon.svg'
import ZoomOutIcon from '@static/svg/zoom-out-icon.svg'
import Brush from './Brush/Brush'
import { nearestTickIndex } from '@consts/utils'
import { PlotTickData } from '@reducers/positions'
import loader from '@static/gif/loader.gif'
import useStyles from './style'

export type TickPlotPositionData = Omit<PlotTickData, 'y'>

export interface IPriceRangePlot {
  data: PlotTickData[]
  midPrice?: TickPlotPositionData
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
  isDiscrete?: boolean
  coverOnLoading?: boolean
  hasError?: boolean
  reloadHandler: () => void
  volumeRange?: {
    min: number
    max: number
  }
  volumeHeatmap?: boolean
}

export const PriceRangePlot: React.FC<IPriceRangePlot> = ({
  data,
  leftRange,
  rightRange,
  midPrice,
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
  isDiscrete = false,
  coverOnLoading = false,
  hasError = false,
  reloadHandler,
  volumeRange,
  volumeHeatmap
}) => {
  const classes = useStyles()

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
    ;``

    return pointsOmitter(rangeData)
  }, [disabled, data, rightRange, plotMin, plotMax, pointsOmitter])

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof midPrice === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <svg x={(midPrice.x - plotMin) * unitLen - 20} y={0} width={40} height={innerHeight}>
        <defs>
          <linearGradient id='currentGradient'>
            <stop offset='0%' stopColor='black' stopOpacity='0' />
            <stop offset='50%' stopColor='black' stopOpacity='0.25' />
            <stop offset='100%' stopColor='black' stopOpacity='0' />
          </linearGradient>
        </defs>
        <rect x={0} y={0} width={40} height={innerHeight} fill='url(#currentGradient)' />
        <rect x={19} y={0} width={3} height={innerHeight} fill={colors.invariant.yellow} />
      </svg>
    )
  }

  const volumeHeatMapLayer: Layer = ({ innerHeight, innerWidth }) => {
    if (volumeHeatmap && !loading && typeof volumeRange !== 'undefined') {
      const priceRanges = [
        { min: 0.999, max: 1, volume: 15 },
        { min: 1, max: 1.001, volume: 40 },
        { min: 1.001, max: 1.002, volume: 60 },
        { min: 1.002, max: 1.003, volume: 15 },
        { min: 1.003, max: 1.0035, volume: 10 }
      ]

      const shortenNumber = (number: number) => {
        if (number >= 1000000) {
          return (number / 1000000).toFixed(0) + 'M'
        } else if (number >= 1000) {
          return (number / 1000).toFixed(0) + 'K'
        } else {
          return number.toString()
        }
      }

      const concentrationRanges = priceRanges.map(range => {
        const volume = range.volume
        const concentration = volume / Math.abs(range.min - range.max)
        return { ...range, concentration }
      })

      concentrationRanges.sort((a, b) => a.concentration - b.concentration) // Sort ranges by concentration

      const opacityValues = [0.2, 0.4, 0.6, 0.8, 1]
      const categories = Math.min(concentrationRanges.length, opacityValues.length)
      const rangesPerCategory = Math.ceil(concentrationRanges.length / categories)
      const categorizedRanges = []

      for (let i = 0; i < categories; i++) {
        categorizedRanges.push(
          concentrationRanges.slice(i * rangesPerCategory, (i + 1) * rangesPerCategory)
        )
      }

      return categorizedRanges.map((category, categoryIndex) =>
        category.map((range, index) => {
          const opacity = opacityValues[categoryIndex]
          const rectX = ((range.min - plotMin) / (plotMax - plotMin)) * innerWidth
          const rectWidth = ((range.max - range.min) / (plotMax - plotMin)) * innerWidth
          return (
            <Tooltip
              title={`Volume: ${shortenNumber(range.concentration)}`}
              classes={{ tooltip: classes.customTooltip }}
              key={`${categoryIndex}-${index}`}
              placement='top'>
              <svg>
                <rect
                  x={rectX}
                  y={0}
                  width={rectWidth}
                  height={innerHeight}
                  fill={`rgba(46, 224, 154, ${opacity})`}
                />
              </svg>
            </Tooltip>
          )
        })
      )
    }
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
    return (
      <rect x={0} y={innerHeight} width={innerWidth} height={1} fill={colors.invariant.light} />
    )
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

  return (
    <Grid
      container
      className={classNames(classes.container, className)}
      style={style}
      innerRef={containerRef}>
      {loading && coverOnLoading ? (
        <Grid container className={classes.cover}>
          <img src={loader} className={classes.loader} alt='' />
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
          <img src={ZoomInIcon} className={classes.zoomIcon} alt='' />
        </Button>
        <Button className={classes.zoomButton} onClick={zoomMinus} disableRipple>
          <img src={ZoomOutIcon} className={classes.zoomIcon} alt='' />
        </Button>
      </Grid>
      <ResponsiveLine
        data={[
          {
            id: 'less than range',
            data: currentLessThanRange
          },
          {
            id: 'range',
            data: currentRange
          },
          {
            id: 'greater than range',
            data: currentGreaterThanRange
          }
        ]}
        curve={isDiscrete ? (isXtoY ? 'stepAfter' : 'stepBefore') : 'basis'}
        margin={{ top: isSmDown ? 55 : 25, bottom: 15 }}
        colors={[colors.invariant.pink, colors.invariant.green, colors.invariant.pink]}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          tickValues: 5
        }}
        xScale={{
          type: 'linear',
          min: plotMin,
          max: plotMax
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: maxVal
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
          lazyLoadingLayer,
          currentLayer,
          volumeRangeLayer,
          volumeHeatMapLayer,
          brushLayer,
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
