import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useStyles } from './style'

interface IProps {
  icon: string
  title?: string
  isDisabled?: boolean
  onClick?: () => void
  smallerIcon?: boolean
}

const BoxValue: React.FC<IProps> = ({ title, icon, onClick, isDisabled, smallerIcon }) => {
  const { classes, cx } = useStyles()
  return (
    <Grid
      className={cx(classes.container, { [classes.disabled]: isDisabled })}
      flex={1}
      onClick={e => {
        e.stopPropagation()
        onClick?.()
      }}>
      <img
        src={icon}
        alt={title ?? ''}
        style={{ width: smallerIcon ? 12 : 20, height: smallerIcon ? 12 : 20 }}
      />
      {title && <Typography className={classes.title}>{title}</Typography>}
    </Grid>
  )
}

export default BoxValue
