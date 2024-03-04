import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.component,
    width: 310,
    borderRadius: 20,
    marginTop: 8,
    padding: 16
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  marginBottom: {
    marginBottom: 10
  },
  title: {
    ...typography.heading4,
    paddingBottom: 10
  },
  text: {
    ...typography.body1,
    fontWeight: 400,
    fontSize: 14
  },
  list: {
    paddingLeft: 22,
    listStyleType: 'disc',
    fontSize: 14,
    color: colors.invariant.textGrey,
    marginBottom: 10,
    marginTop: 0
  },

  garyText: {
    color: colors.invariant.lightGrey
  },
  whiteText: {
    color: colors.invariant.text
  },
  linkText: {
    color: colors.invariant.pink,
    transition: 'filter 200ms',
    '&:hover': {
      filter: 'brightness(1.35)'
    }
  },
  indexingActive: {
    color: colors.invariant.green
  },
  indexingInactive: {
    color: colors.invariant.Error
  },
  closeButton: {
    minWidth: 0,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    },
    cursor: 'pointer',
    '&:after': {
      content: '"\u2715"',
      fontSize: 20,
      position: 'absolute',
      color: colors.white.main,
      top: '40%',
      right: '10%',
      transform: 'translateY(-50%)'
    }
  }
}))

export default useStyles
