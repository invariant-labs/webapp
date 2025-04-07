import useStyles from './style'
import PositionStatusTooltip from '../PositionStatusTooltip/PositionStatusTooltip'
import { TooltipInv } from '@common/TooltipHover/TooltipInv'

export interface IPromotedPoolPopover {
  isActive?: boolean
  isPromoted: boolean
  children: React.ReactElement<any, any>
}

export const InactivePoolsPopover = ({ isActive, isPromoted, children }: IPromotedPoolPopover) => {
  const { classes } = useStyles()

  return (
    <TooltipInv
      title={
        <div className={classes.container}>
          <PositionStatusTooltip isActive={isActive} isPromoted={isPromoted} />
        </div>
      }
      placement='bottom'
      top={1}>
      {children}
    </TooltipInv>
  )
}
