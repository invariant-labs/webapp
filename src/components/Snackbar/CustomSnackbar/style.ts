import { CircularProgress, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { colors, typography } from '@static/theme'
import { SnackbarContent } from 'notistack'

export const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  maxWidth: 330,
  width: 330,
  padding: '7px 16px',
  minWidth: 100,
  background: colors.invariant.component,
  borderRadius: 15,
  ...typography.body2,
  marginBottom: 5,
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.2) 0px 6px 10px 0px, rgba(0, 0, 0, 0.2) 0px 1px 18px 0px',
  '& .MuiCircularProgress-colorPrimary': {
    color: colors.invariant.textGrey
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: 'calc(100vw - 64px)',
    width: 'auto'
  }
}))

export const StyledBackground = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: 0,
  top: 2,
  transition: 'opacity 1s ease-in',
  background: `linear-gradient(to right, ${colors.invariant.green}, ${colors.invariant.pink})`,
  borderRadius: 17
})

export const StyledHideContainer = styled('div')({
  visibility: 'hidden',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  minHeight: 30,
  '& div > div': {
    margin: 0
  }
})

export const StyledContainer = styled('div')({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.invariant.component,
  borderRadius: 15,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  minHeight: 30,

  '& div > div': {
    margin: 0
  }
})

export const StyledTitle = styled(Typography)({
  wordWrap: 'break-word',
  marginLeft: 8,
  width: `calc(100% - 8px)`,
  color: colors.invariant.text,
  ...typography.body2
})

export const StyledCircularProgress = styled(CircularProgress)({
  color: colors.invariant.textGrey,
  display: 'flex',
  alignItems: 'center',

  '& SVG': {
    width: 13,
    height: 13,
    minWidth: 13
  }
})

export const StyledCloseButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  cursor: 'pointer',
  '&:hover': {
    '& img': {
      transition: '.2s all ease-in',
      transform: 'scale(1.2)',
      '@media (hover: none)': {
        transform: 'none'
      }
    }
  }
})

export const StyledIcon = styled('div')({
  display: 'flex',
  '& svg': {
    maxWidth: 16,
    margin: 0,
    marginInlineEnd: '0 !important'
  }
})

export const StyledDetails = styled('button')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  gap: 4,
  textTransform: 'uppercase',
  borderRadius: 6,
  border: 'none',
  color: colors.invariant.textGrey,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.3s all cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  backfaceVisibility: 'hidden',
  fontSmoothing: 'subpixel-antialiased',
  width: 'auto',
  textWrap: 'nowrap',
  '&:hover': {
    transform: 'scale(1.15) translateY(0px)',
    '@media (hover: none)': {
      transform: 'none'
    }
  },
  '& img': {
    width: 10
  }
})
