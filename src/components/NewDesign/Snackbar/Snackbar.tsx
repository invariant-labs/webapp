import React from 'react'
import { SnackbarProvider } from 'notistack'
import useStyles from './style'

interface ISnackbarProps {
  children: JSX.Element[]
  maxSnack: number
}
export const Snackbar: React.FC<ISnackbarProps> = ({ children, maxSnack }) => {
  const classes = useStyles()

  return (
    <SnackbarProvider
      maxSnack={maxSnack}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info
      }}
      autoHideDuration={9999999999}
    >
      {children}
    </SnackbarProvider>

  )
}
export default Snackbar
