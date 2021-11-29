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
    transition: 'background-color 0ms ease',
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
      left: '-50%'
    },
    '80%': {
      left: '-35%'
    },
    '100%': {
      left: 0
    }
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 0,
    zIndex: 1,
    top: 0,
    left: '-100%',
    backgroundColor: colors.invariant.accent1
  },
  backgroundRelease: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '-50%',
    padding: 0,
    zIndex: 1,
    top: '0%',
    animation: '$slide-start .4s ease-in',
    transition: 'all .2s',
    backgroundColor: colors.invariant.accent1
  },
  backgroundApproved: {
    top: 0,
    left: '-50%',
    padding: 0,
    position: 'absolute',
    animation: '$slide-end 2s',
    animationFillMode: 'forwards'
  },
  buttonContent: {
    position: 'relative',
    zIndex: 4
  },
  gifContent: {
    position: 'relative',
    zIndex: 4,
    width: 20
  },
  btnStories: {
    padding: '8px 14px',
    backgroundColor: colors.invariant.accent2,
    border: 'none',
    margin: '10px 14px 10px 0'
  }
}))

export default useStyles
