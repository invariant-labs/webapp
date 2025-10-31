import React, { JSX } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useStyles } from './style'

interface IProps {
  title: string | JSX.Element
  value: string | number | JSX.Element
  minWidth?: number
  style?: React.CSSProperties
}

const ItemValue: React.FC<IProps> = ({ title, value, minWidth, style }) => {
  const { classes } = useStyles()
  return (
    <Grid flexBasis={minWidth} flexShrink={0.2} style={style} className={classes.container}>
      <Typography className={classes.title}>{title}</Typography>
      <Box className={classes.value}>{value}</Box>
    </Grid>
  )
}

export default ItemValue
