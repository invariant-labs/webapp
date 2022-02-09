import { makeStyles } from '@material-ui/core'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 44,
    borderRadius: 16,
    textAlign: 'center',
    textTransform: 'none',
    ...newTypography.body1,
    color: colors.invariant.componentBcg,
    background: colors.invariant.pinkLinearGradient,
    transition: 'background-color 0ms ease, box-shadow 150ms linear',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 4,
    '&:disabled': {
      background: colors.invariant.light,
      color: colors.invariant.componentBcg
    }
  },

  ButtonSwapActive: {
    transition: 'filter 0.3s linear',
    background: `${colors.invariant.greenLinearGradient} !important`,
    filter: 'brightness(0.8)',
    '&:hover': {
      filter: 'brightness(1.15)',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  },
  buttonSelectDisabled: {
    background: `${colors.invariant.pinkLinearGradient} !important`,

    '&:hover': {
      filter: 'brightness(1.15)',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  },

  buttonRelease: {
    background: `${colors.invariant.componentOut4} !important`,
    '&:hover': {
      background: `${colors.invariant.componentOut4} !important`
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
    backgroundColor: colors.invariant.pink
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
    backgroundColor: colors.invariant.pink
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
    backgroundColor: colors.invariant.green,
    border: 'none',
    margin: '10px 14px 10px 0'
  }
}))

export default useStyles
