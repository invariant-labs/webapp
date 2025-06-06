import { Box, Tooltip, TooltipProps, useMediaQuery } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'
import { useEffect, useRef, useState } from 'react'
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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    if (isMobile) return

    if (titleHover || childrenHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (!open) setOpen(true)
    } else {
      timeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 100)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [titleHover, childrenHover, isMobile, open])

  useEffect(() => {
    if (isMobile && open) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setOpen(false)
      }, 2000)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [open, isMobile])

  useEffect(() => {
    if (!allowEnterTooltip) {
      setOpen(false)
    }
  }, [allowEnterTooltip])

  if (!title) return children

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
        onMouseEnter={() => {
          if (allowEnterTooltip && !isMobile) {
            setChildrenHover(true)
            setOpen(true)
          }
        }}
        onMouseDown={() => {
          if (allowEnterTooltip && isMobile) {
            setChildrenHover(true)
            setOpen(true)
          }
        }}
        onMouseLeave={() => setChildrenHover(false)}
        onFocus={allowEnterTooltip ? () => setChildrenHover(true) : undefined}
        onBlur={() => {
          setChildrenHover(false)
          setOpen(false)
        }}>
        {children}
      </span>
    </Tooltip>
  )
}
