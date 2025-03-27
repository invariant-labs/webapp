import { Fade } from '@mui/material'
import { TransitionProps } from 'notistack'
import { useEffect, useState } from 'react'
import useStyles from './style'

export const TooltipTransition: React.FC<
  TransitionProps & {
    children?: React.ReactNode
  }
> = ({ children, ...props }) => {
  const [translate, setTranslate] = useState('translateY(50px)')
  const { classes } = useStyles({ translate })
  useEffect(() => {
    setTranslate(props.in ? 'translateY(0)' : 'translateY(50px)')
  }, [props.in])

  return (
    <Fade {...props}>
      <div>
        <div className={classes.wrapper}>{children}</div>
      </div>
    </Fade>
  )
}
