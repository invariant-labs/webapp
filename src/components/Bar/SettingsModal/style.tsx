import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    barButtonIcon: {
      width: 24,
      height: 24,
      padding: 8
    },
    popover: {
      width: 240,
      padding: 24,
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
    closeIcon: {
      height: 12,
      width: 12,
      cursor: 'pointer'
    },
    hidden: {
      display: 'none'
    }
  }
})
