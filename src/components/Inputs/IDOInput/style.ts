import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  maxButton: {
    fontSize: 16,
    color: colors.invariant.componentIn2,
    minWidth: 55,
    height: 32,
    fontWeight: 400,
    borderRadius: 3,
    padding: '7px 0',
    backgroundColor: colors.invariant.accent2,
    background:
      'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white'
    }
  },
  label: {
    top: -1
  }
}))

export default useStyles
