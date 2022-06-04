import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 67,
    backgroundColor: 'transparent',
    color: colors.invariant.light,
    height: 32,
    borderRadius: 10,
    ...typography.body1,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: '4px',
    '&:hover': {
      background: 'transparent',
      color: colors.invariant.lightGrey,
      ...typography.body1
    }
  },
  active: {
    background: colors.invariant.light,
    color: colors.white.main,
    ...typography.body1,
    '&:hover': {
      background: colors.invariant.light,
      color: colors.white.main
    }
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
