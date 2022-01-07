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

    [theme.breakpoints.down('xs')]: {
      height: 12,
      minWidth: 12
    }
  },
  greenDot: {
    color: colors.invariant.accent2
  },
  greyDot: {
    color: colors.invariant.lightInfoText
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
