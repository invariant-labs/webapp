import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 350px)',
    marginLeft: 'calc(50vw - 231px)',
    [theme.breakpoints.down('xs')]: {
      marginTop: 'calc(50vh - 300px)',
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 456
  },
  container: {
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    padding: 24
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
    width: '100%',
    padding: '6px 10px',
    color: colors.white.main,
    ...typography.body1,
    backgroundColor: colors.invariant.newDark,
    borderRadius: 11,
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      ...typography.heading4,
      marginBottom: 8,
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
      color: colors.invariant.greenLinearGradient,
      opacity: 0.8
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
    width: '100%',
    gridTemplateColumns: '50% 50%',
    textAlign: 'center'
  },
  values: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '50% 50%',
    textAlign: 'center',
    marginBottom: 16,

    [theme.breakpoints.down('xs')]: {
      marginBottom: 8
    }
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
  }
}))

export default useStyles
