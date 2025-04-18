import { Box, Collapse } from '@mui/material'
import useStyles from './style'
import { useEffect, useState } from 'react'
import { closeYellowIcon } from '@static/icons'

type Props = {
  children: React.ReactNode
  transitionTimeout?: number
  shouldOpen?: boolean
} & React.ComponentProps<typeof Box>

export const Information = ({ children, transitionTimeout, shouldOpen, ...boxProps }: Props) => {
  const { classes } = useStyles()

  const [isOpen, setIsOpen] = useState(shouldOpen !== undefined ? shouldOpen : true)

  useEffect(() => {
    if (shouldOpen !== undefined) {
      setIsOpen(shouldOpen)
    }
  }, [shouldOpen])

  return (
    <Collapse in={isOpen} timeout={transitionTimeout ? transitionTimeout : 0}>
      <Box className={classes.container} {...boxProps}>
        {children}
        <img
          className={classes.closeIcon}
          src={closeYellowIcon}
          alt='Close'
          onClick={() => setIsOpen(false)}
        />
      </Box>
    </Collapse>
  )
}
