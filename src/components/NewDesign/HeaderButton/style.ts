import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  headerButton: {
    background: colors.invariant.headerButton,
    color: colors.white.main,
    paddingInline: 12,

    borderRadius: 10,
    textTransform: 'none',
    ...typography.subtitle2,
    height: 40,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },

    '&:hover': {
      background: colors.invariant.violetStrong
    },
    '&:active': {
      '& #downIcon': {
        transform: 'rotateX(180deg)'
      }
    }
  },
  headerButtonConnect: {
    background: colors.invariant.violetButton,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...typography.subtitle2,
    height: 40,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },
    '&:hover': {
      background: colors.invariant.violetStrong
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...typography.subtitle1
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
    marginTop: 2
  },
  endIcon: {
    minWidth: 20,
    marginTop: 2
  },
  innerEndIcon: {
    marginLeft: 0
  }
}))

export default useStyles
