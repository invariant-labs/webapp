import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  container: {
    width: '100%',
    height: '370px',
    zIndex: 14
  },
  root: {
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
    width: '100%',
    height: '100%',
    p: {
      textAlign: 'center'
    }
  },
  img: {
    paddingBottom: 25
  },
  blur: {
    width: '100%',
    height: '370px',
    backgroundColor: 'rgba(12, 11, 13, 0.8)',
    position: 'absolute',
    zIndex: 13,
    borderRadius: 10
  },
  desc: {
    ...typography.body2,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightHover
  },
  buttonPrimary: {
    height: 40,
    width: 200,
    marginTop: 16,
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

    transition: '0.3s',
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
  }
}))
