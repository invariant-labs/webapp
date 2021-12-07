import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  headerButton: {
    background: colors.invariant.componentOut2,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...typography.body1,
    lineHeight: '22px',
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
  label: {
    WebkitPaddingBefore: '2px'
  },
  headerButtonConnect: {
    background: colors.invariant.logoPurple,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...typography.body1,
    height: 40,
    minWidth: 110,

    '&:not(:last-child)': {
      marginRight: 15
    },
    '&:hover': {
      background: colors.invariant.violetWeak
    }
  },
  headerButtonConnected: {
    background: colors.invariant.componentOut2,
    color: colors.white.main,
    paddingInline: 12,
    borderRadius: 10,
    textTransform: 'none',
    ...typography.body1,
    height: 40,
    minWidth: 110,
    '&:hover': {
      background: colors.invariant.componentOut3
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...typography.body1,
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
