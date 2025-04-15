import { Tooltip, TooltipProps, useMediaQuery } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'
import { theme } from '@static/theme'

interface Props extends TooltipProps {
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  children: React.ReactElement<any, any>
  removeOnMobile?: boolean
}

export const TooltipHover = ({
  top,
  left,
  right,
  bottom,
  removeOnMobile = false,
  fullSpan,
  children,
  ...props
}: Props) => {
  const { classes } = useStyles({ top, left, right, bottom, fullSpan })

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (removeOnMobile && isMobile) {
    return children
  }
  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      placement='top'
      TransitionComponent={TooltipTransition}
      enterTouchDelay={0}
      {...props}>
      <span className={classes.tooltipSpan}>{children}</span>
    </Tooltip>
  )
}
