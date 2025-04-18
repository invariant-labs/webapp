import { colors, theme, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    height: 112,
    gap: '16px',
    backgroundColor: colors.invariant.component,
    marginBottom: 29,
    [theme.breakpoints.up('lg')]: {
      background:
        'linear-gradient(360deg, rgba(32, 41, 70, 0.8) 0%, rgba(17, 25, 49, 0.8) 100%), linear-gradient(180deg, #010514 0%, rgba(1, 5, 20, 0) 100%)'
    }
  },
  emptyStateText: {
    ...typography.heading2,
    color: colors.invariant.text,
    textAlign: 'center'
  }
}))
