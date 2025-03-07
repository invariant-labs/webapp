import { Button } from '@mui/material'
import { useStyles } from './style'
import { forwardRef, Ref } from 'react'

type Props = {
  children?: React.ReactNode
  onClick?: () => void
}

export const BarButton = forwardRef(
  ({ children, onClick = () => {} }: Props, ref: Ref<HTMLButtonElement>) => {
    const { classes } = useStyles()

    return (
      <Button className={classes.headerButton} ref={ref} onClick={() => onClick()}>
        {children}
      </Button>
    )
  }
)
