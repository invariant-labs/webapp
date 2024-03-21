import { makeStyles } from '@material-ui/core/styles'
import { colors, theme, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: 315,
    padding: 20,
    borderRadius: 18,
    background: colors.invariant.component,
    [theme.breakpoints.down('xs')]: {
      width: '85%',
      margin: 'auto'
    }
  },
  title: {
    ...typography.heading4,
    paddingBottom: 16
  },
  paper: {
    background: 'none',
    boxShadow: 'none'
  },
  text: {
    ...typography.caption2
  },
  UlList: {
    marginTop: 0,
    paddingLeft: 20,
    marginBottom: 16,
    fontSize: 9,
    color: colors.invariant.textGrey
  },
  whiteText: {
    color: colors.invariant.text
  },
  grayText: {
    color: colors.invariant.lightGrey
  },
  linkText: {
    color: colors.invariant.pink,
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.3)'
    }
  },
  indexActive: {
    color: colors.invariant.green
  },
  indexInactive: {
    color: colors.invariant.Error
  },
  closeBtn: {
    position: 'absolute',
    top: '5px',
    right: '7px',
    color: colors.invariant.text
  },
  marginBottom: {
    marginBottom: 16
  }
}))

export default useStyles
