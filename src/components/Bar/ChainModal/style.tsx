import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    barButtonIcon: {
      width: 24,
      height: 24,
      padding: 8
    },
    title: {
      marginLeft: 8,
      ...typography.body1
    },
    closeIcon: {
      height: 12,
      width: 12,
      cursor: 'pointer'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    },
    chainContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    },
    chain: {
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
    chainActive: {
      background: colors.invariant.light,
      color: colors.white.main
    },
    name: {
      ...typography.body2,
      marginTop: 2
    },
    icon: {
      width: 16,
      height: 16
    }
  }
})
