import React from 'react'
import { Button, ClickAwayListener, Popover, Typography } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
export interface IProps {
  name: string
  disabled?: boolean
}
export const HeaderButton: React.FC<IProps> = ({ name, disabled = false }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpen(true)
  }

  const handleClose = () => {
    if (!open) return
    unblurContent()
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <>
        <Button
          className={classes.headerButton}
          variant='contained'
          classes={{ disabled: classes.disabled }}
          disabled={disabled}
          onClick={handleClick}>
          {name}
        </Button>
        <Popover
          classes={{ paper: classes.paper }}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          {' '}
          <Typography variant='h2'>Sample Popover Text</Typography>
        </Popover>
      </>
    </ClickAwayListener>
  )
}
export default HeaderButton
