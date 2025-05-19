import useStyles from './style'
import PositionStatusTooltip from '../PositionStatusTooltip/PositionStatusTooltip'
import { TooltipHover } from '@common/TooltipHover/TooltipHover'

export interface IPromotedPoolPopover {
  isActive?: boolean
  isPromoted: boolean
  children: React.ReactElement<any, any>
}

export const InactivePoolsPopover = ({ isActive, isPromoted, children }: IPromotedPoolPopover) => {
  const { classes } = useStyles()

  return (
    <TooltipHover
      title={
        <div className={classes.container}>
          <PositionStatusTooltip isActive={isActive} isPromoted={isPromoted} />
        </div>
      }
      placement='bottom'
      increasePadding>
      {children}
    </TooltipHover>
  )
}
