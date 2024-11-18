import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    modalContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 1300
    },
    popoverRoot: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '90%',
      background: 'transparent',
      boxShadow: 'none',
      overflow: 'visible'
    },
    root: {
      background: `
        radial-gradient(49.85% 49.85% at 50% 100%, rgba(46, 224, 154, 0.25) 0%, rgba(46, 224, 154, 0) 75%),
        radial-gradient(50.2% 50.2% at 50% 0%, rgba(239, 132, 245, 0.25) 0%, rgba(239, 132, 245, 0) 75%),
        ${colors.invariant.component}
      `,
      width: 490,
      maxWidth: '100%',
      height: 'fit-content',
      borderRadius: 24,
      padding: '20px 24px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 32px)',
        padding: '16px 20px'
      }
    },
    buttonWrapper: {
      background: colors.invariant.componentBcg,
      borderRadius: '8px',
      pointerEvents: 'auto',
      padding: '8px'
    },
    title: {
      ...typography.heading1,
      margin: 10,
      textAlign: 'center',
      width: '100%'
    },
    footerTitle: {
      ...typography.heading3,
      margin: 10,
      textAlign: 'center',
      color: colors.invariant.green
    },
    subTitle: {
      ...typography.body2,
      marginTop: 12,
      color: colors.invariant.textGrey,
      textAlign: 'center',
      width: '100%'
    },
    buttonList: {
      marginTop: 12
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 24
    },
    buttonPrimary: {
      height: 40,
      width: 200,
      pointerEvents: 'auto',

      marginTop: '24px',
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
    footerSubtitle: {
      fontWeight: 400,
      color: colors.invariant.text
    },
    divider: {
      width: '100%',
      height: 0,
      background: colors.invariant.light,
      margin: '24px 0'
    },
    topCloseButton: {
      pointerEvents: 'auto',
      display: 'flex',
      justifyContent: 'flex-end',
      '&:hover': {
        cursor: 'pointer',
        filter: 'brightness(1.5)'
      }
    },
    button: {
      color: colors.invariant.lightGrey,
      borderRadius: 11,
      padding: '6px 7px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.invariant.component,

      '&:hover': {
        color: colors.white.main,
        background: colors.invariant.light,
        '@media (hover: none)': {
          color: colors.invariant.lightGrey
        }
      },
      '&:first-of-type': {
        marginBottom: '4px'
      },
      '&:not(:first-of-type)': {
        margin: '4px 0'
      }
    },
    bottomCloseButton: {
      pointerEvents: 'auto',
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'
      },
      marginTop: '24px',
      borderBottomColor: colors.invariant.light,
      color: colors.invariant.textGrey
    },
    buttonName: {
      textTransform: 'capitalize',
      ...typography.body1,
      textAlign: 'center',
      fontWeight: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      img: {
        marginRight: '12px'
      }
    }
  }
})

export default useStyles
