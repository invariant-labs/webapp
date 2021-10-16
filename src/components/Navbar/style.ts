import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 93,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.navy.navBar,
    height: 44,
    borderRadius: 10,
    ...typography.subtitle2,
    textTransform: 'capitalize',
    boxShadow: 'none',
    paddingBottom: '8px',
    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey,
      ...typography.subtitle1
    }
  },
  active: {
    background: colors.navy.button,
    color: colors.navy.veryLightGrey,
    ...typography.subtitle1
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
