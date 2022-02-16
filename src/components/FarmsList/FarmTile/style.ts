import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography, typography } from '@static/theme'

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
  top: {
    marginBottom: 10
  },
  icon: {
    width: 32,
    height: 32,

    [theme.breakpoints.down('xs')]: {
      width: 28,
      height: 28
    }
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 68,
    marginRight: 16,

    [theme.breakpoints.down('xs')]: {
      width: 58,
      marginRight: 8
    }
  },
  names: {
    ...newTypography.heading1,
    color: colors.white.main,

    [theme.breakpoints.down('xs')]: {
      ...newTypography.heading3
    }
  },
  dot: {
    height: 16,
    minWidth: 16,
    color: colors.invariant.lightGrey,

    [theme.breakpoints.down('xs')]: {
      height: 12,
      minWidth: 12
    }
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0
    },

    '100%': {
      opacity: 1
    }
  },
  pulseDot: {
    height: 12,
    width: 12,
    backgroundColor: colors.invariant.green,
    borderRadius: '50%',
    marginRight: 6,
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      height: 9,
      width: 9
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
      boxShadow: '0 0 2px 4px rgba(157, 212, 109, 0.25)',
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
    ...newTypography.body1,
    [theme.breakpoints.down('xs')]: {
      ...newTypography.body2
    }
  },
  flexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.invariant.lightGrey,
    ...newTypography.heading4,
    fontWeight: 400,
    letterSpacing: '-0.03em'
  },
  value: {
    color: colors.white.main,
    ...newTypography.heading4
  },
  link: {
    marginTop: 20,
    textDecoration: 'none'
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 16,
    textTransform: 'none',
    ...newTypography.body1,
    background: colors.invariant.greenLinearGradientOpacity,
    color: colors.black.full,
    '&:hover': {
      background: colors.invariant.greenLinearGradient,
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
  }
}))

export default useStyles
