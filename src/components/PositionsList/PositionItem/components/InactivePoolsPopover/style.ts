import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => {
  return {
    popover: {
      marginTop: '8px',
      pointerEvents: 'none',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '16px'
      }
    },

    paper: {
      background: 'transparent',
      boxShadow: 'none',
      borderRadius: '14px',
      border: '1px solid transparent',
      // backgroundImage: 'linear-gradient(#2A365C, #2A365C), linear-gradient(0deg, #2EE09A, #EF84F5)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 16
    },
    insideBox: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    greyText: {
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    whiteText: { ...typography.heading4, color: colors.invariant.text },
    apr: {
      ...typography.tiny2,
      color: colors.invariant.textGrey,
      marginLeft: 8
    }
  }
})

export default useStyles
