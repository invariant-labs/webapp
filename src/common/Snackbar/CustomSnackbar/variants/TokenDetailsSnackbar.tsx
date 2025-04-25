import { Box, Grid } from '@mui/material'
import { StyledCloseButton, StyledText, useStyles } from '../style'
import { TokensDetailsProps } from '@common/Snackbar'
import {
  circleDolarIcon,
  closeIcon,
  depositIcon,
  snackbarSwapIcon,
  withdrawIcon
} from '@static/icons'
import { colors } from '@static/theme'
import { Separator } from '@common/Separator/Separator'
import { useMemo } from 'react'

interface ITokensDetailsSnackbar extends TokensDetailsProps {
  handleDismiss: () => void
}
const TokensDetailsSnackbar: React.FC<ITokensDetailsSnackbar> = ({
  ikonType,
  tokenXAmount,
  tokenYAmount,
  tokenXIcon,
  tokenYIcon,
  handleDismiss,
  tokenXAmountAutoSwap,
  tokenYAmountAutoSwap,
  tokenXIconAutoSwap,
  tokenYIconAutoSwap
}) => {
  const { classes } = useStyles()

  const icon = useMemo(() => {
    switch (ikonType) {
      case 'swap':
        return snackbarSwapIcon
      case 'deposit':
        return depositIcon
      case 'withdraw':
        return withdrawIcon
      case 'claim':
        return circleDolarIcon
      default:
        return ''
    }
  }, [ikonType])

  const title = useMemo(() => {
    switch (ikonType) {
      case 'swap':
        return 'Swapped'
      case 'deposit':
        return 'Deposited'
      case 'withdraw':
        return 'Withdrawn'
      case 'claim':
        return 'Claimed'
      default:
        return ''
    }
  }, [ikonType])

  return (
    <>
      <Box
        className={classes.customSnackbarWrapper}
        paddingTop={tokenXAmountAutoSwap ? '8px' : '0'}>
        <Grid display='flex' flexDirection='column' flex={1} ml={1} gap={0.7}>
          {tokenXIconAutoSwap && tokenYAmountAutoSwap && (
            <>
              <Grid>
                <Grid className={classes.wrapper} gap={0.5}>
                  <Grid position='relative' display='flex' alignItems='center' width={22}>
                    <img src={snackbarSwapIcon} height={15} style={{ marginBottom: '2px' }} />
                  </Grid>
                  <StyledText>Swapped</StyledText>
                  <StyledText color={colors.invariant.green}>{tokenXAmountAutoSwap}</StyledText>
                  <img src={tokenXIconAutoSwap} className={classes.tokenIcon} />
                  <StyledText mb={0.5}>
                    <span style={{ fontSize: 30, display: 'flex' }}>→</span>
                  </StyledText>
                  <StyledText color={colors.invariant.green}>{tokenYAmountAutoSwap}</StyledText>
                  <img src={tokenYIconAutoSwap} className={classes.tokenIcon} />
                </Grid>
              </Grid>
              <Separator color={colors.invariant.light} isHorizontal margin='0px 8px 0px 20px' />
            </>
          )}
          <Grid className={classes.wrapper} gap={0.5}>
            <Grid
              position='relative'
              display='flex'
              alignItems='center'
              width={ikonType === 'swap' || ikonType === 'claim' ? 18 : 22}>
              <img
                src={icon}
                height={ikonType === 'swap' || ikonType === 'claim' ? 15 : 18}
                style={{ marginBottom: '2px' }}
              />
            </Grid>
            <StyledText>{title}</StyledText>
            <StyledText color={colors.invariant.green}>{tokenXAmount}</StyledText>
            <img src={tokenXIcon} className={classes.tokenIcon} />
            <StyledText mb={ikonType === 'swap' ? 0.5 : ''}>
              {ikonType === 'swap' ? <span style={{ fontSize: 30, display: 'flex' }}>→</span> : '+'}
            </StyledText>
            <StyledText color={colors.invariant.green}>{tokenYAmount}</StyledText>
            <img src={tokenYIcon} className={classes.tokenIcon} />
          </Grid>
        </Grid>
        <Grid className={classes.txWrapper}>
          <StyledCloseButton onClick={handleDismiss}>
            <img width={16} src={closeIcon} alt='Close' />
          </StyledCloseButton>
        </Grid>
      </Box>
    </>
  )
}

export default TokensDetailsSnackbar
