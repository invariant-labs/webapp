import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 375px)',
    marginLeft: 'calc(50vw - 231px)',
    [theme.breakpoints.down('xs')]: {
      marginTop: 'calc(50vh - 305px)',
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 464
  },
  container: {
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    padding: 24,
    position: 'relative'
  },
  button: {
    textTransform: 'none',
    ...typography.body1,
    background: colors.invariant.pinkLinearGradient,
    borderRadius: 16,
    height: 44,
    color: colors.invariant.dark,
    width: '100%',

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      opacity: 0.8
    }
  },
  buy: {
    color: colors.white.main,
    ...typography.heading1,
    marginBottom: 16,
    [theme.breakpoints.down('xs')]: {
      ...typography.heading4,
      marginBottom: 8
    }
  },
  token: {
    paddingBottom: 16
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: '100%',
    marginRight: 12,
    [theme.breakpoints.down('xs')]: {
      width: 22,
      height: 22,
      marrginRight: 8
    }
  },
  input: {
    width: 270,
    padding: '6px 10px',
    color: colors.white.main,
    ...typography.heading3,
    backgroundColor: colors.invariant.newDark,
    borderRadius: 11,
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      ...typography.heading4,
      padding: '3px 10px'
    }
  },
  slippageButton: {
    ...typography.body2,
    color: colors.invariant.black,
    borderRadius: 9,
    textTransform: 'none',
    background: colors.invariant.greenLinearGradient,
    width: 58,
    height: 32,

    '&:hover': {
      background: colors.invariant.greenLinearGradientOpacity
    },

    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      height: 24,
      width: 40,
      minWidth: 40
    }
  },
  headers: {
    display: 'grid',
    width: 270,
    gridTemplateColumns: '50% 50%',
    textAlign: 'center'
  },
  values: {
    display: 'grid',
    width: 270,
    gridTemplateColumns: '50% 50%',
    textAlign: 'center',
    marginBottom: 16
  },
  label: {
    color: colors.invariant.textGrey,
    ...typography.body2,
    marginBottom: 8,

    [theme.breakpoints.down('xs')]: {
      ...typography.caption4,
      marginBottom: 4
    }
  },
  value: {
    color: colors.white.main,
    ...typography.heading1,
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      ...typography.heading4,
      marginBottom: 8
    }
  },
  greenValue: {
    color: colors.invariant.green,
    ...typography.heading1,

    [theme.breakpoints.down('xs')]: {
      ...typography.heading4
    }
  },
  close: {
    position: 'absolute',
    right: 24,
    minWidth: 0,
    maxHeight: 20,
    maxWidth: 16,
    fontSize: 20,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    }
  },
  pay: {
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      marginBottom: 8
    }
  }
}))

export default useStyles
