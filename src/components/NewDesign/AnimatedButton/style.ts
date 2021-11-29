import { makeStyles } from '@material-ui/core'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: 10,
    width: 381,
    height: 35,
    textAlign: 'center',
    textTransform: 'none',
    ...newTypography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    transition: 'background-color 500ms ease',
    padding: '10px 19px',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 4,
    '&:hover': {
      backgroundColor: colors.invariant.componentOut4
    }
  },
  buttonRelease: {
    backgroundColor: colors.invariant.componentOut4,
    '&:hover': {
      backgroundColor: colors.invariant.componentOut4
    }
  },
  '@keyframes slide-start': {
    '0%': {
      left: '-100%'
    },
    '100%': {
      left: '-50%'
    }
  },
  '@keyframes slide-end': {
    '0%': {
      left: '-45%'
    },
    '100%': {
      left: 0
    }
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: '-100%',
    backgroundColor: colors.invariant.accent1
  },
  backgroundRelease: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    top: '0%',
    animation: '$slide-start 3s ease-in',
    transition: 'all .2s',
    backgroundColor: colors.invariant.accent1
  },
  buttonContent: {
    position: 'relative',
    zIndex: 4
  }
}))

export default useStyles
