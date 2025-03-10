import React from 'react'
import { CustomContentProps, SnackbarProvider } from 'notistack'
import { theme } from '@static/theme'
import { useMediaQuery } from '@mui/material'
import CustomSnackbar from './CustomSnackbar/CustomSnackbar'
import { NetworkType } from '@store/consts/static'
import { Global } from '@emotion/react'

type ExtraVariants = 'pending'

export type SnackbarVariant = ExtraVariants

interface CustomProps {
  txid?: string
  snackbarId: string
  network?: NetworkType
  link?: {
    label: string
    href: string
  }
}

export interface SnackbarSnackbarProps extends CustomContentProps, CustomProps {}

declare module 'notistack' {
  interface VariantOverrides {
    pending: true
  }
  interface OptionsObject extends CustomProps {}
}

interface ISnackbarProps {
  children: React.ReactNode
  maxSnack?: number
}

const Snackbar: React.FC<ISnackbarProps> = ({ maxSnack = 3, children }) => {
  const isExSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isExSmall && (
        <Global
          styles={`
          .custom-snackbar-container {
            bottom: 90px !important;
            z-index: 100 !important; 
          }
        `}
        />
      )}
      <SnackbarProvider
        dense
        maxSnack={isExSmall ? 5 : maxSnack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        classes={isExSmall ? { containerAnchorOriginBottomLeft: 'custom-snackbar-container' } : {}}
        Components={{
          success: CustomSnackbar,
          error: CustomSnackbar,
          info: CustomSnackbar,
          warning: CustomSnackbar,
          pending: CustomSnackbar
        }}>
        {children}
      </SnackbarProvider>
    </>
  )
}

export default Snackbar
