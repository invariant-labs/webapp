import useStyles from './style'
import { Popover } from '@mui/material'
import PositionStatusTooltip from '../PositionStatusTooltip/PositionStatusTooltip'

export interface IPromotedPoolPopover {
  open: boolean
  anchorEl: HTMLElement | null
  onClose: () => void

  isActive?: boolean
  isPromoted: boolean
}

export const InactivePoolsPopover = ({
  open,
  onClose,
  anchorEl,
  isActive,
  isPromoted
}: IPromotedPoolPopover) => {
  const { classes } = useStyles()

  if (!anchorEl) return null

  return (
    <Popover
      onClick={e => e.stopPropagation()}
      open={open}
      anchorEl={anchorEl}
      className='promoted-pool-inactive-popover'
      classes={{
        paper: classes.paper,
        root: classes.popover
      }}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      disableRestoreFocus
      slotProps={{
        paper: {
          onMouseLeave: onClose
        }
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      marginThreshold={16}>
      <div className={classes.root}>
        <div className={classes.container}>
          <PositionStatusTooltip isActive={isActive} isPromoted={isPromoted} />
        </div>
      </div>
    </Popover>
  )
}
