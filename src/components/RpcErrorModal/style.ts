import { makeStyles } from 'tss-react/mui'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles()(theme => ({
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
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 96px)',
      left: 16,
      right: 16,
      transform: 'none'
    }
  },
  warningIcon: {
    height: 48
  },
  title: {
    ...typography.heading3,
    marginTop: 16,
    textAlign: 'center'
  },
  rpcText: {
    color: colors.invariant.lightGrey,
    fontWeight: 'normal'
  },
  currentRpcText: {
    color: colors.invariant.lightGrey,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  currentRpc: {
    color: colors.white.main,
    fontWeight: 'bold'
  },
  mainButton: {
    width: 240,
    height: 40,
    color: colors.invariant.black,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.pinkLinearGradientOpacity,
    borderRadius: 14,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      boxShadow: `0 0 16px ${colors.invariant.pink}`
    }
  },
  otherButton: {
    width: 240,
    height: 40,
    color: colors.white.main,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.light,
    borderRadius: 14,

    '&:hover': {
      background: colors.invariant.light,
      boxShadow: `0 0 16px ${colors.invariant.light}`
    }
  },
  buttonsContainer: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginTop: 16
  }
}))

export default useStyles
