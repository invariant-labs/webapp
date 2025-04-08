import { Box, Skeleton, Typography } from '@mui/material'
import { useStyles } from './style'
import { formatNumberWithSuffix } from '@utils/utils'
import classNames from 'classnames'

type Props = {
  value: number
  pendingFees: number
  poolApr: number
  isLoading: boolean
}

export const PositionStats = ({ value, pendingFees, poolApr, isLoading }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classes.statWrapper}>
        <Box className={classes.statContainer}>
          <Typography className={classes.statName}>Value:</Typography>
          <Typography className={classes.statValue}>
            $
            {+formatNumberWithSuffix(value, true, 18) < 1000
              ? (+formatNumberWithSuffix(value, true, 18)).toFixed(2)
              : formatNumberWithSuffix(value)}
          </Typography>
        </Box>
        <Box className={classes.statContainer}>
          <Typography className={classes.statName}>Pending fees:</Typography>
          {isLoading ? (
            <Skeleton variant='rounded' width={38} height={17} />
          ) : (
            <Typography className={classes.statValue}>
              $
              {+formatNumberWithSuffix(pendingFees, true, 18) < 1000
                ? (+formatNumberWithSuffix(pendingFees, true, 18)).toFixed(2) === '0.00'
                  ? '<0.01'
                  : (+formatNumberWithSuffix(pendingFees, true, 18)).toFixed(2)
                : formatNumberWithSuffix(pendingFees)}
            </Typography>
          )}
        </Box>
      </Box>
      <Box className={classes.statWrapper}>
        <Box className={classNames(classes.statContainer, classes.statContainerHiglight)}>
          <Typography className={classes.statName}>Pool APR:</Typography>
          <Typography className={classNames(classes.statValue, classes.statValueHiglight)}>
            {poolApr.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
