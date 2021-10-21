import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 67,
    backgroundColor: 'transparent',
    color: colors.white.main,
    height: 32,
    borderRadius: 10,
    ...typography.subtitle2,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: '4px',
    '&:hover': {
      background: colors.invariant.headerButton,
      color: colors.navy.veryLightGrey,
      ...typography.subtitle1
    }
  },
  active: {
    background: colors.invariant.headerButton,
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
