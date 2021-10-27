import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 67,
    backgroundColor: 'transparent',
    color: colors.invariant.lightInfoText,
    height: 32,
    borderRadius: 10,
    ...newTypography.body1,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: '4px',
    '&:hover': {
      background: colors.invariant.componentOut2,
      color: colors.white.main,
      ...newTypography.body1
    }
  },
  active: {
    background: colors.invariant.componentOut2,
    color: colors.white.main,
    ...newTypography.body1
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
