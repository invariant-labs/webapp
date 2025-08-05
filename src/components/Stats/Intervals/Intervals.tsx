import React from 'react'
import useStyles from './style'
import { Box } from '@mui/system'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface IntervalsProps {
  interval: string
  setInterval: (interval: IntervalsKeys) => void
  dark?: boolean
  fullWidth?: boolean
}

const Intervals: React.FC<IntervalsProps> = ({ interval, setInterval, dark, fullWidth }) => {
  const { classes } = useStyles({ interval, dark, fullWidth })

  const handleIntervalChange = (_: any, newInterval: string) => {
    if (!newInterval) return
    if (newInterval === '1W') {
      setInterval(IntervalsKeys.Weekly)
    } else if (newInterval === '1M') {
      setInterval(IntervalsKeys.Monthly)
    } else if (newInterval === '1Y') {
      setInterval(IntervalsKeys.Yearly)
    } else {
      setInterval(IntervalsKeys.Daily)
    }
  }

  return (
    <Box className={classes.mainWrapper}>
      <Box className={classes.switchWrapper}>
        <Box className={classes.container}>
          <Box className={classes.switchPoolsContainer}>
            <Box className={classes.switchPoolsMarker} />
            <ToggleButtonGroup
              value={interval}
              exclusive
              onChange={handleIntervalChange}
              className={classes.switchPoolsButtonsGroup}>
              <ToggleButton
                value={IntervalsKeys.Daily}
                disableRipple
                className={classes.switchPoolsButton}
                style={{ fontWeight: interval === IntervalsKeys.Daily ? 700 : 400 }}>
                {IntervalsKeys.Daily}
              </ToggleButton>
              <ToggleButton
                value={IntervalsKeys.Weekly}
                disableRipple
                className={classes.switchPoolsButton}
                style={{ fontWeight: interval === IntervalsKeys.Weekly ? 700 : 400 }}>
                {IntervalsKeys.Weekly}
              </ToggleButton>
              <ToggleButton
                value={IntervalsKeys.Monthly}
                disableRipple
                className={classes.switchPoolsButton}
                style={{ fontWeight: interval === IntervalsKeys.Monthly ? 700 : 400 }}>
                {IntervalsKeys.Monthly}
              </ToggleButton>
              <ToggleButton
                value={IntervalsKeys.Yearly}
                disableRipple
                className={classes.switchPoolsButton}
                style={{ fontWeight: interval === IntervalsKeys.Yearly ? 700 : 400 }}>
                {IntervalsKeys.Yearly}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Intervals
