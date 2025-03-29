import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    },
    networkContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    },
    network: {
      height: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 12,
      cursor: 'pointer',
      paddingInline: 8,
      color: colors.invariant.textGrey,
      transition: '300ms',

      '&:hover': {
        background: colors.invariant.light,
        color: colors.white.main
      }
    },
    networkActive: {
      background: colors.invariant.light,
      color: colors.white.main
    },
    name: {
      ...typography.body2,
      marginTop: 2
    },
    title: {
      marginLeft: 8,
      ...typography.body1
    },
    activeIconContainer: {
      width: 8,
      height: 8,
      display: 'flex'
    },
    activeContainer: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8
    },
    recommendedText: {
      ...typography.caption3,
      color: colors.white.main
    },
    inputContainer: {
      height: 44,
      background: colors.invariant.newDark,
      borderRadius: 16,
      paddingInline: 8,
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      flexGrow: 1,
      color: colors.white.main,
      ...typography.body2
    },
    applyButton: {
      height: 28,
      width: 64,
      background: colors.invariant.green,
      borderRadius: 10,
      color: colors.invariant.dark,
      ...typography.body2,
      textTransform: 'none',
      transition: '300ms',

      '&:hover': {
        background: colors.invariant.green
      },

      '&:disabled': {
        background: colors.invariant.component,
        color: colors.invariant.textGrey
      }
    }
  }
})
