import { Tooltip, Box, Typography } from '@mui/material'
import { formatNumberWithoutSuffix } from '@utils/utils'
import React, { useMemo, useEffect } from 'react'
import { ChartSegment } from '../MobileOverview/MobileOverview'
import { useStyles } from './styles'

interface TooltipClasses {
  tooltip: string
}

interface SegmentFragmentTooltipProps {
  segment: ChartSegment
  index: number
  selectedSegment: number | null
  setSelectedSegment: (index: number | null) => void
  tooltipClasses: TooltipClasses
}

const SegmentFragmentTooltip: React.FC<SegmentFragmentTooltipProps> = ({
  segment,
  index,
  selectedSegment,
  setSelectedSegment,
  tooltipClasses
}) => {
  const { classes } = useStyles({ color: segment.color })
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.chart-container')) {
        setSelectedSegment(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [setSelectedSegment])

  const getSegmentStyle = (segment: ChartSegment, isSelected: boolean) => ({
    backgroundColor: segment.color,
    opacity: isSelected ? 1 : 0.8,
    width: `${segment.width}%`,
    height: '100%',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease-in-out'
  })

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSegment(selectedSegment === index ? null : index)
  }

  const segmentFragmentTooltip = useMemo(
    () => (
      <Tooltip
        key={index}
        open={selectedSegment === index}
        enterTouchDelay={0}
        leaveTouchDelay={0}
        disableTouchListener={true}
        disableHoverListener={true}
        disableFocusListener={true}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onClose={() => setSelectedSegment(null)}
        title={
          <Box sx={{ padding: 1 }}>
            <Typography className={classes.segmentTokenLabel}>{segment.token}</Typography>
            <Typography className={classes.segmentTokenValue}>
              ${formatNumberWithoutSuffix(segment.value, { twoDecimals: true })} (
              {segment.percentage}%)
            </Typography>
          </Box>
        }
        placement='top'
        classes={{
          tooltip: tooltipClasses.tooltip
        }}>
        <Box
          onClick={handleClick}
          className='chart-container'
          sx={getSegmentStyle(segment, selectedSegment === index)}
        />
      </Tooltip>
    ),
    [segment, index, selectedSegment, setSelectedSegment, tooltipClasses]
  )

  return segmentFragmentTooltip
}

export default SegmentFragmentTooltip
