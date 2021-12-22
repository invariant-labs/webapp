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
import { nearestPriceIndex } from '@consts/utils'

export interface IPriceRangePlot {
  data: Array<{ x: number; y: number }>
  midPriceIndex?: number
  leftRangeIndex: number
  rightRangeIndex: number
  onChangeRange?: (left: number, right: number) => void
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  plotMin: number
  plotMax: number
  zoomMinus: () => void
  zoomPlus: () => void
}

export const PriceRangePlot: React.FC<IPriceRangePlot> = ({
  data,
  leftRangeIndex,
  rightRangeIndex,
  midPriceIndex,
  onChangeRange,
  style,
  className,
  disabled = false,
  plotMin,
  plotMax,
  zoomMinus,
  zoomPlus
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
    if (disabled || leftRangeIndex > data.length - 1 || data[leftRangeIndex].x < plotMin) {
      return []
    }

    return pointsOmitter(
      data.slice(
        Math.max(0, nearestPriceIndex(plotMin, data) - 5),
        Math.min(leftRangeIndex + 1, nearestPriceIndex(plotMax, data) + 5)
      )
    )
  }, [disabled, leftRangeIndex, data, plotMin, plotMax, pointsOmitter])

  const currentRange = useMemo(() => {
    if (disabled) {
      return pointsOmitter(
        data.slice(
          Math.max(0, nearestPriceIndex(plotMin, data) - 5),
          Math.min(data.length, nearestPriceIndex(plotMax, data) + 5)
        )
      )
    }

    if (
      leftRangeIndex > data.length - 1 ||
      rightRangeIndex > data.length - 1 ||
      data[leftRangeIndex].x > plotMax ||
      data[rightRangeIndex].x < plotMin
    ) {
      return []
    }

    return pointsOmitter(
      data.slice(
        Math.max(leftRangeIndex, nearestPriceIndex(plotMin, data) - 5),
        Math.min(rightRangeIndex + 1, nearestPriceIndex(plotMax, data) + 5)
      )
    )
  }, [disabled, data, leftRangeIndex, rightRangeIndex, plotMin, plotMax, pointsOmitter])

  const currentGreaterThanRange = useMemo(() => {
    if (disabled || rightRangeIndex > data.length - 1 || data[rightRangeIndex].x > plotMax) {
      return []
    }

    return pointsOmitter(
      data.slice(
        Math.max(rightRangeIndex, nearestPriceIndex(plotMin, data) - 5),
        Math.min(data.length, nearestPriceIndex(plotMax, data) + 5)
      )
    )
  }, [disabled, data, rightRangeIndex, plotMin, plotMax, pointsOmitter])

  const currentLayer: Layer = ({ innerWidth, innerHeight }) => {
    if (typeof midPriceIndex === 'undefined' || midPriceIndex < 0 || midPriceIndex >= data.length) {
      return null
    }

    const unitLen = innerWidth / (plotMax - plotMin)
    return (
      <rect
        x={(data[midPriceIndex].x - plotMin) * unitLen}
        y={0}
        width={2}
        height={innerHeight}
        fill={colors.invariant.componentOut3}
      />
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
          ...(leftRangeIndex < data.length && rightRangeIndex < data.length
            ? [
              Brush(
                  data[leftRangeIndex]?.x,
                  data[rightRangeIndex]?.x,
                  position => {
                    const nearest = nearestPriceIndex(
                      plotMin + position * (plotMax - plotMin),
                      data
                    )
                    onChangeRange?.(
                      nearest === rightRangeIndex ? rightRangeIndex - 1 : nearest,
                      rightRangeIndex
                    )
                  },
                  position => {
                    const nearest = nearestPriceIndex(
                      plotMin + position * (plotMax - plotMin),
                      data
                    )
                    onChangeRange?.(
                      leftRangeIndex,
                      nearest === leftRangeIndex ? leftRangeIndex + 1 : nearest
                    )
                  },
                  plotMin,
                  plotMax,
                  disabled
              )
            ]
            : []),
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
