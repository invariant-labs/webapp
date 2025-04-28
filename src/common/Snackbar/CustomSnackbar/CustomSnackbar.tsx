import React, { useCallback, useMemo } from 'react'
import { CustomContentProps, useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material'

import { actions } from '@store/reducers/snackbars'
import { NetworkType } from '@store/consts/static'
import { colors } from '@static/theme'
import { closeIcon, newTabIcon } from '@static/icons'

import {
  StyledBackground,
  StyledCircularProgress,
  StyledCloseButton,
  StyledContainer,
  StyledDetails,
  StyledHideContainer,
  StyledIcon,
  StyledSnackbarContent,
  StyledTitle,
  useStyles
} from './style'
import { TokensDetailsProps } from '@common/Snackbar/index'
import TokensDetailsSnackbar from './variants/TokenDetailsSnackbar'

const variantColors: Record<string, string> = {
  default: '#000000',
  success: colors.invariant.green,
  error: colors.invariant.Error,
  warning: colors.invariant.warning,
  info: colors.invariant.blue
}

export interface CustomProps {
  txid?: string
  snackbarId: string
  network?: NetworkType
  link?: { label: string; href: string }
  iconVariant: Record<string, React.ReactNode>
  tokensDetails?: TokensDetailsProps
}

const CustomSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps & CustomProps>(
  (props, ref) => {
    const {
      message,
      txid,
      variant = 'default',
      snackbarId,
      iconVariant,
      link,
      network,
      className,
      tokensDetails,
      style,
      id,
      ...rest
    } = props

    const domId = id !== undefined ? String(id) : undefined

    const { closeSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { classes } = useStyles()

    const handleDismiss = useCallback(() => {
      if (!snackbarId) return
      closeSnackbar(snackbarId)
      dispatch(actions.remove(snackbarId))
    }, [snackbarId, closeSnackbar, dispatch])

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

    const borderColor = useMemo(() => {
      switch (variant) {
        case 'error':
          return colors.invariant.Error
        case 'warning':
          return colors.invariant.warning
        default:
          return `linear-gradient(to right, ${colors.invariant.green}, ${colors.invariant.pink})`
      }
    }, [variant])

    const StandardContent = () => (
      <>
        <Grid className={classes.wrapper}>
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
          <Grid className={classes.txWrapper}>
            <StyledDetails
              onClick={() =>
                window.open(`https://solscan.io/tx/${txid.toString()}${networkUrl}`, '_blank')
              }>
              Details
              <img alt='new tab' src={newTabIcon} />
            </StyledDetails>
            <StyledCloseButton onClick={handleDismiss}>
              <img width={16} src={closeIcon} alt='Close' />
            </StyledCloseButton>
          </Grid>
        )}

        {link && (
          <Grid className={classes.txWrapper}>
            <StyledDetails onClick={() => window.open(link.href, '_blank')}>
              {link.label}
              <img alt='new tab' src={newTabIcon} />
            </StyledDetails>
            <StyledCloseButton onClick={handleDismiss}>
              <img width={16} src={closeIcon} alt='Close' />
            </StyledCloseButton>
          </Grid>
        )}

        {!link && !txid && (
          <Grid className={classes.txWrapper}>
            <StyledCloseButton onClick={handleDismiss}>
              <img width={16} src={closeIcon} alt='Close' />
            </StyledCloseButton>
          </Grid>
        )}
      </>
    )

    const Content = () =>
      variant === 'default' && tokensDetails ? (
        <TokensDetailsSnackbar {...tokensDetails} handleDismiss={handleDismiss} />
      ) : (
        <StandardContent />
      )

    return (
      <StyledSnackbarContent
        ref={ref}
        role='alert'
        id={domId}
        style={style}
        className={className}
        {...rest}>
        <StyledBackground borderColor={borderColor} />
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

CustomSnackbar.displayName = 'CustomSnackbar'
export default CustomSnackbar
