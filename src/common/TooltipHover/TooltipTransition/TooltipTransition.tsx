import { Fade } from '@mui/material'
import { TransitionProps } from 'notistack'
import { useEffect, useState } from 'react'

export const TooltipTransition: React.FC<
  TransitionProps & {
    children?: React.ReactNode
  }
> = ({ children, ...props }) => {
  const [translate, setTranslate] = useState('translateY(50px)')

  useEffect(() => {
    setTranslate(props.in ? 'translateY(0)' : 'translateY(50px)')
  }, [props.in])

  const { ownerState: _ownerState, ...rest } = props as any

  return (
    <Fade {...rest}>
      <div>
        <div
          style={{
            transition: 'transform 300ms',
            transform: translate,
            pointerEvents: 'none'
          }}>
          {children}
        </div>
      </div>
    </Fade>
  )
}
