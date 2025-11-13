import { Box } from '@mui/system'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import useStyles from './style'

interface SwitcherProps<T> {
  value: T
  options: T[]
  onChange: (value: T) => void
  dark?: boolean
  fullWidth?: boolean
  itemWidth?: number
}

function Switcher<T extends string>({
  value,
  options,
  onChange,
  dark,
  fullWidth,
  itemWidth
}: SwitcherProps<T>) {
  const { classes } = useStyles({ value, dark, fullWidth, itemWidth })

  const handleChange = (_: any, newValue: T | null) => {
    if (newValue !== null) onChange(newValue)
  }

  const selectedIndex = options.findIndex(option => option === value)

  return (
    <Box className={classes.mainWrapper}>
      <Box className={classes.switchWrapper}>
        <Box className={classes.container}>
          <Box className={classes.switchPoolsContainer}>
            <Box
              className={classes.switchPoolsMarker}
              style={{
                width: `calc(100% / ${options.length})`,
                transform: `translateX(${selectedIndex * 100}%)`
              }}
            />
            <ToggleButtonGroup
              value={value}
              exclusive
              onChange={handleChange}
              className={classes.switchPoolsButtonsGroup}>
              {options.map(option => (
                <ToggleButton
                  key={option}
                  value={option}
                  disableRipple
                  className={classes.switchPoolsButton}
                  style={{ fontWeight: value === option ? 700 : 400 }}>
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Switcher
