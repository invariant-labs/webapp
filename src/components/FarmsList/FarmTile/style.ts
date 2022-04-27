import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 24,
    backgroundColor: colors.invariant.component,
    padding: 24,
    paddingTop: 16,
    [theme.breakpoints.down('xs')]: {
      padding: 16
    }
  },
  icon: {
    minWidth: 32,
    height: 32,
    borderRadius: '100%',

    [theme.breakpoints.down('xs')]: {
      minWidth: 28,
      height: 28
    }
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 68,
    marginRight: 8,

    [theme.breakpoints.down('xs')]: {
      minWidth: 58,
      marginRight: 4
    }
  },
  names: {
    ...typography.heading1,
    color: colors.white.main,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down('xs')]: {
      ...typography.heading3
    }
  },
  dot: {
    height: 16,
    minWidth: 16,
    color: colors.invariant.lightGrey,
    marginTop: -2,

    [theme.breakpoints.down('xs')]: {
      height: 12,
      minWidth: 12,
      marginTop: -3
    }
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0
    },

    '50%': {
      opacity: 1
    },

    '100%': {
      opacity: 0
    }
  },
  pulseDot: {
    height: 12,
    minWidth: 12,
    backgroundColor: colors.invariant.green,
    borderRadius: '50%',
    marginRight: 6,
    position: 'relative',
    marginTop: -2,

    [theme.breakpoints.down('xs')]: {
      height: 9,
      minWidth: 9,
      marginTop: -3
    },

    '&::before': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: '50%',
      content: '""',
      display: 'block',
      boxShadow: '0 0 3px 5px rgba(157, 212, 109, 0.25)',
      animation: '$pulse 2s infinite'
    }
  },
  greenText: {
    color: colors.invariant.green
  },
  greyText: {
    color: colors.invariant.lightGrey,
    fontSize: 20
  },
  activity: {
    ...typography.body1,
    [theme.breakpoints.down('xs')]: {
      ...typography.body2
    }
  },
  flexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1
  },
  activityWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    marginLeft: 4
  },
  label: {
    color: colors.invariant.lightGrey,
    ...typography.heading4,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexShrink: 0,
    marginRight: 4
  },
  value: {
    color: colors.white.main,
    ...typography.heading4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  link: {
    marginTop: 10,
    textDecoration: 'none'
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...typography.body1,
    color: colors.black.full,

    maxWidth: '100%',
    background:
      ' linear-gradient(180deg, rgba(46, 224, 154, 0.8) 0%, rgba(33, 164, 124, 0.8) 100%)  !important',
    '&:hover': {
      background:
        ' linear-gradient(180deg, rgba(46, 224, 154, 1) 0%, rgba(33, 164, 124, 0.8) 100%)  !important',
      boxShadow: '0px 0px 16px rgba(46, 224, 154, 0.35)'
    },

    '&:disabled': {
      background: 'rgba(58, 70, 107, 0.8) !important',
      pointerEvents: 'auto !important',
      cursor: 'pointer'
    },

    '&:hover:disabled': {
      background: `${colors.invariant.light} !important`,
      pointerEvents: 'auto !important',
      boxShadow: 'none'
    }
  },

  mobileContainer: {
    padding: '4px 0'
  },

  spacer: {
    paddingTop: 12
  },

  rewardRow: {
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: 12,
    padding: '10px 14px',
    marginTop: 10
  },
  rewardLabel: {
    ...typography.body2,
    color: colors.invariant.green
  },
  rewardTokenWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rewardIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: '100%'
  },
  rewardToken: {
    ...typography.body1,
    color: colors.invariant.text
  }
}))

export default useStyles
