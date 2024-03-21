import { CustomContentProps, useSnackbar } from 'notistack'
import React, { useCallback } from 'react'
import icons from '@static/icons'
import { Box, Grid } from '@material-ui/core'
import {
  StyledAdditionalMessage,
  StyledCircularProgress,
  StyledCloseButton,
  StyledSnackbarContent,
  StyledTitle
} from './style'

interface CustomProps {
  additionalMessage?: string
}

interface LoadingSnackbarProps extends CustomContentProps, CustomProps {}

declare module 'notistack' {
  interface OptionsObject extends CustomProps {}
}

const LoadingSnackbar = React.forwardRef<HTMLDivElement, LoadingSnackbarProps>(
  ({ id, message, additionalMessage }, ref) => {
    const { closeSnackbar } = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    return (
      <StyledSnackbarContent ref={ref} role='alert'>
        <Grid container justifyContent='space-between' alignItems='center'>
          <StyledTitle>{message}</StyledTitle>
          <StyledCloseButton onClick={handleDismiss}>
            <img src={icons.closeIcon}></img>
          </StyledCloseButton>
        </Grid>

        <Grid container alignItems='center'>
          {additionalMessage && (
            <StyledAdditionalMessage>{additionalMessage}</StyledAdditionalMessage>
          )}
          <Box ml={1}>
            <StyledCircularProgress size={10} />
          </Box>
        </Grid>
      </StyledSnackbarContent>
    )
  }
)

export default LoadingSnackbar
