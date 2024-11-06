import { Tooltip } from '@mui/material'
import useStyles from './style'
import { TooltipTransition } from './TooltipTransition/TooltipTransition'

type Props = {
  text: string
  top?: number
  children: React.ReactElement<any, any>
}

export const TooltipHover = ({ text, top, children }: Props) => {
  const { classes } = useStyles({ top })

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={text}
      placement='top'
      TransitionComponent={TooltipTransition}>
      {children}
    </Tooltip>
  )
}
