import { colors, typography } from '@static/theme'
import { CircularProgress, styled, Typography } from '@material-ui/core'
import { SnackbarContent } from 'notistack'

export const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.invariant.component,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: colors.invariant.component,
  borderRadius: 10,
  ...typography.body2,
  maxWidth: 350,
  width: 350,
  padding: 10,
  minWidth: 100,

  '& .MuiCircularProgress-colorPrimary': {
    color: colors.invariant.textGrey
  },

  [theme.breakpoints.down('xs')]: {
    maxWidth: 255,
    maxHeight: 32,
    padding: '0px 8px 5px 4px'
  }
}))

export const StyledTitle = styled(Typography)({
  color: colors.invariant.text
})

export const StyledAdditionalMessage = styled(Typography)({
  color: colors.invariant.textGrey,
  ...typography.caption2
})

export const StyledCloseButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
  width: 'fit-content',
  '& img': {
    width: 16,
    transition: '.2s all ease-in',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
})

export const StyledCircularProgress = styled(CircularProgress)({
  color: colors.invariant.textGrey,
  marginTop: 6
})
