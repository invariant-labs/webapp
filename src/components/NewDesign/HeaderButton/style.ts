import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  headerButton: {
    background: colors.invariant.componentOut2,
    color: colors.white.main,
    paddingInline: 12,

    borderRadius: 10,
    textTransform: 'none',
    ...newTypography.body1,
    height: 40,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },

    '&:hover': {
      background: colors.invariant.componentOut3
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
    ...newTypography.body1,
    height: 40,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },
    '&:hover': {
      background: colors.invariant.violetWeak
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...newTypography.body1
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
