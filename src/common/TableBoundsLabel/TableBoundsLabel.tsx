import { Box, Typography, useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

interface ITableBoundsLabel {
  lowerBound: number
  totalItems: number
  upperBound: number
  children: React.JSX.Element
  borderTop?: boolean
}

export const TableBoundsLabel: React.FC<ITableBoundsLabel> = ({
  totalItems,
  lowerBound,
  children,
  upperBound,
  borderTop = true
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { classes } = useStyles({ isMobile, borderTop })

  return (
    <Box className={classes.pagination}>
      {children}
      <Typography className={classes.labelText}>
        Showing {lowerBound}-{upperBound} of {totalItems}
      </Typography>
    </Box>
  )
}
