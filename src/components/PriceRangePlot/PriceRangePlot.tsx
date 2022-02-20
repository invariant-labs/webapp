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
    if (disabled || leftRange.x < plotMin) {
      return []
    }

    let rangeData: Array<{ x: number; y: number }> = data.filter(tick => tick.x <= leftRange.x)
    const outData: Array<{ x: number; y: number }> = data.filter(tick => tick.x < plotMin)

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

    if (rangeData[0].x > plotMin) {
      rangeData.unshift({
        x: plotMin,
        y: outData.length > 0 ? outData[outData.length - 1].y : 0
      })
    }

    return pointsOmitter(rangeData)
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
    const rangeData: Array<{ x: number; y: number }> = data.filter(
      tick => tick.x >= leftRange.x && tick.x <= rightRange.x
    )

    if (!rangeData.length) {
      rangeData.push({
        x: leftRange.x,
        y: data[lessThan - 1].y
      })

      rangeData.push({
        x: rightRange.x,
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

    let rangeData: Array<{ x: number; y: number }> = data.filter(tick => tick.x >= rightRange.x)
    const outData: Array<{ x: number; y: number }> = data.filter(tick => tick.x > plotMax)

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

    if (rangeData[rangeData.length - 1].x < plotMax) {
      rangeData.push({
        x: plotMax,
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
      <rect
        x={(midPrice.x - plotMin) * unitLen}
        y={0}
        width={2}
        height={innerHeight}
        fill={colors.invariant.light}
      />
    )
  }

  const bottomLineLayer: Layer = ({ innerWidth, innerHeight }) => {
    const bottomLine = innerHeight
    return <rect x={0} y={bottomLine} width={innerWidth} height={1} fill={colors.invariant.light} />
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
          currentLayer,
          bottomLineLayer,
          'grid',
          'markers',
          'areas',
          'lines',
          lazyLoadingLayer,
          Brush(
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
