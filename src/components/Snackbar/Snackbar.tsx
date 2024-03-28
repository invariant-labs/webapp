import React from 'react'
import { SnackbarProvider } from 'notistack'
import { StyledMaterialDesignContent } from './style'
import { Color } from '@material-ui/lab/Alert'
import LoadingSnackbar from './LoadingSnackbar/LoadingSnackbar'
import { useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'

type ExtraVariants = 'pending'

export type SnackbarVariant = Color | ExtraVariants

declare module 'notistack' {
  interface VariantOverrides {
    pending: true
  }
}

interface ISnackbarProps {
  children: JSX.Element[]
  maxSnack: number
}

export const Snackbar: React.FC<ISnackbarProps> = ({ children, maxSnack }) => {
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <SnackbarProvider
      dense
      maxSnack={isExSmall ? 5 : maxSnack}
      anchorOrigin={
        isExSmall
          ? { vertical: 'top', horizontal: 'left' }
          : { vertical: 'bottom', horizontal: 'left' }
      }
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        pending: LoadingSnackbar
      }}>
      {children}
    </SnackbarProvider>
  )
}
export default Snackbar
