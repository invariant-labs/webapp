import { makeStyles } from 'tss-react/mui'
import { colors, theme, typography } from '@static/theme'

const useStyles = makeStyles()(() => {
  return {
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(2,6,23,0.55)',
      backdropFilter: 'blur(6px) brightness(0.7)',
      WebkitBackdropFilter: 'blur(6px) brightness(0.7)',
      padding: '24px',
      [theme.breakpoints.down('md')]: {
        padding: 16
      }
    },
    container: {
      zIndex: 501,
      width: '100%',
      maxWidth: 380,
      borderRadius: 24,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      background: colors.invariant.pinkGreenLinearGradientOpacityVertical,
      boxShadow: '0px 4px 18px 0px #00000059',
      color: '#E6EEF8',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        gap: 24,
        padding: 16
      }
    },
    header: {
      display: 'flex',
      alignItems: 'center'
    },
    checkbox: {
      width: 25,
      height: 25,
      marginLeft: 3,
      marginRight: 3,
      color: colors.invariant.newDark,
      '&.Mui-checked': {
        color: colors.invariant.green
      },
      '& .MuiSvgIcon-root': {
        fontSize: 25
      },
      padding: 0,
      '& .MuiIconButton-label': {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
      }
    },
    form: {
      '& span': {
        marginLeft: 3,
        [theme.breakpoints.down('md')]: {
          ...typography.caption2
        }
      }
    },
    logo: {
      width: 'auto',
      height: 48,
      objectFit: 'contain',
      transform: 'translate(-10px)'
    },
    title: {
      fontWeight: 700,
      fontSize: '1.05rem'
    },
    pink: {
      color: colors.invariant.pink
    },
    heading: {
      ...typography.heading1,
      [theme.breakpoints.down('md')]: {
        ...typography.heading3
      }
    },
    description: {
      fontSize: 20,
      lineHeight: '28px',
      color: colors.invariant.textGrey,
      letterSpacing: '-0.03rem',
      fontWeight: 400,
      [theme.breakpoints.down('md')]: {
        ...typography.body2
      }
    },
    link: {
      color: colors.invariant.green,
      textDecoration: 'underline',
      textDecorationThickness: 1,

      '&:hover': {
        textDecorationThickness: 2
      }
    }
  }
})

export default useStyles
