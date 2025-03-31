import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: colors.invariant.component,
      width: 480,
      borderRadius: 24,
      padding: '20px 24px',
      maxWidth: '100%',

      [theme.breakpoints.down('sm')]: {
        padding: '20px 16px '
      }
    },
    popover: {
      marginTop: 'max(calc(50vh - 350px), 20px)',
      marginLeft: 'calc(50vw - 241px)',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        marginLeft: 'auto',
        justifyContent: 'center'
      }
    },
    paper: {
      background: 'transparent',
      boxShadow: 'none'
    },
    inputWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'nowrap'
    },
    upperRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      marginBottom: 20,
      '& p': {
        ...typography.heading4,
        color: colors.white.main
      }
    },
    title: {
      ...typography.heading4,
      color: colors.white.main
    },
    close: {
      minWidth: 0,
      maxHeight: 20,
      maxWidth: 16,
      fontSize: 20,
      background: 'none',
      color: colors.white.main,
      '&:hover': {
        background: 'none !important'
      }
    },
    input: {
      backgroundColor: colors.invariant.newDark,
      width: '100%',
      color: colors.white.main,
      borderRadius: 20,
      padding: '12px 10px',
      ...typography.heading4,
      fontWeight: 400,
      marginRight: 16,
      '&::placeholder': {
        color: colors.invariant.light,
        ...typography.heading4,
        fontWeight: 400
      },
      '&:focus': {
        outline: 'none'
      }
    },
    add: {
      minWidth: 82,
      background: colors.invariant.greenLinearGradient,
      ...typography.heading4,
      color: colors.invariant.black,
      textTransform: 'none',
      borderRadius: 18,

      '&:disabled': {
        background: colors.invariant.light,
        color: colors.invariant.black
      }
    }
  }
})

export default useStyles
