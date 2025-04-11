import { Box, Tooltip, TooltipProps } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'
import React, { useEffect, useState } from 'react'

interface Props extends TooltipProps {
  top?: number
  children: React.ReactElement<any, any>
  title: React.ReactNode
  noGradient?: boolean
}

export const TooltipGradient = ({ top, children, noGradient, title, ...props }: Props) => {
  const { classes } = useStyles({ top })
  const [open, setOpen] = useState(false)
  const [childrenHover, setChildrenHover] = useState(false)
  const [titleHover, setTitleHover] = useState(false)
  const [callback, setCallback] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if (titleHover || childrenHover) {
      clearTimeout(callback)
      setOpen(true)
    } else {
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 200)
      setCallback(timeout)
    }
  }, [titleHover, childrenHover])

  return (
    <Tooltip
      classes={{ tooltip: noGradient ? classes.tooltipNoGradient : classes.tooltipGradient }}
      placement='bottom'
      TransitionComponent={TooltipTransition}
      enterTouchDelay={0}
      leaveTouchDelay={Number.MAX_SAFE_INTEGER}
      onTouchStart={() => setOpen(true)}
      onMouseEnter={() => setChildrenHover(true)}
      onMouseLeave={() => setChildrenHover(false)}
      open={open}
      title={
        <Box onMouseEnter={() => setTitleHover(true)} onMouseLeave={() => setTitleHover(false)}>
          {title}
        </Box>
      }
      {...props}>
      {children}
    </Tooltip>
  )
}
