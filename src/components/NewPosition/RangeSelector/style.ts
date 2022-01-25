import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    borderRadius: 10,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    flex: '1 1 0%'
  },
  header: {
    ...newTypography.heading4,
    marginBottom: 6,
    color: colors.white.main
  },
  innerWrapper: {
    borderRadius: 8,
    backgroundColor: colors.invariant.component,
    width: '100%',
    position: 'relative'
  },
  plot: {
    width: '100%',
    height: 240,

    [theme.breakpoints.down('sm')]: {
      height: 215
    }
  },
  subheader: {
    ...newTypography.heading4,
    marginBlock: 12,
    color: colors.white.main
  },
  inputs: {
    marginBottom: 15,
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  input: {
    flex: '1 1 0%',

    '&:first-child': {
      marginRight: 8
    },

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  button: {
    flex: '1 1 0%',
    ...newTypography.body2,
    color: colors.white.main,
    textTransform: 'none',
    height: 36,
    paddingInline: 8,
    backgroundColor: colors.invariant.light,
    borderRadius: 11,

    '&:first-child': {
      marginRight: 8
    },

    [theme.breakpoints.down('sm')]: {
      '&:first-child': {
        marginRight: 0,
        marginBottom: 8
      }
    }
  },
  blocker: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 11,
    width: '464px',
    height: '548px',
    backgroundColor: 'rgba(11, 12, 13, 0.8)',
    filter: 'blur(4px) brightness(0.4)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '586px'
    }
  },

  blockedInfoWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '464px',
    height: '548px',
    zIndex: 12,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '586px'
    }
  },

  blockedInfo: {
    ...newTypography.heading4,
    color: colors.invariant.lightHover
  },
  buttons: {
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

export default useStyles
