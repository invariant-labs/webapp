import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

interface StyleProps {
  newVersion?: boolean
  height?: number
  roundedCorners?: boolean
  themeDark: boolean
}

export const useStyles = makeStyles<StyleProps>()(
  (_theme, { newVersion, roundedCorners, height, themeDark }) => ({
    wrapperContainer: {
      position: 'relative',
      width: '100%',
      height: height ? height : '370px'
    },

    container: {
      width: '100%',
      height: '100%',
      zIndex: 14,
      position: 'relative'
    },
    root: {
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      p: {
        textAlign: 'center'
      }
    },
    blur: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 13,
      borderTopLeftRadius: !roundedCorners ? 0 : 24,
      borderTopRightRadius: !roundedCorners ? 0 : 24,
      background: newVersion
        ? themeDark
          ? 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
          : 'linear-gradient(360deg, rgba(32, 41, 70, 0.8) 0%, rgba(17, 25, 49, 0.8) 100%), linear-gradient(180deg, #010514 0%, rgba(1, 5, 20, 0) 100%)'
        : 'rgba(12, 11, 13, 0.8)'
    },
    title: {
      opacity: 0.8,
      ...typography.heading2,
      color: colors.invariant.text
    },
    desc: {
      ...typography.body2,
      lineHeight: '20px',
      color: colors.invariant.lightHover
    },
    button: {
      height: 40,
      width: 200,
      color: colors.invariant.componentBcg,
      ...typography.body1,
      textTransform: 'none',
      borderRadius: 14,
      background: colors.invariant.pinkLinearGradientOpacity,

      '&:hover': {
        background: colors.invariant.pinkLinearGradient,
        boxShadow: '0px 0px 16px rgba(239, 132, 245, 0.35)',
        '@media (hover: none)': {
          background: colors.invariant.pinkLinearGradientOpacity,
          boxShadow: 'none'
        }
      }
    },
    buttonSecondary: {
      width: 200,
      height: 40,
      marginTop: 12,
      ...typography.body2,
      color: colors.white.main,
      textTransform: 'none',
      backgroundImage: 'none',
      backgroundColor: colors.invariant.light,
      borderRadius: 14,

      transition: '0.1s',
      '&:hover': {
        boxShadow: '0px 0px 16px rgba(255, 255, 255, 0.1)',
        backgroundColor: colors.invariant.light,
        filter: 'brightness(1.2)',
        '@media (hover: none)': {
          boxShadow: 'none'
        }
      }
    },
    buttonText: {
      ...typography.body2
    },
    button2: {}
  })
)
