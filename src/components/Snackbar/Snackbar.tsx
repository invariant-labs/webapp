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
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <SnackbarProvider
      dense
      maxSnack={isSmall ? 5 : maxSnack}
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
