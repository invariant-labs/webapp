import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 51,
    backdropFilter: 'blur(16px)'
  },
  container: {
    position: 'absolute',
    top: 300,
    width: 480,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: colors.invariant.component,
    padding: 32,
    borderRadius: 20,
    color: colors.white.main,
    zIndex: 52,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  warningIcon: {
    height: 48
  },
  title: {
    ...typography.heading3,
    marginTop: 16
  },
  currentRpcText: {
    color: colors.invariant.lightGrey,
    fontWeight: 'normal'
  },
  pinkButton: {
    width: 240,
    height: 40,
    color: colors.invariant.black,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 14,
    marginTop: 16,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`
    }
  },
  greenButton: {
    width: 240,
    height: 40,
    color: colors.invariant.newDark,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.light,
    borderRadius: 14,
    marginTop: 16,

    '&:hover': {
      background: colors.invariant.light,
      boxShadow: `0 0 16px ${colors.invariant.light}`
    }
  },
  input: {
    width: 320,
    backgroundColor: colors.invariant.newDark,
    fontWeight: 'normal',
    borderRadius: 15,
    padding: 4
  },
  inputDisabled: {
    color: colors.invariant.lightGrey
  }
}))

export default useStyles
