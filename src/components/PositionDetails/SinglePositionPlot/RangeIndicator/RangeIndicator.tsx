import { Box, Typography } from '@mui/material'
import { useStyles } from './style'
import classNames from 'classnames'

type Props = {
  inRange: boolean
}

export const RangeIndicator = ({ inRange }: Props) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Box className={classNames(classes.dot, { [classes.dotInRange]: inRange })} />
      <Typography className={classNames(classes.text, { [classes.textInRange]: inRange })}>
        {inRange ? 'IN RANGE' : 'OUT OF RANGE'}
      </Typography>
    </Box>
  )
}
