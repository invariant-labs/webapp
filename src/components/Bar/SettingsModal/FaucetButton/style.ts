import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => {
  return {
    claimFaucetButton: {
      height: 36,
      width: '100%',
      background: colors.invariant.greenLinearGradient,
      borderRadius: 10,
      color: colors.invariant.dark,
      ...typography.body2,
      fontWeight: 700,
      textTransform: 'none',
      display: 'flex',
      gap: 8,

      '&:hover': {
        boxShadow: `0 0 15px ${colors.invariant.light}`
      }
    },
    buttonIcon: {
      width: 18,
      height: 18
    }
  }
})
