import { Box, Skeleton, Typography } from '@mui/material'
import { useStyles } from './style'

type Props = {
  inRange: boolean
  isLoading: boolean
}

export const RangeIndicator = ({ inRange, isLoading }: Props) => {
  const { classes, cx } = useStyles()

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Skeleton variant='rounded' height={17} width={90} />
      ) : (
        <>
          <Box className={cx(classes.dot, { [classes.dotInRange]: inRange })} />
          <Typography className={cx(classes.text, { [classes.textInRange]: inRange })}>
            {inRange ? 'IN RANGE' : 'OUT OF RANGE'}
          </Typography>
        </>
      )}
    </Box>
  )
}
