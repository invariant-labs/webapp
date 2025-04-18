import { Box, Skeleton, Typography } from '@mui/material'
import { useStyles } from './style'
import classNames from 'classnames'

type Props = {
  inRange: boolean
  isLoading: boolean
}

export const RangeIndicator = ({ inRange, isLoading }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Skeleton variant='rounded' height={17} width={90} />
      ) : (
        <>
          <Box className={classNames(classes.dot, { [classes.dotInRange]: inRange })} />
          <Typography className={classNames(classes.text, { [classes.textInRange]: inRange })}>
            {inRange ? 'IN RANGE' : 'OUT OF RANGE'}
          </Typography>
        </>
      )}
    </Box>
  )
}
