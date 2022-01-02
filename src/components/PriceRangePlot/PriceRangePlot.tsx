import React, { useCallback, useMemo, useRef } from 'react'
import { Layer, ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { colors, theme } from '@static/theme'
import { Button, Grid, useMediaQuery } from '@material-ui/core'
import classNames from 'classnames'
import ZoomInIcon from '@static/svg/zoom-in-icon.svg'
import ZoomOutIcon from '@static/svg/zoom-out-icon.svg'
import Brush from './Brush/Brush'
import useStyles from './style'
import { nearestPriceIndex, nearestTickIndex } from '@consts/utils'
import { PlotTickData } from '@reducers/positions'

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
  tickSpacing
}) => {
  const classes = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const containerRef = useRef<HTMLDivElement>(null)

  const maxVal = useMemo(() => Math.max(...data.map(element => element.y)), [data])

  const pointsOmitter = useCallback(
    (data: Array<{ x: number; y: number }>) => {
      if (containerRef.current === null) {
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
    if (disabled || leftRange.x < plotMin) {
      return []
    }

    const rangeData = data.filter(tick => tick.x <= leftRange.x)

    if (rangeData[rangeData.length - 1].x < leftRange.x) {
      rangeData.push({
        x: leftRange.x,
        y: rangeData[rangeData.length - 1].y,
        index: leftRange.index
      })
    }

    return pointsOmitter(
      rangeData.slice(
        Math.max(0, nearestPriceIndex(plotMin, rangeData) - 5),
        Math.min(rangeData.length, nearestPriceIndex(plotMax, rangeData) + 5)
      )
    )
  }, [disabled, leftRange, data, plotMin, plotMax, pointsOmitter])

  const currentRange = useMemo(() => {
    if (disabled) {
      return pointsOmitter(
        data.slice(
          Math.max(0, nearestPriceIndex(plotMin, data) - 5),
          Math.min(data.length, nearestPriceIndex(plotMax, data) + 5)
        )
      )
    }

    if (leftRange.x > plotMax || rightRange.x < plotMin) {
      return []
    }

    const lessThan = data.filter(tick => tick.x <= leftRange.x).length
    const rangeData = data.filter(tick => tick.x >= leftRange.x && tick.x <= rightRange.x)

    if (!rangeData.length) {
      rangeData.push({
        x: leftRange.x,
        y: data[lessThan - 1].y,
        index: leftRange.index
      })

      rangeData.push({
        x: rightRange.x,
        y: data[lessThan - 1].y,
        index: rightRange.index
      })
    } else {
      if (rangeData[0].x > leftRange.x) {
        rangeData.unshift({
          x: leftRange.x,
          y: data[lessThan - 1].y,
          index: leftRange.index
        })
      }
  
      if (rangeData[rangeData.length - 1].x < rightRange.x) {
        rangeData.push({
          x: rightRange.x,
          y: rangeData[rangeData.length - 1].y,
          index: leftRange.index
        })
      }
    }

    return pointsOmitter(
      rangeData.slice(
        Math.max(0, nearestPriceIndex(plotMin, rangeData) - 5),
        Math.min(rangeData.length, nearestPriceIndex(plotMax, rangeData) + 5)
      )
    )
  }, [disabled, data, leftRange, rightRange, plotMin, plotMax, pointsOmitter])

  const currentGreaterThanRange = useMemo(() => {
    if (disabled || rightRange.x > plotMax) {
      return []
    }

    const rangeData = data.filter(tick => tick.x >= rightRange.x)

    if (rangeData[0].x > rightRange.x) {
      rangeData.unshift({
        x: rightRange.x,
        y: data[data.length - rangeData.length - 1]?.y ?? rangeData[0].y,
        index: rightRange.index
      })
    }

    return pointsOmitter(
      rangeData.slice(
        Math.max(0, nearestPriceIndex(plotMin, rangeData) - 5),
        Math.min(rangeData.length, nearestPriceIndex(plotMax, rangeData) + 5)
      )
    )
  }, [disabled, data, rightRange, plotMin, plotMax, pointsOmitter])

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof midPrice === 'undefined') {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <rect
        x={(midPrice.x - plotMin) * unitLen}
        y={0}
        width={2}
        height={innerHeight}
        fill={colors.invariant.componentOut3}
      />
    )
  }

  const lazyLoadingLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (!loading) {
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
          dominant-baseline='middle'
          text-anchor='middle'
          className={classes.loadingText}>
          Loading liquidity data...
        </text>
      </svg>
    )
  }

  return (
    <Grid
      container
      className={classNames(classes.container, className)}
      style={style}
      innerRef={containerRef}>
      <Grid
        container
        item
        className={classNames(classes.zoomButtonsWrapper, 'zoomBtns')}
        justifyContent='space-between'>
        <Button className={classes.zoomButton} onClick={zoomPlus} disableRipple>
          <img src={ZoomInIcon} className={classes.zoomIcon} />
        </Button>
        <Button className={classes.zoomButton} onClick={zoomMinus} disableRipple>
          <img src={ZoomOutIcon} className={classes.zoomIcon} />
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
        curve='basis'
        margin={{ top: isSmDown ? 55 : 25, bottom: 15 }}
        colors={[colors.invariant.accent1, colors.invariant.accent2, colors.invariant.accent1]}
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
          currentLayer,
          'grid',
          'markers',
          'areas',
          'lines',
          lazyLoadingLayer,
          Brush(
            leftRange.x,
            rightRange.x,
            position => {
              const nearest = nearestTickIndex(plotMin + position * (plotMax - plotMin), tickSpacing, isXtoY, xDecimal, yDecimal)
              onChangeRange?.(
                nearest === rightRange.index ? rightRange.index - (isXtoY ? tickSpacing : -tickSpacing) : nearest,
                rightRange.index
              )
            },
            position => {
              const nearest = nearestTickIndex(plotMin + position * (plotMax - plotMin), tickSpacing, isXtoY, xDecimal, yDecimal)
              onChangeRange?.(
                leftRange.index,
                nearest === leftRange.index ? leftRange.index + (isXtoY ? tickSpacing : -tickSpacing) : nearest
              )
            },
            plotMin,
            plotMax,
            disabled
          ),
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
