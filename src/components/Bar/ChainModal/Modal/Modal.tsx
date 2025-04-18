import { blurContent, unblurContent } from '@utils/uiUtils'
import { useRef, useState } from 'react'
import { useStyles } from './style'
import { Box, Popover, Typography } from '@mui/material'
import { BarButton } from '@components/Bar/BarButton/BarButton'
import { closeSmallIcon } from '@static/icons'

type Props = {
  icon: React.ReactNode
  title?: string
  showTitle?: boolean
  children?: React.ReactNode
}

export const Modal = ({ icon, title, showTitle, children }: Props) => {
  const { classes } = useStyles()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const handleOpen = () => {
    setOpen(true)
    blurContent()
  }

  const handleClose = () => {
    setOpen(false)
    unblurContent()
  }

  return (
    <>
      <BarButton ref={ref} onClick={() => handleOpen()}>
        {icon}
      </BarButton>
      <Popover
        classes={{ paper: classes.popover }}
        open={open}
        anchorEl={ref.current}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <Box className={classes.popoverContainer}>
          {showTitle && (
            <Box className={classes.popoverHeader}>
              <Typography className={classes.title}>{title}</Typography>
              <Box className={classes.closeIconContainer} onClick={() => handleClose()}>
                <img className={classes.closeIcon} src={closeSmallIcon} alt='Close icon' />
              </Box>
            </Box>
          )}
          {children}
        </Box>
      </Popover>
    </>
  )
}
