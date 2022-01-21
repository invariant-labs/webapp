import React from 'react'
import { Box, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  itemLabel: string
  estimateExact: string
  element: JSX.Element
}
export const ListEstimate: React.FC<IProps> = ({ itemLabel, estimateExact, element }) => {
  const classes = useStyles()
  return (
    <>
      <Typography className={classes.statsListItemLabel}>{itemLabel}</Typography>
      <Box className={classes.statsListItemEstimate}>
        {element}
        <Typography className={classes.statsListItemEstimateExact}>{estimateExact}</Typography>
      </Box>
    </>
  )
}
