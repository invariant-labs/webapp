import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut1,
    padding: 24,
    paddingTop: 16
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
      width: 58
    }
  },
  names: {
    ...typography.heading1,
    color: colors.white.main,

    [theme.breakpoints.down('xs')]: {
      ...typography.heading3
    }
  },
  dot: {
    height: 16,
    minWidth: 16,
    color: colors.invariant.lightInfoText,

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
    backgroundColor: colors.invariant.accent2,
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
    color: colors.invariant.accent2
  },
  greyText: {
    color: colors.invariant.lightInfoText
  },
  activity: {
    ...typography.body1,

    [theme.breakpoints.down('xs')]: {
      ...typography.label2
    }
  },
  flexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.invariant.lightInfoText,
    ...typography.heading4,
    fontWeight: 400
  },
  value: {
    color: colors.white.main,
    ...typography.heading4
  },
  link: {
    marginTop: 20,
    textDecoration: 'none'
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,

    '&:hover': {
      backgroundColor: `${colors.invariant.accent1}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent1}`
    },

    '&:disabled': {
      backgroundColor: colors.invariant.componentOut3,
      color: colors.invariant.background2,
      pointerEvents: 'auto !important',
      cursor: 'pointer'
    },

    '&:hover:disabled': {
      backgroundColor: `${colors.invariant.componentOut2} !important`,
      pointerEvents: 'auto !important',
      boxShadow: 'unset'
    }
  }
}))

export default useStyles
