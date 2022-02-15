import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 67,
    backgroundColor: 'transparent',
    color: colors.invariant.light,
    height: 32,
    borderRadius: 10,
    ...newTypography.body1,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: '4px',
    '&:hover': {
      background: 'transparent',
      color: colors.invariant.lightGrey,
      ...newTypography.body1
    }
  },
  active: {
    background: colors.invariant.light,
    color: colors.white.main,
    ...newTypography.body1,
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
