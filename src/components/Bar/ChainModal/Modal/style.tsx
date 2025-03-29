import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    barButtonIcon: {
      width: 24,
      height: 24
    },
    popover: {
      width: 240,
      padding: '16px 8px',
      borderRadius: 24,
      background: colors.invariant.component,
      boxShadow: 'none'
    },
    popoverContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    },
    popoverHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    title: {
      width: '100%',
      textAlign: 'center',
      ...typography.body2,
      color: colors.invariant.textGrey
    },
    closeIconContainer: {
      height: 24,
      width: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    },
    closeIcon: {
      height: 12,
      width: 12
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
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
      ...typography.body2
    },
    icon: {
      width: 20,
      height: 20
    }
  }
})
