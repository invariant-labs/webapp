import React, { useState } from 'react'
import { Box, Button, Grid, Popover, Typography } from '@mui/material'
import { arrowDownIcon, arrowUpIcon, dropdownIcon, dropdownReverseIcon } from '@static/icons'
import { colors, typography } from '@static/theme'
import { useStyles } from './style'

export interface SortGroup<T> {
  label: string
  asc: T
  desc: T
}

interface Props<T> {
  currentSort: T
  onSelect: (value: T) => void
  sortGroups: SortGroup<T>[]
  fullWidth?: boolean
}

const SortTypeSelector = <T extends number>({
  currentSort,
  onSelect,
  sortGroups,
  fullWidth
}: Props<T>) => {
  const { classes, cx } = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (option: T) => {
    onSelect(option)
    handleClose()
  }

  const currentLabel = sortGroups.find(
    group => group.asc === currentSort || group.desc === currentSort
  )?.label

  return (
    <Box display='flex' flexGrow={fullWidth ? 1 : 'initial'}>
      <Button onClick={handleClick} className={classes.selectButton}>
        <Box display='flex' gap={1}>
          <Typography sx={typography.body2} color={colors.invariant.textGrey}>
            Sort by:
          </Typography>
          <Typography
            sx={typography.body1}
            color={colors.invariant.text}
            display='flex'
            alignItems='center'>
            {currentLabel} <img src={currentSort % 2 === 0 ? arrowUpIcon : arrowDownIcon} />
          </Typography>
        </Box>
        <img src={open ? dropdownReverseIcon : dropdownIcon} alt='' />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        classes={{ paper: classes.paper }}>
        <Grid className={classes.root}>
          {sortGroups.map(group => (
            <Grid
              key={group.label}
              display='flex'
              width='100%'
              justifyContent='center'
              alignItems='center'
              gap={1}>
              <Typography flex={1}>{group.label}</Typography>

              <button
                className={cx(classes.optionButton, {
                  [classes.active]: currentSort === group.asc
                })}
                onClick={() => handleSelect(group.asc)}>
                <img src={arrowUpIcon} alt='sort ascending' />
              </button>

              <button
                className={cx(classes.optionButton, {
                  [classes.active]: currentSort === group.desc
                })}
                onClick={() => handleSelect(group.desc)}>
                <img src={arrowDownIcon} alt='sort descending' />
              </button>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </Box>
  )
}

export default SortTypeSelector
