import React, { useCallback, useMemo } from 'react'
import { CustomContentProps, useSnackbar } from 'notistack'
import { actions } from '@store/reducers/snackbars'
import {
  StyledBackground,
  StyledCircularProgress,
  StyledCloseButton,
  StyledContainer,
  StyledDetails,
  StyledHideContainer,
  StyledIcon,
  StyledSnackbarContent,
  StyledTitle
} from './style'
import { Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import icons from '@static/icons'
import { colors } from '@static/theme'
import { NetworkType } from '@store/consts/static'

const variantColors: Record<string, string> = {
  default: '#000000',
  success: colors.invariant.green,
  error: colors.invariant.Error,
  warning: colors.invariant.warning,
  info: colors.invariant.blue
}

const CustomSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message, txid, variant = 'default', snackbarId, iconVariant, link, network }, ref) => {
    const { closeSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const handleDismiss = useCallback(() => {
      if (!snackbarId) return

      closeSnackbar(snackbarId)
      dispatch(actions.remove(snackbarId))
    }, [snackbarId, closeSnackbar])

    const icon = iconVariant[variant as keyof typeof iconVariant]
    const color = variantColors[variant] || variantColors.default

    const networkUrl = useMemo(() => {
      switch (network) {
        case NetworkType.Mainnet:
          return ''
        case NetworkType.Testnet:
          return '?cluster=testnet'
        case NetworkType.Devnet:
          return '?cluster=devnet'
        default:
          return '?cluster=testnet'
      }
    }, [network])

    const Content = () => {
      return (
        <>
          <Grid
            display='flex'
            alignItems='center'
            ml={2}
            flexDirection='row'
            style={{ width: 'fix-content', flexWrap: 'nowrap' }}>
            <Grid ml={1}>
              {variant === 'pending' ? (
                <StyledCircularProgress size={13} />
              ) : (
                <StyledIcon style={{ color }}>{icon}</StyledIcon>
              )}
            </Grid>
            <StyledTitle>{message}</StyledTitle>
          </Grid>
          {txid && (
            <Grid display='flex' mx={1} minWidth='fit-content'>
              <StyledDetails
                onClick={() => {
                  window.open(`https://solscan.io/tx/${txid.toString()}${networkUrl}`, '_blank')
                }}>
                Details
              </StyledDetails>
              <StyledCloseButton onClick={handleDismiss}>
                <img width={16} src={icons.closeIcon} alt='Close'></img>
              </StyledCloseButton>
            </Grid>
          )}
          {link && (
            <Grid display='flex' mx={1} minWidth='fit-content'>
              <StyledDetails
                onClick={() => {
                  window.open(link.href, '_blank')
                }}>
                {link.label}
              </StyledDetails>
              <StyledCloseButton onClick={handleDismiss}>
                <img width={16} src={icons.closeIcon} alt='Close'></img>
              </StyledCloseButton>
            </Grid>
          )}
        </>
      )
    }

    return (
      <StyledSnackbarContent ref={ref} role='alert'>
        <StyledBackground />
        <StyledHideContainer>
          <Content />
        </StyledHideContainer>
        <StyledContainer>
          <Content />
        </StyledContainer>
      </StyledSnackbarContent>
    )
  }
)

export default CustomSnackbar
