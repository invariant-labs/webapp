import { ResponsiveBar } from '@nivo/bar'
import { colors, theme, typography } from '@static/theme'
import { linearGradientDef } from '@nivo/core'
import { PoolSnap } from '@store/reducers/stats'
import { Box, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix, trimZeros } from '@utils/utils'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { formatLargeNumber, formatPlotDataLabels, getLabelDate } from '@utils/uiUtils'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Switcher from '@common/Switcher/Switcher'
import { PoolChartSwitch } from '@store/consts/types'
import { useSelector } from 'react-redux'
import { poolDetailsChartType } from '@store/selectors/stats'
import { useStyles } from './style'
import Intervals from '@components/Stats/Intervals/Intervals'
import loader from '@static/gif/loader.gif'

interface StatsInterface {
  statsPoolData: PoolSnap
  isLoading: boolean
  interval: IntervalsKeys
  lastStatsTimestamp: number
  setChartType: (type: PoolChartSwitch) => void
  updateInterval: (interval: IntervalsKeys) => void
  className?: string
}

const ChartLowerSection: React.FC<StatsInterface> = ({
  statsPoolData,
  isLoading,
  interval,
  lastStatsTimestamp,
  setChartType,
  updateInterval,
  className
}) => {
  const { classes, cx } = useStyles()
  const [hoveredBar, setHoveredBar] = useState<any>(null)
  const [hoveredBarPosition, setHoveredBarPosition] = useState<{ x: number; width: number } | null>(
    null
  )

  const chartType = useSelector(poolDetailsChartType)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const isTablet = isMdUp && isLgDown

  const hideTooltip = useCallback((immediate = false) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    if (immediate) {
      setHoveredBar(null)
      setHoveredBarPosition(null)
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        setHoveredBar(null)
        setHoveredBarPosition(null)
      }, 50)
    }
  }, [])

  const showTooltip = useCallback(
    (barData: any, event: MouseEvent, barPosition: { x: number; width: number }) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      setHoveredBar(barData)
      setHoveredBarPosition(barPosition)
      setMousePosition({ x: event.clientX, y: event.clientY })
    },
    []
  )

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
        {hoveredBarPosition && (
          <rect
            x={hoveredBarPosition.x}
            y={0}
            width={hoveredBarPosition.width}
            height={innerHeight}
            fill='#f075d7'
            fillOpacity={0.3}
            style={{ pointerEvents: 'none' }}
          />
        )}

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
                showTooltip(barData, event.nativeEvent, { x: bar.x, width: bar.width })
              }}
              onMouseMove={event => {
                setMousePosition({ x: event.nativeEvent.clientX, y: event.nativeEvent.clientY })
              }}
              onMouseLeave={() => {
                hideTooltip()
              }}
              style={{ pointerEvents: 'all' }}
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

    const getTooltipPosition = () => {
      if (!isMobile) {
        return {
          left: mousePosition.x + 10,
          top: mousePosition.y + 10
        }
      }

      const tooltipWidth = 170
      const screenWidth = window.innerWidth
      const margin = -15

      let left = mousePosition.x - 85
      if (left < margin) {
        left = margin
      } else if (left + tooltipWidth > screenWidth - margin) {
        left = screenWidth - tooltipWidth - margin
      }

      return {
        left: left,
        top: 0
      }
    }

    const tooltipPosition = getTooltipPosition()

    return (
      <div
        style={{
          position: isMobile ? 'absolute' : 'fixed',
          left: tooltipPosition.left,
          top: tooltipPosition.top,
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

  const [data, value] = useMemo(() => {
    if (!statsPoolData?.feesPlot) return [[], 0, PoolChartSwitch.volume]

    switch (chartType) {
      case PoolChartSwitch.volume:
        return [statsPoolData.volumePlot, statsPoolData.volume || 0]
        break
      case PoolChartSwitch.tvl:
        return [statsPoolData.liquidityPlot, statsPoolData.tvl || 0]
        break
      case PoolChartSwitch.fees:
        return [statsPoolData.feesPlot, statsPoolData.fees || 0]
        break
      default:
        return [statsPoolData.volumePlot, statsPoolData.volume || 0]
    }
  }, [chartType, statsPoolData])

  const isEmptyData = useMemo(() => data.every(item => item.value === 0), [data])

  return (
    <Grid className={cx(classes.container, className)}>
      <Box className={classes.volumeContainer}>
        <Grid container className={classes.switchersContainer}>
          <Switcher
            value={chartType}
            onChange={setChartType}
            options={[PoolChartSwitch.volume, PoolChartSwitch.tvl, PoolChartSwitch.fees]}
            dark
            itemWidth={90}
            fullWidth={isMobile}
          />
          <Box display={'flex'} width={isMobile ? '100%' : 'auto'}>
            <Intervals
              interval={interval ?? IntervalsKeys.Daily}
              setInterval={updateInterval}
              dark
              fullWidth={isMobile}
            />
          </Box>
        </Grid>

        {isLoading ? (
          <Skeleton
            variant='rounded'
            height={36}
            width={180}
            animation='wave'
            sx={{ borderRadius: '8px', marginTop: '5px' }}
          />
        ) : (
          <div className={classes.volumePercentContainer}>
            <Typography className={classes.volumePercentHeader}>
              ${formatNumberWithoutSuffix(isLoading ? Math.random() * 10000 : value)}
            </Typography>
          </div>
        )}
      </Box>
      {!isLoading ? (
        <div
          ref={chartContainerRef}
          className={cx(classes.barContainer, {
            [classes.loadingOverlay]: isLoading
          })}
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
                isLoading
                  ? ''
                  : formatPlotDataLabels(time, data.length, interval, isMobile || isTablet)
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
                        dominantBaseline='central'>
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
            valueScale={{ type: 'linear', max: isEmptyData ? 1 : 'auto' }}
          />
          <CustomTooltip />
        </div>
      ) : (
        <Grid container style={{ height: 280 }}>
          <img src={loader} className={classes.loader} alt='Loader' />
        </Grid>
      )}
    </Grid>
  )
}

export default ChartLowerSection
