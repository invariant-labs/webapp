import { useRef } from 'react'
import { BarButton } from '../BarButton/BarButton'
import { useStyles } from './style'
import { Box, Popover, Typography } from '@mui/material'
import { closeSmallIcon } from '@static/icons'

type Props = {
  icon: React.ReactNode
  title?: string
  showTitle?: boolean
  children?: React.ReactNode
  open: boolean
  onOpen: () => void
  onClose: () => void
  width?: number
}

export const Modal = ({
  icon,
  title,
  showTitle,
  children,
  open,
  onOpen,
  onClose,
  width = 240
}: Props) => {
  const { classes } = useStyles({ width })

  const ref = useRef<HTMLButtonElement>(null)

  return (
    <>
      <BarButton ref={ref} onClick={() => onOpen()}>
        {icon}
      </BarButton>
      <Popover
        classes={{ paper: classes.popover }}
        open={open}
        anchorEl={ref.current}
        onClose={() => onClose()}
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
              <Box className={classes.closeIconContainer} onClick={() => onClose()}>
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
