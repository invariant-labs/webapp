import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.invariant.component,
    width: 480,
    borderRadius: 24,
    padding: '20px 24px'
  },
  popover: {
    marginTop: 'calc(50vh - 143px)',
    marginLeft: 'calc(50vw - 241px)',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  upperRow: {
    height: 20,
    marginBottom: 16
  },
  title: {
    ...typography.heading4,
    color: colors.invariant.yellow
  },
  desc: {
    ...typography.body2,
    color: colors.invariant.text,
    marginBottom: 16
  },
  close: {
    minWidth: 0,
    maxHeight: 20,
    maxWidth: 16,
    fontSize: 20,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    }
  },
  input: {
    backgroundColor: colors.invariant.newDark,
    width: '100%',
    height: 60,
    color: colors.white.main,
    borderRadius: 20,
    padding: '7px 10px 6px',
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
  closeButton: {
    height: 44,
    background: colors.invariant.greenLinearGradientOpacity,
    ...typography.body1,
    color: colors.invariant.black,
    textTransform: 'none',
    borderRadius: 18,
    marginBottom: 10,

    '&:hover': {
      background: colors.invariant.greenLinearGradient
    }
  },
  claimButton: {
    height: 44,
    background: colors.invariant.pinkLinearGradientOpacity,
    ...typography.body1,
    color: colors.invariant.black,
    textTransform: 'none',
    borderRadius: 18,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient
    }
  },
  cancelButton: {
    height: 44,
    background: colors.invariant.light,
    ...typography.body1,
    color: colors.invariant.black,
    textTransform: 'none',
    borderRadius: 18,
    marginBottom: 10,

    '&:hover': {
      background: colors.invariant.lightHover
    }
  }
}))

export default useStyles
