import { Box, Tooltip, TooltipProps, useMediaQuery } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'
import { useEffect, useState } from 'react'
import { theme } from '@static/theme'
import useIsMobile from '@store/hooks/isMobile'

interface Props extends TooltipProps {
  title: React.ReactNode
  children: React.ReactElement<any, any>
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  removeOnMobile?: boolean
  gradient?: boolean
  increasePadding?: boolean
  allowEnterTooltip?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

export const TooltipHover = ({
  children,
  top,
  left,
  right,
  bottom,
  fullSpan = false,
  gradient = false,
  increasePadding = false,
  allowEnterTooltip = true,
  title,
  textAlign = 'left',
  ...props
}: Props) => {
  const { classes } = useStyles({ top, left, right, bottom, fullSpan, increasePadding })
  const [open, setOpen] = useState(false)
  const [childrenHover, setChildrenHover] = useState(false)
  const [titleHover, setTitleHover] = useState(false)
  const [callback, setCallback] = useState<NodeJS.Timeout | null>(null)
  const isClosingOnScroll = useMediaQuery(theme.breakpoints.down(1200))
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false)
      setChildrenHover(false)
      setTitleHover(false)
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isClosingOnScroll])

  useEffect(() => {
    if (isMobile) {
      return
    }
    if (titleHover || childrenHover) {
      if (callback) clearTimeout(callback)
      setOpen(true)
    } else {
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 100)
      setCallback(timeout)
    }

    return () => {
      if (callback) clearTimeout(callback)
    }
  }, [titleHover, childrenHover, 100])

  useEffect(() => {
    if (isMobile && open) {
      if (callback) clearTimeout(callback)
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 2000)
      setCallback(timeout)
    }

    return () => {
      if (callback) clearTimeout(callback)
    }
  }, [open, isMobile])

  return (
    <Tooltip
      classes={{ tooltip: gradient ? classes.tooltipGradient : classes.tooltipNoGradient }}
      placement='top'
      TransitionComponent={TooltipTransition}
      enterTouchDelay={0}
      leaveTouchDelay={Number.MAX_SAFE_INTEGER}
      open={open}
      title={
        <Box
          maxWidth={300}
          onMouseEnter={allowEnterTooltip ? () => setTitleHover(true) : undefined}
          onMouseLeave={allowEnterTooltip ? () => setTitleHover(false) : undefined}
          textAlign={textAlign}>
          {title}
        </Box>
      }
      {...props}>
      <span
        className={classes.tooltipSpan}
        onClick={e => {
          if (isMobile) {
            e.stopPropagation()
            setOpen(true)
          }
        }}
        onMouseEnter={() => setChildrenHover(true)}
        onMouseLeave={() => setChildrenHover(false)}
        onFocus={() => setChildrenHover(true)}
        onBlur={() => setChildrenHover(false)}>
        {children}
      </span>
    </Tooltip>
  )
}
