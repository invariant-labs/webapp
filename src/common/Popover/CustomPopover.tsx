import { Popover, Box, PopoverProps } from '@mui/material'
import { useState } from 'react'
import useStyles from './style'
import GradientBorder from '@common/GradientBorder/GradientBorder'

interface CustomPopoverProps {
  children: React.ReactElement
  content: React.ReactNode
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
  fullSpan?: boolean
  gradient?: boolean
  increasePadding?: boolean
  maxWidth?: string | number
  centerOnScreen?: boolean
  textAlign?: 'left' | 'center' | 'right'
  popoverProps?: Partial<PopoverProps>
}
export const CustomPopover = ({
  children,
  content,
  top,
  left,
  right,
  bottom,
  fullSpan = false,
  increasePadding = false,
  maxWidth,
  centerOnScreen = false,
  textAlign = 'left',
  ...props
}: CustomPopoverProps) => {
  const { classes } = useStyles({
    top,
    left,
    right,
    bottom,
    fullSpan,
    increasePadding,
    maxWidth
  })

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (centerOnScreen) {
      setOpen(prev => !prev)
    } else {
      setAnchorEl(prev => (prev ? null : event.currentTarget))
      setOpen(prev => !prev)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <span onClick={handleClick} className={classes.tooltipSpan}>
        {children}
      </span>

      <Popover
        open={open}
        anchorEl={centerOnScreen ? null : anchorEl}
        onClose={handleClose}
        anchorReference={centerOnScreen ? 'anchorPosition' : 'anchorEl'}
        anchorPosition={
          centerOnScreen
            ? {
                top: window.innerHeight / 2,
                left: window.innerWidth / 2
              }
            : undefined
        }
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        slotProps={{
          paper: {
            className: classes.popover
          }
        }}
        {...props}>
        <Box maxWidth={'calc(100vw - 16px)'}>
          <GradientBorder borderRadius={12} borderWidth={1}>
            <Box
              textAlign={textAlign}
              className={classes.contentBox}
              onClick={e => {
                e.stopPropagation()
                setOpen(false)
              }}>
              {content}
            </Box>
          </GradientBorder>
        </Box>
      </Popover>
    </>
  )
}
