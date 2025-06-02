import React, { useRef, useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { colors, typography } from '@static/theme'
import { formatNumberWithSuffix } from '@utils/utils'
import { useMinMaxChartStyles } from './style'
import { CHART_CONSTANTS } from './consts'
import { handleMaxIcon, handleMinIcon } from '@static/icons'

interface MinMaxChartProps {
  min: number
  max: number
  current: number
  isFullRange: boolean
}

interface GradientBoxProps {
  color: string
  width: string
  isOutOfBound: boolean
  gradientDirection: 'left' | 'right'
}

const GradientBox: React.FC<GradientBoxProps> = ({ color, width, isOutOfBound }) => (
  <Box
    sx={{
      width,
      height: '30px',
      borderTop: `1px solid ${color}`,
      background: `linear-gradient(180deg, ${color}B3 0%, ${color}00 100%)`,
      opacity: isOutOfBound ? 0.18 : 0.7
    }}
  />
)

const CurrentValueIndicator: React.FC<{
  position: number
  value: number
}> = ({ position, value }) => {
  const { classes } = useMinMaxChartStyles()
  return (
    <Typography
      className={classes.currentValueIndicator}
      sx={{
        left: `${position}%`
      }}>
      {formatNumberWithSuffix(value)}
    </Typography>
  )
}

const PriceIndicatorLine: React.FC<{ position: number }> = ({ position }) => {
  const { classes } = useMinMaxChartStyles()

  return (
    <Box
      className={classes.priceLineIndicator}
      sx={{
        left: `${position}%`
      }}
    />
  )
}

const MinMaxLabels: React.FC<{
  min: number
  max: number
  isFullRange: boolean
  classes: Record<'minMaxLabels', string>
}> = ({ min, max, classes, isFullRange }) => (
  <Box className={classes.minMaxLabels}>
    <Typography
      sx={{
        ...typography.caption2,
        color: colors.invariant.lightGrey
      }}>
      {isFullRange ? 0 : formatNumberWithSuffix(min)}
    </Typography>
    <Typography
      sx={{
        ...typography.caption2,
        color: colors.invariant.lightGrey
      }}>
      {isFullRange ? <span style={{ fontSize: '18px' }}>∞</span> : formatNumberWithSuffix(max)}
    </Typography>
  </Box>
)

export const MinMaxChart: React.FC<MinMaxChartProps> = ({ min, max, current, isFullRange }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(0)
  useEffect(() => {
    const updateWidth = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.getBoundingClientRect().width)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const calculateBoundedPosition = () => {
    if (current < min) return -CHART_CONSTANTS.OVERFLOW_LIMIT_LEFT
    if (current > max) return 100 + CHART_CONSTANTS.OVERFLOW_LIMIT_RIGHT / 2
    return ((current - min) / (max - min)) * 100
  }
  const currentPosition = calculateBoundedPosition()
  const { classes } = useMinMaxChartStyles()
  const isOutOfBounds = current < min || current > max

  const OFFSET_PX = 3
  const offsetPercentage = chartWidth ? (OFFSET_PX / chartWidth) * 100 : 0
  const indicatorPosition = isFullRange ? offsetPercentage : currentPosition

  return (
    <Box className={classes.container}>
      <CurrentValueIndicator position={indicatorPosition} value={current} />

      <Box className={classes.chart} ref={chartRef}>
        <Box className={classes.handleLeft}>
          <img width={25} src={handleMinIcon} alt='MIN' />
        </Box>

        <GradientBox
          isOutOfBound={isOutOfBounds}
          color={colors.invariant.green}
          width={`${currentPosition}%`}
          gradientDirection='right'
        />
        <GradientBox
          color={colors.invariant.pink}
          isOutOfBound={isOutOfBounds}
          width={`${100 - currentPosition}%`}
          gradientDirection='left'
        />
        <PriceIndicatorLine position={indicatorPosition} />

        <Box className={classes.handleRight}>
          <img width={25} src={handleMaxIcon} alt='MAX' />
        </Box>
      </Box>

      <MinMaxLabels min={min} max={max} isFullRange={isFullRange} classes={classes} />
    </Box>
  )
}
