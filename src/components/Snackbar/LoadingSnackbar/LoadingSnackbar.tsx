import { CustomContentProps, useSnackbar } from 'notistack'
import React, { useCallback } from 'react'
import icons from '@static/icons'
import { Box, Grid } from '@material-ui/core'
import {
  StyledCircularProgress,
  StyledCloseButton,
  StyledContainer,
  StyledSnackbarContent,
  StyledTitle
} from './style'

const LoadingSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message }, ref) => {
    const { closeSnackbar } = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    return (
      <StyledSnackbarContent ref={ref} role='alert'>
        <StyledContainer>
          <Grid container alignItems='center'>
            <Box ml={1}>
              <StyledCircularProgress size={13} />
            </Box>
            <StyledTitle>{message}</StyledTitle>
          </Grid>
          <StyledCloseButton onClick={handleDismiss}>
            <img src={icons.closeSmallIcon}></img>
          </StyledCloseButton>
        </StyledContainer>
      </StyledSnackbarContent>
    )
  }
)

export default LoadingSnackbar
