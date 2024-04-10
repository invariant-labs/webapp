import { CustomContentProps, useSnackbar } from 'notistack'
import React, { useCallback } from 'react'
import icons from '@static/icons'
import { Box, Grid } from '@material-ui/core'
import {
  StyledButton,
  StyledCircularProgress,
  StyledCloseButton,
  StyledContainer,
  StyledSnackbarContent,
  StyledTitle
} from './style'

interface CustomProps {
  txid?: string
  currentNetwork?: string
}

interface LoadingSnackbarProps extends CustomContentProps, CustomProps {}

declare module 'notistack' {
  interface OptionsObject extends CustomProps {}
}

const LoadingSnackbar = React.forwardRef<HTMLDivElement, LoadingSnackbarProps>(
  ({ id, message, txid, currentNetwork }, ref) => {
    const { closeSnackbar } = useSnackbar()

    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    return (
      <StyledSnackbarContent ref={ref} role='alert'>
        <StyledContainer>
          <StyledContainer>
            <Box ml={1}>
              <StyledCircularProgress size={13} />
            </Box>
            <Grid container justifyContent='space-between' alignItems='center'>
              <StyledTitle>{message}</StyledTitle>

              {txid && (
                <StyledButton
                  onClick={() => {
                    if (currentNetwork !== 'mainnet' && txid !== undefined && currentNetwork) {
                      window.open('https://solscan.io/tx/' + txid + '?cluster=' + currentNetwork)
                    } else if (
                      currentNetwork === 'mainnet' &&
                      txid !== undefined &&
                      currentNetwork
                    ) {
                      window.open('https://solscan.io/tx/' + txid)
                    }
                  }}>
                  <span>Details</span>
                </StyledButton>
              )}
            </Grid>
          </StyledContainer>
          <StyledCloseButton onClick={handleDismiss}>
            <img src={icons.closeSmallIcon}></img>
          </StyledCloseButton>
        </StyledContainer>
      </StyledSnackbarContent>
    )
  }
)

export default LoadingSnackbar
