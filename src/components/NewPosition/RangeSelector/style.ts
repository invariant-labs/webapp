import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: 540,
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
    marginBottom: 20,
    flexDirection: 'row',
    gap: 16,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  input: {
    flex: '1 1 0%',
    gap: 12,

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
    width: 200,
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
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  blocker: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 11,
    width: '464px',
    height: '541px',
    backgroundColor: 'rgba(11, 12, 13, 0.8)',
    filter: 'blur(0px) brightness(0.4)',
    borderRadius: 11,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.down('md')]: {
      top: 590,
      width: '100%',
      height: 641
    }
  },

  blockedInfoWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '464px',
    height: '541px',
    zIndex: 12,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.down('md')]: {
      top: 606,
      width: '100%',
      height: '590px'
    }
  },

  blockedInfo: {
    ...newTypography.heading4,
    color: colors.invariant.lightHover
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

export default useStyles
