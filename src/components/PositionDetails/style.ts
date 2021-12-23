import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapperContainer: {
    width: 1004,
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  positionDetails: {
    width: 461,
    marginRight: 24,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: 32
    }
  },
  right: {
    width: 517,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  back: {
    height: 40,
    marginBottom: 16,
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: colors.invariant.lightInfoText,
    WebkitPaddingBefore: '2px',
    ...typography.body2
  },
  button: {
    color: colors.white.main,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.accent1,
    borderRadius: 5,
    height: 40,
    width: 168,
    marginBottom: 16,

    '&:hover': {
      background: colors.invariant.accent1,
      boxShadow: `0 0 15px ${colors.invariant.accent1}`
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  }
}))

export default useStyles
