import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.invariant.light,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...newTypography.body1,
    lineHeight: '22px',
    height: 40,
    width: 130,
    minWidth: 94,

    '&:not(:last-child)': {
      marginRight: 12
    },

    '&:hover': {
      background: colors.blue.deep
    },
    '&:active': {
      '& #downIcon': {
        transform: 'rotateX(180deg)'
      }
    }
  },
  label: {
    WebkitPaddingBefore: '2px'
  },
  headerButtonConnect: {
    background: colors.invariant.pinkLinearGradientOpacity,
    color: colors.invariant.newDark,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...newTypography.body1,
    height: 40,
    minWidth: 130,

    [theme.breakpoints.down('xs')]: {
      minWidth: 100,
      width: 130
    },

    '&:not(:last-child)': {
      marginRight: 12
    },

    '&:hover': {
      boxShadow: `0 0 15px ${colors.invariant.accent1}`,
      backgroundColor: colors.invariant.accent1
    }
  },
  headerButtonConnected: {
    background: colors.invariant.light,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...newTypography.body1,
    height: 40,
    minWidth: 221,

    [theme.breakpoints.only('md')]: {
      minWidth: 137,
      width: 221
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 100,
      width: 130
    },

    '&:hover': {
      background: colors.blue.deep
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...newTypography.body1,
    whiteSpace: 'nowrap'
  },
  disabled: {
    opacity: 0.5
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  startIcon: {
    marginLeft: 0,
    marginBottom: 3
  },
  endIcon: {
    minWidth: 20,
    marginTop: 2
  },
  innerEndIcon: {
    marginLeft: 0,
    marginBottom: 3
  }
}))

export default useStyles
