import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    headerButton: {
      minWidth: 42,
      height: 40,
      borderRadius: 12,
      color: colors.white.main,
      ...typography.body1,

      '&:hover': {
        background: colors.invariant.light
      },

      '&:first-of-type': {
        borderRadius: '14px 0 0 14px'
      },

      '&:last-of-type': {
        borderRadius: '0 14px 14px 0'
      }
    }
  }
})
