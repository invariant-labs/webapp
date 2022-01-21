import { makeStyles } from '@material-ui/core'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 40,
    borderRadius: 16,
    textAlign: 'center',
    textTransform: 'none',
    ...newTypography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    transition: 'background-color 0ms ease, box-shadow 150ms linear',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 4,

    '&:hover': {
      backgroundColor: `${colors.invariant.accent1}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent1}`
    },

    '&:disabled': {
      backgroundColor: colors.invariant.light,
      color: colors.invariant.componentBcg
    }
  },
  buttonRelease: {
    backgroundColor: colors.invariant.componentOut4,
    '&:hover': {
      backgroundColor: `${colors.invariant.componentOut4} !important`
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
  '@keyframes slide-end-success': {
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
  '@keyframes slide-end-fail': {
    '0%': {
      left: '-50%'
    },
    '80%': {
      left: '-65%'
    },
    '100%': {
      left: '-100%'
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
  backgroundApprovedWithSuccess: {
    top: 0,
    left: '-50%',
    width: '100%',
    height: '100%',
    padding: 0,
    position: 'absolute',
    animation: '$slide-end-success 1.5s',
    animationFillMode: 'forwards'
  },
  backgroundApprovedWithFail: {
    top: 0,
    left: '-50%',
    width: '100%',
    height: '100%',
    padding: 0,
    position: 'absolute',
    animation: '$slide-end-fail 1.5s',
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
