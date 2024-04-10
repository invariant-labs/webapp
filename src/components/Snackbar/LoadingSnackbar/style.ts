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
  maxWidth: 330,
  width: 330,
  padding: '7px 16px',
  minWidth: 100,
  ...typography.body2,

  boxShadow:
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',

  '& .MuiCircularProgress-colorPrimary': {
    color: colors.invariant.textGrey
  },

  [theme.breakpoints.down('xs')]: {
    maxWidth: 'none',
    width: 'auto'
  }
}))

export const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: 1,
  '& div > div': {
    margin: 0
  }
})

export const StyledTitle = styled(Typography)({
  marginLeft: 8,
  color: colors.invariant.text,
  ...typography.body2
})

export const StyledCloseButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
  width: 'fit-content',
  cursor: 'pointer',
  margin: 0,
  '&:hover': {
    '& img': {
      transition: '.2s all ease-in',
      transform: 'scale(1.2)'
    }
  }
})

export const StyledCircularProgress = styled(CircularProgress)({
  color: colors.invariant.textGrey,
  display: 'flex',
  alignItems: 'center',

  '& SVG': {
    width: 13,
    height: 13
  }
})

export const StyledButton = styled('button')(({ theme }) => ({
  height: 30,
  backgroundColor: 'transparent',
  textTransform: 'uppercase',
  borderRadius: 6,
  border: 'none',
  color: colors.invariant.textGrey,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.2s all cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  backfaceVisibility: 'hidden',
  fontSmoothing: 'subpixel-antialiased',
  padding: '0 4px',
  '&:hover': {
    transform: 'scale(1.15) translateY(0px)'
  },
  [theme.breakpoints.down('xs')]: {
    width: 36,
    height: 16,
    fontSize: 9,
    lineHeight: '14px',
    marginTop: 2,
    marginRight: 8,
    paddingBottom: 17,
    paddingRight: 36
  }
}))
