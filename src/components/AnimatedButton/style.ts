import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'
import { keyframes } from 'tss-react'

const useStyles = makeStyles()(() => {
  const slideStart = keyframes`
    0% {
         transform: translateX(-50%)
    }
    100% {
      transform: translateX(0)
    }
  `
  const slideEndSuccess = keyframes`
    0% {
      transform: translateX(-50%)
    }
    80% {
      transform: translateX(-35%)
    }
    100% {
      transform: translateX(0)
    }
  `
  const slideEndFail = keyframes`
    0% {
      transform: translateX(50%)
    }
    80% {
      transform: translateX(35%)
    }
    100% {
      transform: translateX(0)
    }
  `
  return {
    button: {
      height: 44,
      borderRadius: 16,
      textAlign: 'center',
      textTransform: 'none',
      ...typography.body1,
      color: colors.invariant.componentBcg,
      background: colors.invariant.pinkLinearGradient,
      transition: 'background-color 0ms ease, box-shadow 300ms linear',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 4,

      '&:disabled': {
        background: colors.invariant.light,
        color: colors.invariant.componentBcg,
        pointerEvents: 'auto',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 'none',
          cursor: 'not-allowed',
          filter: 'brightness(1.15)',
          '@media (hover: none)': {
            filter: 'none'
          }
        }
      }
    },

    buttonRelease: {
      background: `${colors.invariant.componentBcg} !important`,
      '&:hover': {
        background: `${colors.invariant.componentBcg} !important`
      }
    },
    background: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      padding: 0,
      zIndex: 1,
      top: 0
    },
    backgroundRelease: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '-50%',
      padding: 0,
      zIndex: 1,
      top: '0%',
      animation: `${slideStart} .4s ease-in`
    },
    backgroundApprovedWithSuccess: {
      top: 0,
      left: '0%',
      width: '100%',
      height: '100%',
      padding: 0,
      position: 'absolute',
      animation: `${slideEndSuccess} 0.5s ease-out`
    },
    backgroundApprovedWithFail: {
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      padding: 0,
      position: 'absolute',
      animation: `${slideEndFail} 0.5s ease-out`
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
  }
})

export default useStyles
