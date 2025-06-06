import { ResponsiveBar } from '@nivo/bar'
import { colors, theme, typography } from '@static/theme'
import { linearGradientDef } from '@nivo/core'
import { useStyles } from './style'
import { TimeData } from '@store/reducers/stats'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix, trimZeros } from '@utils/utils'
import { formatLargeNumber } from '@utils/formatLargeNumber'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { formatPlotDataLabels, getLabelDate } from '@utils/uiUtils'
import { useState, useRef, useEffect, useCallback } from 'react'

interface StatsInterface {
  volume: number | null
  data: TimeData[]
  className?: string
  isLoading: boolean
  interval: IntervalsKeys
  lastStatsTimestamp: number
}

const Volume: React.FC<StatsInterface> = ({
  volume,
  data,
  className,
  isLoading,
  interval,
  lastStatsTimestamp
}) => {
  const { classes, cx } = useStyles()
  const [hoveredBar, setHoveredBar] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  volume = volume ?? 0

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const hideTooltip = useCallback((immediate = false) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    if (immediate) {
      setHoveredBar(null)
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        setHoveredBar(null)
      }, 50)
    }
  }, [])

  const showTooltip = useCallback((barData: any, event: MouseEvent) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    setHoveredBar(barData)
    setMousePosition({ x: event.clientX, y: event.clientY })
  }, [])

  const handleGlobalMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!chartContainerRef.current || !hoveredBar) return

      const rect = chartContainerRef.current.getBoundingClientRect()
      const margin = { top: 30, bottom: 30, left: 30, right: 4 } // Same as chart margins

      const barAreaLeft = rect.left + margin.left
      const barAreaRight = rect.right - margin.right
      const barAreaTop = rect.top + margin.top
      const barAreaBottom = rect.bottom - margin.bottom

      const isInsideBarArea =
        event.clientX >= barAreaLeft &&
        event.clientX <= barAreaRight &&
        event.clientY >= barAreaTop &&
        event.clientY <= barAreaBottom

      if (!isInsideBarArea) {
        hideTooltip(true)
      } else {
        setMousePosition({ x: event.clientX, y: event.clientY })
      }
    },
    [hoveredBar, hideTooltip]
  )

  useEffect(() => {
    if (hoveredBar) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
      }
    }
  }, [hoveredBar, handleGlobalMouseMove])

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const Theme = {
    axis: {
      fontSize: '14px',
      tickColor: 'transparent',
      ticks: { line: { stroke: colors.invariant.component }, text: { fill: '#A9B6BF' } },
      legend: { text: { stroke: 'transparent' } }
    },
    grid: { line: { stroke: colors.invariant.light } }
  }

  const CustomHoverLayer = ({ bars, innerHeight, innerWidth }: any) => {
    return (
      <g>
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill='transparent'
          onMouseEnter={() => {
            hideTooltip()
          }}
          style={{ pointerEvents: 'all' }}
        />

        {bars.map((bar: any) => {
          const barData = {
            timestamp: bar.data.indexValue || bar.data.timestamp,
            value: bar.data.value,
            ...bar.data
          }

          const hoverWidth = bar.width + 2
          const hoverX = bar.x - 1

          return (
            <rect
              key={bar.key}
              x={hoverX}
              y={0}
              width={hoverWidth}
              height={innerHeight}
              fill='transparent'
              onMouseEnter={event => {
                showTooltip(barData, event.nativeEvent)
              }}
              onMouseMove={event => {
                setMousePosition({ x: event.nativeEvent.clientX, y: event.nativeEvent.clientY })
              }}
              onMouseLeave={() => {
                hideTooltip()
              }}
              style={{ cursor: 'pointer', pointerEvents: 'all' }}
            />
          )
        })}
      </g>
    )
  }

  const CustomTooltip = () => {
    if (!hoveredBar) return null

    const timestamp = hoveredBar.timestamp || hoveredBar.indexValue
    const date = getLabelDate(interval, timestamp, lastStatsTimestamp)

    return (
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x + 10,
          top: mousePosition.y - 10,
          borderRadius: '4px',
          padding: '8px',
          pointerEvents: 'none',
          zIndex: 1000,
          color: 'white'
        }}>
        <Grid className={classes.tooltip}>
          <Typography className={classes.tooltipDate}>{date}</Typography>
          <Typography className={classes.tooltipValue}>
            ${formatNumberWithoutSuffix(hoveredBar.value)}
          </Typography>
        </Grid>
      </div>
    )
  }

  return (
    <Grid className={cx(classes.container, className)}>
      <Box className={classes.volumeContainer}>
        <Grid container justifyContent={'space-between'} alignItems='center'>
          <Typography className={classes.volumeHeader}>Volume</Typography>
        </Grid>
        <div className={classes.volumePercentContainer}>
          <Typography className={classes.volumePercentHeader}>
            ${formatNumberWithoutSuffix(isLoading ? Math.random() * 10000 : volume)}
          </Typography>
        </div>
      </Box>
      <div
        ref={chartContainerRef}
        className={classes.barContainer}
        style={{ position: 'relative' }}
        onMouseLeave={() => hideTooltip(true)}>
        <ResponsiveBar
          layout='vertical'
          key={`${interval}-${isLoading}`}
          animate={false}
          margin={{ top: 30, bottom: 30, left: 30, right: 4 }}
          data={data as Array<{ timestamp: number; value: number }>}
          keys={['value']}
          indexBy='timestamp'
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: time =>
              isLoading ? '' : formatPlotDataLabels(time, data.length, interval, isMobile)
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 2,
            tickRotation: 0,
            tickValues: 5,
            renderTick: isLoading
              ? () => <text></text>
              : ({ x, y, value }) => (
                  <g transform={`translate(${x - (isMobile ? 22 : 30)},${y + 4})`}>
                    <text
                      style={{ fill: colors.invariant.textGrey, ...typography.tiny2 }}
                      textAnchor='start'
                      dominantBaseline='center'>
                      {trimZeros(formatLargeNumber(value))}
                    </text>
                  </g>
                )
          }}
          gridYValues={5}
          theme={Theme}
          groupMode='grouped'
          enableLabel={false}
          enableGridY={true}
          innerPadding={isXsDown ? 1 : 2}
          isInteractive={false}
          padding={0.03}
          indexScale={{ type: 'band', round: true }}
          defs={[
            linearGradientDef('gradient', [
              { offset: 0, color: '#EF84F5' },
              { offset: 100, color: '#9C3EBD', opacity: 0.8 }
            ])
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
          colors={colors.invariant.pink}
          layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations', CustomHoverLayer]}
        />
        <CustomTooltip />
      </div>
    </Grid>
  )
}

export default Volume
