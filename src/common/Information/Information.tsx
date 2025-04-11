import { Box, Collapse } from '@mui/material'
import useStyles from './style'
import icons from '@static/icons'
import { useEffect, useState } from 'react'

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
          src={icons.closeYellow}
          alt='Close'
          onClick={() => setIsOpen(false)}
        />
      </Box>
    </Collapse>
  )
}
