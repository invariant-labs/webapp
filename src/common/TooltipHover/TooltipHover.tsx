import { Tooltip, TooltipProps } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'

interface Props extends TooltipProps {
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  children: React.ReactElement<any, any>
}

export const TooltipHover = ({ top, left, right, bottom, fullSpan, children, ...props }: Props) => {
  const { classes } = useStyles({ top, left, right, bottom, fullSpan })

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
