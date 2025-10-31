import React from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import { colors, typography } from '@static/theme'
import useStyles from './style'

export interface IProps {
  isLoadingStats: boolean
  name: string
  value: string | number
  isGreen?: boolean
  poolUnavailable: boolean
}

export const InfoItem: React.FC<IProps> = ({
  isLoadingStats,
  name,
  value,
  isGreen,
  poolUnavailable
}) => {
  const { classes, cx } = useStyles()

  return (
    <Box className={cx(classes.container, { [classes.green]: isGreen })}>
      <Box display='flex' alignItems='center' gap={'2px'}>
        <Typography
          style={typography.body1}
          color={isGreen ? colors.invariant.green : colors.invariant.textGrey}
          noWrap>
          {name}{' '}
        </Typography>
      </Box>
      {isLoadingStats ? (
        <Skeleton variant='rounded' height={20} width={80} animation='wave' />
      ) : (
        <Typography style={typography.body2} noWrap>
          {poolUnavailable ? '-' : value}
        </Typography>
      )}
    </Box>
  )
}

export default InfoItem
